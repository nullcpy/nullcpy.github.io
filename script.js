/**
 * ==========================================
 * CONFIGURATION & CUSTOMIZATION
 * Edit these values to update the app catalog behavior, branding, and notices.
 * ==========================================
 */
const CONFIG = {
  owner: "",
  repo: "",
  appCategories: {},
  sharedAppWordStoplist: new Set(),
  knownArchs: [],
  appNotices: [],
};

function applyConfig(cfg) {
  if (!cfg || typeof cfg !== "object") return;
  if (cfg.owner) CONFIG.owner = cfg.owner;
  if (cfg.repo) CONFIG.repo = cfg.repo;
  if (cfg.appCategories) CONFIG.appCategories = cfg.appCategories;
  if (Array.isArray(cfg.sharedAppWordStoplist)) {
    CONFIG.sharedAppWordStoplist = new Set(cfg.sharedAppWordStoplist.map((w) => w.toLowerCase()));
  }
  if (Array.isArray(cfg.knownArchs)) {
    CONFIG.knownArchs = cfg.knownArchs;
  }
  if (cfg.appNotices) CONFIG.appNotices = cfg.appNotices;
}

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

// Stoplist Threshold
const SHARED_APP_WORD_MIN_COUNT = 2;

// Caches for Memoization
const tokenCache = new Map();

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
  modalEl.classList.remove("closing");
  modalEl.classList.add("open");
  modalEl.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function hideModal(modalEl) {
  if (!modalEl) return;
  modalEl.classList.add("closing");

  // Prevent accessibility warnings by removing focus from modal elements before hiding
  if (document.activeElement && modalEl.contains(document.activeElement)) {
    document.activeElement.blur();
  }

  setTimeout(() => {
    modalEl.classList.remove("open");
    modalEl.classList.remove("closing");
    modalEl.setAttribute("aria-hidden", "true");
    if (!document.querySelector(".modal-overlay.open:not(.closing)")) {
      document.body.classList.remove("modal-open");
    }
  }, 180);
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
        // Wait for the virtual keyboard to finish animating (usually ~300ms)
        // Otherwise, the programmatic smooth scroll conflicts with the keyboard scroll,
        // permanently breaking hit-testing areas on mobile Chrome/Safari.
        setTimeout(() => {
          const searchBox = e.target.closest(".search-box") || e.target;
          const y = searchBox.getBoundingClientRect().top + window.scrollY - 85;
          window.scrollTo({ top: y, behavior: "smooth" });
        }, 300);
      }
    });
  }

  if (DOM.searchClearBtn && DOM.searchInput) {
    const handleClear = (e) => {
      e.preventDefault(); // Prevent input blur, keeping keyboard open and stopping layout shifts
      if (DOM.searchInput.value === "") return;
      DOM.searchInput.value = "";
      searchTerm = "";
      syncClearBtn();
      syncUrlParams();
      filterAndRenderReleases();
    };
    DOM.searchClearBtn.addEventListener("pointerdown", handleClear);
    DOM.searchClearBtn.addEventListener("click", handleClear);
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
      const trigger = e.target.closest(".channel-box-btn");
      if (trigger) {
        e.stopPropagation();
        openPatchModal(
          trigger.dataset.appKey,
          trigger.dataset.patchKey,
          trigger.dataset.channel || "all",
          trigger.dataset.variant || "all"
        );
        return;
      }

      const card = e.target.closest(".app-card");
      if (card) {
        const isSummaryClick = e.target.closest(".app-card-summary");
        const isOpen = card.classList.contains("open");

        if (isSummaryClick || !isOpen) {
          if (!isOpen) {
            document.querySelectorAll(".app-card.open").forEach(c => {
              if (c !== card) c.classList.remove("open");
            });
            card.classList.add("open");

            setTimeout(() => {
              const rect = card.getBoundingClientRect();
              if (rect.top < 20 || rect.height > window.innerHeight) {
                window.scrollBy({ top: rect.top - 20, behavior: "smooth" });
              } else if (rect.bottom > window.innerHeight) {
                window.scrollBy({ top: rect.bottom - window.innerHeight + 20, behavior: "smooth" });
              }
            }, 360);
          } else {
            card.classList.remove("open");
          }
        }
      }
    });
  }

  // Downloads Modal Filter Delegate
  if (DOM.patchModal) {
    DOM.patchModal.addEventListener("click", (e) => {
      const card = e.target.closest(".modal-build-card");
      if (card) {
        const isHeaderClick = e.target.closest(".modal-build-header");
        const isOpen = card.classList.contains("open");
        const isInteractive = e.target.closest("a, button, .patch-applied-btn");

        if (isHeaderClick || (!isOpen && !isInteractive)) {
          if (!isOpen) {
            const modalBody = card.closest(".modal-body");
            if (modalBody) {
              modalBody.querySelectorAll(".modal-build-card.open").forEach(c => {
                if (c !== card) c.classList.remove("open");
              });
            }
            card.classList.add("open");

            setTimeout(() => {
              const modalBody = card.closest(".modal-body");
              if (modalBody) {
                const containerRect = modalBody.getBoundingClientRect();
                const rect = card.getBoundingClientRect();

                const offsetTop = rect.top - containerRect.top;
                const offsetBottom = rect.bottom - containerRect.bottom;

                if (offsetTop < 0 || rect.height > containerRect.height) {
                  modalBody.scrollBy({ top: offsetTop - 8, behavior: "smooth" });
                } else if (offsetBottom > 0) {
                  modalBody.scrollBy({ top: offsetBottom + 8, behavior: "smooth" });
                }
              }
            }, 360);
          } else if (isHeaderClick) {
            card.classList.remove("open");
          }
          if (isHeaderClick || !isInteractive) return;
        }
      }

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



}

function syncUrlParams() {
  const url = new URL(window.location);
  if (searchTerm) url.searchParams.set("q", searchTerm);
  else url.searchParams.delete("q");

  if (sortMode !== "recent") url.searchParams.set("sort", sortMode);
  else url.searchParams.delete("sort");

  history.replaceState(null, "", url);
}

// Clean up legacy localStorage catalog caches
try {
  localStorage.removeItem("data_cache");
  localStorage.removeItem("data_cache_time");
  localStorage.removeItem("catalog_cache");
  localStorage.removeItem("catalog_cache_time");
} catch {}

// Data Loader (Pure data.json, zero legacy fallbacks)
async function loadReleases() {
  try {
    setPillState("checking", "Checking for updates...");

    if (DOM.loading) DOM.loading.style.display = "block";
    if (DOM.error) DOM.error.style.display = "none";

    const dataResp = await fetch("data.json");
    if (!dataResp.ok) throw new Error(`Failed to load data.json (${dataResp.status})`);
    const data = await dataResp.json();

    if (data.config) applyConfig(data.config);
    cachedFullCatalog = Array.isArray(data.apps) ? data.apps : (Array.isArray(data) ? data : []);
    dynamicAppFilters = getDynamicAppFilters(cachedFullCatalog);

    if (DOM.loading) DOM.loading.style.display = "none";
    updateLastUpdateTimestamp(data.updated_at);
    filterAndRenderReleases();
  } catch (error) {
    console.error("Error loading data:", error);
    setPillState("error", "Failed to load data");
    if (DOM.loading) DOM.loading.style.display = "none";
    if (DOM.error) {
      DOM.error.style.display = "block";
      DOM.error.textContent = `Failed to load data: ${error.message}`;
    }
  }
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
      const key = normalizeForSearch(app.appKey);
      const nameWithPlus = normalizeForSearch((app.appName || "").replace(/\+/g, "plus"));
      const keywords = CONFIG.appCategories[appCategoryFilter];
      const includes = keywords.filter((k) => !k.startsWith("!"));
      const excludes = keywords.filter((k) => k.startsWith("!")).map((k) => k.slice(1));
      const isIncluded = includes.some(
        (keyword) => name.includes(keyword) || key.includes(keyword) || nameWithPlus.includes(keyword)
      );
      const isExcluded = excludes.some(
        (keyword) => name.includes(keyword) || key.includes(keyword) || nameWithPlus.includes(keyword)
      );
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

// Render App Cards Directly
function renderAppCards(apps) {
  if (!DOM.builds) return;
  currentAppCatalog = apps;

  if (apps.length === 0) {
    DOM.builds.innerHTML = '<div class="no-results">No applications found matching your criteria.</div>';
    return;
  }

  DOM.builds.innerHTML = apps.map((app) => createAppCard(app)).join("");
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
    <div class="build-card app-card">
      <div class="app-card-summary" role="button" tabindex="0">
        <div class="app-title-group">
          <div class="app-name">${escapeHtml(app.appName)}</div>
        </div>
        <div class="app-badge-group">
          ${dlBadge}
          <svg class="app-card-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>
      <div class="app-card-body-wrapper">
        <div class="app-card-body">
          <div class="app-card-body-inner">
            ${noticesMarkup}
            <div class="patches-list">
              ${patchesMarkup}
            </div>
          </div>
        </div>
      </div>
    </div>
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
  return (value || "").replace(/\b[a-z]/g, (char) => char.toUpperCase());
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
      if (modalVariantFilter && modalVariantFilter !== "all") {
        const bVar = b.variantKey || "default";
        if (bVar !== modalVariantFilter) continue;
      }
      if (b.releaseType === "stable") hasStable = true;
      if (b.releaseType === "beta") hasBeta = true;
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
    builds = builds.filter((b) => (b.variantKey || "default") === variantFilter);
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
            <span class="asset-title">${escapeHtml(app.appName)}</span>
            <span class="asset-subtitle">${escapeHtml(build.version || "Latest")} • ${escapeHtml(asset.fileType)}</span>
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
    <div class="modal-build-card ${openByDefault ? "open" : ""}">
      <div class="modal-build-header" role="button" tabindex="0">
        <div class="modal-build-header-left">
          <div class="modal-build-title">${titleText}</div>
          <div class="modal-build-date">${formatDate(build.publishedAt)}${build.isArchive ? "" : ` • ${escapeHtml(build.version)}`}</div>
        </div>
        <div class="modal-build-header-right">
          <span class="badge-group">
            ${build.isArchive ? `<span class="release-badge archive">Archive</span>` : ""}
          </span>
        </div>
      </div>
      <div class="app-card-body-wrapper">
        <div class="modal-build-downloads">
          <div class="modal-build-downloads-inner">
            ${downloadsMarkup}
            ${patchInfoBanner}
          </div>
        </div>
      </div>
    </div>
  `;
}

function closePatchModal() {
  hideModal(DOM.patchModal);
}

// Applied Patches Modal Controller
function openAppliedPatchesModal(appKey, patchKey, buildKey) {
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

  let pNames = null;
  let clUrl = null;
  let appliedPatches = Array.isArray(build?.appliedPatches) && build.appliedPatches.length > 0 ? build.appliedPatches : null;

  if (build && build.patchMeta) {
    const allPatches = Array.isArray(build.patchMeta.patches) ? build.patchMeta.patches : (build.patchMeta.patches ? [build.patchMeta.patches] : []);
    const allChangelogs = Array.isArray(build.patchMeta.changelogs) ? build.patchMeta.changelogs : (build.patchMeta.changelogs ? [build.patchMeta.changelogs] : []);

    const pKey = normalizeForSearch(patch.patchKey || patch.patchName || "");
    const vKey = normalizeForSearch(build.variantKey || "");

    const matchedIndices = [];
    allPatches.forEach((name, idx) => {
      const lower = name.toLowerCase();
      if (vKey === "adobo" && (lower.includes("adobo") || lower.includes("jkenneth"))) {
        matchedIndices.push(idx);
      } else if (vKey === "piko" && lower.includes("piko")) {
        matchedIndices.push(idx);
      } else if (pKey === "morphe" && lower.includes("morphe") && !lower.includes("adobo") && !lower.includes("jkenneth")) {
        matchedIndices.push(idx);
      } else if (pKey === "revanced" && lower.includes("revanced") && !lower.includes("extended") && !lower.includes("advanced") && !lower.includes("anddea") && !lower.includes("rvx")) {
        matchedIndices.push(idx);
      } else if ((pKey === "rvx" || pKey === "revancedextended") && (lower.includes("inotia00") || lower.includes("rvx") || lower.includes("extended"))) {
        matchedIndices.push(idx);
      } else if ((pKey === "anddea" || pKey === "revancedadvanced") && (lower.includes("anddea") || lower.includes("advanced"))) {
        matchedIndices.push(idx);
      } else if (pKey === "instafel" && lower.includes("instafel")) {
        matchedIndices.push(idx);
      }
    });

    if (matchedIndices.length > 0) {
      pNames = matchedIndices.map((i) => allPatches[i]);
      clUrl = matchedIndices.map((i) => allChangelogs[i] || allChangelogs[0] || "");
    } else {
      pNames = allPatches;
      clUrl = allChangelogs;
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

  const rawSlug = app?.appKey || normalizeForSearch(app?.appName || "app");
  const rawPatch = patch?.patchKey || normalizeForSearch(patch?.patchName || "patch");

  const isSpecificVariant = modalVariantFilter && modalVariantFilter !== "default" && modalVariantFilter !== "all";

  const activeVariant = patch?.variants?.find((v) => v.variantKey === (modalVariantFilter || "default")) || patch?.variants?.[0];
  let regexPattern = activeVariant?.apkFilter;
  if (!regexPattern) {
    regexPattern = isSpecificVariant
      ? `^${rawSlug}-${rawPatch}-${modalVariantFilter}-v.*\\.apk$`
      : `^${rawSlug}-${rawPatch}-v.*\\.apk$`;
  }

  const mainBuild = patch?.builds?.[0];
  const mainPackageId = activeVariant?.package_name || mainBuild?.package_name || getAppPackageId(app, patch, modalVariantFilter || "default");
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
      const vRegex = v.apkFilter || (v.variantKey === "default"
        ? `^${rawSlug}-${rawPatch}-v.*\\.apk$`
        : `^${rawSlug}-${rawPatch}-${v.variantKey}-v.*\\.apk$`);
      const vLabel = `${app.appName} (${patch.patchName} - ${v.variantName})`;
      const vBuild = patch.builds?.find((b) => b.variantKey === v.variantKey);
      const vPackageId = v.package_name || vBuild?.package_name || getAppPackageId(app, patch, v.variantKey);

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
          <div style="font-size: 0.82rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 4px; display: flex; flex-direction: column;">
            <span>${escapeHtml(vLabel)}</span>
            ${vPackageId ? `<span style="font-family: monospace; opacity: 0.8; font-weight: normal; margin-top: 2px; cursor: pointer; width: fit-content; word-break: break-all;" onclick="copyToClipboard('${escapeHtml(vPackageId)}', 'Package ID copied!')" title="Click to copy Package ID">${escapeHtml(vPackageId)}</span>` : ''}
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
      <div style="margin-top: 6px;">
        ${mainPackageId ? `
        <div style="font-size: 0.82rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 4px; display: flex; flex-direction: column;">
          <span style="font-family: monospace; opacity: 0.8; font-weight: normal; cursor: pointer; width: fit-content; word-break: break-all;" onclick="copyToClipboard('${escapeHtml(mainPackageId)}', 'Package ID copied!')" title="Click to copy Package ID">${escapeHtml(mainPackageId)}</span>
        </div>
        ` : ''}
        <div class="instruction-code">
          <code>${escapeHtml(regexPattern)}</code>
          ${mainOneClickUrl ? `<a href="${mainOneClickUrl}" class="obtainium-add-btn" target="_blank" rel="noopener noreferrer">Add to Obtainium</a>` : ''}
          <button class="copy-btn" onclick="copyToClipboard('${escapeHtml(regexPattern)}', 'Regex copied!')" type="button">Copy</button>
        </div>
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
  const normVar = (variantKey || "").toLowerCase();
  const matchingBuild =
    patch?.builds?.find((b) => b.package_name && (normVar && normVar !== "default" ? b.variantKey === normVar : true)) ||
    patch?.builds?.find((b) => b.package_name) ||
    app?.patches?.flatMap((p) => p.builds || []).find((b) => b.package_name);

  return matchingBuild?.package_name || "";
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



function escapeHtml(text) {
  return String(text ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function updateLastUpdateTimestamp(updatedAt) {
  let latestTime = 0;
  if (updatedAt) {
    latestTime = new Date(updatedAt).getTime();
  } else if (cachedFullCatalog && cachedFullCatalog.length > 0) {
    latestTime = cachedFullCatalog.reduce((max, app) => {
      const t = typeof app.latestPublishedAt === "number" ? app.latestPublishedAt : new Date(app.latestPublishedAt).getTime();
      return t > max ? t : max;
    }, 0);
  }

  if (latestTime === 0) {
    setPillState("success", "Up to date");
    return;
  }

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
