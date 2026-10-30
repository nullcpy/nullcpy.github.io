/**
 * ==========================================
 * CONFIGURATION & CUSTOMIZATION
 * Edit these values to update the app catalog behavior, branding, and notices.
 * ==========================================
 */
const CONFIG = {
  "owner": "nullcpy",
  "repo": "rvb",
  "knownArchs": [
    "arm64-v8a", "arm64", "aarch64", "armeabi-v7a", "arm-v7a", "arm32", "arm", "x86_64", "x86", "universal", "all"
  ],
  "appCategories": {
    "Adobe": [
      "adobe"
    ],
    "Android TV": [
      "primevideo", "plutotv", "moviebox", "disneyplus", "disney", "hbomax", "tubi", "vix", "at4klauncher", "projectivylauncher", "peacock", "netflix", "nuvio"
    ],
    "Browser": [
      "browser", "edge"
    ],
    "Google": [
      "youtube", "google", "gboard"
    ],
    "Launcher": [
      "launcher", "at4klauncher", "projectivylauncher"
    ],
    "Meta": [
      "threads", "instagram", "messenger", "facebook", "!plusmessenger"
    ],
    "Social": ["threads", "instagram", "messenger", "facebook", "twitter", "tiktok", "telegram", "reddit", "pinterest", "tumblr"],
    "VPN": [
      "cloudflarewarp", "vpnify", "vpn"
    ],
    "YouTube": [
      "youtube"
    ],
  },
  "appNotices": [
    {
      "triggers": [
        "youtube",
        "google"
      ],
      "color": "accent",
      "title": "Login Issue",
      "text": "Signing into Google account on APK (not Module) requires MicroG. Please install one from below before trying to sign in.",
      "links": [
        {
          "label": "Morphe",
          "url": "https://github.com/MorpheApp/MicroG-RE/releases/latest"
        },
        {
          "label": "ReVanced",
          "url": "https://github.com/ReVanced/GmsCore/releases/latest"
        }
      ]
    },
    {
      "triggers": [
        "twitter"
      ],
      "color": "warning",
      "title": "Login Issue",
      "text": "Since October 2025, Twitter has started checking whether the app is modified or if phone integrity fails during login.",
      "links": [
        {
          "label": "Workarounds",
          "url": "https://t.me/pikopatches/1/59772"
        }
      ]
    }
  ],
  // Header dropdown menus (GitHub / Donate / Social)
  "links": {
    "github": [
      { "label": "Builder Repo", "url": "https://github.com/nullcpy/rvb" },
      { "label": "Website Repo", "url": "https://github.com/nullcpy/nullcpy.github.io" },
      { "label": "Build Archive", "url": "https://nullcpy.github.io/archive" },
      { "label": "Report an Issue", "url": "https://github.com/nullcpy/rvb/issues/new/choose" }
    ],
    "donate": [
      { "label": "Patreon", "url": "https://www.patreon.com/cw/fahim_ahmed" },
      { "label": "Skrill", "copy": "fahim.ahmed1453@gmail.com", "copyMessage": "Skrill email copied!" },
      { "label": "Pathao Pay", "url": "https://pathaopay.me/@fahim.ahmed" }
    ],
    "telegram": [
      { "label": "Telegram Group", "url": "https://t.me/nullstoretg" },
      { "label": "Telegram Channel", "url": "https://t.me/nullstore_updates" },
      { "label": "Discord Server", "url": "https://discord.gg/d4VHpybpQq" }
    ],
    "theme": [
      { "label": "System", "action": "system" },
      { "label": "Light", "action": "light" },
      { "label": "Dark", "action": "dark" }
    ]
  }
};


// Sort options for the header-style sort popup
const SORT_ICONS = {
  recent:
    '<svg class="sort-opt-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>',
  popular:
    '<svg class="sort-opt-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>',
  name:
    '<svg class="sort-opt-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>',
};

const SORT_OPTIONS = [
  { value: "recent", label: "Recent", icon: SORT_ICONS.recent },
  { value: "popular", label: "Popular", icon: SORT_ICONS.popular },
  { value: "name", label: "Name", icon: SORT_ICONS.name },
];

// Shared "external link" arrow used on link buttons (dropdown items, patch links)
const EXTERNAL_LINK_ARROW =
  '<svg class="patch-link-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>';

// Dropdown-scoped glyphs, sized to match each other via .dropdown-link-icon in style.css.
// Uses the SAME arrow glyph as the rest of the site (EXTERNAL_LINK_ARROW), just at the
// matched dropdown size — no redesign of the icon itself.
const EXTERNAL_LINK_ICON =
  '<svg class="dropdown-link-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>';
const COPY_ICON =
  '<svg class="dropdown-link-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
const COPIED_CHECK_ICON =
  '<svg class="dropdown-link-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>';

// Cached DOM references
const DOM = {};

function initDOM() {
  DOM.builds = document.getElementById("builds");
  DOM.loading = document.getElementById("loading");
  DOM.error = document.getElementById("error");
  DOM.searchInput = document.getElementById("searchInput");
  DOM.searchWrap = DOM.searchInput?.closest(".search-input-wrap");
  DOM.searchClearBtn = document.getElementById("searchClearBtn");
  DOM.sortDropdown = document.getElementById("sortDropdown");
  DOM.sortTrigger = document.getElementById("sortTrigger");
  DOM.sortTriggerIcon = document.getElementById("sortTriggerIcon");
  DOM.sortMenu = document.getElementById("sortMenu");
  DOM.appFilterButtons = document.getElementById("appFilterButtons");
  DOM.catalogCountText = document.getElementById("catalogCountText");
  DOM.lastUpdateText = document.getElementById("lastUpdateText");
  DOM.themeBtn = document.getElementById("themeMenuBtn");
  DOM.headerMenus = ["github", "donate", "telegram", "theme"].map((key) => ({
    key,
    wrap: document.getElementById(`${key}MenuWrap`),
    trigger: document.getElementById(`${key}MenuBtn`),
    menu: document.getElementById(`${key}Menu`),
  }));
  DOM.patchModal = document.getElementById("patchModal");
  DOM.patchModalTitle = document.getElementById("patchModalTitle");
  DOM.patchModalBody = document.getElementById("patchModalBody");
  DOM.appliedPatchesModal = document.getElementById("appliedPatchesModal");
  DOM.appliedPatchesTitle = document.getElementById("appliedPatchesTitle");
  DOM.appliedPatchesMeta = document.getElementById("appliedPatchesMeta");
  DOM.appliedPatchesBody = document.getElementById("appliedPatchesBody");
  DOM.patchSearchInput = document.getElementById("patchSearchInput");
  DOM.patchSearchWrap = DOM.patchSearchInput?.closest(".patch-search-input-wrap");
  DOM.patchSearchClearBtn = document.getElementById("patchSearchClearBtn");
  DOM.patchCountBadge = document.getElementById("patchCountBadge");
  DOM.patchArchPills = document.getElementById("patchArchPills");
  DOM.obtainiumModal = document.getElementById("obtainiumModal");
  DOM.obtainiumTitle = document.getElementById("obtainiumTitle");
  DOM.obtainiumBody = document.getElementById("obtainiumBody");
  DOM.obtainiumBtn = document.getElementById("obtainiumBtn");
  DOM.toastNotification = document.getElementById("toastNotification");
  DOM.themeColorMeta = document.getElementById("themeColorMeta");
}

// Variant & Label Formatting Helpers
function formatVariantLabel(variant, subVariant) {
  const toTitleCase = (str) =>
    str ? str.replace(/\b[a-z]/g, (c) => c.toUpperCase()) : "";
  if (variant && subVariant) return `${variant} • ${toTitleCase(subVariant)}`;
  if (variant) return variant;
  if (subVariant) return toTitleCase(subVariant);
  return "Standard";
}

function getObtainiumAppLabel(appName, brandName, variant, subVariant) {
  const parts = [brandName];
  if (variant) parts.push(variant);
  if (subVariant) {
    const toTitleCase = (str) =>
      str ? str.replace(/\b[a-z]/g, (c) => c.toUpperCase()) : "";
    parts.push(toTitleCase(subVariant));
  }
  return `${appName} (${parts.join(" • ")})`;
}

// State
let cachedFullCatalog = [];
let cachedPatchSets = []; // Shared top-level appliedPatches table (schema v2 dedup)
let cachedChangelogSets = []; // Shared top-level changelogs table (schema v2 dedup)
let cachedPatchSourceSets = []; // Shared top-level patchSources table (schema v2 dedup)
let searchTerm = "";
let appCategoryFilter = "all";
let sortMode = "recent"; // "recent" | "popular" | "name"
let currentAppCatalog = [];
let activeModalAppKey = null;
let activeModalBrandKey = null;
let modalBuildFilter = "all";
let modalSelectedVariant = null;
let modalSelectedSubVariant = null;
let themeMode = "system";
let activeAppliedPatchesList = [];
let activePatchMedia = null; // { apk: [...], module: [...] } when one build carries both patch sets
let modalActiveMedium = "all"; // "all" | "apk" | "module" within the Applied Patches modal
let modalActiveArch = null; // arch pill currently active within the Applied Patches modal
let appliedPatchesCtx = null; // { app, brand, build, arch } kept so the pills can re-resolve

// Stoplist Threshold


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
    updateSortUI();
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
    const label = `Theme: ${theme}`;
    DOM.themeBtn.setAttribute("aria-label", label);
    DOM.themeBtn.setAttribute("title", label);
  }

  updateThemeMenuIndicator(theme);
}

// Mark the active theme option with a pointer on the right
function updateThemeMenuIndicator(theme) {
  document.querySelectorAll("#themeMenu [data-theme]").forEach((el) => {
    const indicator = el.querySelector(".dropdown-item-indicator");
    if (indicator) indicator.textContent = el.dataset.theme === theme ? "👈" : "";
  });
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

  // Header Dropdown Menus (GitHub / Donate / Telegram / Theme)
  setupHeaderMenus();

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

  // Sort Dropdown (header-style popup)
  setupSortDropdown();

  // App Cards & Modal Delegate Click
  if (DOM.builds) {
    DOM.builds.addEventListener("click", (e) => {
      const trigger = e.target.closest(".channel-box-btn");
      if (trigger) {
        e.stopPropagation();
        openPatchModal(
          trigger.dataset.appKey,
          trigger.dataset.brandKey,
          trigger.dataset.channel || "all",
          trigger.dataset.variant || null,
          trigger.dataset.subVariant || null
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
            ensureAppCardBody(card);
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
        if (filterBtn.classList.contains("variant-pill-btn")) {
          modalSelectedVariant = filterBtn.dataset.variant || null;
          const app = currentAppCatalog.find((item) => item.appKey === activeModalAppKey);
          const brand = app ? (app.brands || []).find((item) => item.brandKey === activeModalBrandKey) : null;
          if (brand && brand.variants) {
            const validSubs = brand.variants
              .filter((v) => (v.variant || null) === modalSelectedVariant)
              .map((v) => v.subVariant || null);
            if (!validSubs.includes(modalSelectedSubVariant)) {
              modalSelectedSubVariant = validSubs[0] || null;
            }
          }
        } else if (filterBtn.classList.contains("subvariant-pill-btn")) {
          modalSelectedSubVariant = filterBtn.dataset.subVariant || null;
        } else {
          modalBuildFilter = filterBtn.dataset.filter;
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
          appliedTrigger.dataset.brandKey,
          appliedTrigger.dataset.buildId,
          appliedTrigger.dataset.variant || null,
          appliedTrigger.dataset.subVariant || null,
          appliedTrigger.dataset.build || null,
          appliedTrigger.dataset.releaseId || null,
          appliedTrigger.dataset.arch || null
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
      const archBtn = e.target.closest(".patch-arch-btn");
      if (archBtn && appliedPatchesCtx) {
        appliedPatchesCtx.arch = archBtn.dataset.arch || null;
        modalActiveArch = appliedPatchesCtx.arch;
        reresolveAppliedPatches();
        filterAppliedPatchesList(DOM.patchSearchInput?.value || "");
        return;
      }

      const mediumBtn = e.target.closest(".patch-medium-btn");
      if (mediumBtn) {
        modalActiveMedium = mediumBtn.dataset.medium || "all";
        updateMediumPillsUI();
        filterAppliedPatchesList(DOM.patchSearchInput?.value || "");
        return;
      }

      if (e.target.id === "appliedPatchesModal" || e.target.closest(".modal-close")) {
        closeAppliedPatchesModal();
      }
    });
  }

  if (DOM.patchSearchInput) {
    DOM.patchSearchInput.addEventListener("input", (e) => {
      syncPatchClearBtn();
      filterAppliedPatchesList(e.target.value);
    });
  }

  if (DOM.patchSearchClearBtn && DOM.patchSearchInput) {
    const handlePatchClear = (e) => {
      e.preventDefault();
      if (DOM.patchSearchInput.value === "") return;
      DOM.patchSearchInput.value = "";
      syncPatchClearBtn();
      filterAppliedPatchesList("");
    };
    DOM.patchSearchClearBtn.addEventListener("pointerdown", handlePatchClear);
    DOM.patchSearchClearBtn.addEventListener("click", handlePatchClear);
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
      closeHeaderMenus();
      closeSortDropdown();
    }
  });



}

// Header Dropdown Menus (GitHub / Donate / Telegram / Theme)
function closeHeaderMenus() {
  (DOM.headerMenus || []).forEach(({ wrap, trigger }) => {
    wrap?.classList.remove("open");
    trigger?.setAttribute("aria-expanded", "false");
  });
}

function setupHeaderMenus() {
  (DOM.headerMenus || []).forEach(({ key, wrap, trigger, menu }) => {
    if (!trigger || !menu) return;

    // Build items from CONFIG.links: url → external link, copy → clipboard button, action → in-page button
    menu.replaceChildren(
      ...(CONFIG.links[key] || []).map((item) => {
        const makeItem = (tag) => {
          const el = document.createElement(tag);
          el.className = "dropdown-item";
          const label = document.createElement("span");
          label.className = "dropdown-item-label";
          label.textContent = item.label;
          el.appendChild(label);
          return el;
        };

        // Trailing icon (external-link arrow / copy glyph) pushed to the right by the flex label
        const appendTrailingIcon = (el, svg) => {
          const icon = document.createElement("span");
          icon.className = "dropdown-item-icon";
          icon.innerHTML = svg;
          el.appendChild(icon);
          return icon;
        };

        if (item.action) {
          const btn = makeItem("button");
          btn.type = "button";
          btn.dataset.theme = item.action;
          const indicator = document.createElement("span");
          indicator.className = "dropdown-item-indicator";
          btn.appendChild(indicator);
          btn.addEventListener("click", (e) => {
            e.stopPropagation();
            themeMode = item.action;
            localStorage.setItem("theme", item.action);
            applyTheme(item.action);
            closeHeaderMenus();
          });
          return btn;
        }

        // Clipboard entry (e.g. Skrill email): copy icon, flashes a check on success, no navigation
        if (item.copy) {
          const btn = makeItem("button");
          btn.type = "button";
          btn.title = `Copy ${item.copy}`;
          const icon = appendTrailingIcon(btn, COPY_ICON);
          btn.addEventListener("click", (e) => {
            e.stopPropagation();
            copyToClipboard(item.copy, item.copyMessage || `${item.label} copied!`);
            icon.innerHTML = COPIED_CHECK_ICON;
            clearTimeout(icon._restoreTimer);
            icon._restoreTimer = setTimeout(() => {
              icon.innerHTML = COPY_ICON;
            }, 1400);
          });
          return btn;
        }

        const a = makeItem("a");
        a.href = item.url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        appendTrailingIcon(a, EXTERNAL_LINK_ICON);
        return a;
      })
    );

    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      const wasOpen = wrap?.classList.contains("open");
      closeHeaderMenus();
      closeSortDropdown();
      if (!wasOpen && wrap) {
        wrap.classList.add("open");
        trigger.setAttribute("aria-expanded", "true");
      }
    });
  });

  // Single outside-click handler for all header menus
  document.addEventListener("click", (e) => {
    const anyOpen = (DOM.headerMenus || []).some(({ wrap }) => wrap?.classList.contains("open"));
    if (anyOpen && !(DOM.headerMenus || []).some(({ wrap }) => wrap?.contains(e.target))) {
      closeHeaderMenus();
    }
  });

  // Reflect the current theme in the freshly built menu
  updateThemeMenuIndicator(themeMode);
}

// Sort Dropdown (header-style popup)
function closeSortDropdown() {
  DOM.sortDropdown?.classList.remove("open");
  DOM.sortTrigger?.setAttribute("aria-expanded", "false");
}

function updateSortUI() {
  const opt = SORT_OPTIONS.find((o) => o.value === sortMode) || SORT_OPTIONS[0];
  if (DOM.sortTriggerIcon) DOM.sortTriggerIcon.innerHTML = opt.icon;
  if (DOM.sortTrigger) {
    const desc = `Sort by: ${opt.label}`;
    DOM.sortTrigger.setAttribute("aria-label", desc);
    DOM.sortTrigger.setAttribute("title", desc);
  }
  document.querySelectorAll("#sortMenu [data-sort]").forEach((el) => {
    const indicator = el.querySelector(".dropdown-item-indicator");
    if (indicator) indicator.textContent = el.dataset.sort === sortMode ? "👈" : "";
  });
}

function setSortMode(value) {
  sortMode = value;
  updateSortUI();
  syncUrlParams();
  filterAndRenderReleases();
}

function setupSortDropdown() {
  const { sortDropdown, sortTrigger, sortMenu } = DOM;
  if (!sortDropdown || !sortTrigger || !sortMenu) return;

  sortMenu.replaceChildren(
    ...SORT_OPTIONS.map((opt) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "dropdown-item";
      btn.dataset.sort = opt.value;

      const icon = document.createElement("span");
      icon.className = "dropdown-item-icon";
      icon.innerHTML = opt.icon;

      const label = document.createElement("span");
      label.className = "dropdown-item-label";
      label.textContent = opt.label;

      const indicator = document.createElement("span");
      indicator.className = "dropdown-item-indicator";

      btn.append(icon, label, indicator);
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        setSortMode(opt.value);
        closeSortDropdown();
      });
      return btn;
    })
  );

  sortTrigger.addEventListener("click", (e) => {
    e.stopPropagation();
    const wasOpen = sortDropdown.classList.contains("open");
    closeHeaderMenus();
    closeSortDropdown();
    if (!wasOpen) {
      sortDropdown.classList.add("open");
      sortTrigger.setAttribute("aria-expanded", "true");
    }
  });

  document.addEventListener("click", (e) => {
    if (sortDropdown.classList.contains("open") && !sortDropdown.contains(e.target)) {
      closeSortDropdown();
    }
  });

  updateSortUI();
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
} catch { }

// Data Loader (Pure data.json, zero legacy fallbacks)
async function loadReleases() {
  try {
    setPillState("checking", "Checking for updates...");

    if (DOM.loading) DOM.loading.style.display = "block";
    if (DOM.error) DOM.error.style.display = "none";

    const dataResp = await fetch("data.json");
    if (!dataResp.ok) throw new Error(`Failed to load data.json (${dataResp.status})`);
    const data = await dataResp.json();

    cachedFullCatalog = Array.isArray(data.apps) ? data.apps : (Array.isArray(data) ? data : []);
    cachedPatchSets = Array.isArray(data.patchSets) ? data.patchSets : [];
    cachedChangelogSets = Array.isArray(data.changelogSets) ? data.changelogSets : [];
    cachedPatchSourceSets = Array.isArray(data.patchSourceSets) ? data.patchSourceSets : [];
    // Warm the normalized search index once so the first keystroke is instant.
    cachedFullCatalog.forEach(getSI);

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
  renderCategoryFilterButtons();

  if (
    appCategoryFilter !== "all" &&
    !CONFIG.appCategories[appCategoryFilter]
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
    (a.brands || []).forEach((b) => {
      totalBuilds += (b.builds || []).length;
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
  const keywords = CONFIG.appCategories[appCategoryFilter];
  if (!keywords) return apps;

  const includes = keywords.filter((k) => !k.startsWith("!"));
  const excludes = keywords.filter((k) => k.startsWith("!")).map((k) => k.slice(1));

  return apps.filter((app) => {
    const si = getSI(app);
    const hit = (kw) => si.name.includes(kw) || si.key.includes(kw) || si.namePlus.includes(kw);
    const isIncluded = includes.some(hit);
    const isExcluded = excludes.some(hit);
    return isIncluded && !isExcluded;
  });
}

// O(1) Instant Property Comparisons
function applySortMode(apps) {
  if (sortMode === "popular") {
    return [...apps].sort((a, b) => (b.totalDownloads || 0) - (a.totalDownloads || 0));
  }
  if (sortMode === "name") {
    return [...apps].sort((a, b) => (a.appName || "").localeCompare(b.appName || ""));
  }
  // Default: recent (safely handles epoch timestamps, ISO strings, and null/undefined)
  const toTimestamp = (val) => (typeof val === "number" ? val : Date.parse(val) || 0);
  return [...apps].sort((a, b) => toTimestamp(b.latestPublishedAt) - toTimestamp(a.latestPublishedAt));
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

// ---- Precomputed search index -------------------------------------------
// Normalization (regex strip + word splitting + per-brand/variant tables) is
// computed once per app at load time and cached on the app object as `_si`,
// so live search/typing only performs cheap substring scans instead of
// re-normalizing the entire catalog on every keystroke.
function precomputeAppSearchData(app) {
  return {
    name: normalizeForSearch(app.appName),
    key: normalizeForSearch(app.appKey),
    namePlus: normalizeForSearch((app.appName || "").replace(/\+/g, "plus")),
    words: (app.appName || "").toLowerCase().split(/[^a-z0-9]+/).filter(Boolean),
    brands: (app.brands || []).map((b) => ({
      n: normalizeForSearch(b.brandName || b.patchName),
      vs: (b.variants || []).map((v) => ({
        v: v.variant ? normalizeForSearch(v.variant) : null,
        s: v.subVariant ? normalizeForSearch(v.subVariant) : null,
        p: v.packageName ? normalizeForSearch(v.packageName) : null,
      })),
    })),
  };
}

function getSI(app) {
  return app._si || (app._si = precomputeAppSearchData(app));
}

// Category names / include-keywords are static (from CONFIG), so normalize them once.
let categorySearchIndex = null;
function getCategoryIndex() {
  if (categorySearchIndex) return categorySearchIndex;
  categorySearchIndex = Object.entries(CONFIG.appCategories || {}).map(([catName, keywords]) => ({
    nameNorm: normalizeForSearch(catName),
    includes: keywords.filter((k) => !k.startsWith("!")),
  }));
  return categorySearchIndex;
}

function getAppSearchScore(app, query) {
  const q = normalizeForSearch(query);
  if (!q) return Infinity;

  const si = getSI(app);
  const appName = si.name;
  const appKey = si.key;

  // 1. Exact match
  if (appName === q || appKey === q) return 0;

  // 2. Prefix match
  if (appName.startsWith(q) || appKey.startsWith(q)) return 1;

  // 3. Word match on app name
  const appWords = si.words;
  if (appWords.some((w) => w === q)) return 2;
  if (appWords.some((w) => w.startsWith(q))) return 3;

  // 4. Substring match on app name/key
  if (appName.includes(q) || appKey.includes(q)) return 4;

  // 5. Match Brand, Variant, Sub-Variant, or Package Name
  for (const b of si.brands) {
    if (b.n.includes(q)) return 5;
    for (const v of b.vs) {
      if (v.v && v.v.includes(q)) return 6;
      if (v.s && v.s.includes(q)) return 6;
      if (v.p && v.p.includes(q)) return 7;
    }
  }

  // 6. Match Category names or matching category keywords
  for (const cat of getCategoryIndex()) {
    if (cat.nameNorm.includes(q)) {
      if (cat.includes.some((kw) => appName.includes(kw) || appKey.includes(kw) || si.namePlus.includes(kw))) {
        return 5;
      }
    }
  }

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

  DOM.builds.innerHTML = apps.map((app, index) => createAppCard(app, index)).join("");
}

// Create App Card shell (summary only). The heavy brand/variant body is built
// lazily on first expand (see ensureAppCardBody) so the initial DOM stays small
// -- 118 collapsed summaries instead of 118 fully-expanded trees.
function createAppCard(app, index) {
  const totalDownloads = app.totalDownloads || 0;
  const dlBadge = `<span class="patch-stat-badge" title="${totalDownloads.toLocaleString()} Total Downloads">📥 ${formatCompactNumber(totalDownloads)}</span>`;

  return `
    <div class="build-card app-card" data-app-index="${index}">
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
          <div class="app-card-body-inner"></div>
        </div>
      </div>
    </div>
  `;
}

// Build the expandable body content (notices + brand/variant matrix) on demand.
function buildAppCardBody(app) {
  const toTimestamp = (val) => (typeof val === "number" ? val : Date.parse(val) || 0);
  let brands = [...(app.brands || [])];
  if (sortMode === "popular") {
    brands.sort((a, b) => (b.totalDownloads || 0) - (a.totalDownloads || 0));
  } else if (sortMode === "name") {
    brands.sort((a, b) => (a.brandName || "").localeCompare(b.brandName || ""));
  } else {
    // Default: recent — newest latestPublishedAt first
    brands.sort((a, b) => toTimestamp(b.latestPublishedAt) - toTimestamp(a.latestPublishedAt));
  }
  const brandsMarkup = brands
    .map((brand) => createBrandMarkup(app, brand))
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

  return `
    ${noticesMarkup}
    <div class="brands-list">
      ${brandsMarkup}
    </div>
  `;
}

// Populate a card's body the first time it is expanded, then mark it loaded.
function ensureAppCardBody(card) {
  if (card.dataset.bodyLoaded === "1") return;
  const app = currentAppCatalog[Number(card.dataset.appIndex)];
  const inner = card.querySelector(".app-card-body-inner");
  if (app && inner) {
    inner.innerHTML = buildAppCardBody(app);
    // Force layout so the collapse->expand transition animates from 0 height.
    void card.offsetHeight;
  }
  card.dataset.bodyLoaded = "1";
}

function getNoticeInlineStyles(notice) {
  const color = (notice.color || "").trim();
  if (!color && !notice.border && !notice.bg) return "";

  const presets = {
    accent: {
      color: "var(--accent)",
      border: "var(--border-hover)",
      bg: "linear-gradient(90deg, var(--accent-glow), transparent)",
    },
    info: {
      color: "var(--accent)",
      border: "var(--border-hover)",
      bg: "linear-gradient(90deg, var(--accent-glow), transparent)",
    },
    warning: {
      color: "var(--accent-warning)",
      border: "var(--accent-warning)",
      bg: "linear-gradient(90deg, rgba(250, 189, 47, 0.12), transparent)",
    },
    danger: {
      color: "var(--accent-danger)",
      border: "var(--accent-danger)",
      bg: "linear-gradient(90deg, rgba(244, 63, 94, 0.12), transparent)",
    },
    error: {
      color: "var(--accent-danger)",
      border: "var(--accent-danger)",
      bg: "linear-gradient(90deg, rgba(244, 63, 94, 0.12), transparent)",
    },
    success: {
      color: "var(--accent-stable)",
      border: "var(--accent-stable)",
      bg: "linear-gradient(90deg, var(--accent-stable-glow), transparent)",
    },
  };

  const pKey = color.toLowerCase();
  let mainColor = presets[pKey]?.color || notice.color;
  let borderColor = notice.border || presets[pKey]?.border || notice.color;
  let bgColor = notice.bg || presets[pKey]?.bg;

  if (!bgColor && mainColor) {
    if (mainColor.startsWith("#")) {
      const hex = mainColor.replace("#", "");
      let r = 0, g = 0, b = 0;
      if (hex.length === 3) {
        r = parseInt(hex[0] + hex[0], 16);
        g = parseInt(hex[1] + hex[1], 16);
        b = parseInt(hex[2] + hex[2], 16);
      } else if (hex.length === 6) {
        r = parseInt(hex.slice(0, 2), 16);
        g = parseInt(hex.slice(2, 4), 16);
        b = parseInt(hex.slice(4, 6), 16);
      }
      bgColor = `linear-gradient(90deg, rgba(${r}, ${g}, ${b}, 0.12), transparent)`;
    } else {
      bgColor = "linear-gradient(90deg, rgba(255, 255, 255, 0.06), transparent)";
    }
  }

  const styles = [];
  if (mainColor) styles.push(`--notice-color: ${mainColor}`);
  if (borderColor) styles.push(`--notice-border: ${borderColor}`);
  if (bgColor) styles.push(`--notice-bg: ${bgColor}`);

  return styles.length > 0 ? `style="${styles.join("; ")};"` : "";
}

function createNoticeMarkup(notice) {
  const linksMarkup = (notice.links || [])
    .map((link) => `<a href="${link.url}" target="_blank" rel="noopener noreferrer">${escapeHtml(link.label)}${EXTERNAL_LINK_ARROW}</a>`)
    .join(" ");

  const styleAttr = getNoticeInlineStyles(notice);

  return `
    <div class="app-notice" ${styleAttr}>
      <div class="app-notice-title">${escapeHtml(notice.title)}</div>
      <div class="app-notice-text">${escapeHtml(notice.text)}</div>
      ${linksMarkup ? `<div class="app-notice-links">${linksMarkup}</div>` : ""}
    </div>
  `;
}

// Compact version text for a build: "1.2.3" or "1.2.3 / 1.2.4 + 1" (no "v"
// prefix). A numbered build publishes each arch independently, so it can carry
// several versions; show at most two and fold the rest into a "+ N" overflow.
function formatVersions(versions, version) {
  const arr = Array.isArray(versions) && versions.length ? versions : (version ? [version] : []);
  if (arr.length <= 1) return arr[0] || "";
  const extra = arr.length - 2;
  return arr.slice(0, 2).join(" / ") + (extra > 0 ? ` + ${extra}` : "");
}

// Resolve a variant's channel pointer into display fields. data.json stores
// only the referenced build's id (schema v2, emitted by rebuild_catalog.py),
// which is looked up in brand.builds by (variant, subVariant, releaseType, build).
function resolveChannelPointer(brand, variant, channel) {
  const ptr = variant[channel === "beta" ? "latestBeta" : "latestStable"];
  if (!ptr) return null;
  const ref = String(ptr);
  const found = (brand.builds || []).find(
    (b) =>
      (b.variant || null) === (variant.variant || null) &&
      (b.subVariant || null) === (variant.subVariant || null) &&
      b.releaseType === channel &&
      String(b.build) === ref
  );
  if (!found) return null;
  return {
    version: found.version,
    versions: found.versions,
    build: found.build,
    publishedAt: found.publishedAt,
    isArchiveFallback: !!found.isArchive,
  };
}

// Create Brand Entry Markup with Multi-Channel Variant Matrix
function createBrandMarkup(app, brand) {
  const builds = brand.builds || [];
  const buildCount = builds.length;
  const buildIconBadge = `<span class="patch-stat-badge" title="${buildCount} total builds">📦 ${buildCount}</span>`;
  const downloadCount = brand.totalDownloads || 0;
  const downloadIconBadge = `<span class="patch-stat-badge" title="${downloadCount.toLocaleString()} total downloads">📥 ${formatCompactNumber(downloadCount)}</span>`;

  // Pin Standard (null/null) at top, sort the rest alphabetically by variant then subVariant.
  const sortedVariants = [...(brand.variants || [])].sort((a, b) => {
    const aIsStd = a.variant == null && a.subVariant == null;
    const bIsStd = b.variant == null && b.subVariant == null;
    if (aIsStd !== bIsStd) return aIsStd ? -1 : 1;
    const vc = (a.variant || "").localeCompare(b.variant || "");
    if (vc !== 0) return vc;
    return (a.subVariant || "").localeCompare(b.subVariant || "");
  });

  // Render variant rows
  const variantRowsHtml = sortedVariants
    .map((variant) => {
      const channelBoxes = [];
      const vLabel = formatVariantLabel(variant.variant, variant.subVariant);
      const varAttr = escapeHtml(variant.variant || "");
      const subVarAttr = escapeHtml(variant.subVariant || "");
      const brandKey = escapeHtml(brand.brandKey || "");

      const stablePtr = resolveChannelPointer(brand, variant, "stable");
      if (stablePtr) {
        channelBoxes.push(`
          <button class="channel-box-btn stable" 
                  data-app-key="${app.appKey}" 
                  data-brand-key="${brandKey}" 
                  data-channel="stable" 
                  data-variant="${varAttr}"
                  data-sub-variant="${subVarAttr}"
                  type="button"
                  title="Open Stable builds for ${escapeHtml(vLabel)}">
            <div class="channel-box-top">
              <span class="channel-tag stable">Stable</span>
              <span class="channel-date">${formatDate(stablePtr.publishedAt)}</span>
            </div>
            <span class="channel-version">${escapeHtml(formatVersions(stablePtr.versions, stablePtr.version))}</span>
            <span class="channel-build-num">${stablePtr.isArchiveFallback ? "Archive" : `Build ${escapeHtml(stablePtr.build)}`}</span>
          </button>
        `);
      }

      const betaPtr = resolveChannelPointer(brand, variant, "beta");
      if (betaPtr) {
        channelBoxes.push(`
          <button class="channel-box-btn beta" 
                  data-app-key="${app.appKey}" 
                  data-brand-key="${brandKey}" 
                  data-channel="beta" 
                  data-variant="${varAttr}"
                  data-sub-variant="${subVarAttr}"
                  type="button"
                  title="Open Beta builds for ${escapeHtml(vLabel)}">
            <div class="channel-box-top">
              <span class="channel-tag beta">Beta</span>
              <span class="channel-date">${formatDate(betaPtr.publishedAt)}</span>
            </div>
            <span class="channel-version">${escapeHtml(formatVersions(betaPtr.versions, betaPtr.version))}</span>
            <span class="channel-build-num">${betaPtr.isArchiveFallback ? "Archive" : `Build ${escapeHtml(betaPtr.build)}`}</span>
          </button>
        `);
      }

      if (channelBoxes.length === 0) {
        channelBoxes.push(`
          <button class="channel-box-btn archive" 
                  data-app-key="${app.appKey}" 
                  data-brand-key="${brandKey}" 
                  data-channel="all" 
                  data-variant="${varAttr}"
                  data-sub-variant="${subVarAttr}"
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
            <span class="variant-name-chip">${escapeHtml(vLabel)}</span>
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
          <span class="patch-engine-badge">${escapeHtml(brand.brandName)}</span>
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

// Category Filter Buttons Generator (Exclusively from CONFIG.appCategories)
function renderCategoryFilterButtons() {
  if (!DOM.appFilterButtons) return;

  DOM.appFilterButtons.querySelectorAll(".category-filter-btn").forEach((btn) => btn.remove());

  Object.keys(CONFIG.appCategories).forEach((catKey) => {
    const button = document.createElement("button");
    button.className = "filter-btn category-filter-btn";
    button.dataset.filter = catKey;
    button.type = "button";
    button.textContent = catKey;
    DOM.appFilterButtons.appendChild(button);
  });
}

// Download Modal Controller
function openPatchModal(appKey, brandKey, preferredChannel = "stable", preferredVariant = null, preferredSubVariant = null) {
  activeModalAppKey = appKey;
  activeModalBrandKey = brandKey;

  const app = currentAppCatalog.find((item) => item.appKey === activeModalAppKey);
  const brand = app ? (app.brands || []).find((item) => (item.brandKey) === activeModalBrandKey) : null;

  modalBuildFilter = preferredChannel === "beta" ? "beta" : "stable";

  if (brand && brand.variants && brand.variants.length > 0) {
    const validVariant = brand.variants.find((v) =>
      (v.variant || null) === (preferredVariant || null) &&
      (v.subVariant || null) === (preferredSubVariant || null)
    );
    if (validVariant) {
      modalSelectedVariant = validVariant.variant || null;
      modalSelectedSubVariant = validVariant.subVariant || null;
    } else {
      modalSelectedVariant = brand.variants[0].variant || null;
      modalSelectedSubVariant = brand.variants[0].subVariant || null;
    }
  } else {
    modalSelectedVariant = null;
    modalSelectedSubVariant = null;
  }

  renderOpenPatchModal();
  showModal(DOM.patchModal);
}

function renderOpenPatchModal() {
  const app = currentAppCatalog.find((item) => item.appKey === activeModalAppKey);
  const brand = app ? (app.brands || []).find((item) => (item.brandKey) === activeModalBrandKey) : null;

  if (!app || !brand) {
    closePatchModal();
    return;
  }

  if (DOM.patchModalTitle) {
    DOM.patchModalTitle.textContent = `${app.appName} • ${brand.brandName}`;
  }

  updateModalFilterButtons(brand);

  if (DOM.patchModalBody) {
    DOM.patchModalBody.innerHTML = createPatchModalContent(app, brand, modalBuildFilter, modalSelectedVariant, modalSelectedSubVariant);
  }
}

function updateModalFilterButtons(brand) {
  const filterContainer = document.querySelector(".modal-filter-buttons");
  if (!filterContainer) return;

  filterContainer.innerHTML = "";

  let hasStable = false;
  let hasBeta = false;

  if (brand.builds) {
    for (const b of brand.builds) {
      if ((b.variant || null) !== modalSelectedVariant || (b.subVariant || null) !== modalSelectedSubVariant) {
        continue;
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

  if (!brand.variants || brand.variants.length === 0) return;

  // Extract distinct base variants
  const baseVariants = [];
  brand.variants.forEach((v) => {
    const varName = v.variant || null;
    if (!baseVariants.includes(varName)) {
      baseVariants.push(varName);
    }
  });

  // Pin Standard (null) at top, sort the rest alphabetically.
  baseVariants.sort((a, b) => {
    if (a === null) return -1;
    if (b === null) return 1;
    return a.localeCompare(b);
  });

  const shouldRenderVariantGroup = baseVariants.length > 1 || (baseVariants.length === 1 && baseVariants[0] !== null);

  if (shouldRenderVariantGroup) {
    const divider = document.createElement("span");
    divider.className = "filter-group-divider";
    filterContainer.appendChild(divider);

    const variantGroup = document.createElement("div");
    variantGroup.className = "filter-pill-group";

    baseVariants.forEach((varName) => {
      const isSelected = (modalSelectedVariant === varName);
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `modal-filter-btn variant-pill-btn ${isSelected ? "active" : ""}`;
      btn.dataset.variant = varName || "";
      btn.textContent = varName || "Standard";
      variantGroup.appendChild(btn);
    });

    filterContainer.appendChild(variantGroup);
  }

  // Extract available sub-variants for current modalSelectedVariant
  const availableSubVariants = [];
  brand.variants.forEach((v) => {
    if ((v.variant || null) === modalSelectedVariant) {
      const sub = v.subVariant || null;
      if (!availableSubVariants.includes(sub)) {
        availableSubVariants.push(sub);
      }
    }
  });

  // Pin Standard (null) at top, sort the rest alphabetically.
  availableSubVariants.sort((a, b) => {
    if (a === null) return -1;
    if (b === null) return 1;
    return a.localeCompare(b);
  });

  const shouldRenderSubVariantGroup = availableSubVariants.length > 1 || (availableSubVariants.length === 1 && availableSubVariants[0] !== null);

  if (shouldRenderSubVariantGroup) {
    const divider = document.createElement("span");
    divider.className = "filter-group-divider";
    filterContainer.appendChild(divider);

    const subVariantGroup = document.createElement("div");
    subVariantGroup.className = "filter-pill-group";

    availableSubVariants.forEach((subName) => {
      const isSelected = (modalSelectedSubVariant === subName);
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `modal-filter-btn subvariant-pill-btn ${isSelected ? "active" : ""}`;
      btn.dataset.subVariant = subName || "";
      btn.textContent = subName || "Standard";
      subVariantGroup.appendChild(btn);
    });

    filterContainer.appendChild(subVariantGroup);
  }
}

function createPatchModalContent(app, brand, buildFilter = "stable", selectedVariant = null, selectedSubVariant = null) {
  let builds = brand.builds || [];

  if (buildFilter === "stable") {
    builds = builds.filter((b) => b.releaseType === "stable");
  } else if (buildFilter === "beta") {
    builds = builds.filter((b) => b.releaseType === "beta");
  }

  builds = builds.filter((b) =>
    (b.variant || null) === selectedVariant &&
    (b.subVariant || null) === selectedSubVariant
  );

  if (builds.length === 0) {
    return '<div class="no-results" style="padding: 40px 20px;">No builds matching these filters.</div>';
  }

  builds.sort((a, b) => {
    if (a.isArchive !== b.isArchive) return a.isArchive ? 1 : -1;
    const pa = parseVersion(a.version);
    const pb = parseVersion(b.version);
    for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
      const diff = (pb[i] || 0) - (pa[i] || 0);
      if (diff !== 0) return diff;
    }
    const toTs = (v) => (typeof v === "number" ? v : Date.parse(v) || 0);
    return toTs(b.publishedAt) - toTs(a.publishedAt);
  });

  return builds
    .map((build, index) => createModalBuildMarkup(app, brand, build, index === 0))
    .join("");
}

function createModalBuildMarkup(app, brand, build, openByDefault = false) {
  const assetsByArch = groupAssetsByArchitecture(build.assets);
  const titleText = build.isArchive ? escapeHtml(build.build) : `Build ${escapeHtml(build.build)}`;
  // Compact, "v"-less version text (shared with the app-card channel boxes).
  const verText = formatVersions(build.versions, build.version);

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
            <span class="asset-subtitle">${escapeHtml(asset.version || build.version || "Latest")} • ${escapeHtml(getFileType(asset.name))}</span>
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

  const varAttr = escapeHtml(build.variant || "");
  const subVarAttr = escapeHtml(build.subVariant || "");
  const buildAttr = escapeHtml(build.build || "");
  const releaseIdAttr = escapeHtml(build.releaseId || build.build || "");
  const commonAttrs = `data-app-key="${app.appKey}" data-brand-key="${brand.brandKey}" data-build-id="${releaseIdAttr || buildAttr}" data-build="${buildAttr}" data-release-id="${releaseIdAttr}" data-variant="${varAttr}" data-sub-variant="${subVarAttr}"`;

  // Per-arch applied patches: when this build's arches resolve to different patch
  // sets (distinct patchSetRefs — a fallback arch applied a different list), offer
  // one patch button per arch, mirroring the Stable/Beta channel tabs. When the
  // arches share one list, a single button stays. The same filtered view feeds the
  // modal's arch pills, so card and modal can never disagree.
  const archPatchRefs = {};
  const allowedArches = new Set(getDistinctArchPatchSets(build));
  Object.entries(groupAssetsByArchitecture(build.assets)).forEach(([arch, list]) => {
    const rep = list.find((a) => a.name.toLowerCase().endsWith(".apk")) || list[0];
    if (rep && Number.isInteger(rep.patchSetRef) && allowedArches.has(arch)) {
      archPatchRefs[arch] = { ref: rep.patchSetRef, version: rep.version || build.version || "" };
    }
  });
  const distinctPatchRefs = [...new Set(Object.values(archPatchRefs).map((x) => x.ref))];
  const patchActions = distinctPatchRefs.length > 1
    ? Object.entries(archPatchRefs).map(([arch, info]) => `
      <button class="patch-applied-btn arch-tab-btn" ${commonAttrs} data-arch="${arch}" type="button">
        <span class="arch-tab-label">${escapeHtml(capitalizeArch(arch))}</span>
        ${info.version ? `<span class="arch-tab-ver">${escapeHtml(info.version)}</span>` : ""}
      </button>`).join("")
    : `
      <button class="patch-applied-btn" ${commonAttrs} type="button">View Applied Patches</button>`;

  const patchInfoBanner = `
    <div class="patch-info-actions">
      ${patchActions}
      <a href="${build.releaseUrl}" target="_blank" rel="noopener noreferrer" class="release-link-button">View Release Source</a>
    </div>
  `;

  return `
    <div class="modal-build-card ${openByDefault ? "open" : ""}">
      <div class="modal-build-header" role="button" tabindex="0">
        <div class="modal-build-header-left">
          <div class="modal-build-title">${titleText}</div>
          <div class="modal-build-date">${formatDate(build.publishedAt)}${build.isArchive || !verText ? "" : ` • ${escapeHtml(verText)}`}</div>
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
function openAppliedPatchesModal(appKey, brandKey, buildId, variant = null, subVariant = null, buildNum = null, releaseId = null, arch = null) {
  const app = currentAppCatalog.find((item) => item.appKey === appKey);
  const brand = app ? (app.brands || []).find((item) => (item.brandKey) === brandKey) : null;
  if (!app || !brand) return;

  const normVariant = variant || null;
  const normSubVariant = subVariant || null;
  const bNum = buildNum ? String(buildNum) : null;
  const rId = releaseId ? String(releaseId) : (buildId ? String(buildId) : null);
  const bId = buildId ? String(buildId) : null;

  // 1. Exact match with variant, subVariant, buildNum, and releaseId
  let build = (brand.builds || []).find((b) => {
    if ((b.variant || null) !== normVariant) return false;
    if ((b.subVariant || null) !== normSubVariant) return false;
    if (bNum && String(b.build || "") !== bNum) return false;
    if (rId && String(b.releaseId || "") !== rId && String(b.build || "") !== rId) return false;
    return true;
  });

  // 2. Match with variant, subVariant, and bId
  if (!build && (normVariant !== null || normSubVariant !== null)) {
    build = (brand.builds || []).find((b) => {
      if ((b.variant || null) !== normVariant) return false;
      if ((b.subVariant || null) !== normSubVariant) return false;
      if (bId && String(b.releaseId || "") !== bId && String(b.build || "") !== bId) return false;
      return true;
    });
  }

  // 3. Match with variant and bId
  if (!build && normVariant !== null) {
    build = (brand.builds || []).find((b) => {
      if ((b.variant || null) !== normVariant) return false;
      if (bId && String(b.releaseId || "") !== bId && String(b.build || "") !== bId) return false;
      return true;
    });
  }

  // 4. Match with bId / bNum only
  if (!build) {
    build = (brand.builds || []).find((b) => {
      const idMatch = bId && (String(b.releaseId || "") === bId || String(b.build || "") === bId);
      const numMatch = bNum && String(b.build || "") === bNum;
      return idMatch || numMatch;
    });
  }

  if (!build) {
    build = brand.builds?.[0];
  }

  // Arches whose patch lists genuinely differ, resolved the same way the build
  // card resolves its arch tabs (APK asset as the arch's representative). The
  // entry point pre-selects one; the modal's arch pills can then switch it.
  const distinctArches = getDistinctArchPatchSets(build);
  const showArchPills = distinctArches.length > 1;
  // Only a real arch split pins an arch; otherwise the build-level patch list
  // stays in charge, exactly as before the pills existed.
  if (showArchPills && !arch) {
    arch = distinctArches[0];
  } else if (!showArchPills) {
    arch = null;
  }

  if (DOM.appliedPatchesTitle) {
    const variantLabel = formatVariantLabel(build?.variant, build?.subVariant);
    const variantSuffix = variantLabel && variantLabel !== "Standard" ? ` • ${variantLabel}` : "";
    const archSuffix = showArchPills && arch ? ` • ${capitalizeArch(arch)}` : "";
    DOM.appliedPatchesTitle.textContent = `${app.appName} (${brand.brandName})${variantSuffix}${archSuffix}`;
  }

  // When an arch is in play, resolve that arch's own patch list from its
  // asset-level patchSetRef (schema v2); fall back to the build-level list when the
  // arch has no distinct list so the view is never empty for want of a ref.
  appliedPatchesCtx = { app, brand, build, arch, showArchPills };
  modalActiveArch = arch;
  const list = resolveAppliedPatchesView();
  let appliedPatches = list.full;
  const allPatches = getBuildPatchSources(build);
  const allChangelogs = getBuildChangelogs(build);

  const patchNamesList = Array.isArray(allPatches)
    ? allPatches
    : (typeof allPatches === "string" ? allPatches.split(/[,\s]+/).filter(Boolean) : []);

  const changelogList = Array.isArray(allChangelogs)
    ? allChangelogs
    : (typeof allChangelogs === "string" ? allChangelogs.split(/[,\s]+/).filter(Boolean) : (allChangelogs ? [allChangelogs] : []));

  if (DOM.appliedPatchesMeta) {
    const badgesHtml = patchNamesList.map((name, index) => {
      const url = changelogList[index] || (changelogList.length === 1 ? changelogList[0] : null);
      if (url) {
        return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="patch-engine-badge patch-engine-link" title="Open changelog for ${escapeHtml(name)}">${escapeHtml(name)}${EXTERNAL_LINK_ARROW}</a>`;
      }
      return `<span class="patch-engine-badge">${escapeHtml(name)}</span>`;
    }).join("");

    DOM.appliedPatchesMeta.innerHTML = badgesHtml;
  }

  activeAppliedPatchesList = appliedPatches;
  renderPatchFilterPills();
  filterAppliedPatchesList("");
  showModal(DOM.appliedPatchesModal);

  if (DOM.patchSearchInput) {
    DOM.patchSearchInput.value = "";
    syncPatchClearBtn();
  }
}

// Resolve a build's applied-patches list from the deduped patchSetRef ->
// top-level patchSets table (schema v2, emitted by rebuild_catalog.py).
function getBuildAppliedPatches(build) {
  if (!build || !Number.isInteger(build.patchSetRef)) return null;
  const set = cachedPatchSets[build.patchSetRef];
  return Array.isArray(set) && set.length > 0 ? set : null;
}

// Resolve one arch's applied-patches list from its asset-level patchSetRef
// (schema v2). A numbered build can carry distinct patch sets per arch, so the
// card's arch tabs read here rather than the single build-level list. The APK
// asset is the representative: a module ZIP of the same arch may carry its own
// list, which the modal's Module pill then shows.
function getAssetAppliedPatches(build, arch) {
  if (!build || !Array.isArray(build.assets) || !arch) return null;
  const ofArch = build.assets.filter((a) => a.arch === arch && Number.isInteger(a.patchSetRef));
  const asset = ofArch.find((a) => getAssetMedium(a) === "apk") || ofArch[0];
  if (!asset) return null;
  const set = cachedPatchSets[asset.patchSetRef];
  return Array.isArray(set) && set.length > 0 ? set : null;
}

// Split a build's applied patches by delivery medium — the APK's list versus the
// Magisk/KSU module ZIP's — restricted to one arch when the modal was opened from
// an arch tab. Each medium keeps its own full list (a module ZIP usually carries
// a subset of the APK's patches), and null is returned when the two lists match,
// so the filter pills only appear where switching them really changes the view.
function collectPatchMedia(build, arch) {
  if (!build || !Array.isArray(build.assets)) return null;
  const refs = { apk: new Set(), module: new Set() };
  build.assets.forEach((a) => {
    if (arch && a.arch !== arch) return;
    if (!Number.isInteger(a.patchSetRef)) return;
    refs[getAssetMedium(a)].add(a.patchSetRef);
  });
  const lists = {
    apk: [...uniquePatches([...refs.apk].flatMap(resolvePatchSet)).values()],
    module: [...uniquePatches([...refs.module].flatMap(resolvePatchSet)).values()],
  };
  if (lists.apk.length === 0 || lists.module.length === 0) return null;
  if (listsIdentical(lists.apk, lists.module)) return null;
  return lists;
}

// Map a patchSetRef to its list in the shared top-level patchSets table.
function resolvePatchSet(ref) {
  const set = cachedPatchSets[ref];
  return Array.isArray(set) ? set : [];
}

// Normalise a patch name for comparison: upstream lists repeat the same patch as
// "Hide ads" and "Hide ads ", which must not read as two entries.
function normalizePatchName(name) {
  return (name || "").trim().toLowerCase();
}

// Dedupe a raw patch-name sequence into a normalised-key -> display-name map.
function uniquePatches(names) {
  const out = new Map();
  names.forEach((name) => {
    const key = normalizePatchName(name);
    if (!key || out.has(key)) return;
    out.set(key, name);
  });
  return out;
}

// True when two patch lists hold the same names, ignoring casing and the stray
// trailing whitespace the upstream lists carry.
function listsIdentical(a, b) {
  if (a.length !== b.length) return false;
  return a.every((name) => b.some((other) => normalizePatchName(other) === normalizePatchName(name)));
}

// Resolve a build's changelogs / patchSources from the shared top-level tables
// (schema v2 dedup), falling back to any legacy inline array so the client
// renders correctly both before and after a catalog rebuild.
function _resolveSetRef(ref, table, inline) {
  if (Number.isInteger(ref)) {
    const set = table[ref];
    if (Array.isArray(set)) return set;
  }
  return Array.isArray(inline) ? inline : [];
}

function getBuildChangelogs(build) {
  if (!build) return [];
  return _resolveSetRef(build.changelogRef, cachedChangelogSets, build.changelogs);
}

function getBuildPatchSources(build) {
  if (!build) return [];
  return _resolveSetRef(build.patchSourceRef, cachedPatchSourceSets, build.patchSources);
}

// Patch sets keyed per arch, using the APK asset as each arch's representative.
// Shared by the build card's arch tabs and the modal's arch pills, so both read
// the same split — and only list arches whose patches truly differ: upstream
// repeats names with stray casing/whitespace, which must not fake a second view.
function getDistinctArchPatchSets(build) {
  const byArch = getArchPatchSets(build);
  const names = Object.keys(byArch);
  return names.filter((arch) =>
    names.some((other) => other !== arch && !listsIdentical(byArch[arch], byArch[other])));
}

function getArchPatchSets(build) {
  const sets = {};
  if (!build || !Array.isArray(build.assets)) return sets;
  Object.entries(groupAssetsByArchitecture(build.assets)).forEach(([arch, list]) => {
    const rep = list.find((a) => a.name.toLowerCase().endsWith(".apk")) || list[0];
    if (rep && Number.isInteger(rep.patchSetRef)) {
      const set = cachedPatchSets[rep.patchSetRef];
      if (Array.isArray(set) && set.length > 0) sets[arch] = set;
    }
  });
  return sets;
}

// Re-resolve the open view after an arch pill switch: rebuild the title, the
// arch's patch list and the APK/Module pills that hang off it.
function reresolveAppliedPatches() {
  if (!appliedPatchesCtx) return;
  const { app, brand, build, arch, showArchPills } = appliedPatchesCtx;
  modalActiveArch = arch;

  if (DOM.appliedPatchesTitle) {
    const variantLabel = formatVariantLabel(build?.variant, build?.subVariant);
    const variantSuffix = variantLabel && variantLabel !== "Standard" ? ` • ${variantLabel}` : "";
    const archSuffix = showArchPills && arch ? ` • ${capitalizeArch(arch)}` : "";
    DOM.appliedPatchesTitle.textContent = `${app.appName} (${brand.brandName})${variantSuffix}${archSuffix}`;
  }

  const list = resolveAppliedPatchesView();
  activeAppliedPatchesList = list.full;
  renderPatchFilterPills();
}

// Toggle the patch-filter clear button based on the input's content
function syncPatchClearBtn() {
  if (DOM.patchSearchWrap && DOM.patchSearchInput) {
    DOM.patchSearchWrap.classList.toggle("has-value", DOM.patchSearchInput.value.length > 0);
  }
}

// Resolve the open view's patch lists for the current arch: the arch's full list
// ("full", shown when no APK/Module split exists) plus the per-medium lists that
// feed the pills. APK is the primary medium whenever the two differ.
function resolveAppliedPatchesView() {
  const { build, arch } = appliedPatchesCtx;
  const full = (arch ? getAssetAppliedPatches(build, arch) : null) || getBuildAppliedPatches(build);
  activePatchMedia = collectPatchMedia(build, arch);
  modalActiveMedium = activePatchMedia ? "apk" : "all";
  return { full };
}

// One filter band for the Applied Patches view, built the same way the patch
// modal builds its channel/variant row: a pill group per dimension, split by a
// divider. Arch pills appear when arm64 and arm carry different patch sets, the
// APK/Module pills when the two media do; either can stand alone.
function renderPatchFilterPills() {
  const archNames = appliedPatchesCtx && appliedPatchesCtx.showArchPills
    ? Object.keys(getArchPatchSets(appliedPatchesCtx.build))
    : [];
  const archHtml = archNames.length
    ? `<div class="filter-pill-group">${archNames.map((name) => `
    <button type="button" class="modal-filter-btn patch-arch-btn" data-arch="${name}">${escapeHtml(capitalizeArch(name))}</button>`).join("")}</div>`
    : "";
  const mediumHtml = activePatchMedia
    ? `<div class="filter-pill-group">
    <button type="button" class="modal-filter-btn patch-medium-btn" data-medium="apk">APK <span class="medium-count">${activePatchMedia.apk.length}</span></button>
    <button type="button" class="modal-filter-btn patch-medium-btn" data-medium="module">Module <span class="medium-count">${activePatchMedia.module.length}</span></button>
  </div>`
    : "";
  const bandHtml = [archHtml, mediumHtml].filter(Boolean).join(`<span class="filter-group-divider"></span>`);

  if (DOM.patchArchPills) {
    DOM.patchArchPills.innerHTML = bandHtml;
    DOM.patchArchPills.style.display = bandHtml ? "flex" : "none";
    DOM.patchArchPills.querySelectorAll(".patch-arch-btn").forEach((btn) => {
      btn.classList.toggle("active", (btn.dataset.arch || null) === modalActiveArch);
    });
  }
  updateMediumPillsUI();
}

function updateMediumPillsUI() {
  if (!DOM.patchArchPills) return;
  DOM.patchArchPills.querySelectorAll(".patch-medium-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.medium === modalActiveMedium);
  });
}

function filterAppliedPatchesList(query) {
  if (!DOM.appliedPatchesBody) return;

  if (!activeAppliedPatchesList) {
    if (DOM.patchCountBadge) {
      DOM.patchCountBadge.textContent = "0";
    }
    DOM.appliedPatchesBody.innerHTML = '<div class="no-results" style="padding: 36px 20px; text-align: center; color: var(--text-muted);">No applied patches data available for this build.</div>';
    return;
  }

  // Medium pill narrows the list to the patches that medium alone carries.
  const mediumList = modalActiveMedium !== "all" && activePatchMedia
    ? activePatchMedia[modalActiveMedium]
    : null;
  const source = mediumList || activeAppliedPatchesList;

  const normalized = (query || "").toLowerCase().trim();
  const filtered = source.filter((p) =>
    p.toLowerCase().includes(normalized)
  );

  if (DOM.patchCountBadge) {
    DOM.patchCountBadge.textContent = `${filtered.length}`;
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
          <span>${escapeHtml(patchName.trim())}</span>
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
  const brand = app ? (app.brands || []).find((item) => (item.brandKey) === activeModalBrandKey) : null;
  if (!app || !brand) return;

  if (DOM.obtainiumTitle) {
    DOM.obtainiumTitle.textContent = `Install ${app.appName} with Obtainium`;
  }

  if (DOM.obtainiumBody) {
    DOM.obtainiumBody.innerHTML = createObtainiumInstructions(app, brand);
  }

  showModal(DOM.obtainiumModal);
}

function createObtainiumInstructions(app, brand) {
  const repoUrl = `https://github.com/${CONFIG.owner}/${CONFIG.repo}`;
  const obtainiumLatestUrl = "https://github.com/ImranR98/Obtainium/releases/latest";

  const rawSlug = app?.appKey || normalizeForSearch(app?.appName || "app");
  const rawBrand = brand?.brandKey || normalizeForSearch(brand?.brandName || "brand");

  const activeVariant = brand?.variants?.find((v) =>
    (v.variant || null) === modalSelectedVariant &&
    (v.subVariant || null) === modalSelectedSubVariant
  ) || brand?.variants?.[0];

  let regexPattern = activeVariant?.apkFilter;
  if (!regexPattern) {
    regexPattern = `^${rawSlug}-${rawBrand}-v.*\\.apk$`;
  }

  const mainPackageId = activeVariant?.packageName || getAppPackageId(app, brand, modalSelectedVariant, modalSelectedSubVariant);
  const mainLabel = getObtainiumAppLabel(app?.appName || "App", brand?.brandName || "Brand", modalSelectedVariant, modalSelectedSubVariant);
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
  if (brand && brand.variants && brand.variants.length > 1) {
    // Pin Standard (null/null) at top, sort the rest alphabetically — same order as the variant pills.
    const orderedVariants = [...brand.variants].sort((a, b) => {
      const aIsStd = a.variant == null && a.subVariant == null;
      const bIsStd = b.variant == null && b.subVariant == null;
      if (aIsStd !== bIsStd) return aIsStd ? -1 : 1;
      const vc = (a.variant || "").localeCompare(b.variant || "");
      if (vc !== 0) return vc;
      return (a.subVariant || "").localeCompare(b.subVariant || "");
    });
    const examples = orderedVariants.map((v) => {
      const vRegex = v.apkFilter || `^${rawSlug}-${rawBrand}-v.*\\.apk$`;
      const vLabel = getObtainiumAppLabel(app.appName, brand.brandName, v.variant, v.subVariant);
      const vPackageId = v.packageName || getAppPackageId(app, brand, v.variant, v.subVariant);

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
            <span>${escapeHtml(app.appName)} • ${escapeHtml(brand.brandName)}${v.variant ? ` • ${escapeHtml(v.variant)}` : ''}${v.subVariant ? ` • ${escapeHtml(v.subVariant)}` : (!v.variant ? ' • Standard' : '')}</span>
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

function getAppPackageId(app, brand, variant, subVariant) {
  if (!app) return "";
  const v = brand?.variants?.find((item) => (item.variant || null) === (variant || null) && (item.subVariant || null) === (subVariant || null));
  if (v?.packageName) return v.packageName;
  const b = brand?.builds?.find((item) => (item.variant || null) === (variant || null) && (item.subVariant || null) === (subVariant || null));
  if (b?.packageName) return b.packageName;
  return brand?.variants?.[0]?.packageName || "";
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
  const groups = { arm64: [], arm: [], all: [], x86: [], other: [] };
  assets.forEach((asset) => {
    const arch = asset.arch && groups[asset.arch] ? asset.arch : "other";
    groups[arch].push(asset);
  });

  const filtered = {};
  ["arm64", "arm", "all", "x86", "other"].forEach((arch) => {
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

// Delivery medium of a patched asset: "module" for the Magisk/KSU ZIP, "apk"
// for everything else. Asset-level patchSetRefs are keyed per medium, so the
// applied-patches view can split an APK's list from its module twin.
function getAssetMedium(asset) {
  const name = (asset && asset.name ? asset.name : "").toLowerCase();
  return name.endsWith(".zip") ? "module" : "apk";
}

function capitalizeArch(arch) {
  const map = {
    arm64: "ARM64 (v8a)",
    arm: "ARM32 (v7a)",
    all: "Universal",
    x86: "x86 / x64",
    other: "Other"
  };
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

function parseVersion(version) {
  return (version || "0").split(".").map(Number);
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
