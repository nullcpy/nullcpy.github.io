import json
import urllib.request
import os

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
                    print(f"✓ Embedded build.json for Release {rel.get('tag_name')}")
            except Exception as e:
                print(f"Warning: Could not fetch build.json for {rel.get('tag_name')}: {e}")

    with open("releases.json", "w", encoding="utf-8") as f:
        json.dump(releases, f, separators=(",", ":"))

    print(f"✓ Successfully wrote {len(releases)} releases to releases.json")

if __name__ == "__main__":
    main()
