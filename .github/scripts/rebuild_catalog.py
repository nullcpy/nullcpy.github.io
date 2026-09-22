#!/usr/bin/env python3
"""Rebuild data.json from immutable per-release build.json manifests.

The catalog is derived from scratch on every run:

  data.json = fold(numbered release manifests)      -> numbered build entries
            + fold(archive manifests + live assets) -> rolling archive entries
            + live releases API                     -> existence, size, download counts

A release or asset that no longer exists simply doesn't appear. Nothing here
edits data.json in place.

Inputs (all from the rvb releases API, public repo):
  - every release's build.json asset: filename-keyed manifest,
    {"schema":1,"kind":"build|archive","meta":{...},"files":{"<name>.apk":{...}}}
  - releases with a missing/unparseable manifest get minimal entries synthesized
    from asset filenames, so download buttons never disappear.

Usage:
  python3 rebuild_catalog.py --repo nullcpy/rvb --out data.json [--existing data.json]
Env:
  MIN_RATIO (default 0.6)  fraction of existing apps/builds the new catalog must
                           retain or the run aborts (circuit breaker)
  FORCE=1                  skip circuit breaker
  GH_TOKEN/GITHUB_TOKEN    used implicitly by the gh CLI
"""
import argparse
import json
import os
import re
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

ARCH_ORDER = {"arm64": 0, "arm": 1, "all": 2,
              "universal": 3, "x86_64": 4, "x86": 5}
FILE_PREFIX_RE = re.compile(r"^(.*?)-(?:v[0-9]|module-)", re.IGNORECASE)

# NOTE: normalize_key / normalize_arch / extract_arch / fallback_entry below
# are a dependency-free mirror of rvb's canonical .github/scripts/naming.py.
# If filename-parsing behavior changes there, change it here in the same
# series of commits — silent divergence between builder and website parsing
# is the bug class the manifest architecture exists to prevent.


def run_gh(args, check=True):
    result = subprocess.run(["gh"] + args, capture_output=True, text=True)
    if check and result.returncode != 0:
        print(
            f"Error running gh {' '.join(args)}: {result.stderr.strip()}", file=sys.stderr)
        sys.exit(1)
    return result.stdout


def normalize_key(s):
    return re.sub(r"[^a-z0-9]", "", (s or "").lower())


def normalize_arch(arch_raw):
    a = (arch_raw or "").lower().strip()
    if "arm64" in a or "aarch64" in a:
        return "arm64"
    if "arm" in a or "armeabi" in a:
        return "arm"
    if a in ["all", "universal"] or a.endswith("-all") or a.endswith("-universal"):
        return "all"
    if "x86_64" in a or "x64" in a:
        return "x86_64"
    if "x86" in a:
        return "x86"
    return a or "all"


def extract_arch(fname, version=""):
    match = re.search(
        r"-(arm64-v8a|armeabi-v7a|arm-v7a|aarch64|arm64|arm32|arm|x86_64|x64|x86|universal|all)(?:-(?:apk|module))?\.(?:apk|zip)$",
        fname,
        re.IGNORECASE,
    )
    if match:
        return match.group(1)
    if version:
        clean_ver = re.escape(version.lstrip("v"))
        m = re.search(
            rf"-v?{clean_ver}-([a-zA-Z0-9_-]+?)(?:-(?:apk|module))?\.(?:apk|zip)$", fname, re.IGNORECASE)
        if m:
            return m.group(1)
    name_no_ext = re.sub(r"\.(?:apk|zip)$", "", fname, flags=re.IGNORECASE)
    name_no_mode = re.sub(r"-(?:apk|module)$", "",
                          name_no_ext, flags=re.IGNORECASE)
    parts = name_no_mode.split("-")
    return parts[-1] if len(parts) > 1 else "all"


def fallback_entry(fname, origin_build, published_at):
    m = FILE_PREFIX_RE.match(fname)
    name = m.group(1) if m else fname.rsplit(".", 1)[0]
    return {
        "name": name,
        "version": None,
        "appKey": None,
        "appName": None,
        "arch": normalize_arch(extract_arch(fname)),
        "fileType": "APK" if fname.lower().endswith(".apk") else "Module",
        "brandKey": None,
        "brandName": None,
        "variant": None,
        "subVariant": None,
        "packageName": None,
        "patchSources": [],
        "changelogs": [],
        "appliedPatches": [],
        "originBuild": origin_build,
        "publishedAt": published_at,
    }


def fetch_releases(repo):
    raw = run_gh(
        ["api", "--paginate", f"repos/{repo}/releases?per_page=100"], check=False)
    if not raw.strip():
        print("Error: could not fetch releases from the API. Refusing to rebuild.", file=sys.stderr)
        sys.exit(1)
    try:
        data = json.loads(raw)
    except Exception as e:
        print(
            f"Error: failed to parse releases API response: {e}. Refusing to rebuild.", file=sys.stderr)
        sys.exit(1)
    if not isinstance(data, list):
        print("Error: releases API did not return a list. Refusing to rebuild.", file=sys.stderr)
        sys.exit(1)
    releases = {r["tag_name"]: r for r in data if not r.get(
        "draft") and r.get("tag_name")}
    # Targeted fallback for the rolling archives in case they fell off page 1
    for tag in ("stable", "beta"):
        if tag not in releases:
            fb = run_gh(
                ["api", f"repos/{repo}/releases/tags/{tag}"], check=False)
            try:
                rd = json.loads(fb)
                if rd.get("tag_name") and not rd.get("draft"):
                    releases[tag] = rd
            except Exception:
                pass
    return releases


def fetch_manifest(repo, tag, rel):
    """Download build.json asset for a release.

    Returns (manifest_dict, error_str). A release without a build.json asset at
    all is not an error (manifest_dict None, error None) — the fold synthesizes
    fallback entries from asset filenames. An asset that exists but cannot be
    downloaded or parsed after retries IS an error: better to abort and let the
    next run converge than to publish degraded fallback data.
    """
    asset = next((a for a in rel.get("assets", [])
                 if a["name"] == "build.json"), None)
    if not asset:
        return None, None
    api_url = asset["url"].replace("https://api.github.com/", "")
    raw = ""
    for attempt in range(1, 4):
        raw = run_gh(
            ["api", api_url, "-H", "Accept: application/octet-stream"], check=False)
        if raw.strip():
            break
        print(
            f"Warning: build.json download for {tag} failed (attempt {attempt}/3)", file=sys.stderr)
        if attempt < 3:
            import time
            time.sleep(5 * attempt)  # back off for secondary rate limits
    if not raw.strip():
        return None, f"could not download build.json for {tag} after retries"
    try:
        m = json.loads(raw)
        if not isinstance(m, dict) or not isinstance(m.get("files"), dict):
            raise ValueError("missing files map")
        return m, None
    except Exception as e:
        return None, f"build.json for {tag} is not valid: {e}"


def live_apkzip_assets(rel):
    """name -> asset dict for downloadable files (never the manifest itself)."""
    return {
        a["name"]: a
        for a in rel.get("assets", [])
        if a["name"].lower().endswith((".apk", ".zip"))
    }


class Catalog:
    def __init__(self, repo):
        self.repo = repo
        self.apps = {}       # appKey -> app entry
        self.order = []      # appKeys in creation order
        self.now_iso = datetime.now(
            timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")

    def app(self, app_key, app_name):
        if app_key not in self.apps:
            entry = {
                "appKey": app_key,
                "appName": app_name or app_key,
                "totalDownloads": 0,
                "latestPublishedAt": self.now_iso,
                "brands": [],
            }
            self.apps[app_key] = entry
            self.order.append(app_key)
        else:
            entry = self.apps[app_key]
            if app_name:
                entry["appName"] = app_name
        return self.apps[app_key]

    def brand(self, app_entry, brand_key, brand_name):
        entry = next(
            (x for x in app_entry["brands"] if x["brandKey"] == brand_key), None)
        if entry is None:
            entry = {"brandKey": brand_key, "brandName": brand_name, "latestVersion": "",
                     "latestPublishedAt": self.now_iso, "totalDownloads": 0,
                     "variants": [], "builds": []}
            app_entry["brands"].append(entry)
        if brand_name:
            entry["brandName"] = brand_name
        return entry

    def variant(self, brand_entry, variant, sub_variant, prefix, package_name):
        v = next(
            (x for x in brand_entry["variants"]
             if x.get("variant") == variant and x.get("subVariant") == sub_variant),
            None,
        )
        if v is None:
            v = {
                "variant": variant,
                "subVariant": sub_variant,
                "packageName": package_name or "",
                "apkFilter": f"^{prefix}-v.*\\.apk$" if prefix else "",
                "latestStable": None,
                "latestBeta": None,
            }
            brand_entry["variants"].append(v)
        if package_name:
            v["packageName"] = package_name
        if prefix and not v.get("apkFilter"):
            v["apkFilter"] = f"^{prefix}-v.*\\.apk$"
        return v


def group_files(manifest, live_assets, tag, rel, is_archive):
    """Group manifest entries by (app, brand, variant, version) for files that
    still exist as live assets; synthesize fallback entries for live assets the
    manifest does not cover."""
    entries = manifest["files"] if manifest else {}
    groups = {}
    for fname, e in entries.items():
        if live_assets.get(fname) is None:
            # file gone from the release (pruned/failed upload) -> drop
            continue
        gk = (
            e.get("appKey") or normalize_key(e.get("name") or fname),
            e.get("appName"),
            e.get("brandKey") or "patched",
            e.get("brandName"),
            e.get("variant"),
            e.get("subVariant"),
            e.get("version"),
        )
        groups.setdefault(gk, []).append((fname, e))
    # Only synthesize fallback entries for legacy releases that completely lack a build.json manifest
    if not manifest:
        pub = (rel.get("published_at") or "").replace("+00:00", "Z")
        for fname in live_assets:
            fb = fallback_entry(fname, None if is_archive else tag, pub)
            gk = (normalize_key(fb["name"]) or fb["name"],
                  None, "patched", None, None, None, None)
            groups.setdefault(gk, []).append((fname, fb))
    return groups


def build_assets(group, live_assets):
    assets = []
    for fname, e in group:
        live = live_assets[fname]
        assets.append({
            "name": fname,
            "browser_download_url": live["browser_download_url"],
            "size": live.get("size", 0),
            "download_count": live.get("download_count", 0),
            "arch": e.get("arch") or normalize_arch(extract_arch(fname, e.get("version") or "")),
            # fileType intentionally omitted: it is always derivable from the
            # asset name (.apk -> APK, .zip -> Module) and computed client-side.
        })
    assets.sort(key=lambda a: ARCH_ORDER.get(a["arch"], 99))
    return assets


def apply_numbered(cat, tag, rel, manifest):
    release_type = "beta" if rel.get("prerelease") else "stable"
    meta = (manifest or {}).get("meta") or {}
    published_at = meta.get("publishedAt") or (
        rel.get("published_at") or "").replace("+00:00", "Z")
    live_assets = live_apkzip_assets(rel)
    groups = group_files(manifest, live_assets, tag, rel, is_archive=False)
    for (app_key, app_name, brand_key, brand_name, variant, sub_variant, version), group in groups.items():
        e0 = group[0][1]
        prefix = next((e.get("name") for _, e in group if e.get("name")), "")
        pkg = next((e.get("packageName")
                   for _, e in group if e.get("packageName")), "")
        app_entry = cat.app(app_key, app_name)
        brand_entry = cat.brand(app_entry, brand_key, brand_name or "Patched")
        cat.variant(brand_entry, variant, sub_variant, prefix, pkg)
        build_entry = {
            "build": tag,
            "releaseId": tag,
            "releaseType": release_type,
            "isArchive": False,
            "version": version or "",
            "variant": variant,
            "subVariant": sub_variant,
            "publishedAt": published_at,
            "releaseUrl": f"https://github.com/{cat.repo}/releases/tag/{tag}",
            "patchSources": e0.get("patchSources") or [],
            "changelogs": e0.get("changelogs") or [],
            "appliedPatches": e0.get("appliedPatches") or [],
            "assets": build_assets(group, live_assets),
        }
        brand_entry["builds"] = [
            b for b in brand_entry["builds"]
            if b.get("isArchive") or not (
                str(b.get("build")) == tag and b.get(
                    "variant") == variant and b.get("subVariant") == sub_variant
            )
        ]
        brand_entry["builds"].insert(0, build_entry)


def apply_archive(cat, tag, rel, manifest):
    release_type = "beta" if tag == "beta" else "stable"
    meta = (manifest or {}).get("meta") or {}
    live_assets = live_apkzip_assets(rel)
    groups = group_files(manifest, live_assets, tag, rel, is_archive=True)
    for (app_key, app_name, brand_key, brand_name, variant, sub_variant, version), group in groups.items():
        e0 = group[0][1]
        prefix = next((e.get("name") for _, e in group if e.get("name")), "")
        pkg = next((e.get("packageName")
                   for _, e in group if e.get("packageName")), "")
        published_at = max((e.get("publishedAt") or "" for _, e in group), default="") \
            or meta.get("publishedAt") or (rel.get("published_at") or "").replace("+00:00", "Z")
        app_entry = cat.app(app_key, app_name)
        brand_entry = cat.brand(app_entry, brand_key, brand_name or "Patched")
        cat.variant(brand_entry, variant, sub_variant, prefix, pkg)
        archive_entry = {
            "build": version or tag,
            "releaseId": tag,
            "releaseType": release_type,
            "isArchive": True,
            "version": version or "",
            "variant": variant,
            "subVariant": sub_variant,
            "publishedAt": published_at,
            "releaseUrl": f"https://github.com/{cat.repo}/releases/tag/{tag}",
            "patchSources": e0.get("patchSources") or [],
            "changelogs": e0.get("changelogs") or [],
            "appliedPatches": e0.get("appliedPatches") or [],
            "assets": build_assets(group, live_assets),
        }
        brand_entry["builds"] = [
            b for b in brand_entry["builds"]
            if not (
                b.get("isArchive") and b.get(
                    "releaseId") == tag and b.get("version") == version
                and b.get("variant") == variant and b.get("subVariant") == sub_variant
                and b.get("releaseType") == release_type
            )
        ]
        # keep archive entries ordered after numbered ones within the brand
        insert_at = len(
            brand_entry["builds"]) - sum(1 for b in brand_entry["builds"] if b.get("isArchive"))
        brand_entry["builds"].insert(insert_at, archive_entry)


def finalize(cat):
    apps = []
    for app_key in cat.order:
        app_entry = cat.apps[app_key]
        surviving_brands = []
        for brand in app_entry["brands"]:
            builds = sorted(brand["builds"], key=lambda b: b.get(
                "publishedAt") or "", reverse=True)
            if not builds:
                continue
            brand["builds"] = builds
            brand["latestVersion"] = builds[0].get("version", "")
            brand["latestPublishedAt"] = builds[0].get("publishedAt", "")
            brand["totalDownloads"] = sum(
                sum(a.get("download_count", 0) for a in b.get("assets", [])) for b in builds
            )
            surviving_variants = []
            for v in brand["variants"]:
                v_var, v_sub = v.get("variant"), v.get("subVariant")
                v_builds = [b for b in builds if b.get(
                    "variant") == v_var and b.get("subVariant") == v_sub]
                if not v_builds:
                    continue
                for ch in ("latestStable", "latestBeta"):
                    rel_filter = "stable" if ch == "latestStable" else "beta"
                    newest = next((b for b in v_builds if b.get(
                        "releaseType") == rel_filter), None)
                    if newest:
                        # Store only a reference to the newest build (its id) instead
                        # of duplicating version/publishedAt/releaseUrl/releaseId.
                        # The client resolves the display fields from brand.builds by
                        # matching (variant, subVariant, releaseType, build).
                        v[ch] = newest.get("build", "")
                    else:
                        v[ch] = None
                surviving_variants.append(v)
            brand["variants"] = surviving_variants
            surviving_brands.append(brand)
        if surviving_brands:
            app_entry["brands"] = surviving_brands
            newest = max((b.get("publishedAt", "")
                         for br in surviving_brands for b in br["builds"]), default="")
            app_entry["latestPublishedAt"] = newest
            app_entry["totalDownloads"] = sum(
                b.get("totalDownloads", 0) for b in surviving_brands)
            apps.append(app_entry)
    apps.sort(key=lambda a: a["appName"].lower())

    # Dedup identical appliedPatches lists into a shared, top-level patchSets
    # table. Each build keeps only an integer patchSetRef pointing into it.
    # Dedup is keyed on the *ordered* serialized list, so genuinely different
    # patch lists (even across builds of the same brand) still get their own
    # entry -- only byte-identical repeats collapse. This trims the single
    # fattest block in data.json (~30% of the file) with zero data loss.
    patch_sets = []
    patch_index = {}
    for app in apps:
        for brand in app["brands"]:
            for build in brand["builds"]:
                # releaseId duplicates build for numbered releases (both are the
                # tag). Drop it when redundant; archive entries keep it since
                # their build is a version while releaseId is the rolling tag.
                # The client falls back to build when releaseId is absent.
                if build.get("releaseId") is not None and build.get("releaseId") == build.get("build"):
                    build.pop("releaseId")
                patches = build.pop("appliedPatches", None)
                if patches is None:
                    continue
                key = json.dumps(patches, ensure_ascii=False,
                                 separators=(",", ":"))
                idx = patch_index.get(key)
                if idx is None:
                    idx = len(patch_sets)
                    patch_sets.append(patches)
                    patch_index[key] = idx
                build["patchSetRef"] = idx

    return {
        "version": 2,
        "updated_at": cat.now_iso,
        "patchSets": patch_sets,
        "apps": apps,
    }


def validate(catalog, existing_path):
    if os.environ.get("FORCE") == "1":
        print("FORCE=1: skipping circuit breaker.")
        return
    if not existing_path or not Path(existing_path).exists():
        return
    try:
        old = json.load(open(existing_path, encoding="utf-8"))
    except Exception:
        print("Warning: existing data.json unreadable; skipping shrink check.")
        return
    old_apps = len(old.get("apps", []))
    new_apps = len(catalog["apps"])
    old_builds = sum(len(b["builds"]) for a in old.get(
        "apps", []) for b in a.get("brands", []))
    new_builds = sum(len(b["builds"]) for a in catalog["apps"]
                     for b in a.get("brands", []))
    ratio = float(os.environ.get("MIN_RATIO", "0.6"))
    print(
        f"Circuit breaker: apps {new_apps}/{old_apps}, builds {new_builds}/{old_builds} (min ratio {ratio})")
    if old_apps and (new_apps < old_apps * ratio or new_builds < old_builds * ratio):
        print("Error: rebuilt catalog shrank beyond the safety threshold. Refusing to write.", file=sys.stderr)
        sys.exit(2)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument(
        "--repo", default=os.environ.get("RVB_REPO", "nullcpy/rvb"))
    ap.add_argument("--out", default="data.json")
    ap.add_argument("--existing", default=None,
                    help="existing data.json for shrink checks")
    args = ap.parse_args()

    releases = fetch_releases(args.repo)
    print(f"Fetched {len(releases)} live releases.")
    min_threshold = int(os.environ.get("MIN_RELEASES_THRESHOLD", "10"))
    if len(releases) < min_threshold:
        print(
            f"Error: only {len(releases)} releases (< {min_threshold}). Refusing to rebuild.", file=sys.stderr)
        sys.exit(2)

    numbered_tags = sorted(
        (t for t in releases if t not in ("stable", "beta")),
        key=lambda t: (len(t), t),  # numeric build tags, oldest first
    )
    cat = Catalog(args.repo)

    missing_manifests = []
    for tag in numbered_tags:
        rel = releases[tag]
        m, err = fetch_manifest(args.repo, tag, rel)
        if err:
            print(
                f"Error: {err}. Aborting rebuild — data.json left untouched.", file=sys.stderr)
            sys.exit(2)
        if m is None:
            missing_manifests.append(tag)
        apply_numbered(cat, tag, rel, m)

    for tag in ("stable", "beta"):
        if tag not in releases:
            continue
        rel = releases[tag]
        m, err = fetch_manifest(args.repo, tag, rel)
        if err:
            print(
                f"Error: {err}. Aborting rebuild — data.json left untouched.", file=sys.stderr)
            sys.exit(2)
        if m is None:
            missing_manifests.append(tag)
        apply_archive(cat, tag, rel, m)

    if missing_manifests:
        print(f"Note: {len(missing_manifests)} releases had no build.json (fallback entries used): "
              f"{', '.join(missing_manifests[:10])}{' ...' if len(missing_manifests) > 10 else ''}")

    catalog = finalize(cat)
    validate(catalog, args.existing or args.out)

    with open(args.out, "w", encoding="utf-8") as f:
        json.dump(catalog, f, separators=(",", ":"))
    total_builds = sum(len(b["builds"])
                       for a in catalog["apps"] for b in a["brands"])
    print(
        f"Wrote {args.out}: {len(catalog['apps'])} apps, {total_builds} build entries.")


if __name__ == "__main__":
    main()
