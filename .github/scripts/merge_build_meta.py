import json
import urllib.request
import os
import re

MASTER_BUILD_FILE = "master_build.json"
KNOWN_ENGINES = ["morphe", "revanced", "rvx", "anddea", "inotia00", "rex", "default"]

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
    Parse a key like 'youtube-morphe', 'twitch-revanced', 'youtube'
    into (app_key, engine_key).
    """
    key_clean = key.lower().strip()
    for engine in KNOWN_ENGINES:
        if engine != "default" and key_clean.endswith(f"-{engine}"):
            app_key = key_clean[:-len(f"-{engine}")]
            return app_key, engine
    return key_clean, "default"

def parse_asset_filename(filename):
    """
    Parse filename like 'youtube-morphe-v19.16.39-arm64-v8a.apk' or 'twitch-v14.9.1.apk'
    Returns dict with app_key, engine, version or None.
    """
    match = re.match(
        r"^([a-z0-9-]+?)(?:-module)?-v([0-9][a-zA-Z0-9._-]*?)(?:-(?:arm64-v8a|armeabi-v7a|x86_64|x86|universal|all))?\.(?:apk|zip)$",
        filename.lower().strip()
    )
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

def merge_entry_into_master(master_build, target_key, info):
    """
    Merge a build_data entry into master_build.json.
    Supports both nested structure master_build[app][engine][version]
    and direct target key fallback master_build[target][version].
    """
    if not isinstance(info, dict):
        return

    app_key, engine = parse_target_key(target_key)
    version = info.get("version")
    patches = info.get("patches", "")
    changelog = info.get("changlog") or info.get("changelog") or ""
    applied_patches = info.get("applied_patches", [])

    entry_data = {
        "patches": patches,
        "changelog": changelog,
        "applied_patches": applied_patches
    }

    # 1. Store under nested structure: master_build[app_key][engine]
    if app_key not in master_build:
        master_build[app_key] = {}
    if not isinstance(master_build[app_key], dict):
        master_build[app_key] = {}
    if engine not in master_build[app_key]:
        master_build[app_key][engine] = {}

    if version:
        master_build[app_key][engine][version] = entry_data
    master_build[app_key][engine]["default"] = entry_data

    # 2. Also store under target slug for direct matching (e.g. "youtube-morphe")
    if target_key not in master_build:
        master_build[target_key] = {}
    if isinstance(master_build[target_key], dict):
        if version:
            master_build[target_key][version] = entry_data
        master_build[target_key]["default"] = entry_data

def prune_stale_metadata(master_build, releases):
    """
    Prunes apps and versions from master_build that no longer exist
    in ANY active release (across the 100 numbered releases + archive release).
    """
    live_apps = set()
    live_versions_by_app = {}

    for rel in releases:
        for asset in rel.get("assets", []):
            name = asset.get("name", "")
            parsed = parse_asset_filename(name)
            if parsed:
                app_k = parsed["app_key"]
                target_k = parsed["target"]
                ver = parsed["version"]

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
        return master_build

    # Prune stale top-level app keys
    all_stored_keys = list(master_build.keys())
    pruned_apps = []
    for k in all_stored_keys:
        # Check if app key or target matches live inventory
        clean_k = k.lower().replace("-", "").replace("_", "")
        is_live = any(
            clean_k in live.lower().replace("-", "").replace("_", "") or
            live.lower().replace("-", "").replace("_", "") in clean_k
            for live in live_apps
        )

        if not is_live:
            del master_build[k]
            pruned_apps.append(k)
            continue

        # Prune stale versions within the app
        app_data = master_build[k]
        if isinstance(app_data, dict):
            allowed_versions = live_versions_by_app.get(k, set())
            for sub_k in list(app_data.keys()):
                sub_val = app_data[sub_k]
                if isinstance(sub_val, dict) and sub_k in KNOWN_ENGINES:
                    # Nested engine dict: app_data[engine][version]
                    for ver_k in list(sub_val.keys()):
                        if ver_k != "default" and ver_k not in allowed_versions:
                            del sub_val[ver_k]
                            print(f"[-] Pruned purged version: {k}/{sub_k} v{ver_k}")
                elif sub_k != "default" and sub_k not in KNOWN_ENGINES and sub_k not in allowed_versions:
                    del app_data[sub_k]
                    print(f"[-] Pruned purged version: {k} v{sub_k}")

    if pruned_apps:
        print(f"[-] Cleaned up deleted apps from metadata: {', '.join(pruned_apps)}")

    return master_build

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

    # Load previous releases.json cache to identify already processed releases
    cached_releases = load_json("releases.json") or []
    cached_by_id = {r.get("id"): r for r in cached_releases if isinstance(r, dict) and "id" in r}

    new_build_data_count = 0

    for rel in releases:
        rel_id = rel.get("id")
        cached_rel = cached_by_id.get(rel_id)

        # 1. If release already has embedded build_data from cache, re-use and merge
        if cached_rel and cached_rel.get("build_data"):
            rel["build_data"] = cached_rel["build_data"]
            if isinstance(rel["build_data"], dict):
                for target_key, info in rel["build_data"].items():
                    merge_entry_into_master(master_build, target_key, info)
            continue

        # 2. Check for build.json asset in new release
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
                    rel["build_data"] = build_data
                    new_build_data_count += 1
                    print(f"[OK] Ingested new build.json for Release {rel.get('tag_name')}")

                    if isinstance(build_data, dict):
                        for target_key, info in build_data.items():
                            merge_entry_into_master(master_build, target_key, info)
            except Exception as e:
                print(f"Warning: Could not fetch build.json for {rel.get('tag_name')}: {e}")

    # Prune stale metadata based on live inventory across all releases
    master_build = prune_stale_metadata(master_build, releases)

    # Save clean master_build.json
    with open(MASTER_BUILD_FILE, "w", encoding="utf-8") as f:
        json.dump(master_build, f, indent=2, ensure_ascii=False)
    print(f"[OK] Successfully wrote {MASTER_BUILD_FILE} ({len(master_build)} apps)")

    # Save updated releases.json cache
    with open("releases.json", "w", encoding="utf-8") as f:
        json.dump(releases, f, separators=(",", ":"))
    print(f"[OK] Successfully wrote releases.json ({len(releases)} releases, {new_build_data_count} newly ingested)")

if __name__ == "__main__":
    main()
