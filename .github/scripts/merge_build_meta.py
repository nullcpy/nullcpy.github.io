import json
import urllib.request
import os

MASTER_BUILD_FILE = "master_build.json"

def load_master_build():
    """Load master build metadata from local file if present."""
    if os.path.exists(MASTER_BUILD_FILE):
        try:
            with open(MASTER_BUILD_FILE, "r", encoding="utf-8") as f:
                data = json.load(f)
                print(f"✓ Loaded master build metadata from {MASTER_BUILD_FILE}")
                return data
        except Exception as e:
            print(f"Warning: Could not read {MASTER_BUILD_FILE}: {e}")
    return None

def main():
    if not os.path.exists("releases_new.json"):
        print("releases_new.json does not exist.")
        return

    with open("releases_new.json", "r", encoding="utf-8") as f:
        try:
            releases = json.load(f)
        except Exception as e:
            print(f"Error parsing releases_new.json: {e}")
            return

    if not isinstance(releases, list) or len(releases) == 0:
        print("Releases is empty or not a list.")
        return

    master_data = load_master_build()

    # Process up to 50 latest releases for build.json metadata
    for rel in releases[:50]:
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
                    print(f"✓ Embedded per-release build.json for Release {rel.get('tag_name')}")
                    continue
            except Exception as e:
                print(f"Warning: Could not fetch build.json for {rel.get('tag_name')}: {e}")

        # Fallback to master_build.json if release has no per-release build.json asset
        if master_data:
            rel["build_data"] = master_data
            print(f"✓ Embedded master build.json fallback for Release {rel.get('tag_name')}")

    with open("releases.json", "w", encoding="utf-8") as f:
        json.dump(releases, f, separators=(",", ":"))

    print(f"✓ Successfully wrote {len(releases)} releases to releases.json")

if __name__ == "__main__":
    main()
