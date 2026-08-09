/**
 * ==========================================
 * CONFIGURATION & CUSTOMIZATION
 * Edit these values to update the app catalog behavior, branding, and notices.
 * ==========================================
 */
const CONFIG = {
  owner: "nullcpy",
  repo: "rvb",
  cacheDuration: 5, // Cache duration in minutes

  // App Categories for the filter buttons
  appCategories: {
    google: ["youtube", "google"],
    meta: ["threads", "instagram", "messenger", "facebook", "!plusmessenger"],
    vpn: ["1111warp", "vpnify", "vpn"]
  },

  // Words ignored in the dynamic app filters (must be lowercase)
  sharedAppWordStoplist: new Set(["messenger", "document", "reader"]),

  // Known tokens indicating a patch name starts (must be lowercase)
  knownPatchTokens: new Set(["revanced", "morphe", "anddea", "rvx", "xposed", "instafel"]),

  // Known tokens indicating a variant (must be lowercase)
  variantKeywords: new Set([
    "exp",
    "nord",
    "mocha",
    "privacy",
    "materialu",
    "foss",
    "gplay",
    "piko",
    "adobo",
    "patcheddit",
    "paresh",
    "nightly",
    "androidtv",
    "alt",
    "clone"
  ]),

  // Known architectures (used for regex parsing)
  knownArchs: [
    "arm64-v8a",
    "arm64",
    "aarch64",
    "armeabi-v7a",
    "arm-v7a",
    "arm32",
    "x86_64",
    "x86",
    "universal",
    "all",
  ],

  // Brand name overrides (keys must be lowercase)
  brandOverrides: {
    youtube: "YouTube",
    revanced: "ReVanced",
    tiktok: "TikTok",
    soundcloud: "SoundCloud",
    xrecorder: "XRecorder",
    calcnote: "CalcNote",
    imdb: "IMDb",
    trakt: "trakt.TV",
    github: "GitHub",
    vpn: "VPN",
    rvx: "ReVanced Extended",
    anddea: "ReVanced Advanced",
    exp: "Experimental",
    macrodroid: "MacroDroid",
    ticktick: "TickTick",
    fing: "Fing - Network Tools",
    sdmaid: "SD Maid 2/SE",
    mocha: "Mocha Theme",
    nord: "Nord Theme",
    materialu: "Material You",
    photoshop: "Adobe Photoshop",
    lightroom: "Adobe Lightroom",
    xodo: "Xodo PDF Reader & Editor",
    hellochinese: "HelloChinese: Learn Chinese",
    gplay: "Google Play",
    foss: "FOSS",
    gboard: "Google Keyboard",
    wps: "WPS",
    rar: "RAR",
    adguard: "AdGuard",
    moonplus: "Moon+",
    eyecon: "Eyecon Caller ID & Spam Block",
    camscanner: "CamScanner",
    inshorts: "Inshorts - News in 60 words",
    warp: "1.1.1.1 + WARP",
    acalendar: "aCalendar",
    at4k: "AT4K",
    androidtv: "Android TV",
    disneyplus: "Disney+",
    hbomax: "HBO Max",
    vix: "ViX",
    komoot: "komoot - hike, bike & run",
    vpnify: "VPNify",
    snorelab: "SnoreLab",
    myfitnesspal: "MyFitnessPal",
    terabox: "TeraBox",
    plutotv: "PlutoTV",
    accuweather: "AccuWeather",
    pixiv: "pixiv",
    mxplayer: "MX Player",
    moviebox: "MovieBox",
    kinestop: "KineStop"
  },

  // Map app slugs to true Android Package IDs for Obtainium
  appIds: {
    "1111warp": "com.cloudflare.onedotonedotonedotone",
    acalendar: "org.withouthat.acalendar",
    adguard: "com.adguard.android",
    adobeacrobat: "com.adobe.reader",
    adobelightroom: "com.adobe.lrmobile",
    adobephotoshopmix: "com.adobe.photoshopmix",
    accuweather: "com.accuweather.android",
    alldocumentreader: "alldocumentsreader.docuemntviewer",
    at4klauncher: "com.overdevs.at4k",
    automate: "com.llamalab.automate",
    autosync: "com.ttxapps.autosync",
    batteryguru: "com.paget96.batteryguru",
    betamaniac: "it.mirko.beta",
    bravebrowser: "com.brave.browser",
    calcnote: "com.appumstudios.calcnote",
    caloriecounter: "com.fatsecret.android",
    camscanner: "com.intsig.camscanner",
    cricbuzz: "com.cricbuzz.android",
    cryptomator: "org.cryptomator",
    documentscanner: "com.cv.docscanner",
    duolingo: "com.duolingo",
    disneyplus: "com.disney.disneyplus",
    discord: "com.discord",
    eyeconcalleridspamblock: "com.eyecon.global",
    facebook: "com.facebook.katana",
    fingnetworktools: "com.overlook.android.fing",
    github: "com.github.android",
    goodreads: "com.goodreads",
    googlekeyboard: {
      default: "com.google.android.inputmethod.latin",
      clone: "dev.jason.com.google.android.inputmethod.latin"
    },
    googlenews: "com.google.android.apps.magazines",
    googlephotos: {
      revanced: "app.revanced.android.apps.photos",
      morphe: "app.morphe.android.apps.photos",
      default: "com.google.android.apps.photos",
    },
    googlerecorder: "com.google.android.apps.recorder",
    hbomax: "com.wbd.hbomax",
    hermit: "com.chimbori.hermitcrab",
    hellochineselearnchinese: "com.hellochinese",
    holavpn: "org.hola.play",
    iconpacker: "cn.ommiao.iconpacker",
    instagram: {
      default: "com.instagram.android",
      clone: "com.instafel.android"
    },
    inshot: "com.camerasideas.instashot",
    inshortsnewsin60words: "com.nis.app",
    imdb: "com.imdb.mobile",
    kinestop: "com.urbandroid.kinestop",
    komoothikebikerun: "de.komoot.android",
    luminawallpapers: "com.lumina.wallpapers",
    macrodroid: "com.arlosoft.macrodroid",
    medium: "com.medium.reader",
    merriamwebsterdictionary: "com.merriamwebster",
    messenger: "com.facebook.orca",
    microsoftlens: "com.microsoft.office.officelens",
    microsoftedge: "com.microsoft.emmx",
    moonreader: "com.flyersoft.moonreader",
    moneymanager: "com.realbyteapps.moneymanagerfree",
    moviebox: {
      default: "com.community.oneroom",
      androidtv: "com.community.mbox.tv"
    },
    mxplayer: "com.mxtech.videoplayer.pro",
    myfitnesspal: "com.myfitnesspal.android",
    niagaralauncher: "bitpit.launcher",
    ninjavpn: "app.ninjavpn.android",
    novalauncher: "com.teslacoilsw.launcher",
    pandora: "com.pandora.android",
    peacock: "com.peacocktv.peacockandroid",
    photomath: "com.microblink.photomath",
    pinterest: "com.pinterest",
    pixiv: "jp.pxv.android",
    plusmessenger: "org.telegram.plus",
    plutotv: { androidtv: "tv.pluto.android" },
    podcastaddict: "com.bambuna.podcastaddict",
    poweramp: "com.maxmpz.audioplayer",
    primevideo: {
      default: "com.amazon.avod.thirdpartyclient",
      androidtv: "com.amazon.amazonvideo.livingroom.mod"
    },
    protonmail: "ch.protonmail.android",
    protonvpn: "ch.protonvpn.android",
    projectivylauncher: "com.spocky.projengmenu",
    sdmaid2se: "eu.darken.sdmse",
    showly: "com.michaldrabik.showly2",
    smartlauncher6: "ginlemon.flowerfree",
    solidexplorer: "pl.solidexplorer2",
    soundcloud: "com.soundcloud.android",
    snorelab: "com.snorelab.app",
    speedtest: "org.zwanoo.android.speedtest",
    symfonium: "app.symfonik.music.player",
    telegram: {
      default: "org.telegram.messenger",
      foss: "org.telegram.messenger.web",
    },
    terabox: "com.dubox.drive",
    theweatherchannel: "com.weather.Weather",
    threads: "com.instagram.barcelona",
    ticktick: "com.ticktick.task",
    tiktok: "com.zhiliaoapp.musically",
    todoist: "com.todoist",
    trakttv: "tv.trakt.trakt",
    truecaller: "com.truecaller",
    tubi: "com.tubitv",
    tumblr: "com.tumblr",
    twitch: "tv.twitch.android.app",
    reddit: "com.reddit.frontpage",
    rumble: "com.rumble.battles",
    ventusky: "cz.ackee.ventusky",
    viber: "com.viber.voip",
    vix: "com.univision.prendetv",
    vpnify: "com.vpn.free.hotspot.secure.vpnify",
    rar: "com.rarlab.rar",
    wallcraft: "com.wallpaperscraft.wallpaper",
    waze: "com.waze",
    windscribevpn: "com.windscribe.vpn",
    wpsoffice: "cn.wps.moffice_eng",
    twitter: "com.twitter.android",
    xodopdfreadereditor: "com.xodo.pdf.reader",
    xrecorder: "videoeditor.videorecorder.screenrecorder",
    youtube: {
      revanced: "app.revanced.android.youtube",
      rvx: "app.rvx.android.youtube",
      anddea: "anddea.youtube",
      morphe: "app.morphe.android.youtube",
      default: "com.google.android.youtube",
    },
    youtubemusic: {
      revanced: "app.revanced.android.apps.youtube.music",
      rvx: "app.rvx.android.apps.youtube.music",
      anddea: "anddea.youtube.music",
      morphe: "app.morphe.android.apps.youtube.music",
      default: "com.google.android.apps.youtube.music",
    },
  },

  // App-specific notices to display on App Cards
  appNotices: [
    {
      triggers: ["youtube", "google"],
      className: "microg-note",
      title: "Login Issue",
      text: "Signing into Google account on APK (not Module) requires MicroG. Please install one from below before trying to sign in.",
      links: [
        { label: "Morphe", url: "https://github.com/MorpheApp/MicroG-RE/releases/latest" },
        { label: "ReVanced", url: "https://github.com/ReVanced/GmsCore/releases/latest" },
      ],
    },
    {
      triggers: ["twitter"],
      className: "twitter-login-note",
      title: "Login Issue",
      text: "Since October 2025, Twitter has started checking whether the app is modified or if phone integrity fails during login.",
      links: [
        { label: "Workarounds", url: "https://t.me/pikopatches/1/59772" },
      ],
    },
  ],
};

// State
let allReleases = [];
let cachedFullCatalog = [];
let searchTerm = "";
let channelFilter = "all"; // "all" | "stable" | "beta" | "module" | "tv"
let appCategoryFilter = "all"; // "all" | "google" | "meta" | "vpn" | "word-..."
let sortMode = "recent"; // "recent" | "popular" | "name"
let dynamicAppFilters = [];
let currentAppCatalog = [];
let activeModalAppKey = null;
let activeModalPatchKey = null;
let modalBuildFilter = "all";
let modalVariantFilter = "all";
let themeMode = "system";
let activeAppliedPatchesList = [];

// Progressive Render State
let currentVisibleCount = 0;
const RENDER_CHUNK_SIZE = 40;
const SHARED_APP_WORD_MIN_COUNT = 2;

// Caches for Memoization
const parseCache = new Map();
const tokenCache = new Map();

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  setupTheme();
  setupEventListeners();

  // Pre-fill state from URL params
  const urlParams = new URLSearchParams(window.location.search);
  const urlQuery = urlParams.get("q");
  if (urlQuery) {
    searchTerm = urlQuery.toLowerCase();
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
      searchInput.value = urlQuery;
      searchInput.closest(".search-input-wrap")?.classList.add("has-value");
    }
  }

  const urlChannel = urlParams.get("channel");
  if (urlChannel && ["all", "stable", "beta", "module", "tv"].includes(urlChannel)) {
    channelFilter = urlChannel;
    updateChannelFilterUI();
  }

  const urlSort = urlParams.get("sort");
  if (urlSort && ["recent", "popular", "name"].includes(urlSort)) {
    sortMode = urlSort;
    const sortSelect = document.getElementById("sortSelect");
    if (sortSelect) sortSelect.value = sortMode;
  }

  loadReleases();
});

// Theme Management
function setupTheme() {
  const savedTheme = localStorage.getItem("theme");
  themeMode = ["light", "dark", "system"].includes(savedTheme) ? savedTheme : "system";
  applyTheme(themeMode);

  const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
  mediaQuery.addEventListener("change", () => {
    if (themeMode === "system") applyTheme("system");
  });
}

function applyTheme(theme) {
  const isLight =
    theme === "light"
      ? true
      : theme === "dark"
        ? false
        : window.matchMedia("(prefers-color-scheme: light)").matches;

  document.body.classList.toggle("light-mode", isLight);
  const themeBtn = document.getElementById("themeBtn");
  if (themeBtn) {
    themeBtn.textContent = theme === "system" ? "🖥️" : theme === "light" ? "☀️" : "🌙";
    themeBtn.setAttribute("aria-label", `Theme mode: ${theme}`);
  }
}

// Event Listeners
function setupEventListeners() {
  let searchTimeout;

  // Theme Toggle Button
  const themeBtn = document.getElementById("themeBtn");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const nextTheme = themeMode === "system" ? "light" : themeMode === "light" ? "dark" : "system";
      themeMode = nextTheme;
      localStorage.setItem("theme", nextTheme);
      applyTheme(nextTheme);
    });
  }

  // Floating Action Menu
  const menuBtn = document.getElementById("menuBtn");
  const actionMenu = document.getElementById("actionMenu");
  if (menuBtn && actionMenu) {
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      actionMenu.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", actionMenu.classList.contains("open"));
    });

    document.addEventListener("click", (e) => {
      if (actionMenu.classList.contains("open") && !actionMenu.contains(e.target)) {
        actionMenu.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Search Input (Debounced)
  const searchInput = document.getElementById("searchInput");
  const searchWrap = searchInput?.closest(".search-input-wrap");
  const searchClearBtn = document.getElementById("searchClearBtn");

  const syncClearBtn = () => {
    if (searchWrap && searchInput) {
      searchWrap.classList.toggle("has-value", searchInput.value.length > 0);
    }
  };

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      syncClearBtn();
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        searchTerm = e.target.value.toLowerCase().trim();
        syncUrlParams();
        filterAndRenderReleases();
      }, 200);
    });

    searchInput.addEventListener("focus", (e) => {
      if (window.innerWidth <= 768) {
        const searchBox = e.target.closest(".search-box") || e.target;
        const y = searchBox.getBoundingClientRect().top + window.scrollY - 15;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    });
  }

  if (searchClearBtn && searchInput) {
    searchClearBtn.addEventListener("click", () => {
      searchInput.value = "";
      searchTerm = "";
      syncClearBtn();
      syncUrlParams();
      filterAndRenderReleases();
    });
  }

  // Primary Channel Filter Bar
  const channelFilterBar = document.getElementById("channelFilterBar");
  if (channelFilterBar) {
    channelFilterBar.addEventListener("click", (e) => {
      const btn = e.target.closest(".channel-btn");
      if (!btn) return;
      channelFilter = btn.dataset.channel || "all";
      updateChannelFilterUI();
      syncUrlParams();
      filterAndRenderReleases();
    });
  }

  // Secondary Category Filter Buttons
  const appFilterButtons = document.getElementById("appFilterButtons");
  if (appFilterButtons) {
    appFilterButtons.addEventListener("click", (e) => {
      const filterBtn = e.target.closest(".filter-btn");
      if (!filterBtn) return;
      appCategoryFilter = filterBtn.dataset.filter || "all";
      filterAndRenderReleases();
    });
  }

  // Sort Selector
  const sortSelect = document.getElementById("sortSelect");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      sortMode = e.target.value;
      syncUrlParams();
      filterAndRenderReleases();
    });
  }

  // App Cards & Modal Delegate Click
  const buildsContainer = document.getElementById("builds");
  if (buildsContainer) {
    buildsContainer.addEventListener("click", (e) => {
      // Toggle card details
      const collapsedCard = e.target.closest(".app-card:not([open])");
      if (collapsedCard && !e.target.closest(".app-card-summary")) {
        collapsedCard.open = true;
        return;
      }

      // Applied Patches Button click
      const appliedTrigger = e.target.closest(".patch-applied-btn");
      if (appliedTrigger) {
        e.stopPropagation();
        openAppliedPatchesModal(
          appliedTrigger.dataset.appKey,
          appliedTrigger.dataset.patchKey,
          appliedTrigger.dataset.buildId
        );
        return;
      }

      // Channel Box Button click -> open download modal
      const trigger = e.target.closest(".channel-box-btn");
      if (trigger) {
        e.stopPropagation();
        openPatchModal(
          trigger.dataset.appKey,
          trigger.dataset.patchKey,
          trigger.dataset.channel || "all",
          trigger.dataset.variant || "all"
        );
      }
    });
  }

  // Downloads Modal Filter Delegate
  const patchModal = document.getElementById("patchModal");
  if (patchModal) {
    patchModal.addEventListener("click", (e) => {
      const filterBtn = e.target.closest(".modal-filter-btn");
      if (filterBtn && !filterBtn.disabled) {
        const filterType = filterBtn.dataset.filter;
        if (filterType.startsWith("variant-")) {
          modalVariantFilter = filterType.slice(8);
        } else {
          modalBuildFilter = filterType;
        }
        renderOpenPatchModal();
        return;
      }

      // Applied Patches button inside downloads modal
      const appliedTrigger = e.target.closest(".patch-applied-btn");
      if (appliedTrigger) {
        e.preventDefault();
        e.stopPropagation();
        openAppliedPatchesModal(
          appliedTrigger.dataset.appKey,
          appliedTrigger.dataset.patchKey,
          appliedTrigger.dataset.buildId
        );
        return;
      }

      if (e.target.id === "patchModal" || e.target.closest(".modal-close")) {
        closePatchModal();
      }
    });
  }

  // Applied Patches Modal
  const appliedPatchesModal = document.getElementById("appliedPatchesModal");
  const patchSearchInput = document.getElementById("patchSearchInput");
  if (appliedPatchesModal) {
    appliedPatchesModal.addEventListener("click", (e) => {
      if (e.target.id === "appliedPatchesModal" || e.target.closest(".modal-close")) {
        closeAppliedPatchesModal();
      }
    });
  }

  if (patchSearchInput) {
    patchSearchInput.addEventListener("input", (e) => {
      filterAppliedPatchesList(e.target.value);
    });
  }

  // Obtainium Modal
  const obtainiumBtn = document.getElementById("obtainiumBtn");
  const obtainiumModal = document.getElementById("obtainiumModal");
  if (obtainiumBtn) {
    obtainiumBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      openObtainiumModal();
    });
  }

  if (obtainiumModal) {
    obtainiumModal.addEventListener("click", (e) => {
      if (e.target.id === "obtainiumModal" || e.target.closest(".modal-close")) {
        closeObtainiumModal();
      }
    });
  }

  // Global ESC key listener
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closePatchModal();
      closeAppliedPatchesModal();
      closeObtainiumModal();
    }
  });

  // Infinite Scroll Observer
  const sentinel = document.createElement("div");
  sentinel.id = "scroll-sentinel";
  sentinel.style.height = "1px";
  if (buildsContainer) buildsContainer.after(sentinel);

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        renderNextChunk();
      }
    },
    { rootMargin: "400px" },
  );
  observer.observe(sentinel);
}

function updateChannelFilterUI() {
  document.querySelectorAll("#channelFilterBar .channel-btn").forEach((btn) => {
    const isActive = btn.dataset.channel === channelFilter;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-selected", isActive ? "true" : "false");
  });
}

function syncUrlParams() {
  const url = new URL(window.location);
  if (searchTerm) url.searchParams.set("q", searchTerm);
  else url.searchParams.delete("q");

  if (channelFilter !== "all") url.searchParams.set("channel", channelFilter);
  else url.searchParams.delete("channel");

  if (sortMode !== "recent") url.searchParams.set("sort", sortMode);
  else url.searchParams.delete("sort");

  history.replaceState(null, "", url);
}

// Releases Loader
async function loadReleases() {
  try {
    setPillState("checking", "Checking for updates...");

    const cached = getCachedReleases();
    if (cached) {
      allReleases = cached;
      document.getElementById("loading").style.display = "none";
      document.getElementById("error").style.display = "none";
      rebuildCatalogCache();
      updateLastUpdateTimestamp();
      filterAndRenderReleases();
      return;
    }

    document.getElementById("loading").style.display = "block";
    document.getElementById("error").style.display = "none";

    const cacheBuster = Date.now();
    let fetchedData = null;
    let useFallback = true;

    try {
      const response = await fetch(`releases.json?v=${cacheBuster}`);
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          fetchedData = data;
          useFallback = false;
        }
      }
    } catch (e) {
      console.warn("Network error fetching releases.json, using fallback...", e);
    }

    if (useFallback) {
      const response = await fetch(
        `https://api.github.com/repos/${CONFIG.owner}/${CONFIG.repo}/releases`,
        { headers: { Accept: "application/vnd.github.v3+json" } }
      );
      if (!response.ok) throw new Error(`Failed to fetch data: ${response.status}`);
      fetchedData = await response.json();
    }

    allReleases = fetchedData;
    cacheReleases(allReleases);
    rebuildCatalogCache();

    document.getElementById("loading").style.display = "none";
    updateLastUpdateTimestamp();
    filterAndRenderReleases();
  } catch (error) {
    console.error("Error loading releases:", error);
    setPillState("error", "Failed to check updates");
    document.getElementById("loading").style.display = "none";
    const errorEl = document.getElementById("error");
    if (errorEl) {
      errorEl.style.display = "block";
      errorEl.textContent = `Failed to load releases: ${error.message}`;
    }
  }
}

// LocalStorage Caching
function getCachedReleases() {
  const cached = localStorage.getItem("releases_cache");
  const timestamp = localStorage.getItem("releases_cache_time");
  if (!cached || !timestamp) return null;

  const age = (Date.now() - parseInt(timestamp, 10)) / (1000 * 60);
  if (age > CONFIG.cacheDuration) {
    localStorage.removeItem("releases_cache");
    localStorage.removeItem("releases_cache_time");
    return null;
  }
  return JSON.parse(cached);
}

function cacheReleases(releases) {
  try {
    localStorage.setItem("releases_cache", JSON.stringify(releases));
    localStorage.setItem("releases_cache_time", Date.now().toString());
  } catch (e) {
    console.warn("Could not cache releases to localStorage", e);
  }
}

// Build Catalog Cache
function rebuildCatalogCache() {
  cachedFullCatalog = buildAppCatalog(allReleases.filter((r) => !r.draft));
  dynamicAppFilters = getDynamicAppFilters(cachedFullCatalog);
}

// Multi-Channel Variant Catalog Builder
function buildAppCatalog(releases) {
  const sortedReleases = [...releases].sort(
    (a, b) => new Date(b.published_at) - new Date(a.published_at),
  );

  const appMap = new Map();

  sortedReleases.forEach((release) => {
    const isArchive = release.tag_name === "stable" || release.tag_name === "beta";
    let releaseType = release.prerelease ? "beta" : "stable";
    if (release.tag_name === "stable") releaseType = "stable";
    if (release.tag_name === "beta") releaseType = "beta";

    // Extract any patch changelogs or metadata from the release body
    const patchMetaFromRelease = extractPatchInfoFromRelease(release);

    (release.assets || []).forEach((asset) => {
      const arch = detectArchitecture(asset.name);
      const fileType = getFileType(asset.name);
      const parsed = parseAssetDisplay(asset.name, arch, fileType);

      const appKey = normalizeForSearch(parsed.appName);
      if (!appKey) return;

      if (!appMap.has(appKey)) {
        appMap.set(appKey, {
          appKey,
          appName: parsed.appName,
          latestStable: null,
          latestBeta: null,
          hasModules: false,
          hasTv: false,
          patches: new Map(),
        });
      }

      const appEntry = appMap.get(appKey);
      if (fileType === "Module") appEntry.hasModules = true;
      if (parsed.variant && parsed.variant.toLowerCase().includes("android tv")) appEntry.hasTv = true;

      setLatestBuildMeta(appEntry, releaseType, release);

      const patchKey = normalizeForSearch(parsed.patchName) || "patchedbuild";
      if (!appEntry.patches.has(patchKey)) {
        appEntry.patches.set(patchKey, {
          patchKey,
          patchName: parsed.patchName,
          latestVersion: null,
          latestPublishedAt: 0,
          variants: new Map(), // variantKey -> variantEntry
          builds: new Map(),
        });
      }

      const patchEntry = appEntry.patches.get(patchKey);
      const variantKey = parsed.variant ? normalizeForSearch(parsed.variant) : "default";
      const variantName = parsed.variant ? parsed.variant : "Standard";

      if (!patchEntry.variants.has(variantKey)) {
        patchEntry.variants.set(variantKey, {
          variantKey,
          variantName,
          latestStable: null,
          latestBeta: null,
          latestArchiveStable: null,
          latestArchiveBeta: null,
        });
      }

      const variantEntry = patchEntry.variants.get(variantKey);
      const buildLabel = getBuildNumberLabel(release);
      const buildDateString = isArchive
        ? asset.updated_at || asset.created_at || release.published_at
        : release.published_at;
      const buildDateMs = new Date(buildDateString).getTime();

      // Track timestamps and versions
      if (!isArchive) {
        const patchDate = new Date(patchEntry.latestPublishedAt).getTime();
        if (buildDateMs > patchDate) {
          patchEntry.latestVersion = parsed.version;
          patchEntry.latestPublishedAt = buildDateString;
        }

        const channelKey = releaseType === "beta" ? "latestBeta" : "latestStable";
        const currentMeta = variantEntry[channelKey];
        const currentMetaTime = currentMeta ? new Date(currentMeta.publishedAt).getTime() : 0;
        if (!currentMeta || buildDateMs > currentMetaTime) {
          variantEntry[channelKey] = {
            version: parsed.version,
            build: buildLabel,
            publishedAt: buildDateString,
            releaseId: release.id,
            releaseUrl: release.html_url,
          };
        }
      } else {
        // Track archive fallbacks for legacy or non-active builds
        const channelKey = releaseType === "beta" ? "latestArchiveBeta" : "latestArchiveStable";
        const currentMeta = variantEntry[channelKey];
        const currentMetaTime = currentMeta ? new Date(currentMeta.publishedAt).getTime() : 0;
        if (!currentMeta || buildDateMs > currentMetaTime) {
          variantEntry[channelKey] = {
            version: parsed.version,
            build: buildLabel,
            publishedAt: buildDateString,
            releaseId: release.id,
            releaseUrl: release.html_url,
            isArchiveFallback: true,
          };
        }
      }

      // Check for structured build data from builder (e.g. build.json)
      let buildDataApplied = null;
      let buildDataPatches = null;
      let buildDataChangelog = null;

      if (release.build_data) {
        const appKeyLower = appKey.toLowerCase();
        const bd = release.build_data[appKeyLower] || 
                   release.build_data[parsed.appName.toLowerCase()] || 
                   release.build_data[parsed.appName] ||
                   release.build_data[parsed.appName.toLowerCase().replace(/\s+/g, "-")];
        if (bd) {
          buildDataApplied = bd.applied_patches || null;
          buildDataPatches = bd.patches || null;
          buildDataChangelog = bd.changlog || null;
        }
      }

      // Group into builds
      const buildKey = isArchive
        ? `archive-${releaseType}-${parsed.version}`
        : String(release.id);

      if (!patchEntry.builds.has(buildKey)) {
        patchEntry.builds.set(buildKey, {
          releaseId: release.id,
          build: isArchive ? parsed.version : getBuildNumberLabel(release),
          releaseType,
          isArchive,
          publishedAt: isArchive
            ? asset.updated_at || asset.created_at || release.published_at
            : release.published_at,
          releaseUrl: release.html_url,
          version: parsed.version,
          patchMeta: {
            ...patchMetaFromRelease,
            patches: buildDataPatches ? [buildDataPatches] : patchMetaFromRelease.patches,
            changelogs: buildDataChangelog ? [buildDataChangelog] : patchMetaFromRelease.changelogs,
          },
          appliedPatches: buildDataApplied,
          assets: [],
        });
      }

      const buildEntry = patchEntry.builds.get(buildKey);
      const exists = buildEntry.assets.some((existing) => existing.name === asset.name);
      if (!exists) {
        buildEntry.assets.push({
          ...asset,
          parsed,
          arch,
          fileType,
        });
      }
    });
  });

  return Array.from(appMap.values())
    .map((app) => {
      // Resolve archive fallbacks if no active build exists
      app.patches.forEach((patch) => {
        patch.variants.forEach((variant) => {
          if (!variant.latestStable && variant.latestArchiveStable) {
            variant.latestStable = variant.latestArchiveStable;
          }
          if (!variant.latestBeta && variant.latestArchiveBeta) {
            variant.latestBeta = variant.latestArchiveBeta;
          }
        });
      });

      return {
        ...app,
        patches: Array.from(app.patches.values())
          .sort((a, b) => new Date(b.latestPublishedAt) - new Date(a.latestPublishedAt))
          .map((patch) => ({
            ...patch,
            variants: Array.from(patch.variants.values()).sort((a, b) => {
              if (a.variantKey === "default") return -1;
              if (b.variantKey === "default") return 1;
              return a.variantName.localeCompare(b.variantName);
            }),
            builds: Array.from(patch.builds.values()).sort((a, b) => {
              if (a.isArchive && !b.isArchive) return 1;
              if (!a.isArchive && b.isArchive) return -1;
              if (a.isArchive && b.isArchive) {
                const comp = b.version.localeCompare(a.version, undefined, { numeric: true, sensitivity: "base" });
                if (comp !== 0) return comp;
              }
              return new Date(b.publishedAt) - new Date(a.publishedAt);
            }),
          })),
      };
    })
    .filter((app) => app.patches.length > 0)
    .sort((a, b) => a.appName.localeCompare(b.appName));
}

// Extract patch info helper
function extractPatchInfoFromRelease(release) {
  const body = release.body || "";
  const cliMatch = body.match(/CLI:\s*([^\s\n\r]+)/i);
  const patchMatches = Array.from(body.matchAll(/Patches:\s*([^\s\n\r]+)/gi));
  const changelogMatches = Array.from(body.matchAll(/\[Changelog\]\((https?:\/\/[^\s\)]+)\)/gi));

  return {
    cli: cliMatch ? cliMatch[1] : null,
    patches: patchMatches.map((m) => m[1]),
    changelogs: changelogMatches.map((m) => m[1]),
  };
}

// Filter and Render Catalog
function filterAndRenderReleases() {
  renderDynamicAppFilterButtons(dynamicAppFilters);

  if (
    appCategoryFilter.startsWith("word-") &&
    !dynamicAppFilters.some((f) => f.key === appCategoryFilter)
  ) {
    appCategoryFilter = "all";
  }

  // 1. Search Query Filter
  let apps = filterCatalogBySearch(cachedFullCatalog, searchTerm);

  // 2. Channel & Format Quick Filter
  if (channelFilter === "stable") {
    apps = apps.filter((app) =>
      app.patches.some((p) => p.variants.some((v) => Boolean(v.latestStable)))
    );
  } else if (channelFilter === "beta") {
    apps = apps.filter((app) =>
      app.patches.some((p) => p.variants.some((v) => Boolean(v.latestBeta)))
    );
  } else if (channelFilter === "module") {
    apps = apps.filter((app) => app.hasModules);
  } else if (channelFilter === "tv") {
    apps = apps.filter((app) => app.hasTv);
  }

  // 3. Category Filter
  apps = applyCategoryFilter(apps);

  // 4. Sort Mode
  apps = applySortMode(apps);

  // 5. Update Status Text
  updateCatalogStatus(apps);

  // 6. Render
  renderAppCards(apps);
  updateAppFilterButtons();
  document.getElementById("loading").style.display = "none";
}

function updateCatalogStatus(apps) {
  const countEl = document.getElementById("catalogCountText");
  if (!countEl) return;
  const totalApps = apps.length;
  let totalBuilds = 0;
  apps.forEach((a) => {
    a.patches.forEach((p) => {
      totalBuilds += p.builds.length;
    });
  });

  countEl.textContent = `Showing ${totalApps} app${totalApps === 1 ? "" : "s"} (${totalBuilds} build${totalBuilds === 1 ? "" : "s"})`;
}

function updateAppFilterButtons() {
  document.querySelectorAll("#appFilterButtons .filter-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.filter === appCategoryFilter);
  });
}

function applyCategoryFilter(apps) {
  if (CONFIG.appCategories[appCategoryFilter]) {
    return apps.filter((app) => {
      const name = normalizeForSearch(app.appName);
      const keywords = CONFIG.appCategories[appCategoryFilter];
      const includes = keywords.filter((k) => !k.startsWith("!"));
      const excludes = keywords.filter((k) => k.startsWith("!")).map((k) => k.slice(1));
      const isIncluded = includes.some((keyword) => name.includes(keyword));
      const isExcluded = excludes.some((keyword) => name.includes(keyword));
      return isIncluded && !isExcluded;
    });
  }

  if (appCategoryFilter.startsWith("word-")) {
    const word = appCategoryFilter.slice(5);
    return apps.filter((app) => getAppNameWords(app.appName).includes(word));
  }

  return apps;
}

function applySortMode(apps) {
  if (sortMode === "popular") {
    return [...apps].sort((a, b) => getAppTotalDownloads(b) - getAppTotalDownloads(a));
  }
  if (sortMode === "name") {
    return [...apps].sort((a, b) => a.appName.localeCompare(b.appName));
  }
  // Default: recent
  return [...apps].sort((a, b) => getAppLatestPublishedAt(b) - getAppLatestPublishedAt(a));
}

function getAppLatestPublishedAt(app) {
  return app.patches.reduce((latest, patch) => {
    const patchTime = new Date(patch.latestPublishedAt).getTime();
    return Number.isNaN(patchTime) ? latest : Math.max(latest, patchTime);
  }, 0);
}

function getAppTotalDownloads(app) {
  let total = 0;
  (app.patches || []).forEach((patch) => {
    (patch.builds || []).forEach((build) => {
      (build.assets || []).forEach((asset) => {
        total += asset.download_count || 0;
      });
    });
  });
  return total;
}

function filterCatalogBySearch(catalog, query) {
  if (!query) return catalog;
  return catalog
    .map((app) => ({
      app,
      score: getAppSearchScore(app, query),
    }))
    .filter((item) => item.score !== Infinity)
    .sort((a, b) => a.score - b.score || a.app.appName.localeCompare(b.app.appName))
    .map((item) => item.app);
}

function getAppSearchScore(app, query) {
  const normalizedQuery = normalizeForSearch(query);
  const normalizedAppName = normalizeForSearch(app.appName);
  if (!normalizedQuery || !normalizedAppName) return Infinity;

  if (normalizedAppName === normalizedQuery) return 0;
  if (normalizedAppName.startsWith(normalizedQuery)) return 1;

  const appTokens = getSearchTokens(app.appName);
  if (appTokens.some((token) => token === normalizedQuery)) return 2;
  if (appTokens.some((token) => token.startsWith(normalizedQuery))) return 3;
  if (normalizedAppName.includes(normalizedQuery)) return 4;

  // Search inside patches and variants
  for (const patch of app.patches) {
    if (normalizeForSearch(patch.patchName).includes(normalizedQuery)) return 5;
    for (const variant of patch.variants) {
      if (normalizeForSearch(variant.variantName).includes(normalizedQuery)) return 5;
      if (variant.latestStable && normalizeForSearch(variant.latestStable.version).includes(normalizedQuery)) return 6;
      if (variant.latestBeta && normalizeForSearch(variant.latestBeta.version).includes(normalizedQuery)) return 6;
    }
  }

  return Infinity;
}

// Progressive Rendering for App Cards
function renderAppCards(apps) {
  const buildsContainer = document.getElementById("builds");
  if (!buildsContainer) return;
  currentAppCatalog = apps;
  currentVisibleCount = 0;
  buildsContainer.innerHTML = "";

  if (apps.length === 0) {
    buildsContainer.innerHTML = '<div class="no-results">No applications found matching your criteria.</div>';
    return;
  }

  renderNextChunk();
}

function renderNextChunk() {
  const buildsContainer = document.getElementById("builds");
  if (!buildsContainer) return;

  const nextChunk = currentAppCatalog.slice(
    currentVisibleCount,
    currentVisibleCount + RENDER_CHUNK_SIZE,
  );

  if (nextChunk.length === 0) return;

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = nextChunk.map((app) => createAppCard(app)).join("");

  while (tempDiv.firstChild) {
    buildsContainer.appendChild(tempDiv.firstChild);
  }

  currentVisibleCount += RENDER_CHUNK_SIZE;
}

// Create App Card Markup
function createAppCard(app) {
  const patchesMarkup = app.patches
    .map((patch) => createPatchMarkup(app, patch))
    .join("");

  let noticesMarkup = "";
  CONFIG.appNotices.forEach((notice) => {
    const matches = notice.triggers.some((trigger) =>
      normalizeForSearch(app.appName).includes(trigger),
    );
    if (matches) {
      noticesMarkup += createNoticeMarkup(notice);
    }
  });

  const totalDownloads = getAppTotalDownloads(app);
  const dlBadge =
    totalDownloads > 0
      ? `<span class="patch-stat-badge" title="${formatCompactNumber(totalDownloads)} Total Downloads">📥 ${formatCompactNumber(totalDownloads)}</span>`
      : "";

  return `
    <details class="build-card app-card">
      <summary class="app-card-summary">
        <div class="app-title-group">
          <div class="app-name">${escapeHtml(app.appName)}</div>
        </div>
        <div class="app-badge-group">
          <span class="patch-count-badge">${app.patches.length} engine${app.patches.length > 1 ? "s" : ""}</span>
          ${dlBadge}
          <svg class="app-card-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </summary>
      <div class="app-card-body">
        ${noticesMarkup}
        <div class="patches-list">
          ${patchesMarkup}
        </div>
      </div>
    </details>
  `;
}

function createNoticeMarkup(notice) {
  const linksMarkup = notice.links
    .map((link) => `<a href="${link.url}" target="_blank" rel="noopener noreferrer">${escapeHtml(link.label)} ↗</a>`)
    .join(" ");

  return `
    <div class="app-notice ${escapeHtml(notice.className)}">
      <div class="app-notice-title">${escapeHtml(notice.title)}</div>
      <div class="app-notice-text">${escapeHtml(notice.text)}</div>
      <div class="app-notice-links">${linksMarkup}</div>
    </div>
  `;
}

// Create Patch Entry Markup with Multi-Channel Variant Matrix
function createPatchMarkup(app, patch) {
  const buildCount = patch.builds.length;
  const buildIconBadge = `<span class="patch-stat-badge" title="${buildCount} total builds">📦 ${buildCount}</span>`;
  const downloadCount = patch.totalDownloads || 0;
  const downloadIconBadge = `<span class="patch-stat-badge" title="${downloadCount.toLocaleString()} total downloads">📥 ${formatCompactNumber(downloadCount)}</span>`;

  // Render variant rows
  const variantRowsHtml = patch.variants
    .map((variant) => {
      const channelBoxes = [];

      if (variant.latestStable) {
        channelBoxes.push(`
          <button class="channel-box-btn stable" 
                  data-app-key="${app.appKey}" 
                  data-patch-key="${patch.patchKey}" 
                  data-channel="stable" 
                  data-variant="${variant.variantKey}"
                  type="button"
                  title="Open Stable builds for ${escapeHtml(variant.variantName)}">
            <div class="channel-box-top">
              <span class="channel-tag stable">Stable</span>
              <span class="channel-date">${formatDate(variant.latestStable.publishedAt)}</span>
            </div>
            <span class="channel-version">${escapeHtml(variant.latestStable.version)}</span>
            <span class="channel-build-num">${variant.latestStable.isArchiveFallback ? "Archive" : `Build ${escapeHtml(variant.latestStable.build)}`}</span>
          </button>
        `);
      }

      if (variant.latestBeta) {
        channelBoxes.push(`
          <button class="channel-box-btn beta" 
                  data-app-key="${app.appKey}" 
                  data-patch-key="${patch.patchKey}" 
                  data-channel="beta" 
                  data-variant="${variant.variantKey}"
                  type="button"
                  title="Open Beta builds for ${escapeHtml(variant.variantName)}">
            <div class="channel-box-top">
              <span class="channel-tag beta">Beta</span>
              <span class="channel-date">${formatDate(variant.latestBeta.publishedAt)}</span>
            </div>
            <span class="channel-version">${escapeHtml(variant.latestBeta.version)}</span>
            <span class="channel-build-num">${variant.latestBeta.isArchiveFallback ? "Archive" : `Build ${escapeHtml(variant.latestBeta.build)}`}</span>
          </button>
        `);
      }

      if (channelBoxes.length === 0) {
        channelBoxes.push(`
          <button class="channel-box-btn archive" 
                  data-app-key="${app.appKey}" 
                  data-patch-key="${patch.patchKey}" 
                  data-channel="all" 
                  data-variant="${variant.variantKey}"
                  type="button">
            <div class="channel-box-top">
              <span class="channel-tag archive">Builds</span>
            </div>
            <span class="channel-version">View all</span>
          </button>
        `);
      }

      return `
        <div class="variant-row">
          <div class="variant-title-wrap">
            <span class="variant-name-chip">${escapeHtml(variant.variantName)}</span>
          </div>
          <div class="variant-channels-grid">
            ${channelBoxes.join("")}
          </div>
        </div>
      `;
    })
    .join("");

  return `
    <div class="patch-entry">
      <div class="patch-entry-header">
        <div class="patch-chip-group">
          <span class="patch-engine-badge">${escapeHtml(patch.patchName)}</span>
          ${buildIconBadge}
          ${downloadIconBadge}
        </div>
      </div>
      <div class="variant-matrix">
        ${variantRowsHtml}
      </div>
    </div>
  `;
}

// Dynamic Filter Buttons Generator
function getDynamicAppFilters(apps) {
  const wordToAppKeys = new Map();

  apps.forEach((app) => {
    const words = getAppNameWords(app.appName);
    words.forEach((word) => {
      if (!wordToAppKeys.has(word)) wordToAppKeys.set(word, new Set());
      wordToAppKeys.get(word).add(app.appKey);
    });
  });

  const categoryKeys = new Set(Object.keys(CONFIG.appCategories));
  const dynamicFilters = Array.from(wordToAppKeys.entries())
    .filter(([word, appKeys]) => appKeys.size >= SHARED_APP_WORD_MIN_COUNT && !categoryKeys.has(word))
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([word]) => ({
      key: `word-${word}`,
      label: toFilterLabel(word),
    }));

  const categoryFilters = Object.keys(CONFIG.appCategories).map((key) => ({
    key: key,
    label: toFilterLabel(key),
  }));

  return [...categoryFilters, ...dynamicFilters];
}

function renderDynamicAppFilterButtons(filters) {
  const filterButtons = document.getElementById("appFilterButtons");
  if (!filterButtons) return;

  filterButtons.querySelectorAll(".dynamic-filter-btn").forEach((btn) => btn.remove());

  filters.forEach((filter) => {
    const button = document.createElement("button");
    button.className = "filter-btn dynamic-filter-btn";
    button.dataset.filter = filter.key;
    button.type = "button";
    button.textContent = filter.label;
    filterButtons.appendChild(button);
  });
}

function getAppNameWords(appName) {
  const words = (appName || "")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean)
    .filter((word) => word.length >= 3)
    .filter((word) => !CONFIG.sharedAppWordStoplist.has(word));

  return Array.from(new Set(words));
}

function toFilterLabel(value) {
  const lower = (value || "").toLowerCase();
  if (CONFIG.brandOverrides[lower]) return CONFIG.brandOverrides[lower];
  return value.replace(/\b[a-z]/g, (char) => char.toUpperCase());
}

// Download Modal Controller
function openPatchModal(appKey, patchKey, preferredChannel = "stable", preferredVariant = "default") {
  activeModalAppKey = appKey;
  activeModalPatchKey = patchKey;
  
  const app = currentAppCatalog.find((item) => item.appKey === activeModalAppKey);
  const patch = app ? app.patches.find((item) => item.patchKey === activeModalPatchKey) : null;

  modalBuildFilter = preferredChannel === "beta" ? "beta" : "stable";

  if (patch && patch.variants && patch.variants.length > 0) {
    const validVariant = patch.variants.find((v) => v.variantKey === preferredVariant);
    modalVariantFilter = validVariant ? validVariant.variantKey : patch.variants[0].variantKey;
  } else {
    modalVariantFilter = "default";
  }

  renderOpenPatchModal();

  const modal = document.getElementById("patchModal");
  if (modal) {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  }
}

function renderOpenPatchModal() {
  const app = currentAppCatalog.find((item) => item.appKey === activeModalAppKey);
  const patch = app ? app.patches.find((item) => item.patchKey === activeModalPatchKey) : null;

  if (!app || !patch) {
    closePatchModal();
    return;
  }

  const modalTitle = document.getElementById("patchModalTitle");
  if (modalTitle) {
    modalTitle.textContent = `${app.appName} • ${patch.patchName}`;
  }

  updateModalFilterButtons(patch);

  const modalBody = document.getElementById("patchModalBody");
  if (modalBody) {
    modalBody.innerHTML = createPatchModalContent(app, patch, modalBuildFilter, modalVariantFilter);
  }
}

function updateModalFilterButtons(patch) {
  const filterContainer = document.querySelector(".modal-filter-buttons");
  if (!filterContainer) return;

  filterContainer.innerHTML = "";

  // Channel group (Stable / Beta)
  const channelGroup = document.createElement("div");
  channelGroup.className = "filter-pill-group";
  channelGroup.innerHTML = `
    <button class="modal-filter-btn ${modalBuildFilter === "stable" ? "active" : ""}" data-filter="stable" type="button">Stable</button>
    <button class="modal-filter-btn ${modalBuildFilter === "beta" ? "active" : ""}" data-filter="beta" type="button">Beta</button>
  `;
  filterContainer.appendChild(channelGroup);

  // Variant group with divider
  if (patch.variants && patch.variants.length > 0) {
    const divider = document.createElement("span");
    divider.className = "filter-group-divider";
    filterContainer.appendChild(divider);

    const variantGroup = document.createElement("div");
    variantGroup.className = "filter-pill-group";

    patch.variants.forEach((v) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `modal-filter-btn variant-pill-btn ${modalVariantFilter === v.variantKey ? "active" : ""}`;
      btn.dataset.filter = `variant-${v.variantKey}`;
      btn.textContent = v.variantName;
      variantGroup.appendChild(btn);
    });

    filterContainer.appendChild(variantGroup);
  }
}

function createPatchModalContent(app, patch, buildFilter = "stable", variantFilter = "default") {
  let builds = patch.builds || [];

  // Filter builds by channel
  if (buildFilter === "stable") {
    builds = builds.filter((b) => b.releaseType === "stable");
  } else if (buildFilter === "beta") {
    builds = builds.filter((b) => b.releaseType === "beta");
  }

  // Filter builds by variant
  if (variantFilter && variantFilter !== "all") {
    builds = builds
      .map((b) => ({
        ...b,
        assets: b.assets.filter((a) => {
          const vKey = a.parsed.variant ? normalizeForSearch(a.parsed.variant) : "default";
          return vKey === variantFilter;
        }),
      }))
      .filter((b) => b.assets.length > 0);
  }

  if (builds.length === 0) {
    return '<div class="no-results" style="padding: 40px 20px;">No builds matching this channel and variant.</div>';
  }

  return builds
    .map((build, index) => createModalBuildMarkup(app, patch, build, index === 0))
    .join("");
}

function createModalBuildMarkup(app, patch, build, openByDefault = false) {
  const assetsByArch = groupAssetsByArchitecture(build.assets);
  const titleText = build.isArchive ? escapeHtml(build.build) : `Build ${escapeHtml(build.build)}`;

  let downloadsMarkup = "";

  Object.entries(assetsByArch).forEach(([arch, assets]) => {
    if (assets.length === 0) return;
    downloadsMarkup += `<div class="asset-group"><div class="asset-group-label">${capitalizeArch(arch)}</div>`;

    assets.forEach((asset) => {
      const sizeStr = formatBytes(asset.size);
      const downloads = formatCompactNumber(asset.download_count || 0);

      downloadsMarkup += `
        <div class="download-btn ${arch}">
          <div class="asset-left">
            <span class="asset-title">${escapeHtml(asset.parsed.appName)}</span>
            <span class="asset-subtitle">${escapeHtml(asset.parsed.version)} • ${asset.fileType}</span>
          </div>
          <div class="asset-right">
            <span class="btn-text">${sizeStr} • 📥 ${downloads}</span>
            <a href="${asset.browser_download_url}" class="download-action-btn" download title="Download ${asset.name}">Download</a>
          </div>
        </div>
      `;
    });

    downloadsMarkup += `</div>`;
  });

  // Patch info banner
  const changelogLink = build.patchMeta && build.patchMeta.changelogs[0]
    ? `<a href="${build.patchMeta.changelogs[0]}" target="_blank" rel="noopener noreferrer" class="release-link" style="font-size: 0.8rem;">Changelog ↗</a>`
    : "";
  const patchNames = build.patchMeta && build.patchMeta.patches.length > 0
    ? build.patchMeta.patches.join(", ")
    : patch.patchName;

  const patchInfoBanner = `
    <div style="font-size: 0.82rem; color: var(--text-secondary); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; padding-bottom: 10px; border-bottom: 1px solid var(--border); margin-bottom: 12px;">
      <span><strong>Patch Source:</strong> ${escapeHtml(patchNames)}</span>
      <div style="display: flex; align-items: center; gap: 8px;">
        <button class="patch-applied-btn" data-app-key="${app.appKey}" data-patch-key="${patch.patchKey}" data-build-id="${build.releaseId}" type="button">
          🔍 Applied Patches
        </button>
        ${changelogLink}
      </div>
    </div>
  `;

  return `
    <details class="modal-build-card" ${openByDefault ? "open" : ""}>
      <summary class="modal-build-header">
        <div class="modal-build-header-left">
          <div class="modal-build-title">${titleText}</div>
          <div class="modal-build-date">${formatDate(build.publishedAt)} • ${escapeHtml(build.version)}</div>
        </div>
        <span class="badge-group">
          ${build.isArchive ? '<span class="release-badge archive">Archive</span>' : ""}
        </span>
      </summary>
      <div class="modal-build-downloads">
        ${patchInfoBanner}
        ${downloadsMarkup}
        <a href="${build.releaseUrl}" target="_blank" rel="noopener noreferrer" class="release-link">View source release on GitHub →</a>
      </div>
    </details>
  `;
}

function closePatchModal() {
  const modal = document.getElementById("patchModal");
  if (modal) {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    if (!document.getElementById("appliedPatchesModal")?.classList.contains("open") &&
        !document.getElementById("obtainiumModal")?.classList.contains("open")) {
      document.body.classList.remove("modal-open");
    }
  }
}

// Applied Patches Modal Controller
function openAppliedPatchesModal(appKey, patchKey, buildId) {
  const app = currentAppCatalog.find((item) => item.appKey === appKey);
  const patch = app ? app.patches.find((item) => item.patchKey === patchKey) : null;
  if (!app || !patch) return;

  const modalTitle = document.getElementById("appliedPatchesTitle");
  if (modalTitle) {
    modalTitle.textContent = `${app.appName} (${patch.patchName})`;
  }

  const metaEl = document.getElementById("appliedPatchesMeta");
  const build = patch.builds.find((b) => String(b.releaseId) === String(buildId)) || patch.builds[0];

  if (metaEl && build && build.patchMeta) {
    const pNames = build.patchMeta.patches.join(", ") || patch.patchName;
    const clUrl = build.patchMeta.changelogs[0] || null;
    metaEl.innerHTML = `
      <span class="patch-engine-badge">${escapeHtml(pNames)}</span>
      ${clUrl ? `<a href="${clUrl}" target="_blank" rel="noopener noreferrer" class="release-link" style="font-size: 0.82rem;">View Upstream Changelog ↗</a>` : ""}
    `;
  }

  // Load patches list (from build info or fallback template)
  activeAppliedPatchesList = build?.appliedPatches || [
    "SponsorBlock integration",
    "Return YouTube Dislike",
    "Hide Shorts & Reels",
    "AMOLED Pure Black Theme",
    "MicroG Support for Non-Root",
    "Custom Playback Speed Options",
    "Minimized Playback & Background Audio",
    "Remove In-Stream Ads",
    "Custom Player Branding & Icon",
    "Disable Forced Captions",
    "Hide Video Watermark & Endscreen",
    "Enable HDR & High Bitrate Controls"
  ];

  filterAppliedPatchesList("");

  const modal = document.getElementById("appliedPatchesModal");
  if (modal) {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    const searchInput = document.getElementById("patchSearchInput");
    if (searchInput) {
      searchInput.value = "";
      searchInput.focus();
    }
  }
}

function filterAppliedPatchesList(query) {
  const body = document.getElementById("appliedPatchesBody");
  const countBadge = document.getElementById("patchCountBadge");
  if (!body) return;

  const normalized = (query || "").toLowerCase().trim();
  const filtered = activeAppliedPatchesList.filter((p) =>
    p.toLowerCase().includes(normalized)
  );

  if (countBadge) {
    countBadge.textContent = `${filtered.length} of ${activeAppliedPatchesList.length} patches`;
  }

  if (filtered.length === 0) {
    body.innerHTML = '<div class="no-results" style="padding: 30px;">No matching patches found.</div>';
    return;
  }

  body.innerHTML = `
    <div class="applied-patches-grid">
      ${filtered.map((patchName) => `
        <div class="applied-patch-item">
          <span class="patch-check-icon">✓</span>
          <span>${escapeHtml(patchName)}</span>
        </div>
      `).join("")}
    </div>
  `;
}

function closeAppliedPatchesModal() {
  const modal = document.getElementById("appliedPatchesModal");
  if (modal) {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    if (!document.getElementById("patchModal")?.classList.contains("open") &&
        !document.getElementById("obtainiumModal")?.classList.contains("open")) {
      document.body.classList.remove("modal-open");
    }
  }
}

// Obtainium Modal Controller
function openObtainiumModal() {
  const app = currentAppCatalog.find((item) => item.appKey === activeModalAppKey);
  const patch = app ? app.patches.find((item) => item.patchKey === activeModalPatchKey) : null;
  if (!app || !patch) return;

  const modalTitle = document.getElementById("obtainiumTitle");
  if (modalTitle) modalTitle.textContent = `Install ${app.appName} with Obtainium`;

  const obtainiumBody = document.getElementById("obtainiumBody");
  if (obtainiumBody) {
    obtainiumBody.innerHTML = createObtainiumInstructions(app, patch);
  }

  const modal = document.getElementById("obtainiumModal");
  if (modal) {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  }
}

function createObtainiumInstructions(app, patch) {
  const repoUrl = `https://github.com/${CONFIG.owner}/${CONFIG.repo}`;
  const obtainiumLatestUrl = "https://github.com/ImranR98/Obtainium/releases/latest";

  const appNameNorm = normalizeForSearch(app?.appName || "app");
  const patchNameNorm = normalizeForSearch(patch?.patchName || "patch");

  // If a specific variant is selected (e.g. not "default" / "all")
  const isSpecificVariant = modalVariantFilter && modalVariantFilter !== "default" && modalVariantFilter !== "all";
  
  let regexPattern = `^${appNameNorm}-${patchNameNorm}.*\\.apk$`;
  if (isSpecificVariant) {
    regexPattern = `^${appNameNorm}-${patchNameNorm}-${modalVariantFilter}.*\\.apk$`;
  }

  // Build variant examples list if multiple variants exist
  let variantExamplesMarkup = "";
  if (patch && patch.variants && patch.variants.length > 1) {
    const examples = patch.variants.map((v) => {
      const vRegex = v.variantKey === "default"
        ? `^${appNameNorm}-${patchNameNorm}.*\\.apk$`
        : `^${appNameNorm}-${patchNameNorm}-${v.variantKey}.*\\.apk$`;
      return `
        <div style="margin-top: 8px;">
          <div style="font-size: 0.82rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 4px;">
            ${escapeHtml(app.appName)} (${escapeHtml(patch.patchName)} - ${escapeHtml(v.variantName)}):
          </div>
          <div class="instruction-code">
            <code>${escapeHtml(vRegex)}</code>
            <button class="copy-btn" onclick="copyToClipboard('${escapeHtml(vRegex)}', 'Regex copied!')" type="button">Copy</button>
          </div>
        </div>
      `;
    }).join("");

    variantExamplesMarkup = `
      <div style="margin-top: 12px;">
        <div style="font-size: 0.84rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">Variant Regular Expressions:</div>
        ${examples}
      </div>
    `;
  }

  return `
    <div class="obtainium-instructions">
      <ol>
        <li>Download and install Obtainium from <a href="${obtainiumLatestUrl}" target="_blank" rel="noopener noreferrer">GitHub</a>.</li>
        <li>Open Obtainium on your device.</li>
        <li>Tap <strong>Add App</strong>.</li>
        <li>In the <strong>App Source URL</strong> box, enter:
          <div class="instruction-code">
            <code>${repoUrl}</code>
            <button class="copy-btn" onclick="copyToClipboard('${repoUrl}', 'Repository URL copied!')" type="button">Copy</button>
          </div>
        </li>
        <li>Scroll down to <strong>Filter APKs by regular expression</strong> and enter:
          <div class="instruction-code">
            <code>${escapeHtml(regexPattern)}</code>
            <button class="copy-btn" onclick="copyToClipboard('${escapeHtml(regexPattern)}', 'Regex copied!')" type="button">Copy</button>
          </div>
          ${variantExamplesMarkup}
        </li>
        <li>Tap <strong>Add</strong> to begin downloading. In the future, Obtainium will automatically fetch updates when new releases are published.</li>
      </ol>
    </div>
  `;
}

function getAppPackageId(appSlug, patchSlug, variantSlug) {
  const mapping = CONFIG.appIds[appSlug];
  if (!mapping) return "";
  if (typeof mapping === "string") return mapping;
  if (mapping[patchSlug]) return mapping[patchSlug];
  if (mapping[variantSlug]) return mapping[variantSlug];
  return mapping.default || "";
}

function closeObtainiumModal() {
  const modal = document.getElementById("obtainiumModal");
  if (modal) {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    if (!document.getElementById("patchModal")?.classList.contains("open") &&
        !document.getElementById("appliedPatchesModal")?.classList.contains("open")) {
      document.body.classList.remove("modal-open");
    }
  }
}

// Clipboard & Toast Utilities
function copyToClipboard(text, successMessage = "Copied to clipboard!") {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMessage);
    }).catch(() => {
      fallbackCopyToClipboard(text, successMessage);
    });
  } else {
    fallbackCopyToClipboard(text, successMessage);
  }
}

function fallbackCopyToClipboard(text, successMessage) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand("copy");
    showToast(successMessage);
  } catch (err) {
    console.error("Fallback copy failed", err);
  }
  document.body.removeChild(textarea);
}

let toastTimer;
function showToast(message) {
  const toast = document.getElementById("toastNotification");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

// Architecture & Asset Helpers
function groupAssetsByArchitecture(assets) {
  const groups = { arm64: [], arm32: [], universal: [], x86: [], other: [] };
  assets.forEach((asset) => {
    const detectedArch = detectArchitecture(asset.name);
    groups[detectedArch].push(asset);
  });

  const filtered = {};
  ["arm64", "arm32", "universal", "x86", "other"].forEach((arch) => {
    if (groups[arch].length > 0) {
      groups[arch].sort((a, b) => {
        const aIsApk = a.name.toLowerCase().endsWith(".apk") ? 0 : 1;
        const bIsApk = b.name.toLowerCase().endsWith(".apk") ? 0 : 1;
        return aIsApk - bIsApk;
      });
      filtered[arch] = groups[arch];
    }
  });
  return filtered;
}

function getFileType(filename) {
  const lower = filename.toLowerCase();
  if (lower.endsWith(".apk")) return "APK";
  if (lower.endsWith(".zip")) return "Module";
  return "File";
}

function detectArchitecture(filename) {
  const name = (filename || "").toLowerCase();
  if (name.includes("arm64") || name.includes("aarch64") || name.includes("arm64-v8a")) return "arm64";
  if ((name.includes("arm") && !name.includes("arm64")) || name.includes("arm-v7a") || name.includes("armeabi")) return "arm32";
  if (name.includes("universal") || name.includes("-all.") || /^(?!.*arm|x86|x64|i386)[^-]*\.apk$/.test(name)) return "universal";
  if (name.includes("x86_64") || name.includes("x64") || name.includes("x86")) return "x86";
  return "other";
}

function capitalizeArch(arch) {
  const map = { arm64: "ARM64 (v8a)", arm32: "ARM32 (v7a)", universal: "Universal", x86: "x86 / x64", other: "Other" };
  return map[arch] || arch.toUpperCase();
}

function formatBytes(bytes) {
  if (!bytes || bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}

function formatCompactNumber(n) {
  if (!n) return "0";
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
  return String(n);
}

function formatDate(value) {
  if (!value) return "N/A";
  return new Date(value).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function normalizeForSearch(value) {
  return (value || "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

function getSearchTokens(value) {
  if (tokenCache.has(value)) return tokenCache.get(value);
  const tokens = (value || "").toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
  tokenCache.set(value, tokens);
  return tokens;
}

function parseAssetDisplay(filename, arch, fileType) {
  if (parseCache.has(filename)) return parseCache.get(filename);

  const baseName = filename.replace(/\.(apk|zip)$/i, "");
  const tokens = baseName.split("-").filter(Boolean);
  const archSubTokens = new Set(CONFIG.knownArchs.flatMap((a) => a.split("-")));
  const versionIndex = tokens.findIndex(
    (token) => /^(v\w*\d|vbuild)/i.test(token) && !archSubTokens.has(token.toLowerCase())
  );
  const moduleIndex = tokens.findIndex((token) => token.toLowerCase() === "module");
  const stopIndexCandidates = [versionIndex, moduleIndex].filter((i) => i >= 0);
  const stopIndex = stopIndexCandidates.length > 0 ? Math.min(...stopIndexCandidates) : tokens.length;
  const preMetaTokens = tokens.slice(0, stopIndex);

  let patchStartIndex = preMetaTokens.findIndex((token) => CONFIG.knownPatchTokens.has(token.toLowerCase()));
  if (patchStartIndex < 0) patchStartIndex = Math.max(preMetaTokens.length - 1, 0);

  const appTokens = preMetaTokens.slice(0, patchStartIndex);
  let patchTokens = preMetaTokens.slice(patchStartIndex);

  let variant = null;
  while (patchTokens.length > 1 && CONFIG.variantKeywords.has(patchTokens[patchTokens.length - 1].toLowerCase())) {
    variant = patchTokens[patchTokens.length - 1];
    patchTokens = patchTokens.slice(0, -1);
  }

  let version = "Version unknown";
  if (versionIndex >= 0) {
    const versionParts = [tokens[versionIndex]];
    for (let i = versionIndex + 1; i < tokens.length; i++) {
      const t = tokens[i].toLowerCase();
      const isArchToken = CONFIG.knownArchs.some((a) => a.split("-").includes(t));
      if (t === "module" || t === "universal" || isArchToken) break;
      versionParts.push(tokens[i]);
    }
    version = versionParts.join("-");
  }

  const result = {
    appName: formatBrandDisplayName(appTokens.length > 0 ? appTokens.join(" ") : preMetaTokens.join(" ") || baseName),
    patchName: formatBrandDisplayName(patchTokens.length > 0 ? patchTokens.join(" ") : "Patched Build"),
    variant: variant ? formatBrandDisplayName(variant) : null,
    version,
    fileType,
  };

  parseCache.set(filename, result);
  return result;
}

function formatBrandDisplayName(value) {
  return (value || "")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .map((token) => {
      const lower = token.toLowerCase();
      if (CONFIG.brandOverrides[lower]) return CONFIG.brandOverrides[lower];
      return token.charAt(0).toUpperCase() + token.slice(1);
    })
    .join(" ");
}

function setLatestBuildMeta(appEntry, releaseType, release) {
  const key = releaseType === "beta" ? "latestBeta" : "latestStable";
  const current = appEntry[key];
  const currentDate = current ? new Date(current.publishedAt).getTime() : 0;
  const releaseDate = new Date(release.published_at).getTime();

  if (!current || releaseDate > currentDate) {
    appEntry[key] = {
      build: getBuildNumberLabel(release),
      publishedAt: release.published_at,
      releaseUrl: release.html_url,
    };
  }
}

function getBuildNumberLabel(release) {
  return String(release.tag_name || release.name || "N/A");
}

function escapeHtml(text) {
  return String(text ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function updateLastUpdateTimestamp() {
  if (!allReleases || allReleases.length === 0) {
    setPillState("success", "No releases found");
    return;
  }

  const latestTime = allReleases.reduce((max, release) => {
    const t = new Date(release.published_at).getTime();
    return t > max ? t : max;
  }, 0);

  if (latestTime === 0) return;

  const dateStr = new Date(latestTime).toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
  setPillState("success", `Updated: ${dateStr}`);
}

function setPillState(state, text) {
  const textEl = document.getElementById("lastUpdateText");
  if (!textEl) return;
  const pill = textEl.closest(".update-pill");
  if (!pill) return;

  pill.classList.remove("checking", "error", "success");
  pill.classList.add(state);
  textEl.textContent = text;

  const svgContainer = pill.querySelector("svg");
  if (!svgContainer) return;

  if (state === "checking") {
    svgContainer.innerHTML = '<path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3"/>';
    svgContainer.classList.add("spin");
  } else if (state === "error") {
    svgContainer.innerHTML = '<circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>';
    svgContainer.classList.remove("spin");
  } else if (state === "success") {
    svgContainer.innerHTML = '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>';
    svgContainer.classList.remove("spin");
  }
}
