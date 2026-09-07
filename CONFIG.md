# Website Architecture & Configuration Guide (`nullcpy.github.io`)

This document details the configuration, data schema, styling, and synchronization mechanisms powering the **NullStore** web catalog.

---

## 1. Architecture Overview

- **Stack**: Pure Vanilla HTML5, CSS3, and modern ECMAScript (zero runtime frameworks or bundled bloat).
- **Hosting**: GitHub Pages (`https://nullcpy.github.io/`).
- **Data Source**: Static [`data.json`](./data.json) file serialized under **Schema v2**.
- **Decoupled Design**: The build pipeline in [`nullcpy/rvb`](https://github.com/nullcpy/rvb) pushes catalog updates over GitHub API. The website operates entirely as an independent client.

---

## 2. Catalog Specification: Schema v2 (`data.json`)

The catalog uses Schema v2. All legacy baggage (such as artificial composite keys `variantKey`, `buildKey`, and container `patches`) has been purged in favor of clean, distinct first-class fields.

### Root Structure
```json
{
  "version": 2,
  "updated_at": "2026-09-08T03:30:00.000Z",
  "apps": [ ... ]
}
```

### App Object (`apps[i]`)
Each application in the catalog contains:
```json
{
  "appKey": "youtube",
  "appName": "YouTube",
  "totalDownloads": 125430,
  "latestPublishedAt": "2026-09-08T03:30:00.000Z",
  "brands": [ ... ]
}
```

### Brand Object (`brands[j]`)
Represents a patching engine or identity (e.g. `Morphe`, `ReVanced`, `ReVanced Extended`):
```json
{
  "brandKey": "morphe",
  "brandName": "Morphe",
  "latestVersion": "19.16.39",
  "latestPublishedAt": "2026-09-08T03:30:00.000Z",
  "totalDownloads": 89200,
  "variants": [ ... ],
  "builds": [ ... ]
}
```

### Variant Object (`variants[k]`)
Models a distinct functional or packaging stream:
- **`variant`** (`string | null`): Feature or UI variant (e.g. `"Android TV"`, `"Nord"`). Standard/default builds use `null`.
- **`subVariant`** (`string | null`): Packaging variant (e.g. `"clone"`, `"alt"`). Standard builds use `null`.
- **`packageName`** (`string`): Target Android package name (e.g. `"com.google.android.youtube"`).
- **`apkFilter`** (`string`): Regular expression used for asset filtering (e.g. in Obtainium).
- **`latestStable` / `latestBeta`** (`object | null`): Channel pointer objects storing:
  - `version`, `build`, `publishedAt`, `releaseId`, `releaseUrl`, `isArchiveFallback`.

```json
{
  "variant": "Android TV",
  "subVariant": "clone",
  "packageName": "com.amazon.amazonvideo.livingroom",
  "apkFilter": "^primevideo-morphe-androidtv-clone-v.*\\.apk$",
  "latestStable": {
    "version": "3.0.380",
    "build": "380576727",
    "publishedAt": "2026-09-08T02:00:00.000Z",
    "releaseId": "380576727",
    "releaseUrl": "https://github.com/nullcpy/rvb/releases/tag/380576727",
    "isArchiveFallback": false
  },
  "latestBeta": null
}
```

### Build Object (`builds[m]`)
Represents an individual build artifact release:
```json
{
  "build": "380576727",
  "releaseId": "380576727",
  "releaseType": "stable",
  "isArchive": false,
  "version": "19.16.39",
  "variant": null,
  "subVariant": null,
  "publishedAt": "2026-09-08T02:00:00.000Z",
  "releaseUrl": "https://github.com/nullcpy/rvb/releases/tag/380576727",
  "patchSources": ["MorpheApp/morphe-patches"],
  "changelogs": ["https://github.com/MorpheApp/morphe-patches/releases/latest"],
  "appliedPatches": [
    {
      "name": "Hide Ads",
      "description": "Removes video and banner advertisements."
    }
  ],
  "assets": [
    {
      "name": "youtube-morphe-v19.16.39-arm64-v8a.apk",
      "size": 134217728,
      "downloadCount": 4200,
      "downloadUrl": "https://github.com/nullcpy/rvb/releases/download/380576727/youtube-morphe-v19.16.39-arm64-v8a.apk",
      "arch": "arm64"
    }
  ]
}
```

---

## 3. Website Configuration (`script.js`)

All website settings, categories, and dynamic notices are configured directly in `CONFIG` at the top of [`script.js`](./script.js).

```javascript
const CONFIG = {
  owner: "nullcpy",
  repo: "rvb",
  knownArchs: [
    "arm64-v8a", "arm64", "aarch64",
    "armeabi-v7a", "arm-v7a", "arm32", "arm",
    "x86_64", "x86", "universal", "all"
  ],
  appCategories: {
    "Android TV": [
      "primevideo", "plutotv", "moviebox", "disneyplus", "disney",
      "hbomax", "tubi", "vix", "at4klauncher", "projectivylauncher",
      "peacock", "netflix", "nuvio"
    ],
    "Google": ["youtube", "google"],
    "Meta": ["threads", "instagram", "messenger", "facebook", "!plusmessenger"],
    "VPN": ["1111warp", "vpnify", "vpn"]
  },
  appNotices: [ ... ]
};
```

### App Categories Configuration
- **Category Names**: Keys in `CONFIG.appCategories` define the exact chip labels displayed on the site in clean Title Case (e.g. `"Android TV"`, `"Google"`, `"Meta"`, `"VPN"`).
- **Matching Rules**:
  - Matches against normalized app name, app key, and names with `+` converted to `plus`.
  - Prefix with `!` to create an **exclusion filter** (e.g. `"!plusmessenger"` prevents Plus Messenger from being caught under the `"messenger"` rule).
  - No random or duplicate word chips: only the categories defined here are rendered.

### Dynamic App Notices Configuration
Notices display contextual alerts inside expanded app cards (e.g. MicroG requirements or login advisories).

Notices are styled **100% dynamically via CSS variables**—you never need to edit CSS when adding or tweaking notices.

```javascript
appNotices: [
  {
    triggers: ["youtube", "google"],
    color: "accent", // Uses theme accent green with glowing gradient
    title: "Login Issue",
    text: "Signing into Google account on APK (not Module) requires MicroG.",
    links: [
      { label: "Morphe", url: "https://github.com/MorpheApp/MicroG-RE/releases/latest" },
      { label: "ReVanced", url: "https://github.com/ReVanced/GmsCore/releases/latest" }
    ]
  },
  {
    triggers: ["twitter"],
    color: "warning", // Uses warning yellow with subtle warning gradient
    title: "Login Issue",
    text: "Since October 2025, Twitter has started checking device integrity during login.",
    links: [
      { label: "Workarounds", url: "https://t.me/pikopatches/1/59772" }
    ]
  },
  // Example with custom hex color:
  {
    triggers: ["spotify"],
    color: "#1db954", // Automatically derives border, text color, and 12% glow background!
    title: "Playback Notice",
    text: "Use recommended version.",
    links: []
  }
]
```

#### Notice Styling Options:
- **`color`**:
  - Presets: `"accent"`, `"info"`, `"warning"`, `"danger"`, `"error"`, `"success"`.
  - Custom Color: Any hex (`"#3b82f6"`), rgb, or CSS color string.
- **`border`** *(optional)*: Specific border override (e.g. `"1px solid red"`). Defaults to `color`.
- **`bg`** *(optional)*: Specific background override. If omitted with a hex `color`, a subtle `12%` alpha transparent glow gradient is generated automatically.

---

## 4. Obtainium Integration

NullStore provides native integration with [Obtainium](https://github.com/ImranR98/Obtainium):

- **Label Standard**: Uses square brackets for subvariants to prevent nested double parentheses:
  $$\text{Format: } \text{AppName} \text{ (Brand - Variant [SubVariant])}$$
  *Example*: `Prime Video (Morphe - Android TV [Clone])`
- **Asset Filtering**: Automatically derives regex matching the variant, subvariant, and channel (`includePrereleases` for beta).
- **One-Click URL**: Encodes configuration into `obtainium://app/{...}` link protocol for instant setup.

---

## 5. In-Memory Search Engine

Live search operates dynamically in memory without static corpus strings or bloated tokens:

1. **Exact match**: `0` (instant first result)
2. **Prefix match**: `1`
3. **App Name Word match**: `2` (exact word), `3` (word prefix)
4. **Substring match on App Name/Key**: `4`
5. **Brand Name match**: `5`
6. **Category Name / Keyword match**: `5`
7. **Variant & Sub-Variant match**: `6`
8. **Package Name match**: `7`

Unmatched apps return `Infinity` and are filtered out instantly.

---

## 6. Maintenance & CI Lifecycle

- **Publishing Builds**:
  - When `nullcpy/rvb` builds apps, [`.github/scripts/update_website_catalog.py`](https://github.com/nullcpy/rvb/blob/main/.github/scripts/update_website_catalog.py) clones this repository, inserts or deduplicates builds matching `build` + `variant` + `subVariant`, updates channel pointers, and pushes back to `main`.
- **Pruning Deleted Archives**:
  - When GitHub Actions runs cleanup, [`.github/scripts/cleanup_website_catalog.py`](https://github.com/nullcpy/rvb/blob/main/.github/scripts/cleanup_website_catalog.py) verifies surviving release assets on GitHub, prunes deleted builds, reconciles variant pointers to the next surviving build, and deletes empty apps/brands.
