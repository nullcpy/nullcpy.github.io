/** * ==========================================
 * CONFIGURATION & CUSTOMIZATION
 * Edit these values to update the app catalog behavior, branding, and notices.
 * ==========================================
 */
const CONFIG = {
    owner: 'nullcpy',
    repo: 'rvb',
    cacheDuration: 5, // Cache duration in minutes

    // App Categories for the top filter buttons (maps filter-btn dataset to keywords)
    appCategories: {
        google: ['youtube', 'google'],
        meta: ['threads', 'instagram', 'messenger', 'facebook']
    },

    // Words ignored in the dynamic app filters (must be lowercase)
    sharedAppWordStoplist: new Set([
        'revanced', 'patched', 'patch', 'extended', 'advanced',
        'theme', 'edition', 'android', 'app', 'google',
        'meta', 'facebook', 'instagram', 'messenger'
    ]),

    // Known tokens indicating a patch name starts (must be lowercase)
    knownPatchTokens: new Set(['revanced', 'morphe', 'anddea', 'rvx']),

    // Known tokens indicating a variant (must be lowercase)
    variantKeywords: new Set(['exp', 'nord', 'mocha', 'privacy', 'materialu', 'foss', 'gplay', 'piko', 'adobo', 'patcheddit']),

    // Known architectures (used for regex parsing)
    knownArchs: [
        'arm64-v8a', 'arm64', 'aarch64', 'armeabi-v7a', 'arm-v7a',
        'arm32', 'x86_64', 'x86', 'universal', 'all'
    ],

    // Brand name overrides (keys must be lowercase)
    brandOverrides: {
        youtube: 'YouTube', revanced: 'ReVanced', tiktok: 'TikTok', soundcloud: 'SoundCloud', xrecorder: 'XRecorder', calcnote: 'CalcNote', imdb: 'IMDb', trakt: 'trakt.TV',
        vpn: 'VPN', rvx: 'ReVanced Extended', anddea: 'ReVanced Advanced', exp: 'Experimental', macrodroid: 'MacroDroid', ticktick: 'TickTick', fing: 'Fing - Network Tools',
        mocha: 'Mocha Theme', nord: 'Nord Theme', materialu: 'Material You', photoshop: 'Adobe Photoshop', lightroom: 'Adobe Lightroom', xodo: 'Xodo PDF Reader & Editor',
        gplay: 'Google Play', foss: 'FOSS', gboard: 'Google Keyboard', wps: 'WPS', rar: 'RAR', adguard: 'AdGuard', moonplus: 'Moon+', eyecon: 'Eyecon Caller ID & Spam Block'
    },

    // Map app slugs to true Android Package IDs for Obtainium
    // Keys MUST be the fully normalized appName (lowercase, no spaces, no symbols)
    appIds: {
        'adguard': 'com.adguard.android.contentblocker',
        'adobelightroom': 'com.adobe.lrmobile',
        'adobephotoshopmix': 'com.adobe.psmobile',
        'autosync': 'com.ttxapps.autosync',
        'calcnote': 'com.appumstudios.calcnote',
        'cricbuzz': 'com.cricbuzz.android',
        'documentscanner': 'com.cv.docscanner',
        'duolingo': 'com.duolingo',
        'eyeconcalleridspamblock': 'com.eyecon.global',
        'fingnetworktools': 'com.overlook.android.fing',
        'googlekeyboard': 'com.google.android.inputmethod.latin',
        'googlenews': 'com.google.android.apps.magazines',
        'googlephotos': 'com.google.android.apps.photos',
        'googlerecorder': 'com.google.android.apps.recorder',
        'iconpacker': 'cn.ommiao.iconpacker',
        'instagram': 'com.instagram.android',
        'macrodroid': 'com.arlosoft.macrodroid',
        'merriamwebsterdictionary': 'com.merriamwebster',
        'messenger': 'com.facebook.orca',
        'microsoftlens': 'com.microsoft.office.officelens',
        'moonplusreader': 'com.flyersoft.moonreader',
        'pandora': 'com.pandora.android',
        'photomath': 'com.microblink.photomath',
        'pinterest': 'com.pinterest',
        'podcastaddict': 'com.bambuna.podcastaddict',
        'protonmail': 'ch.protonmail.android',
        'protonvpn': 'ch.protonvpn.android',
        'reddit': 'com.reddit.frontpage',
        'smartlauncher6': 'ginlemon.flowerfree',
        'solidexplorer': 'pl.solidexplorer2',
        'soundcloud': 'com.soundcloud.android',
        'symfonium': 'app.symfonik.music.player',

        // Use an object for variant-specific IDs
        'telegram': {
            default: 'org.telegram.messenger',
            foss: 'org.telegram.messenger.web'
        },

        'threads': 'com.instagram.barcelona',
        'ticktick': 'com.ticktick.task',
        'truecaller': 'com.truecaller',
        'tumblr': 'com.tumblr',
        'twitch': 'tv.twitch.android.app',
        'viber': 'com.viber.voip',
        'wallcraft': 'com.wallpaperscraft.wallpaper',
        'rar': 'com.rarlab.rar',
        'wpsoffice': 'cn.wps.moffice_eng',
        'twitter': 'com.twitter.android',
        'xodopdfreadereditor': 'com.xodo.pdf.reader',
        'xrecorder': 'video.other.screenrecorder',
        'youtube': 'com.google.android.youtube',
        'youtubemusic': 'com.google.android.apps.youtube.music'
    },

    // App-specific notices to display on App Cards
    appNotices: [
        {
            triggers: ['youtube', 'google'], // App name keywords that trigger this notice
            className: 'microg-note', // Defines the CSS prefix
            title: 'Login Issue',
            text: 'Signing into Google account on APK (not Module) requires MicroG. Please install one from below before trying to sign in.',
            links: [
                { label: 'Morphe', url: 'https://github.com/MorpheApp/MicroG-RE/releases/latest' },
                { label: 'ReVanced', url: 'https://github.com/ReVanced/GmsCore/releases/latest' }
            ]
        },
        {
            triggers: ['twitter'],
            className: 'twitter-login-note',
            title: 'Login Issue',
            text: 'Since October 2025, Twitter has started checking whether the app is modified or if the phone integrity fails during login. These checks are server-side, not client-side.',
            links: [
                { label: 'Workarounds', url: 'https://t.me/pikopatches/1/59772' }
            ]
        }
    ]
};

// State
let allReleases = [];
let cachedFullCatalog = [];
let searchTerm = '';
let appViewFilter = 'all';
let dynamicAppFilters = [];
let currentAppCatalog = [];
let activeModalAppKey = null;
let activeModalPatchKey = null;
let modalBuildFilter = 'all';
let themeMode = 'system';

// Render State for Infinite Scroll
let currentVisibleCount = 0;
const RENDER_CHUNK_SIZE = 50;

const SHARED_APP_WORD_MIN_COUNT = 3;
const SHARED_APP_WORD_FALLBACK_COUNT = 2;

// Caches for Memoization
const parseCache = new Map();
const tokenCache = new Map();

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupTheme();
    setupEventListeners();
    loadReleases();
});

// Theme Management
function setupTheme() {
    const savedTheme = localStorage.getItem('theme');
    themeMode = savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system'
        ? savedTheme
        : 'system';

    applyTheme(themeMode);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    mediaQuery.addEventListener('change', () => {
        if (themeMode !== 'system') {
            return;
        }
        applyTheme('system');
    });
}

function applyTheme(theme) {
    const isLight = theme === 'light'
        ? true
        : theme === 'dark'
            ? false
            : window.matchMedia('(prefers-color-scheme: light)').matches;

    document.body.classList.toggle('light-mode', isLight);
    const themeBtn = document.getElementById('themeBtn');
    themeBtn.textContent = theme === 'system' ? '🖥️' : theme === 'light' ? '☀️' : '🌙';
    themeBtn.setAttribute('aria-label', `Theme mode: ${theme}`);
}

// Event Listeners
function setupEventListeners() {
    let searchTimeout;

    // Theme button
    document.getElementById('themeBtn').addEventListener('click', () => {
        const nextTheme = themeMode === 'system'
            ? 'light'
            : themeMode === 'light'
                ? 'dark'
                : 'system';
        themeMode = nextTheme;
        localStorage.setItem('theme', nextTheme);
        applyTheme(nextTheme);
    });

    const menuBtn = document.getElementById('menuBtn');
    const actionMenu = document.getElementById('actionMenu');

    if (menuBtn && actionMenu) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            actionMenu.classList.toggle('open');
            menuBtn.setAttribute('aria-expanded', actionMenu.classList.contains('open'));
        });

        document.addEventListener('click', (e) => {
            if (actionMenu.classList.contains('open') && !actionMenu.contains(e.target)) {
                actionMenu.classList.remove('open');
                menuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // 1. Debounced Search Input
    const searchInput = document.getElementById('searchInput');

    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            searchTerm = e.target.value.toLowerCase();
            filterAndRenderReleases();
        }, 250);
    });

    searchInput.addEventListener('focus', (e) => {
        if (window.innerWidth <= 768) {
            const searchBox = e.target.closest('.search-box') || e.target;
            const y = searchBox.getBoundingClientRect().top + window.scrollY - 15;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    });

    const appFilterButtons = document.getElementById('appFilterButtons');
    if (appFilterButtons) {
        appFilterButtons.addEventListener('click', (e) => {
            const filterBtn = e.target.closest('.filter-btn');
            if (!filterBtn) return;

            appViewFilter = filterBtn.dataset.filter || 'all';
            filterAndRenderReleases();
        });
    }

    document.getElementById('builds').addEventListener('click', (e) => {
        const collapsedCard = e.target.closest('.app-card:not([open])');
        if (collapsedCard && !e.target.closest('.app-card-summary')) {
            collapsedCard.open = true;
            return;
        }

        const trigger = e.target.closest('.patch-open-box');
        if (!trigger) return;

        openPatchModal(trigger.dataset.appKey, trigger.dataset.patchKey, trigger.dataset.filter || 'all');
    });

    document.getElementById('patchModal').addEventListener('click', (e) => {
        const filterBtn = e.target.closest('.modal-filter-btn');
        if (filterBtn) {
            if (filterBtn.disabled) return;
            modalBuildFilter = filterBtn.dataset.filter;
            renderOpenPatchModal();
            return;
        }

        if (e.target.id === 'patchModal' || e.target.closest('.modal-close')) {
            closePatchModal();
        }
    });

    document.getElementById('obtainiumBtn').addEventListener('click', (e) => {
        e.stopPropagation();
        openObtainiumModal();
    });

    document.getElementById('obtainiumModal').addEventListener('click', (e) => {
        if (e.target.id === 'obtainiumModal' || e.target.closest('.modal-close')) {
            closeObtainiumModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closePatchModal();
            closeObtainiumModal();
        }
    });

    // 2. Infinite Scroll Observer
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            renderNextChunk();
        }
    }, { rootMargin: '400px' });

    const sentinel = document.createElement('div');
    sentinel.id = 'scroll-sentinel';
    sentinel.style.height = '1px';
    document.getElementById('builds').after(sentinel);

    observer.observe(sentinel);
}

// Fetch releases from local static cache (generated by GitHub Actions)
async function loadReleases() {
    try {
        // 1. Trigger the yellow spinning state immediately
        setPillState('checking', 'Checking for updates...');

        const cached = getCachedReleases();
        if (cached) {
            allReleases = cached;
            document.getElementById('loading').style.display = 'none';
            document.getElementById('error').style.display = 'none';
            rebuildCatalogCache();
            updateLastUpdateTimestamp();
            filterAndRenderReleases();
            return;
        }

        document.getElementById('loading').style.display = 'block';
        document.getElementById('error').style.display = 'none';

        // Add a timestamp to bypass GitHub Pages CDN cache
        const cacheBuster = new Date().getTime();
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
            console.warn('Network error fetching releases.json (likely file:// protocol).', e);
        }

        // Fallback to live API if releases.json is missing, empty, or fetch threw an error
        if (useFallback) {
            console.warn('Static cache not found or empty. Falling back to live API...');
            const response = await fetch(
                `https://api.github.com/repos/${CONFIG.owner}/${CONFIG.repo}/releases`,
                { headers: { 'Accept': 'application/vnd.github.v3+json' } }
            );

            if (!response.ok) {
                throw new Error(`Failed to fetch data: ${response.status}`);
            }

            fetchedData = await response.json();
        }

        allReleases = fetchedData;

        cacheReleases(allReleases);
        rebuildCatalogCache();

        document.getElementById('loading').style.display = 'none';
        updateLastUpdateTimestamp();
        filterAndRenderReleases();

    } catch (error) {
        console.error('Error loading releases:', error);

        // 2. Trigger the red error state if fetching fails
        setPillState('error', 'Failed to check updates');

        document.getElementById('loading').style.display = 'none';
        document.getElementById('error').style.display = 'block';
        document.getElementById('error').textContent = `Failed to load releases: ${error.message}`;
    }
}

// Caching utilities for LocalStorage
function getCachedReleases() {
    const cached = localStorage.getItem('releases_cache');
    const timestamp = localStorage.getItem('releases_cache_time');

    if (!cached || !timestamp) return null;

    const age = (Date.now() - parseInt(timestamp)) / (1000 * 60);
    if (age > CONFIG.cacheDuration) {
        localStorage.removeItem('releases_cache');
        localStorage.removeItem('releases_cache_time');
        return null;
    }

    return JSON.parse(cached);
}

function cacheReleases(releases) {
    localStorage.setItem('releases_cache', JSON.stringify(releases));
    localStorage.setItem('releases_cache_time', Date.now().toString());
}

// Build and cache the full app catalog — called once when release data changes
function rebuildCatalogCache() {
    cachedFullCatalog = buildAppCatalog(allReleases.filter(r => !r.draft));
    dynamicAppFilters = getDynamicAppFilters(cachedFullCatalog);
}

// Apply a search query to an already-built catalog without rebuilding from scratch
function filterCatalogBySearch(catalog, query) {
    if (!query) return catalog;
    const normalizedQuery = normalizeForSearch(query);
    return catalog
        .map(app => {
            const filteredPatches = app.patches
                .map(patch => {
                    const filteredBuilds = patch.builds
                        .map(build => ({
                            ...build,
                            assets: build.assets.filter(asset =>
                                assetMatchesSearch(
                                    asset.parsed, asset,
                                    { name: build.build, tag_name: build.build },
                                    query, normalizedQuery
                                )
                            )
                        }))
                        .filter(build => build.assets.length > 0);
                    return filteredBuilds.length > 0 ? { ...patch, builds: filteredBuilds } : null;
                })
                .filter(Boolean);
            return filteredPatches.length > 0 ? { ...app, patches: filteredPatches } : null;
        })
        .filter(Boolean);
}

// Filter and render releases
function filterAndRenderReleases() {
    renderDynamicAppFilterButtons(dynamicAppFilters);

    if (appViewFilter.startsWith('word-') && !dynamicAppFilters.some(filter => filter.key === appViewFilter)) {
        appViewFilter = 'all';
    }

    const searchedCatalog = filterCatalogBySearch(cachedFullCatalog, searchTerm);
    const filteredApps = applyAppViewFilter(searchedCatalog);

    renderAppCards(filteredApps);
    updateAppFilterButtons();
    document.getElementById('loading').style.display = 'none';
}

function updateAppFilterButtons() {
    document.querySelectorAll('#appFilterButtons .filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === appViewFilter);
    });
}

function getAppLatestPublishedAt(app) {
    return app.patches.reduce((latest, patch) => {
        const patchTime = new Date(patch.latestPublishedAt).getTime();
        return Number.isNaN(patchTime) ? latest : Math.max(latest, patchTime);
    }, 0);
}

function getAppTotalDownloads(app) {
    let total = 0;
    (app.patches || []).forEach(patch => {
        (patch.builds || []).forEach(build => {
            (build.assets || []).forEach(asset => {
                total += (asset.download_count || 0);
            });
        });
    });
    return total;
}

function applyAppViewFilter(apps) {
    if (CONFIG.appCategories[appViewFilter]) {
        return apps.filter(app => {
            const name = normalizeForSearch(app.appName);
            return CONFIG.appCategories[appViewFilter].some(keyword => name.includes(keyword));
        });
    }

    if (appViewFilter.startsWith('word-')) {
        const word = appViewFilter.slice(5);
        return apps.filter(app => getAppNameWords(app.appName).includes(word));
    }

    if (appViewFilter === 'recent') {
        return [...apps].sort((a, b) => getAppLatestPublishedAt(b) - getAppLatestPublishedAt(a));
    }

    if (appViewFilter === 'popular') {
        return [...apps].sort((a, b) => getAppTotalDownloads(b) - getAppTotalDownloads(a));
    }

    return apps;
}

function buildAppCatalog(releases, query = '') {
    const normalizedQuery = normalizeForSearch(query);
    const sortedReleases = [...releases].sort((a, b) =>
        new Date(b.published_at) - new Date(a.published_at)
    );

    const appMap = new Map();

    sortedReleases.forEach(release => {
        const isArchive = release.tag_name === 'stable' || release.tag_name === 'beta';
        let releaseType = release.prerelease ? 'beta' : 'stable';
        if (release.tag_name === 'stable') releaseType = 'stable';
        if (release.tag_name === 'beta') releaseType = 'beta';

        (release.assets || []).forEach(asset => {
            const arch = detectArchitecture(asset.name);
            const fileType = getFileType(asset.name);
            const parsed = parseAssetDisplay(asset.name, arch, fileType);

            if (!assetMatchesSearch(parsed, asset, release, query, normalizedQuery)) {
                return;
            }

            const appKey = normalizeForSearch(parsed.appName);
            if (!appKey) return;

            if (!appMap.has(appKey)) {
                appMap.set(appKey, {
                    appKey,
                    appName: parsed.appName,
                    latestStable: null,
                    latestBeta: null,
                    patches: new Map()
                });
            }

            const appEntry = appMap.get(appKey);
            setLatestBuildMeta(appEntry, releaseType, release);

            const patchKey = normalizeForSearch(parsed.patchName) || 'patchedbuild';
            if (!appEntry.patches.has(patchKey)) {
                appEntry.patches.set(patchKey, {
                    patchKey,
                    patchName: parsed.patchName,
                    latestVersion: null, // Wait for a real date
                    latestPublishedAt: 0,
                    latestStable: null,
                    latestBeta: null,
                    latestVariant: null,
                    latestArchiveStable: null, // NEW FALLBACK
                    latestArchiveBeta: null,   // NEW FALLBACK
                    builds: new Map()
                });
            }

            const patchEntry = appEntry.patches.get(patchKey);
            const buildLabel = getBuildNumberLabel(release);

            // Get the true date of the APK upload
            const buildDateString = isArchive ? (asset.updated_at || asset.created_at || release.published_at) : release.published_at;
            const buildDateMs = new Date(buildDateString).getTime();

            // STRICT PROTECTION: Only update the App Card timestamps if it is NOT an archive!
            if (!isArchive) {
                const patchDate = new Date(patchEntry.latestPublishedAt).getTime();

                if (buildDateMs > patchDate) {
                    patchEntry.latestVersion = parsed.version;
                    patchEntry.latestPublishedAt = buildDateString;
                }

                if (!parsed.variant) {
                    setLatestPatchMeta(patchEntry, releaseType, parsed.version, buildLabel, buildDateString);
                } else {
                    setLatestVariantMeta(patchEntry, parsed.variant, parsed.version, buildLabel, buildDateString);
                }
            } else {
                // FALLBACK: Quietly track the newest archive for Dead Apps
                // FIX: Only track non-variants for the generic Stable/Beta fallback boxes!
                if (!parsed.variant) {
                    if (releaseType === 'stable') {
                        const currentMs = patchEntry.latestArchiveStable ? new Date(patchEntry.latestArchiveStable.publishedAt).getTime() : 0;
                        if (buildDateMs > currentMs) {
                            patchEntry.latestArchiveStable = { version: parsed.version, build: buildLabel, publishedAt: buildDateString };
                        }
                    } else if (releaseType === 'beta') {
                        const currentMs = patchEntry.latestArchiveBeta ? new Date(patchEntry.latestArchiveBeta.publishedAt).getTime() : 0;
                        if (buildDateMs > currentMs) {
                            patchEntry.latestArchiveBeta = { version: parsed.version, build: buildLabel, publishedAt: buildDateString };
                        }
                    }
                }
            }

            // Split archives into their own separate dropdowns based on Version!
            const buildKey = isArchive ? `archive-${releaseType}-${parsed.version}` : String(release.id);
            if (!patchEntry.builds.has(buildKey)) {
                patchEntry.builds.set(buildKey, {
                    releaseId: release.id,
                    build: isArchive ? parsed.version : getBuildNumberLabel(release),
                    releaseType,
                    isArchive, // Flag for the modal
                    publishedAt: isArchive ? (asset.updated_at || asset.created_at || release.published_at) : release.published_at,
                    releaseUrl: release.html_url,
                    version: parsed.version,
                    assets: []
                });
            }

            const buildEntry = patchEntry.builds.get(buildKey);
            const exists = buildEntry.assets.some(existing => existing.name === asset.name);
            if (!exists) {
                buildEntry.assets.push({
                    ...asset,
                    parsed,
                    arch,
                    fileType
                });
            }
        });
    });

    return Array.from(appMap.values())
        .map(app => {
            // NEW: Apply fallback dates for archive-only apps before sorting
            app.patches.forEach(patch => {
                if (!patch.latestStable && patch.latestArchiveStable) {
                    patch.latestStable = patch.latestArchiveStable;
                    patch.latestStable.isArchiveFallback = true;
                    const archiveMs = new Date(patch.latestArchiveStable.publishedAt).getTime();
                    const currentMs = patch.latestPublishedAt ? new Date(patch.latestPublishedAt).getTime() : 0;
                    if (archiveMs > currentMs) {
                        patch.latestVersion = patch.latestArchiveStable.version;
                        patch.latestPublishedAt = patch.latestArchiveStable.publishedAt;
                    }
                }
                if (!patch.latestBeta && patch.latestArchiveBeta) {
                    patch.latestBeta = patch.latestArchiveBeta;
                    patch.latestBeta.isArchiveFallback = true;
                    const archiveMs = new Date(patch.latestArchiveBeta.publishedAt).getTime();
                    const currentMs = patch.latestPublishedAt ? new Date(patch.latestPublishedAt).getTime() : 0;
                    if (archiveMs > currentMs) {
                        patch.latestVersion = patch.latestArchiveBeta.version;
                        patch.latestPublishedAt = patch.latestArchiveBeta.publishedAt;
                    }
                }
            });

            return {
                ...app,
                patches: Array.from(app.patches.values()).sort((a, b) =>
                    new Date(b.latestPublishedAt) - new Date(a.latestPublishedAt)
                )
                    .map(patch => ({
                        ...patch,
                        // Sink archives to the bottom!
                        builds: Array.from(patch.builds.values()).sort((a, b) => {
                            // 1. If one is an archive and the other isn't, sink the archive
                            if (a.isArchive && !b.isArchive) return 1;
                            if (!a.isArchive && b.isArchive) return -1;

                            // 2. If BOTH are archives, sort them nicely by version number (highest first)
                            if (a.isArchive && b.isArchive) {
                                return b.version.localeCompare(a.version, undefined, { numeric: true, sensitivity: 'base' });
                            }

                            // 3. Otherwise (normal builds), just sort by date
                            return new Date(b.publishedAt) - new Date(a.publishedAt);
                        })
                    }))
            };
        })
        .filter(app => app.patches.length > 0)
        .sort((a, b) => a.appName.localeCompare(b.appName));
}

function assetMatchesSearch(parsed, asset, release, rawQuery, normalizedQuery) {
    if (!rawQuery) return true;

    return [
        parsed.appName,
        parsed.patchName,
        parsed.version,
        parsed.archLabel,
        parsed.fileType,
        asset.name,
        release.name || '',
        release.tag_name || ''
    ].some(value => matchesSearch(String(value || ''), rawQuery, normalizedQuery));
}

function setLatestBuildMeta(appEntry, releaseType, release) {
    const key = releaseType === 'beta' ? 'latestBeta' : 'latestStable';
    const current = appEntry[key];
    const currentDate = current ? new Date(current.publishedAt).getTime() : 0;
    const releaseDate = new Date(release.published_at).getTime();

    if (!current || releaseDate > currentDate) {
        appEntry[key] = {
            build: getBuildNumberLabel(release),
            publishedAt: release.published_at,
            releaseUrl: release.html_url
        };
    }
}

function setLatestPatchMeta(patchEntry, releaseType, version, build, publishedAt) {
    const key = releaseType === 'beta' ? 'latestBeta' : 'latestStable';
    const current = patchEntry[key];
    const currentDate = current ? new Date(current.publishedAt).getTime() : 0;
    const releaseDate = new Date(publishedAt).getTime();

    if (!current || releaseDate > currentDate) {
        patchEntry[key] = { version, build, publishedAt };
    }
}

function setLatestVariantMeta(patchEntry, variant, version, build, publishedAt) {
    const current = patchEntry.latestVariant;
    const currentDate = current ? new Date(current.publishedAt).getTime() : 0;
    const releaseDate = new Date(publishedAt).getTime();

    if (!current || releaseDate > currentDate) {
        patchEntry.latestVariant = { variant, version, build, publishedAt };
    }
}

function getBuildNumberLabel(release) {
    return String(release.tag_name || release.name || 'N/A');
}

// Render app cards to DOM (Progressive Rendering)
function renderAppCards(apps) {
    const buildsContainer = document.getElementById('builds');
    currentAppCatalog = apps;
    currentVisibleCount = 0;

    buildsContainer.innerHTML = '';

    if (apps.length === 0) {
        buildsContainer.innerHTML = '<div class="no-results">No apps found.</div>';
        return;
    }

    renderNextChunk();
}

function renderNextChunk() {
    const buildsContainer = document.getElementById('builds');
    const nextChunk = currentAppCatalog.slice(currentVisibleCount, currentVisibleCount + RENDER_CHUNK_SIZE);

    if (nextChunk.length === 0) return;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = nextChunk.map(app => createAppCard(app)).join('');

    while (tempDiv.firstChild) {
        buildsContainer.appendChild(tempDiv.firstChild);
    }

    currentVisibleCount += RENDER_CHUNK_SIZE;
}

function createNoticeMarkup(notice) {
    const linksMarkup = notice.links.map(link =>
        `<a href="${link.url}" target="_blank" rel="noopener noreferrer">${escapeHtml(link.label)}</a>`
    ).join('\n                    ');

    return `
        <div class="app-notice ${escapeHtml(notice.className)}">
            <div class="app-notice-title">${escapeHtml(notice.title)}</div>
            <div class="app-notice-text">${escapeHtml(notice.text)}</div>
            <div class="app-notice-links">
                ${linksMarkup}
            </div>
        </div>
    `;
}

function createAppCard(app) {
    const patchesMarkup = app.patches.map((patch) => createPatchMarkup(app, patch)).join('');

    let noticesMarkup = '';
    CONFIG.appNotices.forEach(notice => {
        const matches = notice.triggers.some(trigger => normalizeForSearch(app.appName).includes(trigger));
        if (matches) {
            noticesMarkup += createNoticeMarkup(notice);
        }
    });

    return `
        <details class="build-card app-card">
            <summary class="build-header app-card-summary">
                <div class="app-name">${escapeHtml(app.appName)}</div>
                <span class="patch-count">${app.patches.length} patch${app.patches.length > 1 ? 'es' : ''}</span>
            </summary>
            <div class="app-card-body">
                ${noticesMarkup}
                <div class="patches-title">Available patches</div>
                <div class="patches-list">
                    ${patchesMarkup}
                </div>
            </div>
        </details>
    `;
}

function getDynamicAppFilters(apps) {
    const wordToAppKeys = new Map();

    apps.forEach(app => {
        const words = getAppNameWords(app.appName);
        words.forEach(word => {
            if (!wordToAppKeys.has(word)) {
                wordToAppKeys.set(word, new Set());
            }
            wordToAppKeys.get(word).add(app.appKey);
        });
    });

    const allWordEntries = Array.from(wordToAppKeys.entries());
    const preferredEntries = allWordEntries.filter(([, appKeys]) => appKeys.size >= SHARED_APP_WORD_MIN_COUNT);
    const fallbackEntries = allWordEntries.filter(([, appKeys]) => appKeys.size >= SHARED_APP_WORD_FALLBACK_COUNT);
    const selectedEntries = preferredEntries.length > 0 ? preferredEntries : fallbackEntries;

    return selectedEntries
        .sort((a, b) => a[0].localeCompare(b[0])) // Strictly alphabetical sort
        .map(([word]) => ({
            key: `word-${word}`,
            label: toFilterLabel(word)
        }));
}

function renderDynamicAppFilterButtons(filters) {
    const filterButtons = document.getElementById('appFilterButtons');
    if (!filterButtons) return;

    filterButtons.querySelectorAll('.dynamic-filter-btn').forEach(btn => btn.remove());

    filters.forEach(filter => {
        const button = document.createElement('button');
        button.className = 'filter-btn dynamic-filter-btn';
        button.dataset.filter = filter.key;
        button.type = 'button';
        button.textContent = filter.label;
        filterButtons.appendChild(button);
    });

    // --- ALPHABETICAL SORTING LOGIC ---
    // 1. Grab every button inside the filter container
    const allBtns = Array.from(filterButtons.querySelectorAll('.filter-btn'));

    // 2. Separate the fixed buttons from the ones we want to sort, in exact order!
    const fixedKeys = ['all', 'recent', 'popular'];
    const fixedBtns = [];
    fixedKeys.forEach(key => {
        const foundBtn = allBtns.find(btn => btn.dataset.filter === key);
        if (foundBtn) fixedBtns.push(foundBtn);
    });

    const sortableBtns = allBtns.filter(btn => !fixedKeys.includes(btn.dataset.filter));

    // 3. Sort the remaining buttons alphabetically by their text label
    sortableBtns.sort((a, b) => a.textContent.localeCompare(b.textContent));

    // 4. Re-append them to the container in the exact order we want
    fixedBtns.forEach(btn => filterButtons.appendChild(btn));
    sortableBtns.forEach(btn => filterButtons.appendChild(btn));
}

function getAppNameWords(appName) {
    const words = (appName || '')
        .toLowerCase()
        .split(/[^a-z0-9]+/)
        .filter(Boolean)
        .filter(word => word.length >= 3)
        .filter(word => !CONFIG.sharedAppWordStoplist.has(word));

    return Array.from(new Set(words));
}

function toFilterLabel(value) {
    return value.replace(/\b[a-z]/g, char => char.toUpperCase());
}

function createPatchMarkup(app, patch) {
    const buildCount = patch.builds.length;
    const allMeta = [patch.latestStable, patch.latestBeta, patch.latestVariant].filter(Boolean);
    const latestBuild = allMeta.length > 0
        ? allMeta.reduce((a, b) => new Date(a.publishedAt) > new Date(b.publishedAt) ? a : b).build
        : null;

    const boxes = [];

    if (patch.latestStable) {
        const buildMarkup = patch.latestStable.isArchiveFallback ? '' : `<span class="patch-meta-build">Build ${escapeHtml(patch.latestStable.build || 'N/A')}</span>`;
        boxes.push({
            label: 'Stable',
            html: `
            <button class="patch-open-box stable" data-app-key="${app.appKey}" data-patch-key="${patch.patchKey}" data-filter="stable" type="button">
                <span class="patch-meta-label">Stable</span>
                <span class="patch-meta-value">${escapeHtml(patch.latestStable.version)}</span>
                ${buildMarkup}
                <span class="patch-meta-date">${formatDate(patch.latestStable.publishedAt)}</span>
            </button>
        `});
    }

    if (patch.latestBeta) {
        const buildMarkup = patch.latestBeta.isArchiveFallback ? '' : `<span class="patch-meta-build">Build ${escapeHtml(patch.latestBeta.build || 'N/A')}</span>`;
        boxes.push({
            label: 'Beta',
            html: `
            <button class="patch-open-box beta" data-app-key="${app.appKey}" data-patch-key="${patch.patchKey}" data-filter="beta" type="button">
                <span class="patch-meta-label">Beta</span>
                <span class="patch-meta-value">${escapeHtml(patch.latestBeta.version)}</span>
                ${buildMarkup}
                <span class="patch-meta-date">${formatDate(patch.latestBeta.publishedAt)}</span>
            </button>
        `});
    }

    const variants = getUniqueVariants(patch);
    variants.forEach(variant => {
        const latestVariantBuild = getLatestVariantBuild(patch, variant);
        if (latestVariantBuild) {
            const buildMarkup = latestVariantBuild.isArchiveFallback ? '' : `<span class="patch-meta-build">Build ${escapeHtml(latestVariantBuild.build || 'N/A')}</span>`;
            boxes.push({
                label: variant,
                html: `
                <button class="patch-open-box variant" data-app-key="${app.appKey}" data-patch-key="${patch.patchKey}" data-filter="variant-${variant}" type="button">
                    <span class="patch-meta-label">${escapeHtml(variant)}</span>
                    <span class="patch-meta-value">${escapeHtml(latestVariantBuild.version)}</span>
                    ${buildMarkup}
                    <span class="patch-meta-date">${formatDate(latestVariantBuild.publishedAt)}</span>
                </button>
            `});
        }
    });

    // Keep logical order: Stable -> Beta -> Variants
    const patchMetaBoxes = boxes.map(b => b.html);

    if (patchMetaBoxes.length === 0) {
        patchMetaBoxes.push(`
            <button class="patch-open-box" data-app-key="${app.appKey}" data-patch-key="${patch.patchKey}" data-filter="all" type="button">
                <span class="patch-meta-label">Latest</span>
                <span class="patch-meta-value">${escapeHtml(patch.latestVersion)}</span>
                <span class="patch-meta-date">${formatDate(patch.latestPublishedAt)}</span>
            </button>
        `);
    }

    const buildCountBadge = `<span class="patch-build-count">${buildCount} build${buildCount > 1 ? 's' : ''}</span>`;

    return `
        <div class="patch-entry">
            <span class="patch-trigger-left">
                <span class="patch-chip-group">
                    <span class="patch-chip">${escapeHtml(patch.patchName)}</span>
                    ${buildCountBadge}
                </span>
                <span class="patch-meta-grid">
                    ${patchMetaBoxes.join('')}
                </span>
            </span>
        </div>
    `;
}

function openPatchModal(appKey, patchKey, preferredFilter = 'all') {
    activeModalAppKey = appKey;
    activeModalPatchKey = patchKey;

    const app = currentAppCatalog.find(item => item.appKey === appKey);
    const patch = app ? app.patches.find(item => item.patchKey === patchKey) : null;
    const hasStableBuild = patch ? getFilteredBuildsForFilter(patch, 'stable').length > 0 : false;
    const hasBetaBuild = patch ? getFilteredBuildsForFilter(patch, 'beta').length > 0 : false;
    const hasVariantBuild = patch ? getFilteredBuildsForFilter(patch, 'variant').length > 0 : false;
    const variants = patch ? getUniqueVariants(patch) : []; // Retrieve variants list

    const prefersStable = preferredFilter === 'stable' && hasStableBuild;
    const prefersBeta = preferredFilter === 'beta' && hasBetaBuild;
    const prefersSpecificVariant = preferredFilter.startsWith('variant-') && getFilteredBuildsForFilter(patch, preferredFilter).length > 0;
    const prefersGenericVariant = preferredFilter === 'variant' && hasVariantBuild;
    const prefersVersion = preferredFilter.startsWith('version-') && getFilteredBuildsForFilter(patch, preferredFilter).length > 0;

    if (prefersStable) {
        modalBuildFilter = 'stable';
    } else if (prefersBeta) {
        modalBuildFilter = 'beta';
    } else if (prefersSpecificVariant) {
        modalBuildFilter = preferredFilter;
    } else if (prefersGenericVariant) {
        modalBuildFilter = variants.length === 1 ? `variant-${variants[0]}` : 'variant';
    } else if (prefersVersion) {
        modalBuildFilter = preferredFilter;
    } else if (hasStableBuild) {
        modalBuildFilter = 'stable';
    } else if (hasBetaBuild) {
        modalBuildFilter = 'beta';
    } else if (hasVariantBuild) {
        modalBuildFilter = variants.length === 1 ? `variant-${variants[0]}` : 'variant';
    } else {
        modalBuildFilter = 'all';
    }

    renderOpenPatchModal();

    const modal = document.getElementById('patchModal');
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
}

function closePatchModal() {
    const modal = document.getElementById('patchModal');
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    activeModalAppKey = null;
    activeModalPatchKey = null;
}

function openObtainiumModal() {
    const modal = document.getElementById('obtainiumModal');
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');

    const body = document.getElementById('obtainiumBody');
    body.innerHTML = createObtainiumInstructions();
}

function closeObtainiumModal() {
    const modal = document.getElementById('obtainiumModal');
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
}

function createObtainiumInstructions() {
    const repoUrl = `https://github.com/${CONFIG.owner}/${CONFIG.repo}`;
    const obtainiumLatestUrl = 'https://github.com/ImranR98/Obtainium/releases/latest';
    const app = currentAppCatalog.find(item => item.appKey === activeModalAppKey);
    const patch = app ? app.patches.find(item => item.patchKey === activeModalPatchKey) : null;

    const filteredBuilds = patch ? getFilteredBuildsForFilter(patch, modalBuildFilter) : [];
    const fallbackBuilds = patch ? getFilteredBuildsForFilter(patch, 'all') : [];
    const sourceBuilds = filteredBuilds.length > 0 ? filteredBuilds : fallbackBuilds;
    const patchAssets = sourceBuilds.flatMap(build => build.assets || []);

    const regexMap = new Map();
    patchAssets
        .filter(asset => (asset?.name || '').toLowerCase().endsWith('.apk'))
        .forEach(asset => {
            const result = buildObtainiumRegexFromAsset(asset);
            if (!result?.regex || regexMap.has(result.regex)) return;

            const appLabel = asset?.parsed?.appName || app?.appName || 'App';
            const patchLabel = asset?.parsed?.patchName || patch?.patchName || 'patch';
            const variantLabel = asset?.parsed?.variant ? ` (${escapeHtml(asset.parsed.variant)})` : '';

            // Extract the normalized variant slug (e.g., 'foss') or set as 'default'
            const variantSlug = asset?.parsed?.variant ? normalizeForSearch(asset.parsed.variant) : 'default';

            // Save both the label and the variant slug
            regexMap.set(result.regex, {
                label: `${appLabel} ${patchLabel}${variantLabel}`,
                variantSlug: variantSlug
            });
        });

    const copyCode = (text) => {
        const escaped = escapeForOnclickCopy(text);
        return `onclick="navigator.clipboard.writeText('${escaped}').then(() => { this.textContent='Copied!'; setTimeout(() => { this.textContent='Copy'; }, 2000); })" `;
    };

    const selectedExamplesMarkup = Array.from(regexMap.entries()).length > 0
        ? Array.from(regexMap.entries()).map(([regex, data]) => {

            const label = data.label;
            const variantSlug = data.variantSlug;

            // Advanced lookup: handles strings or nested variant objects
            const appConfig = CONFIG.appIds[activeModalAppKey];
            let appId = null;

            if (typeof appConfig === 'string') {
                appId = appConfig;
            } else if (typeof appConfig === 'object' && appConfig !== null) {
                appId = appConfig[variantSlug] || appConfig['default'];
            }

            if (!appId) console.warn(`Missing App ID for: ${activeModalAppKey} (Variant: ${variantSlug})`);

            const additionalSettings = { apkFilterRegEx: regex };
            if (modalBuildFilter === 'beta') {
                additionalSettings.includePrereleases = true;
            }

            // Conditionally generate the Obtainium button HTML
            let obtainiumButtonHtml = '';
            if (appId) {
                const obtainiumConfig = {
                    id: appId,
                    name: label,
                    author: CONFIG.owner,
                    url: repoUrl,
                    additionalSettings: JSON.stringify(additionalSettings)
                };
                const oneClickUrl = `https://apps.obtainium.imranr.dev/redirect?r=${encodeURIComponent('obtainium://app/' + JSON.stringify(obtainiumConfig))}`;
                obtainiumButtonHtml = `<a href="${oneClickUrl}" class="copy-btn obtainium-add-btn" target="_blank" rel="noopener noreferrer">Add to Obtainium</a>`;
            }

            return `
                    <div class="example">
                        <strong>${escapeHtml(label)}</strong>
                        <div class="code-with-copy ${appId ? '' : 'no-obtainium'}">
                            <code>${escapeHtml(regex)}</code>
                            ${obtainiumButtonHtml}
                            <button type="button" class="copy-btn" ${copyCode(regex)}>Copy</button>
                        </div>
                    </div>`;
        }).join('')
        : `
                    <div class="example">
                        <strong>No APK URLs found for this patch.</strong>
                    </div>`;

    const betaPrereleaseStepMarkup = modalBuildFilter === 'beta'
        ? '<li>Enable include prereleases.</li>'
        : '';

    const variantStepMarkup = modalBuildFilter.startsWith('variant')
        ? '<li>To get beta updates enable include prereleases.</li>'
        : '';

    return `
        <div class="obtainium-instructions">
            <ol>
                <li>Download and install Obtainium from <a href="${obtainiumLatestUrl}" target="_blank" rel="noopener noreferrer">GitHub</a>.</li>
                <li>Open Obtainium on your device.</li>
                <li>Tap Add app.</li>
                <li>In the app source URL box, enter:
                    <div class="instruction-code">
                        <code>${escapeHtml(repoUrl)}</code>
                        <button type="button" class="copy-btn" ${copyCode(repoUrl)}>Copy</button>
                    </div>
                </li>
                <li>Scroll down to filter APKs by regular expression and enter regex for the APK you want:
                    <div class="filter-examples">
                        ${selectedExamplesMarkup}
                    </div>
                </li>
                ${betaPrereleaseStepMarkup}
                ${variantStepMarkup}
                <li>Tap add to begin downloading. In future, Obtainium will automatically fetch updates when new releases are published.</li>
            </ol>
        </div>
    `;
}

function buildObtainiumRegexFromAsset(asset) {
    if (!asset || !asset.name) return null;

    const assetName = asset.name;
    if (!assetName.toLowerCase().endsWith('.apk')) return null;

    const nameWithoutExt = assetName.replace(/\.apk$/i, '');
    const arch = extractArchFromAssetName(nameWithoutExt);
    const nameWithoutArch = arch
        ? nameWithoutExt.replace(new RegExp(`-${escapeRegex(arch)}$`, 'i'), '')
        : nameWithoutExt;

    let baseName = nameWithoutArch;

    // Use the highly accurate version string we already extracted during parsing
    if (asset.parsed && asset.parsed.version && asset.parsed.version !== 'Version unknown') {
        const versionIndex = nameWithoutArch.lastIndexOf(`-${asset.parsed.version}`);
        if (versionIndex !== -1) {
            baseName = nameWithoutArch.substring(0, versionIndex);
        }
    } else {
        // Fallback for edge cases: Requires a dot in the version to prevent false positives like "-6"
        baseName = nameWithoutArch
            .replace(/-v?\d+(?:\.\d+)[\w.-]*$/i, '')
            .replace(/-+$/g, '');
    }

    if (!baseName) return null;

    // Generate the strict Obtainium regex
    const regex = `^${escapeRegex(baseName)}-v?\\d.*\\.apk$`;
    return { regex, arch, assetName };
}

function extractArchFromAssetName(nameWithoutExt) {
    const lowerName = (nameWithoutExt || '').toLowerCase();
    return CONFIG.knownArchs.find(arch => lowerName.endsWith(`-${arch}`)) || null;
}

function escapeRegex(value) {
    return String(value || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function escapeForOnclickCopy(value) {
    return String(value || '')
        .replace(/\\/g, '\\\\')
        .replace(/'/g, "\\'");
}

function renderOpenPatchModal() {
    if (!activeModalAppKey || !activeModalPatchKey) return;

    const app = currentAppCatalog.find(item => item.appKey === activeModalAppKey);
    if (!app) return;

    const patch = app.patches.find(item => item.patchKey === activeModalPatchKey);
    if (!patch) return;

    const body = document.getElementById('patchModalBody');
    const title = document.getElementById('patchModalTitle');
    title.textContent = `${app.appName} • ${patch.patchName}`;

    updateModalFilterButtons(patch);
    body.innerHTML = createPatchModalContent(patch, modalBuildFilter);
}

function getUniqueVariants(patch) {
    const variants = new Set();
    (patch.builds || []).forEach(build => {
        (build.assets || []).forEach(asset => {
            if (asset?.parsed?.variant) {
                variants.add(asset.parsed.variant);
            }
        });
    });
    return Array.from(variants).sort();
}

function getUniqueVersions(patch) {
    const versions = new Set();
    (patch.builds || []).forEach(build => {
        (build.assets || []).forEach(asset => {
            if (asset?.parsed?.version) {
                versions.add(asset.parsed.version);
            }
        });
    });

    // OPTIMIZATION: Semantic version sorting using natural numeric collation.
    // Correctly sorts "v11.80" as newer than "v9.80".
    return Array.from(versions).sort((a, b) =>
        b.localeCompare(a, undefined, { numeric: true, sensitivity: 'base' })
    );
}

function getLatestVariantBuild(patch, variantName) {
    let latestNormal = null;
    let latestArchive = null;
    let latestNormalDate = 0;
    let latestArchiveDate = 0;

    (patch.builds || []).forEach(build => {
        const variantAsset = (build.assets || []).find(asset => asset?.parsed?.variant === variantName);
        if (variantAsset) {
            const buildDate = new Date(build.publishedAt).getTime();

            if (!build.isArchive) {
                if (buildDate > latestNormalDate) {
                    latestNormalDate = buildDate;
                    latestNormal = {
                        version: variantAsset.parsed.version,
                        build: build.build,
                        publishedAt: build.publishedAt,
                        isArchiveFallback: false
                    };
                }
            } else {
                if (buildDate > latestArchiveDate) {
                    latestArchiveDate = buildDate;
                    latestArchive = {
                        version: variantAsset.parsed.version,
                        build: build.build,
                        publishedAt: build.publishedAt,
                        isArchiveFallback: true
                    };
                }
            }
        }
    });

    return latestNormal || latestArchive;
}

function updateModalFilterButtons(patch = null) {
    const hasStableBuild = patch ? getFilteredBuildsForFilter(patch, 'stable').length > 0 : true;
    const hasBetaBuild = patch ? getFilteredBuildsForFilter(patch, 'beta').length > 0 : true;
    const hasVariantBuild = patch ? getFilteredBuildsForFilter(patch, 'variant').length > 0 : false;
    const variants = patch ? getUniqueVariants(patch) : [];

    const showGenericVariant = hasVariantBuild && variants.length > 1;

    const versions = patch ? getUniqueVersions(patch).slice(0, 5) : [];

    const activeTypesCount = (hasStableBuild ? 1 : 0) + (hasBetaBuild ? 1 : 0) + (hasVariantBuild ? 1 : 0);

    if (modalBuildFilter === 'variant' && hasVariantBuild && variants.length === 1) {
        modalBuildFilter = `variant-${variants[0]}`;
    }

    if (modalBuildFilter === 'all' && activeTypesCount <= 1) {
        modalBuildFilter = hasStableBuild ? 'stable' : hasBetaBuild ? 'beta' : hasVariantBuild ? (variants.length === 1 ? `variant-${variants[0]}` : 'variant') : 'all';
    } else if (modalBuildFilter === 'stable' && !hasStableBuild) {
        modalBuildFilter = hasBetaBuild ? 'beta' : hasVariantBuild ? (variants.length === 1 ? `variant-${variants[0]}` : 'variant') : 'all';
    } else if (modalBuildFilter === 'beta' && !hasBetaBuild) {
        modalBuildFilter = hasStableBuild ? 'stable' : hasVariantBuild ? (variants.length === 1 ? `variant-${variants[0]}` : 'variant') : 'all';
    } else if (modalBuildFilter === 'variant' && !showGenericVariant) {
        modalBuildFilter = hasStableBuild ? 'stable' : hasBetaBuild ? 'beta' : 'all';
    } else if (modalBuildFilter.startsWith('variant-') && !hasVariantBuild) {
        modalBuildFilter = hasStableBuild ? 'stable' : hasBetaBuild ? 'beta' : 'all';
    } else if (modalBuildFilter.startsWith('version-')) {
        const activeVersion = modalBuildFilter.slice(8);
        if (!versions.includes(activeVersion) || getFilteredBuildsForFilter(patch, modalBuildFilter).length === 0) {
            modalBuildFilter = hasStableBuild ? 'stable' : hasBetaBuild ? 'beta' : hasVariantBuild ? (variants.length === 1 ? `variant-${variants[0]}` : 'variant') : 'all';
        }
    }

    document.querySelectorAll('.modal-filter-btn').forEach(btn => {
        const filter = btn.dataset.filter;

        if (!['all', 'stable', 'beta', 'variant'].includes(filter)) return;

        let available = false;
        if (filter === 'all') available = activeTypesCount > 1;
        else if (filter === 'stable') available = hasStableBuild;
        else if (filter === 'beta') available = hasBetaBuild;
        else if (filter === 'variant') available = showGenericVariant;

        btn.style.display = available ? '' : 'none';
        btn.disabled = !available;
        btn.classList.toggle('active', available && filter === modalBuildFilter);
    });

    const filterButtonsContainer = document.querySelector('.modal-filter-buttons');

    if (filterButtonsContainer) {
        filterButtonsContainer.querySelectorAll('.variant-btn, .version-btn').forEach(btn => btn.remove());

        if (variants.length > 0) {
            variants.forEach(variant => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'modal-filter-btn variant-btn';
                btn.dataset.filter = `variant-${variant}`;
                btn.textContent = variant;
                btn.disabled = false;
                btn.classList.toggle('active', `variant-${variant}` === modalBuildFilter);
                filterButtonsContainer.appendChild(btn);
            });
        }

        if (versions.length > 1) {
            versions.forEach(version => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'modal-filter-btn version-btn';
                btn.dataset.filter = `version-${version}`;
                btn.textContent = version;
                btn.disabled = false;
                btn.classList.toggle('active', `version-${version}` === modalBuildFilter);
                filterButtonsContainer.appendChild(btn);
            });
        }
    }
}

function createPatchModalContent(patch, buildFilter = 'all') {
    const builds = getFilteredBuildsForFilter(patch, buildFilter);

    if (builds.length === 0) {
        return '<div class="no-results">No builds in this filter.</div>';
    }

    return builds.map((build, index) => createModalBuildMarkup(build, index === 0)).join('');
}

function getFilteredBuildsForFilter(patch, buildFilter = 'all') {
    return (patch.builds || [])
        .map(build => ({ ...build, assets: getFilteredAssets(build, buildFilter) }))
        .filter(build => build.assets.length > 0);
}

function getFilteredAssets(build, buildFilter) {
    const assets = build.assets || [];

    if (buildFilter === 'stable') {
        if (build.releaseType !== 'stable') return [];
        return assets.filter(asset => !isVariantAsset(asset));
    }

    if (buildFilter === 'beta') {
        if (build.releaseType !== 'beta') return [];
        return assets.filter(asset => !isVariantAsset(asset));
    }

    if (buildFilter === 'variant') {
        return assets.filter(asset => isVariantAsset(asset));
    }

    if (buildFilter.startsWith('variant-')) {
        const variantName = buildFilter.slice(8);
        return assets.filter(asset => asset?.parsed?.variant === variantName);
    }

    if (buildFilter.startsWith('version-')) {
        const version = buildFilter.slice(8);
        return assets.filter(asset => asset?.parsed?.version === version);
    }

    return assets;
}

function isVariantAsset(asset) {
    return Boolean(asset?.parsed?.variant);
}

function createModalBuildMarkup(build, openByDefault = false) {
    const assetsByArch = groupAssetsByArchitecture(build.assets);

    const buildBadgeClass = build.releaseType === 'beta' ? 'prerelease' : 'stable';
    const badgeText = build.releaseType === 'beta' ? 'Beta' : 'Stable';

    const archiveBadgeMarkup = build.isArchive ? '<span class="release-badge archive">Archive</span>' : '';
    const titleText = build.isArchive ? escapeHtml(build.build) : `Build ${escapeHtml(build.build)}`;

    const hasVariantAssets = build.assets.some(asset => isVariantAsset(asset));
    let downloadsMarkup = '';

    const uniqueBuildVersions = Array.from(new Set(build.assets.map(a => a.parsed?.version).filter(Boolean))).join(' / ');

    // Remove the app version string from the date line if it is an archive
    const dateText = build.isArchive
        ? formatDate(build.publishedAt)
        : `${formatDate(build.publishedAt)} • ${escapeHtml(uniqueBuildVersions)}`;

    Object.entries(assetsByArch).forEach(([arch, assets]) => {
        if (assets.length === 0) return;

        downloadsMarkup += `<div class="asset-group"><div class="asset-group-label">${capitalizeArch(arch)}</div>`;
        assets.forEach(asset => {
            const sizeStr = formatBytes(asset.size);

            const downloads = (asset.download_count || 0).toLocaleString();

            const variantBadge = asset.parsed.variant ? `<span class="variant-badge">${escapeHtml(asset.parsed.variant)}</span>` : '';
            downloadsMarkup += `
                <a href="${asset.browser_download_url}" 
                   class="download-btn ${arch}" 
                   download 
                   title="${asset.name}">
                    <span class="asset-left">
                        <span class="asset-title">${escapeHtml(asset.parsed.appName)}</span>
                        <span class="asset-subtitle">${escapeHtml(asset.parsed.patchName)} • ${escapeHtml(asset.parsed.version)}</span>
                    </span>
                    <span class="asset-right">
                        ${variantBadge}
                        <span class="btn-text">${escapeHtml(asset.parsed.archLabel)} • ${asset.fileType} • ${sizeStr} • ${downloads}</span>
                    </span>
                </a>`;
        });
        downloadsMarkup += `</div>`;
    });

    const modalBadges = [];
    if (build.isArchive) {
        modalBadges.push({ label: 'Archive', html: '<span class="release-badge archive">Archive</span>' });
    }
    modalBadges.push({ label: badgeText, html: `<span class="release-badge ${buildBadgeClass}">${badgeText}</span>` });
    if (hasVariantAssets) {
        modalBadges.push({ label: 'Variant', html: '<span class="variants-indicator">Variant</span>' });
    }

    // Sort the small pill badges alphabetically (Archive -> Beta/Stable -> Variant)
    modalBadges.sort((a, b) => a.label.localeCompare(b.label));
    const badgeGroupMarkup = modalBadges.map(b => b.html).join('\n                    ');

    return `
        <details class="modal-build-card" ${openByDefault ? 'open' : ''}>
            <summary class="modal-build-header">
                <div class="modal-build-header-left">
                    <div class="modal-build-title">${titleText}</div>
                    <div class="modal-build-date">${dateText}</div>
                </div>
                <span class="badge-group">
                    ${badgeGroupMarkup}
                </span>
            </summary>
            <div class="modal-build-downloads">
                ${downloadsMarkup || '<p style="color: var(--text-secondary); font-size: 0.9rem;">No downloads available</p>'}
                <a href="${build.releaseUrl}" target="_blank" class="release-link patch-release-link">View source release →</a>
            </div>
        </details>
    `;
}

function groupAssetsByArchitecture(assets) {
    const groups = {
        arm64: [], arm32: [], universal: [], x86: [], other: []
    };

    assets.forEach(asset => {
        const detectedArch = detectArchitecture(asset.name);
        groups[detectedArch].push(asset);
    });

    const filtered = {};
    ['arm64', 'arm32', 'universal', 'x86', 'other'].forEach(arch => {
        if (groups[arch].length > 0) {
            const sorted = groups[arch].sort((a, b) => {
                const aIsApk = a.name.toLowerCase().endsWith('.apk') ? 0 : 1;
                const bIsApk = b.name.toLowerCase().endsWith('.apk') ? 0 : 1;
                return aIsApk - bIsApk;
            });
            filtered[arch] = sorted;
        }
    });

    return filtered;
}

function getFileType(filename) {
    const lower = filename.toLowerCase();
    if (lower.endsWith('.apk')) return 'APK';
    if (lower.endsWith('.zip')) return 'Module';
    return 'File';
}

function detectArchitecture(filename) {
    const name = (filename || '').toLowerCase();
    if (name.includes('arm64') || name.includes('aarch64') || name.includes('arm64-v8a')) return 'arm64';
    if ((name.includes('arm') && !name.includes('arm64')) || name.includes('arm-v7a') || name.includes('armeabi')) return 'arm32';
    if (name.includes('universal') || name.includes('-all.') || /^(?!.*arm|x86|x64|i386)[^-]*\.apk$/.test(name)) return 'universal';
    if (name.includes('x86_64') || name.includes('x64') || name.includes('x86')) return 'x86';
    return 'other';
}

// Cached Parsing Logic
function parseAssetDisplay(filename, arch, fileType) {
    if (parseCache.has(filename)) {
        return parseCache.get(filename);
    }

    const baseName = filename.replace(/\.(apk|zip)$/i, '');
    const tokens = baseName.split('-').filter(Boolean);
    const archSubTokens = new Set(CONFIG.knownArchs.flatMap(a => a.split('-')));
    const versionIndex = tokens.findIndex(token => /^v\d+/i.test(token) && !archSubTokens.has(token.toLowerCase()));
    const moduleIndex = tokens.findIndex(token => token.toLowerCase() === 'module');
    const stopIndexCandidates = [versionIndex, moduleIndex].filter(index => index >= 0);
    const stopIndex = stopIndexCandidates.length > 0 ? Math.min(...stopIndexCandidates) : tokens.length;
    const preMetaTokens = tokens.slice(0, stopIndex);

    const knownPatchTokens = CONFIG.knownPatchTokens;
    const variantKeywords = CONFIG.variantKeywords;

    let patchStartIndex = preMetaTokens.findIndex(token => knownPatchTokens.has(token.toLowerCase()));
    if (patchStartIndex < 0) {
        patchStartIndex = Math.max(preMetaTokens.length - 1, 0);
    }

    const appTokens = preMetaTokens.slice(0, patchStartIndex);
    let patchTokens = preMetaTokens.slice(patchStartIndex);

    let variant = null;
    while (patchTokens.length > 1 && variantKeywords.has(patchTokens[patchTokens.length - 1].toLowerCase())) {
        variant = patchTokens[patchTokens.length - 1];
        patchTokens = patchTokens.slice(0, -1);
    }

    let version = 'Version unknown';
    if (versionIndex >= 0) {
        const versionParts = [tokens[versionIndex]];
        for (let i = versionIndex + 1; i < tokens.length; i++) {
            const t = tokens[i].toLowerCase();
            const isArchToken = CONFIG.knownArchs.some(a => a.split('-').includes(t));
            if (t === 'module' || t === 'universal' || isArchToken) {
                break;
            }
            versionParts.push(tokens[i]);
        }
        version = versionParts.join('-');
    }
    const appSlug = (appTokens.length > 0 ? appTokens : preMetaTokens).join('-').toLowerCase();
    const patchSlug = (patchTokens.length > 0 ? patchTokens : ['patched', 'build']).join('-').toLowerCase();

    const result = {
        appName: formatBrandDisplayName(appTokens.length > 0 ? appTokens.join(' ') : preMetaTokens.join(' ') || baseName),
        patchName: formatBrandDisplayName(patchTokens.length > 0 ? patchTokens.join(' ') : 'Patched Build'),
        appSlug,
        patchSlug,
        variant: variant ? formatBrandDisplayName(variant) : null,
        version,
        archLabel: formatArchitectureLabel(arch, fileType),
        fileType
    };

    parseCache.set(filename, result);
    return result;
}

function toTitleWords(value) {
    return (value || '').replace(/\s+/g, ' ').trim().replace(/\b\w/g, char => char.toUpperCase());
}

function formatBrandDisplayName(value) {
    return toTitleWords(value)
        .split(' ')
        .map(token => CONFIG.brandOverrides[token.toLowerCase()] || token)
        .join(' ');
}

function formatArchitectureLabel(arch, fileType) {
    const labels = { arm64: 'ARM64', arm32: 'ARM32', universal: 'Universal', x86: 'x86/x64', other: fileType };
    return labels[arch] || arch.toUpperCase();
}

function capitalizeArch(arch) {
    const map = { 'arm64': 'ARM64', 'arm32': 'ARM32', 'universal': 'Universal', 'x86': 'X86', 'other': 'Other' };
    return map[arch] || arch;
}

function formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024, sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function formatDate(value) {
    return new Date(value).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function normalizeForSearch(value) {
    return (value || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

function matchesSearch(value, rawQuery, normalizedQuery) {
    const lowerValue = (value || '').toLowerCase();
    const normalizedValue = normalizeForSearch(lowerValue);

    if (lowerValue.includes(rawQuery)) return true;
    if (!normalizedQuery) return false;
    if (normalizedValue.includes(normalizedQuery)) return true;
    if (normalizedQuery.length < 4) return false;

    const queryTokens = getSearchTokens(rawQuery);
    const valueTokens = getSearchTokens(lowerValue);

    if (queryTokens.length === 0 || valueTokens.length === 0) return false;

    return queryTokens.every(queryToken =>
        valueTokens.some(valueToken => tokensFuzzyMatch(queryToken, valueToken))
    );
}

// Cached Search Tokens
function getSearchTokens(value) {
    if (tokenCache.has(value)) {
        return tokenCache.get(value);
    }
    const tokens = (value || '').toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
    tokenCache.set(value, tokens);
    return tokens;
}

function tokensFuzzyMatch(queryToken, valueToken) {
    if (!queryToken || !valueToken) return false;
    if (valueToken.includes(queryToken) || queryToken.includes(valueToken)) return true;
    if (queryToken.length < 3) return false;
    const maxDistance = getMaxEditDistance(queryToken.length);
    return isWithinEditDistance(queryToken, valueToken, maxDistance);
}

function getMaxEditDistance(length) {
    if (length <= 4) return 1;
    if (length <= 8) return 2;
    return 3;
}

function isWithinEditDistance(a, b, maxDistance) {
    if (Math.abs(a.length - b.length) > maxDistance) return false;

    const bLength = b.length;
    let previousRow = new Array(bLength + 1);
    for (let j = 0; j <= bLength; j++) previousRow[j] = j;

    for (let i = 1; i <= a.length; i++) {
        const currentRow = new Array(bLength + 1);
        currentRow[0] = i;
        let rowMin = currentRow[0];

        for (let j = 1; j <= bLength; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            currentRow[j] = Math.min(
                previousRow[j] + 1,
                currentRow[j - 1] + 1,
                previousRow[j - 1] + cost
            );
            if (currentRow[j] < rowMin) rowMin = currentRow[j];
        }

        if (rowMin > maxDistance) return false;
        previousRow = currentRow;
    }

    return previousRow[bLength] <= maxDistance;
}

function escapeHtml(text) {
    return String(text ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// Update the last updated timestamp based on the newest release
function updateLastUpdateTimestamp() {
    if (!allReleases || allReleases.length === 0) {
        setPillState('success', 'No releases found');
        return;
    }

    const latestTime = allReleases.reduce((max, release) => {
        const t = new Date(release.published_at).getTime();
        return t > max ? t : max;
    }, 0);

    if (latestTime === 0) return;

    const dateStr = new Date(latestTime).toLocaleString('en-US', {
        day: 'numeric', month: 'long', year: 'numeric',
        hour: 'numeric', minute: '2-digit'
    });
    setPillState('success', dateStr);
}

// Manages the visual state of the Update Pill (No click events)
function setPillState(state, text) {
    const textEl = document.getElementById('lastUpdateText');
    if (!textEl) return;

    const pill = textEl.closest('.update-pill');
    if (!pill) return;

    // Remove old colors and apply the new one
    pill.classList.remove('checking', 'error', 'success');
    pill.classList.add(state);
    textEl.textContent = text;

    // Swap the SVG icon to match the state
    const svgContainer = pill.querySelector('svg');
    if (!svgContainer) return;

    if (state === 'checking') {
        svgContainer.innerHTML = '<path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3"/>';
        svgContainer.classList.add('spin');
    } else if (state === 'error') {
        svgContainer.innerHTML = '<circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>';
        svgContainer.classList.remove('spin');
    } else if (state === 'success') {
        svgContainer.innerHTML = '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>';
        svgContainer.classList.remove('spin');
    }
}
