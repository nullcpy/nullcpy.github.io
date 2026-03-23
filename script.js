// Configuration
const CONFIG = {
    owner: 'nullcpy',
    repo: 'rvb',
    // Cache duration in minutes (used for localStorage fallback)
    cacheDuration: 5,
};

// State
let allReleases = [];
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
const RENDER_CHUNK_SIZE = 20;

const SHARED_APP_WORD_MIN_COUNT = 3;
const SHARED_APP_WORD_FALLBACK_COUNT = 2;
const SHARED_APP_WORD_STOPLIST = new Set([
    'revanced', 'patched', 'patch', 'extended', 'advanced',
    'theme', 'edition', 'android', 'app', 'google',
    'meta', 'facebook', 'instagram', 'messenger'
]);

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

// Event Listeners
function setupEventListeners() {
    let searchTimeout;
    
    // 1. Debounced Search Input
    document.getElementById('searchInput').addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            searchTerm = e.target.value.toLowerCase();
            document.getElementById('loading').style.display = 'block';
            
            setTimeout(() => {
                filterAndRenderReleases();
            }, 10);
        }, 250);
    });

    const appFilterButtons = document.getElementById('appFilterButtons');
    if (appFilterButtons) {
        appFilterButtons.addEventListener('click', (e) => {
            const filterBtn = e.target.closest('.filter-btn');
            if (!filterBtn) return;

            appViewFilter = filterBtn.dataset.filter || 'all';
            updateAppFilterButtons();
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
        const cached = getCachedReleases();
        if (cached) {
            allReleases = cached;
            document.getElementById('loading').style.display = 'none';
            document.getElementById('error').style.display = 'none';
            filterAndRenderReleases();
            return;
        }

        document.getElementById('loading').style.display = 'block';
        document.getElementById('error').style.display = 'none';

        // Add a timestamp to bypass GitHub Pages CDN cache
        const cacheBuster = new Date().getTime();
        let response = await fetch(`releases.json?v=${cacheBuster}`);

        // Fallback to live API if releases.json is missing
        if (!response.ok) {
            console.warn('Local releases.json not found. Falling back to live API...');
            response = await fetch(
                `https://api.github.com/repos/${CONFIG.owner}/${CONFIG.repo}/releases`,
                { headers: { 'Accept': 'application/vnd.github.v3+json' } }
            );
        }

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status}`);
        }

        allReleases = await response.json();

        cacheReleases(allReleases);

        document.getElementById('loading').style.display = 'none';
        filterAndRenderReleases();

    } catch (error) {
        console.error('Error loading releases:', error);
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

// Filter and render releases
function filterAndRenderReleases() {
    const filtered = allReleases.filter(r => !r.draft);
    const fullCatalog = buildAppCatalog(filtered, '');
    dynamicAppFilters = getDynamicAppFilters(fullCatalog);
    renderDynamicAppFilterButtons(dynamicAppFilters);

    if (appViewFilter.startsWith('word-') && !dynamicAppFilters.some(filter => filter.key === appViewFilter)) {
        appViewFilter = 'all';
    }

    const appCatalog = buildAppCatalog(filtered, searchTerm);
    const filteredApps = applyAppViewFilter(appCatalog);
    
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

function applyAppViewFilter(apps) {
    if (appViewFilter === 'google') {
        return apps.filter(app => isGoogleApp(app.appName));
    }

    if (appViewFilter === 'meta') {
        return apps.filter(app => isMetaApp(app.appName));
    }

    if (appViewFilter.startsWith('word-')) {
        const word = appViewFilter.slice(5);
        return apps.filter(app => getAppNameWords(app.appName).includes(word));
    }

    if (appViewFilter === 'recent') {
        return [...apps].sort((a, b) => getAppLatestPublishedAt(b) - getAppLatestPublishedAt(a));
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
        const releaseType = release.prerelease ? 'beta' : 'stable';

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
                    latestVersion: parsed.version,
                    latestPublishedAt: release.published_at,
                    latestStable: null,
                    latestBeta: null,
                    latestVariant: null,
                    builds: new Map()
                });
            }

            const patchEntry = appEntry.patches.get(patchKey);
            const patchDate = new Date(patchEntry.latestPublishedAt).getTime();
            const releaseDate = new Date(release.published_at).getTime();

            if (releaseDate > patchDate) {
                patchEntry.latestVersion = parsed.version;
                patchEntry.latestPublishedAt = release.published_at;
            }

            const buildLabel = getBuildNumberLabel(release);
            setLatestPatchMeta(patchEntry, releaseType, parsed.version, buildLabel, release.published_at);

            if (parsed.variant) {
                setLatestVariantMeta(patchEntry, parsed.variant, parsed.version, buildLabel, release.published_at);
            }

            const buildKey = String(release.id);
            if (!patchEntry.builds.has(buildKey)) {
                patchEntry.builds.set(buildKey, {
                    releaseId: release.id,
                    build: getBuildNumberLabel(release),
                    releaseType,
                    publishedAt: release.published_at,
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
        .map(app => ({
            ...app,
            patches: Array.from(app.patches.values()).sort((a, b) =>
                new Date(b.latestPublishedAt) - new Date(a.latestPublishedAt)
            )
                .map(patch => ({
                    ...patch,
                    builds: Array.from(patch.builds.values()).sort((a, b) =>
                        new Date(b.publishedAt) - new Date(a.publishedAt)
                    )
                }))
        }))
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

function createAppCard(app) {
    const patchesMarkup = app.patches.map((patch) => createPatchMarkup(app, patch)).join('');
    const microgNoticeMarkup = isGoogleApp(app.appName) ? createMicrogNoticeMarkup() : '';
    const twitterNoticeMarkup = isTwitterApp(app.appName) ? createTwitterLoginNoticeMarkup() : '';

    return `
        <details class="build-card app-card">
            <summary class="build-header app-card-summary">
                <div class="app-name">${escapeHtml(app.appName)}</div>
                <span class="patch-count">${app.patches.length} patch${app.patches.length > 1 ? 'es' : ''}</span>
            </summary>
            <div class="app-card-body">
                ${microgNoticeMarkup}
                ${twitterNoticeMarkup}
                <div class="patches-title">Available patches</div>
                <div class="patches-list">
                    ${patchesMarkup}
                </div>
            </div>
        </details>
    `;
}

function isGoogleApp(appName) {
    const name = normalizeForSearch(appName);
    return name.includes('youtube') || name.includes('google');
}

function isMetaApp(appName) {
    const name = normalizeForSearch(appName);
    return name.includes('threads') || name.includes('instagram') || name.includes('messenger');
}

function isTwitterApp(appName) {
    const name = normalizeForSearch(appName);
    return name.includes('twitter');
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
        .sort((a, b) => {
            const byCount = b[1].size - a[1].size;
            if (byCount !== 0) return byCount;
            return a[0].localeCompare(b[0]);
        })
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
}

function getAppNameWords(appName) {
    const words = (appName || '')
        .toLowerCase()
        .split(/[^a-z0-9]+/)
        .filter(Boolean)
        .filter(word => word.length >= 3)
        .filter(word => !SHARED_APP_WORD_STOPLIST.has(word));

    return Array.from(new Set(words));
}

function toFilterLabel(value) {
    return value.replace(/\b[a-z]/g, char => char.toUpperCase());
}

function createMicrogNoticeMarkup() {
    return `
        <div class="microg-note">
            <div class="microg-note-title">Login Issue</div>
            <div class="microg-note-text">Signing into Google account on APK (not Module) requires MicroG. Please install one from below before trying to sign in.</div>
            <div class="microg-note-links">
                <a href="https://github.com/MorpheApp/MicroG-RE/releases/latest" target="_blank" rel="noopener noreferrer">Morphe</a>
                <a href="https://github.com/ReVanced/GmsCore/releases/latest" target="_blank" rel="noopener noreferrer">ReVanced</a>
            </div>
        </div>
    `;
}

function createTwitterLoginNoticeMarkup() {
    return `
        <div class="twitter-login-note">
            <div class="twitter-login-note-title">Login Issue</div>
            <div class="twitter-login-note-text">Since October 2025, Twitter has started checking whether the app is modified or if the phone integrity fails during login. These checks are server-side, not client-side.</div>
            <div class="twitter-login-note-links">
                <a href="https://t.me/pikopatches/1/59772" target="_blank" rel="noopener noreferrer">Workarounds</a>
            </div>
        </div>
    `;
}

function createPatchMarkup(app, patch) {
    const buildCount = patch.builds.length;
    const allMeta = [patch.latestStable, patch.latestBeta, patch.latestVariant].filter(Boolean);
    const latestBuild = allMeta.length > 0
        ? allMeta.reduce((a, b) => new Date(a.publishedAt) > new Date(b.publishedAt) ? a : b).build
        : null;

    const patchMetaBoxes = [];

    if (patch.latestStable) {
        patchMetaBoxes.push(`
            <button class="patch-open-box stable" data-app-key="${app.appKey}" data-patch-key="${patch.patchKey}" data-filter="stable" type="button">
                <span class="patch-meta-label">Stable</span>
                <span class="patch-meta-value">${escapeHtml(patch.latestStable.version)}</span>
                <span class="patch-meta-build">Build ${escapeHtml(patch.latestStable.build || 'N/A')}</span>
                <span class="patch-meta-date">${formatDate(patch.latestStable.publishedAt)}</span>
            </button>
        `);
    }

    if (patch.latestBeta) {
        patchMetaBoxes.push(`
            <button class="patch-open-box beta" data-app-key="${app.appKey}" data-patch-key="${patch.patchKey}" data-filter="beta" type="button">
                <span class="patch-meta-label">Beta</span>
                <span class="patch-meta-value">${escapeHtml(patch.latestBeta.version)}</span>
                <span class="patch-meta-build">Build ${escapeHtml(patch.latestBeta.build || 'N/A')}</span>
                <span class="patch-meta-date">${formatDate(patch.latestBeta.publishedAt)}</span>
            </button>
        `);
    }

    const variants = getUniqueVariants(patch);
    variants.forEach(variant => {
        const latestVariantBuild = getLatestVariantBuild(patch, variant);
        if (latestVariantBuild) {
            patchMetaBoxes.push(`
                <button class="patch-open-box variant" data-app-key="${app.appKey}" data-patch-key="${patch.patchKey}" data-filter="variant-${variant}" type="button">
                    <span class="patch-meta-label">${escapeHtml(variant)}</span>
                    <span class="patch-meta-value">${escapeHtml(latestVariantBuild.version)}</span>
                    <span class="patch-meta-build">Build ${escapeHtml(latestVariantBuild.build || 'N/A')}</span>
                    <span class="patch-meta-date">${formatDate(latestVariantBuild.publishedAt)}</span>
                </button>
            `);
        }
    });

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

    const prefersStable = preferredFilter === 'stable' && hasStableBuild;
    const prefersBeta = preferredFilter === 'beta' && hasBetaBuild;
    const prefersVariant = (preferredFilter === 'variant' || preferredFilter.startsWith('variant-')) && getFilteredBuildsForFilter(patch, preferredFilter).length > 0;
    const prefersVersion = preferredFilter.startsWith('version-') && getFilteredBuildsForFilter(patch, preferredFilter).length > 0;

    if (prefersStable) {
        modalBuildFilter = 'stable';
    } else if (prefersBeta) {
        modalBuildFilter = 'beta';
    } else if (prefersVariant) {
        modalBuildFilter = preferredFilter;
    } else if (prefersVersion) {
        modalBuildFilter = preferredFilter;
    } else if (hasStableBuild) {
        modalBuildFilter = 'stable';
    } else if (hasBetaBuild) {
        modalBuildFilter = 'beta';
    } else if (hasVariantBuild) {
        modalBuildFilter = 'variant';
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
            const result = buildObtainiumRegexFromDownloadUrl(asset.browser_download_url);
            if (!result?.regex || regexMap.has(result.regex)) return;

            const appLabel = asset?.parsed?.appName || app?.appName || 'App';
            const patchLabel = asset?.parsed?.patchName || patch?.patchName || 'patch';
            const variantLabel = asset?.parsed?.variant ? ` ${escapeHtml(asset.parsed.variant)}` : '';
            regexMap.set(result.regex, `${appLabel} ${patchLabel}${variantLabel}`);
        });

    const regexEntries = Array.from(regexMap.entries()).map(([regex, label]) => ({ regex, label }));

    const copyCode = (text) => {
        const escaped = escapeForOnclickCopy(text);
        return `onclick="navigator.clipboard.writeText('${escaped}').then(() => { this.textContent='Copied!'; setTimeout(() => { this.textContent='Copy'; }, 2000); })" `;
    };

    const selectedExamplesMarkup = regexEntries.length > 0
        ? regexEntries.map(({ regex, label }) => `
                    <div class="example">
                        <strong>${escapeHtml(label)}</strong>
                        <div class="code-with-copy">
                            <code>${escapeHtml(regex)}</code>
                            <button type="button" class="copy-btn" ${copyCode(regex)}>Copy</button>
                        </div>
                    </div>`).join('')
        : `
                    <div class="example">
                        <strong>No APK URLs found for this patch.</strong>
                    </div>`;

    const betaPrereleaseStepMarkup = modalBuildFilter === 'beta'
        ? '<li>Enable include prereleases.</li>'
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
                <li>Tap add to begin downloading. In future, Obtainium will automatically fetch updates when new releases are published.</li>
            </ol>
        </div>
    `;
}

function buildObtainiumRegexFromDownloadUrl(downloadUrl) {
    if (!downloadUrl) return null;

    let url;
    try {
        url = new URL(downloadUrl);
    } catch (error) {
        return null;
    }

    const pathParts = url.pathname.split('/').filter(Boolean);
    const assetName = pathParts[pathParts.length - 1] ? decodeURIComponent(pathParts[pathParts.length - 1]) : '';
    if (!assetName.toLowerCase().endsWith('.apk')) return null;

    const nameWithoutExt = assetName.replace(/\.apk$/i, '');
    const arch = extractArchFromAssetName(nameWithoutExt);
    const nameWithoutArch = arch
        ? nameWithoutExt.replace(new RegExp(`-${escapeRegex(arch)}$`, 'i'), '')
        : nameWithoutExt;
    const baseName = nameWithoutArch
        .replace(/-v?\d[\w.-]*$/i, '')
        .replace(/-+$/g, '');

    if (!baseName) return null;

    const regex = `^${escapeRegex(baseName)}.*\\.apk$`;
    return { regex, arch, assetName };
}

function extractArchFromAssetName(nameWithoutExt) {
    const knownArchs = [
        'arm64-v8a', 'arm64', 'aarch64', 'armeabi-v7a', 'arm-v7a',
        'arm32', 'x86_64', 'x86', 'universal', 'all'
    ];
    const lowerName = (nameWithoutExt || '').toLowerCase();
    return knownArchs.find(arch => lowerName.endsWith(`-${arch}`)) || null;
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
        if (build.version) {
            versions.add(build.version);
        }
    });
    return Array.from(versions).sort().reverse();
}

function getLatestVariantBuild(patch, variantName) {
    let latestBuild = null;
    let latestDate = 0;

    (patch.builds || []).forEach(build => {
        const hasVariant = (build.assets || []).some(asset => asset?.parsed?.variant === variantName);
        if (hasVariant) {
            const buildDate = new Date(build.publishedAt).getTime();
            if (buildDate > latestDate) {
                latestDate = buildDate;
                latestBuild = {
                    version: build.version,
                    build: build.build,
                    publishedAt: build.publishedAt
                };
            }
        }
    });

    return latestBuild;
}

function updateModalFilterButtons(patch = null) {
    const hasStableBuild = patch ? getFilteredBuildsForFilter(patch, 'stable').length > 0 : true;
    const hasBetaBuild = patch ? getFilteredBuildsForFilter(patch, 'beta').length > 0 : true;
    const hasVariantBuild = patch ? getFilteredBuildsForFilter(patch, 'variant').length > 0 : false;
    const variants = patch ? getUniqueVariants(patch) : [];
    const versions = patch ? getUniqueVersions(patch) : [];

    if (modalBuildFilter === 'stable' && !hasStableBuild) {
        modalBuildFilter = hasBetaBuild ? 'beta' : hasVariantBuild ? 'variant' : 'all';
    } else if (modalBuildFilter === 'beta' && !hasBetaBuild) {
        modalBuildFilter = hasStableBuild ? 'stable' : hasVariantBuild ? 'variant' : 'all';
    } else if ((modalBuildFilter === 'variant' || modalBuildFilter.startsWith('variant-')) && !hasVariantBuild) {
        modalBuildFilter = hasStableBuild ? 'stable' : hasBetaBuild ? 'beta' : 'all';
    } else if (modalBuildFilter.startsWith('version-') && !getFilteredBuildsForFilter(patch, modalBuildFilter).length > 0) {
        modalBuildFilter = hasStableBuild ? 'stable' : hasBetaBuild ? 'beta' : hasVariantBuild ? 'variant' : 'all';
    }

    document.querySelectorAll('.modal-filter-btn').forEach(btn => {
        const filter = btn.dataset.filter;
        const available = filter === 'all'
            ? true
            : filter === 'stable'
                ? hasStableBuild
                : filter === 'beta'
                    ? hasBetaBuild
                    : filter === 'variant'
                        ? hasVariantBuild
                        : false;

        btn.style.display = available ? '' : 'none';
        btn.disabled = !available;
        btn.classList.toggle('active', available && filter === modalBuildFilter);
    });

    const filterButtonsContainer = document.querySelector('.modal-filter-buttons');

    if (filterButtonsContainer && variants.length > 0) {
        const existingVariantBtns = filterButtonsContainer.querySelectorAll('.variant-btn');
        existingVariantBtns.forEach(btn => btn.remove());

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

    if (filterButtonsContainer && versions.length > 1) {
        const existingVersionBtns = filterButtonsContainer.querySelectorAll('.version-btn');
        existingVersionBtns.forEach(btn => btn.remove());

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
    const hasVariantAssets = build.assets.some(asset => isVariantAsset(asset));
    let downloadsMarkup = '';

    Object.entries(assetsByArch).forEach(([arch, assets]) => {
        if (assets.length === 0) return;

        downloadsMarkup += `<div class="asset-group"><div class="asset-group-label">${capitalizeArch(arch)}</div>`;
        assets.forEach(asset => {
            const sizeStr = formatBytes(asset.size);
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
                        <span class="btn-text">${escapeHtml(asset.parsed.archLabel)} • ${asset.fileType} • ${sizeStr}</span>
                    </span>
                </a>`;
        });
        downloadsMarkup += `</div>`;
    });

    const variantsIndicator = hasVariantAssets ? '<span class="variants-indicator">Variant</span>' : '';

    return `
        <details class="modal-build-card" ${openByDefault ? 'open' : ''}>
            <summary class="modal-build-header">
                <div class="modal-build-header-left">
                    <div class="modal-build-title">Build ${escapeHtml(build.build)}</div>
                    <div class="modal-build-date">${formatDate(build.publishedAt)} • ${escapeHtml(build.version)}</div>
                </div>
                <span class="badge-group">
                    ${variantsIndicator}
                    <span class="release-badge ${buildBadgeClass}">${build.releaseType === 'beta' ? 'Beta' : 'Stable'}</span>
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
    const versionIndex = tokens.findIndex(token => /^v?\d+(?:\.\d+)+/i.test(token));
    const moduleIndex = tokens.findIndex(token => token.toLowerCase() === 'module');
    const stopIndexCandidates = [versionIndex, moduleIndex].filter(index => index >= 0);
    const stopIndex = stopIndexCandidates.length > 0 ? Math.min(...stopIndexCandidates) : tokens.length;
    const preMetaTokens = tokens.slice(0, stopIndex);

    const knownPatchTokens = new Set(['revanced', 'morphe', 'anddea']);
    const variantKeywords = new Set(['exp', 'nord', 'mocha', 'privacy', 'materialu']);

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

    const version = versionIndex >= 0 ? tokens[versionIndex] : 'Version unknown';
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
    const brandOverrides = {
        youtube: 'YouTube', revanced: 'ReVanced', tiktok: 'TikTok', soundcloud: 'SoundCloud',
        vpn: 'VPN', reddit: 'Reddit', instagram: 'Instagram', twitter: 'Twitter', rvx: 'ReVanced Extended',
        anddea: 'ReVanced Advanced', exp: 'Experimental', mocha: 'Mocha Theme', nord: 'Nord Theme', materialu: 'Material You'
    };
    return toTitleWords(value)
        .split(' ')
        .map(token => brandOverrides[token.toLowerCase()] || token)
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
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Last updated timestamp
window.addEventListener('load', () => {
    const now = new Date();
    const datePart = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
    const timePart = now.toLocaleTimeString('en-US');
    document.getElementById('lastUpdate').textContent = `${datePart}, ${timePart}`;
});