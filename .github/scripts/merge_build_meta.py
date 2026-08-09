import json
import urllib.request
import os
import re

MASTER_BUILD_FILE = "builds.json"

# Pre-compiled regular expressions for performance
ARCH_SUFFIXES_REGEX = re.compile(
    r"(?:-(arm64-v8a|armeabi-v7a|arm64|aarch64|arm-v7a|arm32|x86_64|x86|universal|all))+$",
    re.IGNORECASE
)
VERSION_PREFIX_REGEX = re.compile(r"^v(?=\d)", re.IGNORECASE)
ASSET_FILENAME_REGEX = re.compile(
    r"^([a-z0-9-]+?)(?:-module)?-v([0-9][a-zA-Z0-9._-]*?)(?:-(?:arm64-v8a|armeabi-v7a|x86_64|x86|universal|all))?\.(?:apk|zip)$"
)

def load_script_js_config(filepath="script.js"):
    """
    Parse knownPatchTokens and variantKeywords directly from script.js
    so script.js remains the single source of truth.
    """
    known_engines = []
    variant_keywords = []

    candidates = [
        filepath,
        os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "script.js")
    ]

    script_path = None
    for cand in candidates:
        if os.path.exists(cand):
            script_path = cand
            break

    if script_path:
        try:
            with open(script_path, "r", encoding="utf-8") as f:
                content = f.read()

            patch_match = re.search(r"knownPatchTokens:\s*new\s+Set\(\s*\[(.*?)\]\s*\)", content, re.DOTALL)
            if patch_match:
                extracted = re.findall(r'["\']([a-zA-Z0-9_-]+)["\']', patch_match.group(1))
                if extracted:
                    known_engines = [t.lower() for t in extracted]

            variant_match = re.search(r"variantKeywords:\s*new\s+Set\(\s*\[(.*?)\]\s*\)", content, re.DOTALL)
            if variant_match:
                extracted_v = re.findall(r'["\']([a-zA-Z0-9_-]+)["\']', variant_match.group(1))
                if extracted_v:
                    variant_keywords = [v.lower() for v in extracted_v]
        except Exception as e:
            print(f"Warning: Could not parse script.js config: {e}")

    return known_engines, variant_keywords

KNOWN_ENGINES, VARIANT_KEYWORDS = load_script_js_config()

def load_json(filepath):
    """Load JSON from a local file if it exists."""
    if os.path.exists(filepath):
        try:
            with open(filepath, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            print(f"Warning: Could not read {filepath}: {e}")
    return None

def parse_target_key(key):
    """
    Parse a key like 'youtube-morphe', 'gboard-morphe-adobo', 'youtube'
    into (app_key, engine_key).
    """
    tokens = key.lower().strip().split("-")
    engine_idx = -1
    for i, t in enumerate(tokens):
        if t in KNOWN_ENGINES:
            engine_idx = i
            break

    if engine_idx != -1:
        app_key = "-".join(tokens[:engine_idx]) or tokens[0]
        engine = tokens[engine_idx]
        return app_key, engine

    return key.lower().strip(), "default"

def parse_asset_filename(filename):
    """
    Parse filename like 'youtube-morphe-v19.16.39-arm64-v8a.apk' or 'twitch-v14.9.1.apk'
    Returns dict with app_key, engine, version or None.
    """
    match = ASSET_FILENAME_REGEX.match(filename.lower().strip())
    if not match:
        return None
    
    target_part, version = match.groups()
    app_key, engine = parse_target_key(target_part)
    return {
        "target": target_part,
        "app_key": app_key,
        "engine": engine,
        "version": version
    }

def merge_entry_into_master(master_build, target_key, info, release_tag=None):
    """
    Merge a build_data entry into builds.json strictly by its exact target_key.
    Structure: builds[target_key][version][release_tag]
    """
    if not isinstance(info, dict):
        return

    target_key = target_key.lower().strip()
    raw_ver = str(info.get("version") or "").strip()
    version = VERSION_PREFIX_REGEX.sub("", raw_ver) if raw_ver else ""
    version = ARCH_SUFFIXES_REGEX.sub("", version)
    patches = info.get("patches", "")
    changelog = info.get("changlog") or info.get("changelog") or ""
    applied_patches = info.get("applied_patches", [])

    entry_data = {
        "patches": patches,
        "changelog": changelog,
        "applied_patches": applied_patches
    }

    if target_key not in master_build or not isinstance(master_build[target_key], dict):
        master_build[target_key] = {}

    if version:
        if version not in master_build[target_key] or not isinstance(master_build[target_key][version], dict):
            master_build[target_key][version] = {}
        if release_tag:
            master_build[target_key][version][release_tag] = entry_data.copy()
        else:
            master_build[target_key][version] = entry_data.copy()

def prune_stale_metadata(builds, releases):
    """
    Prunes apps and versions from builds that no longer exist
    in ANY active release (across the 100 numbered releases + archive release).
    """
    live_apps = set()
    live_versions_by_app = {}
    live_tags = set()

    for rel in releases:
        tag_name = rel.get("tag_name")
        if tag_name:
            live_tags.add(tag_name)
        for asset in rel.get("assets", []):
            name = asset.get("name", "")
            parsed = parse_asset_filename(name)
            if parsed:
                app_k = parsed["app_key"]
                target_k = parsed["target"]
                ver = VERSION_PREFIX_REGEX.sub("", parsed["version"])

                live_apps.add(app_k)
                live_apps.add(target_k)

                if app_k not in live_versions_by_app:
                    live_versions_by_app[app_k] = set()
                live_versions_by_app[app_k].add(ver)

                if target_k not in live_versions_by_app:
                    live_versions_by_app[target_k] = set()
                live_versions_by_app[target_k].add(ver)

    if not live_apps:
        print("Warning: Live inventory empty, skipping pruning to avoid data loss.")
        return builds

    # Prune stale top-level app keys
    all_stored_keys = list(builds.keys())
    pruned_apps = []
    for k in all_stored_keys:
        clean_k = k.lower().replace("-", "").replace("_", "")
        is_live = any(
            clean_k in live.lower().replace("-", "").replace("_", "") or
            live.lower().replace("-", "").replace("_", "") in clean_k
            for live in live_apps
        )

        if not is_live:
            del builds[k]
            pruned_apps.append(k)
            continue

        # Prune stale versions within the app
        app_data = builds[k]
        if isinstance(app_data, dict):
            allowed_versions = live_versions_by_app.get(k, set())
            clean_allowed = {VERSION_PREFIX_REGEX.sub("", v) for v in allowed_versions}

            # Top two versions for fallback retention
            version_keys = list(app_data.keys())
            top_versions_set = set(sorted(version_keys, reverse=True)[:2])

            for ver_k in list(app_data.keys()):
                clean_ver = VERSION_PREFIX_REGEX.sub("", ver_k)
                keep_version = (clean_ver in clean_allowed) or (ver_k in top_versions_set)
                if not keep_version:
                    del app_data[ver_k]
                    print(f"[-] Pruned purged version: {k} v{ver_k}")
                    continue

                # Prune tags within this version, keeping live tags or the latest tag
                if isinstance(app_data[ver_k], dict):
                    tags = list(app_data[ver_k].keys())
                    live_or_latest = [t for t in tags if t in live_tags]
                    if not live_or_latest and tags:
                        live_or_latest = [max(tags)]
                    for tag_k in tags:
                        if tag_k not in live_or_latest:
                            del app_data[ver_k][tag_k]
                    if not app_data[ver_k]:
                        del app_data[ver_k]

        if isinstance(app_data, dict) and not app_data:
            del builds[k]
            pruned_apps.append(k)

    if pruned_apps:
        print(f"[-] Cleaned up deleted apps from metadata: {', '.join(pruned_apps)}")

    return builds

def main():
    if not os.path.exists("releases_new.json"):
        print("releases_new.json does not exist.")
        return

    releases = load_json("releases_new.json")
    if not isinstance(releases, list) or len(releases) == 0:
        print("Releases is empty or not a list.")
        return

    # Load existing master build metadata
    master_build = load_json(MASTER_BUILD_FILE) or {}

    new_build_data_count = 0

    for rel in releases:
        # Strip any legacy embedded build_data so releases.json remains a clean GitHub API dump
        rel.pop("build_data", None)

        # Check for build.json asset in release
        assets = rel.get("assets", [])
        build_json_asset = next(
            (a for a in assets if a.get("name") in ["build.json", "manifest.json"]),
            None
        )
        if build_json_asset and "browser_download_url" in build_json_asset:
            try:
                url = build_json_asset["browser_download_url"]
                req = urllib.request.Request(
                    url,
                    headers={"User-Agent": "NullStore-Cache-Updater"}
                )
                with urllib.request.urlopen(req, timeout=10) as resp:
                    build_data = json.loads(resp.read().decode("utf-8"))
                    new_build_data_count += 1
                    print(f"[OK] Ingested build.json for Release {rel.get('tag_name')}")

                    if isinstance(build_data, dict):
                        for target_key, info in build_data.items():
                            merge_entry_into_master(master_build, target_key, info, rel.get('tag_name'))
            except Exception as e:
                print(f"Warning: Could not fetch build.json for {rel.get('tag_name')}: {e}")

    # Prune stale metadata based on live inventory across all releases
    master_build = prune_stale_metadata(master_build, releases)

    # Save clean builds.json (single source of truth for all builds)
    with open(MASTER_BUILD_FILE, "w", encoding="utf-8") as f:
        json.dump(master_build, f, indent=2, ensure_ascii=False)
    print(f"[OK] Successfully wrote {MASTER_BUILD_FILE} ({len(master_build)} apps)")

    # Save 100% clean releases.json cache
    with open("releases.json", "w", encoding="utf-8") as f:
        json.dump(releases, f, separators=(",", ":"))
    print(f"[OK] Successfully wrote clean releases.json ({len(releases)} releases, {new_build_data_count} newly ingested)")

if __name__ == "__main__":
    main()
