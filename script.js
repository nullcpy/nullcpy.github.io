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
    androidtv: ["primevideo", "plutotv", "moviebox", "disneyplus", "hbomax", "tubi", "vix", "at4klauncher", "projectivylauncher", "peacock"],
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
      instafel: {
        default: "com.instagram.android",
        clone: "com.instafel.android"
      }
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
      revancedextended: "app.rvx.android.youtube",
      anddea: "anddea.youtube",
      revancedadvanced: "anddea.youtube",
      morphe: "app.morphe.android.youtube",
      default: "com.google.android.youtube",
    },
    youtubemusic: {
      revanced: "app.revanced.android.apps.youtube.music",
      rvx: "app.rvx.android.apps.youtube.music",
      revancedextended: "app.rvx.android.apps.youtube.music",
      anddea: "anddea.youtube.music",
      revancedadvanced: "anddea.youtube.music",
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

// Cached DOM references
const DOM = {};

function initDOM() {
  DOM.builds = document.getElementById("builds");
  DOM.loading = document.getElementById("loading");
  DOM.error = document.getElementById("error");
  DOM.searchInput = document.getElementById("searchInput");
  DOM.searchWrap = DOM.searchInput?.closest(".search-input-wrap");
  DOM.searchClearBtn = document.getElementById("searchClearBtn");
  DOM.sortSelect = document.getElementById("sortSelect");
  DOM.appFilterButtons = document.getElementById("appFilterButtons");
  DOM.catalogCountText = document.getElementById("catalogCountText");
  DOM.lastUpdateText = document.getElementById("lastUpdateText");
  DOM.themeBtn = document.getElementById("themeBtn");
  DOM.menuBtn = document.getElementById("menuBtn");
  DOM.actionMenu = document.getElementById("actionMenu");
  DOM.patchModal = document.getElementById("patchModal");
  DOM.patchModalTitle = document.getElementById("patchModalTitle");
  DOM.patchModalBody = document.getElementById("patchModalBody");
  DOM.appliedPatchesModal = document.getElementById("appliedPatchesModal");
  DOM.appliedPatchesTitle = document.getElementById("appliedPatchesTitle");
  DOM.appliedPatchesMeta = document.getElementById("appliedPatchesMeta");
  DOM.appliedPatchesBody = document.getElementById("appliedPatchesBody");
  DOM.patchSearchInput = document.getElementById("patchSearchInput");
  DOM.patchCountBadge = document.getElementById("patchCountBadge");
  DOM.obtainiumModal = document.getElementById("obtainiumModal");
  DOM.obtainiumTitle = document.getElementById("obtainiumTitle");
  DOM.obtainiumBody = document.getElementById("obtainiumBody");
  DOM.obtainiumBtn = document.getElementById("obtainiumBtn");
  DOM.toastNotification = document.getElementById("toastNotification");
  DOM.themeColorMeta = document.getElementById("themeColorMeta");
}

// State
let allReleases = [];
let cachedFullCatalog = [];
let searchTerm = "";
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
let masterBuildDataCache = null;

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  initDOM();
  setupTheme();
  setupEventListeners();

  // Pre-fill state from URL params
  const urlParams = new URLSearchParams(window.location.search);
  const urlQuery = urlParams.get("q");
  if (urlQuery) {
    searchTerm = urlQuery.toLowerCase();
    if (DOM.searchInput) {
      DOM.searchInput.value = urlQuery;
      DOM.searchWrap?.classList.add("has-value");
    }
  }

  const urlSort = urlParams.get("sort");
  if (urlSort && ["recent", "popular", "name"].includes(urlSort)) {
    sortMode = urlSort;
    if (DOM.sortSelect) DOM.sortSelect.value = sortMode;
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
  if (DOM.themeColorMeta) {
    DOM.themeColorMeta.setAttribute("content", isLight ? "#faf8f5" : "#1a1814");
  }

  if (DOM.themeBtn) {
    DOM.themeBtn.textContent = theme === "system" ? "🖥️" : theme === "light" ? "☀️" : "🌙";
    DOM.themeBtn.setAttribute("aria-label", `Theme mode: ${theme}`);
  }
}

// Modal Generic Controller
function showModal(modalEl) {
  if (!modalEl) return;
  modalEl.classList.add("open");
  modalEl.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function hideModal(modalEl) {
  if (!modalEl) return;
  modalEl.classList.remove("open");
  modalEl.setAttribute("aria-hidden", "true");
  if (!document.querySelector(".modal-overlay.open")) {
    document.body.classList.remove("modal-open");
  }
}

// Event Listeners
function setupEventListeners() {
  let searchTimeout;

  // Theme Toggle Button
  if (DOM.themeBtn) {
    DOM.themeBtn.addEventListener("click", () => {
      const nextTheme = themeMode === "system" ? "light" : themeMode === "light" ? "dark" : "system";
      themeMode = nextTheme;
      localStorage.setItem("theme", nextTheme);
      applyTheme(nextTheme);
    });
  }

  // Floating Action Menu
  if (DOM.menuBtn && DOM.actionMenu) {
    DOM.menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      DOM.actionMenu.classList.toggle("open");
      DOM.menuBtn.setAttribute("aria-expanded", DOM.actionMenu.classList.contains("open"));
    });

    document.addEventListener("click", (e) => {
      if (DOM.actionMenu.classList.contains("open") && !DOM.actionMenu.contains(e.target)) {
        DOM.actionMenu.classList.remove("open");
        DOM.menuBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Search Input (Debounced)
  const syncClearBtn = () => {
    if (DOM.searchWrap && DOM.searchInput) {
      DOM.searchWrap.classList.toggle("has-value", DOM.searchInput.value.length > 0);
    }
  };

  if (DOM.searchInput) {
    DOM.searchInput.addEventListener("input", (e) => {
      syncClearBtn();
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        searchTerm = e.target.value.toLowerCase().trim();
        syncUrlParams();
        filterAndRenderReleases();
      }, 180);
    });

    DOM.searchInput.addEventListener("focus", (e) => {
      if (window.innerWidth <= 768) {
        const searchBox = e.target.closest(".search-box") || e.target;
        const y = searchBox.getBoundingClientRect().top + window.scrollY - 15;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    });
  }

  if (DOM.searchClearBtn && DOM.searchInput) {
    DOM.searchClearBtn.addEventListener("click", () => {
      DOM.searchInput.value = "";
      searchTerm = "";
      syncClearBtn();
      syncUrlParams();
      filterAndRenderReleases();
    });
  }

  // Secondary Category Filter Buttons
  if (DOM.appFilterButtons) {
    DOM.appFilterButtons.addEventListener("click", (e) => {
      const filterBtn = e.target.closest(".filter-btn");
      if (!filterBtn) return;
      appCategoryFilter = filterBtn.dataset.filter || "all";
      filterAndRenderReleases();
    });
  }

  // Sort Selector
  if (DOM.sortSelect) {
    DOM.sortSelect.addEventListener("change", (e) => {
      sortMode = e.target.value;
      syncUrlParams();
      filterAndRenderReleases();
    });
  }

  // App Cards & Modal Delegate Click
  if (DOM.builds) {
    DOM.builds.addEventListener("click", (e) => {
      const collapsedCard = e.target.closest(".app-card:not([open])");
      if (collapsedCard && !e.target.closest(".app-card-summary")) {
        collapsedCard.open = true;
        return;
      }

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
  if (DOM.patchModal) {
    DOM.patchModal.addEventListener("click", (e) => {
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

      const appliedTrigger = e.target.closest(".patch-applied-btn");
      if (appliedTrigger) {
        e.preventDefault();
        e.stopPropagation();
        openAppliedPatchesModal(
          appliedTrigger.dataset.appKey,
          appliedTrigger.dataset.patchKey,
          appliedTrigger.dataset.buildKey
        );
        return;
      }

      if (e.target.id === "patchModal" || e.target.closest(".modal-close")) {
        closePatchModal();
      }
    });
  }

  // Applied Patches Modal
  if (DOM.appliedPatchesModal) {
    DOM.appliedPatchesModal.addEventListener("click", (e) => {
      if (e.target.id === "appliedPatchesModal" || e.target.closest(".modal-close")) {
        closeAppliedPatchesModal();
      }
    });
  }

  if (DOM.patchSearchInput) {
    DOM.patchSearchInput.addEventListener("input", (e) => {
      filterAppliedPatchesList(e.target.value);
    });
  }

  // Obtainium Modal
  if (DOM.obtainiumBtn) {
    DOM.obtainiumBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      openObtainiumModal();
    });
  }

  if (DOM.obtainiumModal) {
    DOM.obtainiumModal.addEventListener("click", (e) => {
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
  if (DOM.builds) DOM.builds.after(sentinel);

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

function syncUrlParams() {
  const url = new URL(window.location);
  if (searchTerm) url.searchParams.set("q", searchTerm);
  else url.searchParams.delete("q");

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
      if (DOM.loading) DOM.loading.style.display = "none";
      if (DOM.error) DOM.error.style.display = "none";
      rebuildCatalogCache();
      updateLastUpdateTimestamp();
      filterAndRenderReleases();
      return;
    }

    if (DOM.loading) DOM.loading.style.display = "block";
    if (DOM.error) DOM.error.style.display = "none";

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
    fetchMasterBuildData(); // Prefetch builds.json in background for instant modal opens

    if (DOM.loading) DOM.loading.style.display = "none";
    updateLastUpdateTimestamp();
    filterAndRenderReleases();
  } catch (error) {
    console.error("Error loading releases:", error);
    setPillState("error", "Failed to check updates");
    if (DOM.loading) DOM.loading.style.display = "none";
    if (DOM.error) {
      DOM.error.style.display = "block";
      DOM.error.textContent = `Failed to load releases: ${error.message}`;
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

    const patchMetaFromRelease = extractPatchInfoFromRelease(release);

    (release.assets || []).forEach((asset) => {
      if (!asset.name || !/\.(apk|zip)$/i.test(asset.name)) return;

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
          patches: new Map(),
        });
      }

      const appEntry = appMap.get(appKey);
      setLatestBuildMeta(appEntry, releaseType, release);

      const patchKey = normalizeForSearch(parsed.patchName) || "patchedbuild";
      if (!appEntry.patches.has(patchKey)) {
        appEntry.patches.set(patchKey, {
          patchKey,
          patchName: parsed.patchName,
          latestVersion: null,
          latestPublishedAt: 0,
          variants: new Map(),
          builds: new Map(),
        });
      }

      const patchEntry = appEntry.patches.get(patchKey);
      const variantKey = parsed.rawVariant || (parsed.variant ? normalizeForSearch(parsed.variant) : "default") || "default";
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
          const entry = (parsed.version && bd[parsed.version]) ? bd[parsed.version] : bd;
          buildDataApplied = entry.applied_patches || null;
          buildDataPatches = entry.patches || null;
          buildDataChangelog = entry.changlog || entry.changelog || null;
        }
      }

      const buildKey = isArchive
        ? `archive-${releaseType}-${parsed.version}-${variantKey}`
        : `${release.id}-${variantKey}`;

      if (!patchEntry.builds.has(buildKey)) {
        patchEntry.builds.set(buildKey, {
          buildKey,
          releaseId: release.id,
          build: isArchive ? parsed.version : getBuildNumberLabel(release),
          releaseType,
          isArchive,
          variantKey,
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

      const patchesArray = Array.from(app.patches.values())
        .sort((a, b) => new Date(b.latestPublishedAt) - new Date(a.latestPublishedAt))
        .map((patch) => {
          const patchDownloads = Array.from(patch.builds.values()).reduce(
            (sum, b) => sum + (b.assets || []).reduce((aSum, a) => aSum + (a.download_count || 0), 0),
            0
          );
          return {
            ...patch,
            totalDownloads: patchDownloads,
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
          };
        });

      // Pre-compute O(1) metrics on app object for ultra-fast sorting
      const totalAppDownloads = patchesArray.reduce((sum, p) => sum + p.totalDownloads, 0);
      const latestAppTime = patchesArray.reduce(
        (latest, p) => Math.max(latest, new Date(p.latestPublishedAt).getTime() || 0),
        0
      );

      // Pre-build search tokens corpus for fast searching
      const searchTerms = [app.appName, app.appKey];
      patchesArray.forEach((p) => {
        searchTerms.push(p.patchName, p.patchKey);
        p.variants.forEach((v) => {
          searchTerms.push(v.variantName, v.variantKey);
          if (v.latestStable) searchTerms.push(v.latestStable.version);
          if (v.latestBeta) searchTerms.push(v.latestBeta.version);
        });
        p.builds.forEach((b) => {
          (b.assets || []).forEach((a) => {
            if (a.name) searchTerms.push(a.name);
          });
        });
      });
      const searchCorpus = normalizeForSearch(searchTerms.join(" "));
      const appTokens = getSearchTokens(app.appName);

      return {
        ...app,
        totalDownloads: totalAppDownloads,
        latestPublishedAt: latestAppTime,
        searchCorpus,
        appTokens,
        patches: patchesArray,
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

  // 2. Category Filter
  apps = applyCategoryFilter(apps);

  // 3. Fast Sort Mode (O(1) lookups)
  apps = applySortMode(apps);

  // 4. Update Status Text
  updateCatalogStatus(apps);

  // 5. Render
  renderAppCards(apps);
  updateAppFilterButtons();
  if (DOM.loading) DOM.loading.style.display = "none";
}

function updateCatalogStatus(apps) {
  if (!DOM.catalogCountText) return;
  const totalApps = apps.length;
  let totalBuilds = 0;
  apps.forEach((a) => {
    a.patches.forEach((p) => {
      totalBuilds += p.builds.length;
    });
  });

  DOM.catalogCountText.textContent = `Showing ${totalApps} app${totalApps === 1 ? "" : "s"} (${totalBuilds} build${totalBuilds === 1 ? "" : "s"})`;
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

// O(1) Instant Property Comparisons
function applySortMode(apps) {
  if (sortMode === "popular") {
    return [...apps].sort((a, b) => b.totalDownloads - a.totalDownloads);
  }
  if (sortMode === "name") {
    return [...apps].sort((a, b) => a.appName.localeCompare(b.appName));
  }
  // Default: recent
  return [...apps].sort((a, b) => b.latestPublishedAt - a.latestPublishedAt);
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
  const normalizedAppKey = normalizeForSearch(app.appKey);
  if (!normalizedQuery) return Infinity;

  if (normalizedAppName === normalizedQuery || normalizedAppKey === normalizedQuery) return 0;
  if (normalizedAppName.startsWith(normalizedQuery) || normalizedAppKey.startsWith(normalizedQuery)) return 1;

  if (app.appTokens && app.appTokens.some((token) => token === normalizedQuery)) return 2;
  if (app.appTokens && app.appTokens.some((token) => token.startsWith(normalizedQuery))) return 3;
  if (normalizedAppName.includes(normalizedQuery) || normalizedAppKey.includes(normalizedQuery)) return 4;
  if (app.searchCorpus && app.searchCorpus.includes(normalizedQuery)) return 5;

  return Infinity;
}

// Progressive Rendering for App Cards
function renderAppCards(apps) {
  if (!DOM.builds) return;
  currentAppCatalog = apps;
  currentVisibleCount = 0;
  DOM.builds.innerHTML = "";

  if (apps.length === 0) {
    DOM.builds.innerHTML = '<div class="no-results">No applications found matching your criteria.</div>';
    return;
  }

  renderNextChunk();
}

function renderNextChunk() {
  if (!DOM.builds) return;

  const nextChunk = currentAppCatalog.slice(
    currentVisibleCount,
    currentVisibleCount + RENDER_CHUNK_SIZE,
  );

  if (nextChunk.length === 0) return;

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = nextChunk.map((app) => createAppCard(app)).join("");

  while (tempDiv.firstChild) {
    DOM.builds.appendChild(tempDiv.firstChild);
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

  const totalDownloads = app.totalDownloads || 0;
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

// Dynamic Filter Buttons Generator (Alphabetically Sorted)
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
    .map(([word]) => ({
      key: `word-${word}`,
      label: toFilterLabel(word),
    }));

  const categoryFilters = Object.keys(CONFIG.appCategories).map((key) => ({
    key: key,
    label: toFilterLabel(key),
  }));

  return [...categoryFilters, ...dynamicFilters].sort((a, b) =>
    a.label.localeCompare(b.label, undefined, { sensitivity: "base" })
  );
}

function renderDynamicAppFilterButtons(filters) {
  if (!DOM.appFilterButtons) return;

  DOM.appFilterButtons.querySelectorAll(".dynamic-filter-btn").forEach((btn) => btn.remove());

  filters.forEach((filter) => {
    const button = document.createElement("button");
    button.className = "filter-btn dynamic-filter-btn";
    button.dataset.filter = filter.key;
    button.type = "button";
    button.textContent = filter.label;
    DOM.appFilterButtons.appendChild(button);
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
  showModal(DOM.patchModal);
}

function renderOpenPatchModal() {
  const app = currentAppCatalog.find((item) => item.appKey === activeModalAppKey);
  const patch = app ? app.patches.find((item) => item.patchKey === activeModalPatchKey) : null;

  if (!app || !patch) {
    closePatchModal();
    return;
  }

  if (DOM.patchModalTitle) {
    DOM.patchModalTitle.textContent = `${app.appName} • ${patch.patchName}`;
  }

  updateModalFilterButtons(patch);

  if (DOM.patchModalBody) {
    DOM.patchModalBody.innerHTML = createPatchModalContent(app, patch, modalBuildFilter, modalVariantFilter);
  }
}

function updateModalFilterButtons(patch) {
  const filterContainer = document.querySelector(".modal-filter-buttons");
  if (!filterContainer) return;

  filterContainer.innerHTML = "";

  let hasStable = false;
  let hasBeta = false;

  if (patch.builds) {
    for (const b of patch.builds) {
      const matchingAssets = b.assets.filter((a) => {
        const vKey = a.parsed.rawVariant || (a.parsed.variant ? normalizeForSearch(a.parsed.variant) : "default") || "default";
        return vKey === modalVariantFilter || modalVariantFilter === "all";
      });

      if (matchingAssets.length > 0) {
        if (b.releaseType === "stable") hasStable = true;
        if (b.releaseType === "beta") hasBeta = true;
      }
      if (hasStable && hasBeta) break;
    }
  }

  // Auto-switch build filter if the currently selected one has no builds
  if (!hasStable && modalBuildFilter === "stable" && hasBeta) {
    modalBuildFilter = "beta";
  } else if (!hasBeta && modalBuildFilter === "beta" && hasStable) {
    modalBuildFilter = "stable";
  }

  let channelHtml = "";
  if (hasStable) {
    channelHtml += `<button class="modal-filter-btn ${modalBuildFilter === "stable" ? "active" : ""}" data-filter="stable" type="button">Stable</button>\n`;
  }
  if (hasBeta) {
    channelHtml += `<button class="modal-filter-btn ${modalBuildFilter === "beta" ? "active" : ""}" data-filter="beta" type="button">Beta</button>\n`;
  }

  if (channelHtml) {
    const channelGroup = document.createElement("div");
    channelGroup.className = "filter-pill-group";
    channelGroup.innerHTML = channelHtml;
    filterContainer.appendChild(channelGroup);
  }

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

  if (buildFilter === "stable") {
    builds = builds.filter((b) => b.releaseType === "stable");
  } else if (buildFilter === "beta") {
    builds = builds.filter((b) => b.releaseType === "beta");
  }

  if (variantFilter && variantFilter !== "all") {
    builds = builds
      .map((b) => ({
        ...b,
        assets: b.assets.filter((a) => {
          const vKey = a.parsed.rawVariant || (a.parsed.variant ? normalizeForSearch(a.parsed.variant) : "default") || "default";
          return vKey === variantFilter;
        }),
      }))
      .filter((b) => b.assets.length > 0);
  }

  if (builds.length === 0) {
    return '<div class="no-results" style="padding: 40px 20px;">No builds matching these filters.</div>';
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

  const patchInfoBanner = `
    <div class="patch-info-actions">
      <button class="patch-applied-btn" data-app-key="${app.appKey}" data-patch-key="${patch.patchKey}" data-build-key="${build.buildKey || build.releaseId}" type="button">View Applied Patches</button>
      <a href="${build.releaseUrl}" target="_blank" rel="noopener noreferrer" class="release-link-button">View Release Source</a>
    </div>
  `;

  return `
    <details class="modal-build-card" ${openByDefault ? "open" : ""}>
      <summary class="modal-build-header">
        <div class="modal-build-header-left">
          <div class="modal-build-title">${titleText}</div>
          <div class="modal-build-date">${formatDate(build.publishedAt)}${build.isArchive ? "" : ` • ${escapeHtml(build.version)}`}</div>
        </div>
        <div class="modal-build-header-right">
          <span class="badge-group">
            ${build.isArchive ? `<span class="release-badge archive">Archive</span>` : ""}
          </span>
        </div>
      </summary>
      <div class="modal-build-downloads">
        ${downloadsMarkup}
        ${patchInfoBanner}
      </div>
    </details>
  `;
}

function closePatchModal() {
  hideModal(DOM.patchModal);
}

// Master Build Metadata Store
async function fetchMasterBuildData() {
  if (masterBuildDataCache) return masterBuildDataCache;
  try {
    const resp = await fetch("builds.json");
    if (resp.ok) {
      masterBuildDataCache = await resp.json();
    } else {
      masterBuildDataCache = {};
    }
  } catch (e) {
    console.warn("Could not load builds.json:", e);
    masterBuildDataCache = {};
  }
  return masterBuildDataCache;
}

// Applied Patches Modal Controller
async function openAppliedPatchesModal(appKey, patchKey, buildKey) {
  const app = currentAppCatalog.find((item) => item.appKey === appKey);
  const patch = app ? app.patches.find((item) => item.patchKey === patchKey) : null;
  if (!app || !patch) return;

  if (DOM.appliedPatchesTitle) {
    DOM.appliedPatchesTitle.textContent = `${app.appName} (${patch.patchName})`;
  }

  let build = patch.builds.find((b) => b.buildKey === buildKey || String(b.releaseId) === String(buildKey));
  if (!build) {
    build = patch.builds[0];
  }
  const isArchiveBuild = build && build.isArchive;

  let pNames = null;
  let clUrl = null;
  let appliedPatches = null;

  // Resolve applied patches from builds.json
  if (!appliedPatches) {
    const masterData = await fetchMasterBuildData();
    const appKeyNorm = normalizeForSearch(app.appKey || app.appName);
    const patchKeyNorm = normalizeForSearch(patch.patchKey || patch.patchName);
    // Use stored variantKey to get the correct variant — avoids cross-variant asset contamination
    // (multiple variants share the same buildKey when from the same numbered release)
    const variantNorm = (build?.variantKey && build.variantKey !== "default")
      ? normalizeForSearch(build.variantKey)
      : "";

    let rawSlugNorm = appKeyNorm;
    const asset = build?.assets?.[0];
    if (asset?.name) {
      const baseName = asset.name.replace(/\.(apk|zip)$/i, "");
      const tokens = baseName.split("-").filter(Boolean);
      const patchIdx = tokens.findIndex((t) => CONFIG.knownPatchTokens.has(t.toLowerCase()));
      if (patchIdx > 0) {
        rawSlugNorm = tokens.slice(0, patchIdx).join("-").toLowerCase();
      }
    }

    const targetKey = `${appKeyNorm}-${patchKeyNorm}`;
    const variantTargetKey = variantNorm ? `${appKeyNorm}-${patchKeyNorm}-${variantNorm}` : targetKey;
    const rawTargetKey = `${rawSlugNorm}-${patchKeyNorm}`;
    const rawVariantTargetKey = variantNorm ? `${rawSlugNorm}-${patchKeyNorm}-${variantNorm}` : rawTargetKey;

    function isPatchEntry(obj) {
      return obj && typeof obj === "object" && (
        Array.isArray(obj.applied_patches) || typeof obj.patches === "string" || typeof obj.changelog === "string"
      );
    }

    // Direct O(1) version & tag dictionary lookup (no dead engine loops)
    function resolveVersionFromDict(dict, rawVer, specificTag, isArchive, preferredReleaseType) {
      if (!dict || typeof dict !== "object") return null;
      if (isPatchEntry(dict)) return dict;

      const cleanVer = (rawVer || "").toLowerCase().replace(/^v(?=\d)/i, "").trim();
      if (!cleanVer) return null;

      const candidate = dict[cleanVer] || dict[`v${cleanVer}`] || dict[rawVer];
      if (!candidate) return null;
      if (isPatchEntry(candidate)) return candidate;

      if (typeof candidate === "object") {
        if (specificTag && !isArchive) {
          return isPatchEntry(candidate[specificTag]) ? candidate[specificTag] : null;
        }
        const tagKeys = Object.keys(candidate).sort((a, b) => {
          const na = Number(a), nb = Number(b);
          if (!isNaN(na) && !isNaN(nb)) return nb - na;
          return b.localeCompare(a);
        });
        
        // If we have a preferred release type (for archives), try to find a matching tag first
        if (preferredReleaseType) {
          for (const tagKey of tagKeys) {
            if (tagToReleaseType[tagKey] === preferredReleaseType && isPatchEntry(candidate[tagKey])) {
              return candidate[tagKey];
            }
          }
          // Strict matching: do not fallback to another channel's patches
          return null;
        }

        // Only fallback to the latest available if no specific type was requested
        for (const tagKey of tagKeys) {
          if (isPatchEntry(candidate[tagKey])) return candidate[tagKey];
        }
      }
      return null;
    }

    const specificTag = isArchiveBuild ? null : (build?.build || null);
    const cleanBuildVer = (build?.version || "").replace(/^v(?=\d)/i, "").trim();
    const versionsToTry = cleanBuildVer ? [cleanBuildVer, `v${cleanBuildVer}`] : [];

    // Map build tag to releaseType to prefer the right patches for archive builds
    const tagToReleaseType = {};
    if (patch && patch.builds) {
      for (const b of patch.builds.values()) {
        if (b.build && b.releaseType) {
          tagToReleaseType[b.build] = b.releaseType;
        }
      }
    }

    let resolved = null;
    if (variantNorm) {
      for (const ver of versionsToTry) {
        resolved =
          resolveVersionFromDict(masterData[rawVariantTargetKey], ver, specificTag, isArchiveBuild, build?.releaseType) ||
          resolveVersionFromDict(masterData[variantTargetKey], ver, specificTag, isArchiveBuild, build?.releaseType);
        if (resolved) break;
      }
    } else {
      for (const ver of versionsToTry) {
        resolved =
          resolveVersionFromDict(masterData[rawTargetKey], ver, specificTag, isArchiveBuild, build?.releaseType) ||
          resolveVersionFromDict(masterData[targetKey], ver, specificTag, isArchiveBuild, build?.releaseType);
        if (resolved) break;
      }
    }

    if (resolved) {
      if (Array.isArray(resolved.applied_patches) && resolved.applied_patches.length > 0) {
        appliedPatches = resolved.applied_patches;
      }
      if (resolved.patches) {
        pNames = resolved.patches;
      }
      if (resolved.changelog) {
        clUrl = resolved.changelog;
      }
    }
  }

  if (DOM.appliedPatchesMeta) {
    const patchNamesList = Array.isArray(pNames)
      ? pNames
      : (typeof pNames === "string" ? pNames.split(/[,\s]+/).filter(Boolean) : []);

    const changelogList = Array.isArray(clUrl)
      ? clUrl
      : (typeof clUrl === "string" ? clUrl.split(/[,\s]+/).filter(Boolean) : (clUrl ? [clUrl] : []));

    const badgesHtml = patchNamesList.map((name, index) => {
      const url = changelogList[index] || (changelogList.length === 1 ? changelogList[0] : null);
      if (url) {
        return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="patch-engine-badge patch-engine-link" title="Open changelog for ${escapeHtml(name)}">${escapeHtml(name)}<svg class="patch-link-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg></a>`;
      }
      return `<span class="patch-engine-badge">${escapeHtml(name)}</span>`;
    }).join("");

    DOM.appliedPatchesMeta.innerHTML = badgesHtml;
  }

  activeAppliedPatchesList = appliedPatches;
  filterAppliedPatchesList("");
  showModal(DOM.appliedPatchesModal);

  if (DOM.patchSearchInput) {
    DOM.patchSearchInput.value = "";
  }
}

function filterAppliedPatchesList(query) {
  if (!DOM.appliedPatchesBody) return;

  if (!activeAppliedPatchesList) {
    if (DOM.patchCountBadge) {
      DOM.patchCountBadge.textContent = "0 patches";
    }
    DOM.appliedPatchesBody.innerHTML = '<div class="no-results" style="padding: 36px 20px; text-align: center; color: var(--text-muted);">No applied patches data available for this build.</div>';
    return;
  }

  const normalized = (query || "").toLowerCase().trim();
  const filtered = activeAppliedPatchesList.filter((p) =>
    p.toLowerCase().includes(normalized)
  );

  if (DOM.patchCountBadge) {
    DOM.patchCountBadge.textContent = `${filtered.length} of ${activeAppliedPatchesList.length} patches`;
  }

  if (filtered.length === 0) {
    DOM.appliedPatchesBody.innerHTML = '<div class="no-results" style="padding: 36px 20px; text-align: center; color: var(--text-muted);">No matching patches found.</div>';
    return;
  }

  DOM.appliedPatchesBody.innerHTML = `
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
  hideModal(DOM.appliedPatchesModal);
}

// Obtainium Modal Controller
function openObtainiumModal() {
  const app = currentAppCatalog.find((item) => item.appKey === activeModalAppKey);
  const patch = app ? app.patches.find((item) => item.patchKey === activeModalPatchKey) : null;
  if (!app || !patch) return;

  if (DOM.obtainiumTitle) {
    DOM.obtainiumTitle.textContent = `Install ${app.appName} with Obtainium`;
  }

  if (DOM.obtainiumBody) {
    DOM.obtainiumBody.innerHTML = createObtainiumInstructions(app, patch);
  }

  showModal(DOM.obtainiumModal);
}

function createObtainiumInstructions(app, patch) {
  const repoUrl = `https://github.com/${CONFIG.owner}/${CONFIG.repo}`;
  const obtainiumLatestUrl = "https://github.com/ImranR98/Obtainium/releases/latest";

  const appNameNorm = normalizeForSearch(app?.appName || "app");
  const patchNameNorm = normalizeForSearch(patch?.patchName || "patch");

  const isSpecificVariant = modalVariantFilter && modalVariantFilter !== "default" && modalVariantFilter !== "all";

  let regexPattern = `^${appNameNorm}-${patchNameNorm}.*\\.apk$`;
  if (isSpecificVariant) {
    regexPattern = `^${appNameNorm}-${patchNameNorm}-${modalVariantFilter}.*\\.apk$`;
  }

  const mainPackageId = getAppPackageId(app, patch, modalVariantFilter || "default");
  const mainLabel = `${app?.appName || "App"} (${patch?.patchName || "Patch"})`;
  const mainAdditionalSettings = { apkFilterRegEx: regexPattern };
  if (modalBuildFilter === "beta") {
    mainAdditionalSettings.includePrereleases = true;
  }

  const mainConfig = {
    id: mainPackageId,
    name: mainLabel,
    author: CONFIG.owner,
    url: repoUrl,
    additionalSettings: JSON.stringify(mainAdditionalSettings),
  };
  const mainOneClickUrl = mainPackageId ? `https://apps.obtainium.imranr.dev/redirect?r=${encodeURIComponent("obtainium://app/" + JSON.stringify(mainConfig))}` : null;

  let step4Content = "";
  if (patch && patch.variants && patch.variants.length > 1) {
    const examples = patch.variants.map((v, index) => {
      const vRegex = v.variantKey === "default"
        ? `^${appNameNorm}-${patchNameNorm}.*\\.apk$`
        : `^${appNameNorm}-${patchNameNorm}-${v.variantKey}.*\\.apk$`;
      const vLabel = `${app.appName} (${patch.patchName} - ${v.variantName})`;
      const vPackageId = getAppPackageId(app, patch, v.variantKey);

      const vAdditionalSettings = { apkFilterRegEx: vRegex };
      if (modalBuildFilter === "beta") {
        vAdditionalSettings.includePrereleases = true;
      }

      const vConfig = {
        id: vPackageId,
        name: vLabel,
        author: CONFIG.owner,
        url: repoUrl,
        additionalSettings: JSON.stringify(vAdditionalSettings),
      };
      const vOneClickUrl = vPackageId ? `https://apps.obtainium.imranr.dev/redirect?r=${encodeURIComponent("obtainium://app/" + JSON.stringify(vConfig))}` : null;

      return `
        <div style="margin-top: 8px;">
          <div style="font-size: 0.82rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 4px;">
            ${escapeHtml(vLabel)}:
          </div>
          <div class="instruction-code">
            <code>${escapeHtml(vRegex)}</code>
            ${vOneClickUrl ? `<a href="${vOneClickUrl}" class="obtainium-add-btn" target="_blank" rel="noopener noreferrer">Add to Obtainium</a>` : ''}
            <button class="copy-btn" onclick="copyToClipboard('${escapeHtml(vRegex)}', 'Regex copied!')" type="button">Copy</button>
          </div>
        </div>
      `;
    }).join("");

    step4Content = `
      <div style="margin-top: 4px;">
        ${examples}
      </div>
    `;
  } else {
    step4Content = `
      <div class="instruction-code" style="margin-top: 6px;">
        <code>${escapeHtml(regexPattern)}</code>
        ${mainOneClickUrl ? `<a href="${mainOneClickUrl}" class="obtainium-add-btn" target="_blank" rel="noopener noreferrer">Add to Obtainium</a>` : ''}
        <button class="copy-btn" onclick="copyToClipboard('${escapeHtml(regexPattern)}', 'Regex copied!')" type="button">Copy</button>
      </div>
    `;
  }

  return `
    <div class="obtainium-instructions">
    <div style="margin-bottom: 12px;">
      Ensure that you have <strong>Obtainium</strong> installed (available on <a href="${obtainiumLatestUrl}" target="_blank" rel="noopener noreferrer">GitHub</a>). Use the <strong>Add to Obtainium</strong> button for a quick setup if it's available, or follow the steps below to add the app manually:
    </div>
      <ol>
        <li>Open Obtainium on your device.</li>
        <li>Tap <strong>Add App</strong>.</li>
        <li>In the <strong>App Source URL</strong> box, enter:
          <div class="instruction-code code-with-copy">
            <code>${repoUrl}</code>
            <button class="copy-btn" onclick="copyToClipboard('${repoUrl}', 'Repository URL copied!')" type="button">Copy</button>
          </div>
        </li>
        <li>Scroll down to <strong>Filter APKs by regular expression</strong> and enter:
          ${step4Content}
        </li>
        <li>To get beta updates, enable the <strong>Include Pre-releases</strong> toggle.</li>
        <li>Tap <strong>Add</strong> to begin downloading.</li>
      </ol>
      <div style="margin-top: 12px">
        In the future, Obtainium will automatically fetch updates when new releases are published.
      </div>
    </div>
  `;
}

function getAppPackageId(app, patch, variantKey) {
  if (!app) return "";

  const appKeyNorm = normalizeForSearch(app.appKey || app.appName || "");
  const appNameNorm = normalizeForSearch(app.appName || "");

  // Candidate slugs to search in CONFIG.appIds
  const appCandidates = [app.appKey, appKeyNorm, appNameNorm];

  const sampleAsset = patch?.builds?.[0]?.assets?.[0] || app?.patches?.[0]?.builds?.[0]?.assets?.[0];
  if (sampleAsset?.name) {
    const baseName = sampleAsset.name.replace(/\.(apk|zip)$/i, "");
    const tokens = baseName.split("-").filter(Boolean);
    const patchIdx = tokens.findIndex((t) => CONFIG.knownPatchTokens.has(t.toLowerCase()));
    if (patchIdx > 0) {
      const rawSlug = tokens.slice(0, patchIdx).join("").toLowerCase();
      appCandidates.push(rawSlug);
    }
    if (tokens.length > 0) {
      appCandidates.push(tokens[0].toLowerCase());
    }
  }

  let mapping = null;
  for (const cand of appCandidates) {
    if (!cand) continue;
    if (CONFIG.appIds[cand]) {
      mapping = CONFIG.appIds[cand];
      break;
    }
    const candNorm = normalizeForSearch(cand);
    if (CONFIG.appIds[candNorm]) {
      mapping = CONFIG.appIds[candNorm];
      break;
    }
  }

  if (!mapping) {
    // Fuzzy matching against CONFIG.appIds
    for (const [key, val] of Object.entries(CONFIG.appIds)) {
      const normKey = normalizeForSearch(key);
      if (normKey === appNameNorm || appNameNorm.includes(normKey) || normKey.includes(appNameNorm) ||
        normKey === appKeyNorm || appKeyNorm.includes(normKey) || normKey.includes(appKeyNorm)) {
        mapping = val;
        break;
      }
    }
  }

  if (!mapping) return "";
  if (typeof mapping === "string") return mapping;

  if (typeof mapping === "object") {
    const patchCandidates = [
      patch?.patchKey,
      normalizeForSearch(patch?.patchName || ""),
    ];
    if (sampleAsset?.name) {
      const baseName = sampleAsset.name.replace(/\.(apk|zip)$/i, "");
      const tokens = baseName.split("-").filter(Boolean);
      const patchIdx = tokens.findIndex((t) => CONFIG.knownPatchTokens.has(t.toLowerCase()));
      if (patchIdx >= 0) {
        patchCandidates.push(tokens[patchIdx].toLowerCase());
      }
    }

    const normVariant = normalizeForSearch(variantKey || "");

    // Check if there is an engine/patch-specific sub-mapping (e.g. instagram.instafel)
    let activeMapping = mapping;
    for (const pCand of patchCandidates) {
      if (!pCand) continue;
      const sub = mapping[pCand] ||
        (pCand === "revancedextended" ? mapping["rvx"] : null) ||
        (pCand === "revancedadvanced" ? mapping["anddea"] : null) ||
        (pCand === "rvx" ? mapping["revancedextended"] : null) ||
        (pCand === "anddea" ? mapping["revancedadvanced"] : null);

      if (sub) {
        if (typeof sub === "string") return sub;
        if (typeof sub === "object") {
          activeMapping = sub;
          break;
        }
      }
    }

    // 1. Check variant overrides in activeMapping (e.g. clone, androidtv, foss)
    if (normVariant && normVariant !== "default" && normVariant !== "all") {
      if (typeof activeMapping[normVariant] === "string") return activeMapping[normVariant];
      if (normVariant.includes("tv") && typeof activeMapping["androidtv"] === "string") return activeMapping["androidtv"];
      if (normVariant.includes("clone") && typeof activeMapping["clone"] === "string") return activeMapping["clone"];
      if (normVariant.includes("foss") && typeof activeMapping["foss"] === "string") return activeMapping["foss"];
      if (typeof mapping[normVariant] === "string") return mapping[normVariant];
    }

    // 2. Default fallback on activeMapping or top-level mapping
    if (typeof activeMapping.default === "string") return activeMapping.default;
    if (typeof mapping.default === "string") return mapping.default;

    // 3. First string value fallback
    const firstVal = Object.values(activeMapping).find((v) => typeof v === "string") ||
      Object.values(mapping).find((v) => typeof v === "string");
    if (firstVal) return firstVal;
  }

  return "";
}

function closeObtainiumModal() {
  hideModal(DOM.obtainiumModal);
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
  if (!DOM.toastNotification) return;
  DOM.toastNotification.textContent = message;
  DOM.toastNotification.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    DOM.toastNotification?.classList.remove("show");
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
    const versionParts = [tokens[versionIndex].replace(/^v(?=\d)/i, "")];
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
    rawVariant: variant ? variant.toLowerCase() : null,
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
  setPillState("success", dateStr);
}

function setPillState(state, text) {
  if (!DOM.lastUpdateText) return;
  const pill = DOM.lastUpdateText.closest(".update-pill");
  if (!pill) return;

  pill.classList.remove("checking", "error", "success");
  pill.classList.add(state);
  DOM.lastUpdateText.textContent = text;

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
