// Configuration
const CONFIG = {
    // Change this to your GitHub username/org and repo
    owner: 'nullcpy',
    repo: 'rvb',
    // Cache duration in minutes
    cacheDuration: 5,
};

// State
let allReleases = [];
let searchTerm = '';
let currentAppCatalog = [];
let activeModalAppKey = null;
let activeModalPatchKey = null;
let modalBuildFilter = 'all';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupTheme();
    setupEventListeners();
    loadReleases();
});

// Theme Management
function setupTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        applyTheme(prefersLight ? 'light' : 'dark');
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    mediaQuery.addEventListener('change', (event) => {
        if (localStorage.getItem('theme')) {
            return;
        }

        applyTheme(event.matches ? 'light' : 'dark');
    });
}

function applyTheme(theme) {
    const isLight = theme === 'light';
    document.body.classList.toggle('light-mode', isLight);
    document.getElementById('themeBtn').textContent = isLight ? '🌙' : '☀️';
}

document.getElementById('themeBtn').addEventListener('click', () => {
    const nextTheme = document.body.classList.contains('light-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', nextTheme);
    applyTheme(nextTheme);
});

// Event Listeners
function setupEventListeners() {
    document.getElementById('searchInput').addEventListener('input', (e) => {
        searchTerm = e.target.value.toLowerCase();
        filterAndRenderReleases();
    });

    document.getElementById('builds').addEventListener('click', (e) => {
        const trigger = e.target.closest('.patch-trigger');
        if (!trigger) {
            return;
        }

        openPatchModal(trigger.dataset.appKey, trigger.dataset.patchKey);
    });

    document.getElementById('patchModal').addEventListener('click', (e) => {
        const filterBtn = e.target.closest('.modal-filter-btn');
        if (filterBtn) {
            if (filterBtn.disabled) {
                return;
            }

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
}

// Fetch releases from GitHub API
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

        const response = await fetch(
            `https://api.github.com/repos/${CONFIG.owner}/${CONFIG.repo}/releases`,
            {
                headers: {
                    'Accept': 'application/vnd.github.v3+json'
                }
            }
        );

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }

        allReleases = await response.json();

        // Cache the releases
        cacheReleases(allReleases);

        document.getElementById('loading').style.display = 'none';
        filterAndRenderReleases();

    } catch (error) {
        console.error('Error loading releases:', error);
        document.getElementById('loading').style.display = 'none';
        document.getElementById('error').style.display = 'block';
        document.getElementById('error').textContent =
            `Failed to load releases: ${error.message}. Make sure you've configured the owner and repo in the script.`;
    }
}

// Caching utilities
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
    const appCatalog = buildAppCatalog(filtered, searchTerm);
    renderAppCards(appCatalog);
    document.getElementById('loading').style.display = 'none';
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
            if (!appKey) {
                return;
            }

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
    if (!rawQuery) {
        return true;
    }

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

function getBuildNumberLabel(release) {
    return String(release.tag_name || release.name || 'N/A');
}

// Render app cards to DOM
function renderAppCards(apps) {
    const buildsContainer = document.getElementById('builds');
    currentAppCatalog = apps;

    if (apps.length === 0) {
        buildsContainer.innerHTML = '<div class="no-results">No apps found. Try adjusting your filters or search.</div>';
        return;
    }

    buildsContainer.innerHTML = apps.map(app => createAppCard(app)).join('');
}

function createAppCard(app) {
    const patchesMarkup = app.patches.map((patch) => createPatchMarkup(app, patch)).join('');
    const microgNoticeMarkup = isGoogleApp(app.appName) ? createMicrogNoticeMarkup() : '';

    return `
        <div class="build-card app-card">
            <div class="build-header">
                <div class="app-name">${escapeHtml(app.appName)}</div>
                <span class="patch-count">${app.patches.length} patch${app.patches.length > 1 ? 'es' : ''}</span>
            </div>

            ${microgNoticeMarkup}

            <div class="patches-title">Available patches</div>
            <div class="patches-list">
                ${patchesMarkup}
            </div>
        </div>
    `;
}

function isGoogleApp(appName) {
    const name = normalizeForSearch(appName);
    return name.includes('youtube') || name.includes('google');
}

function createMicrogNoticeMarkup() {
    return `
        <div class="microg-note">
            <div class="microg-note-title">🚨 Non-rooted users need MicroG to login</div>
            <div class="microg-note-links">
                <a href="https://github.com/MorpheApp/MicroG-RE/releases/latest" target="_blank" rel="noopener noreferrer">Morphe</a>
                <a href="https://github.com/ReVanced/GmsCore/releases/latest" target="_blank" rel="noopener noreferrer">ReVanced</a>
            </div>
        </div>
    `;
}

function createBuildInfoMarkup(label, info, badgeClass) {
    if (!info) {
        return `
            <div class="build-info-box ${badgeClass}">
                <div class="build-info-label">${label}</div>
                <div class="build-info-value">N/A</div>
                <div class="build-info-date">No build found</div>
            </div>
        `;
    }

    return `
        <div class="build-info-box ${badgeClass}">
            <div class="build-info-label">${label}</div>
            <div class="build-info-value">${escapeHtml(info.build)}</div>
            <div class="build-info-date">${formatDate(info.publishedAt)}</div>
        </div>
    `;
}

function createPatchMarkup(app, patch) {
    const buildCount = patch.builds.length;

    return `
        <button class="patch-trigger" data-app-key="${app.appKey}" data-patch-key="${patch.patchKey}" type="button">
            <span class="patch-trigger-left">
                <span class="patch-chip">${escapeHtml(patch.patchName)}</span>
                <span class="patch-meta">${escapeHtml(patch.latestVersion)} • ${formatDate(patch.latestPublishedAt)}</span>
            </span>
            <span class="patch-open-hint">${buildCount} build${buildCount > 1 ? 's' : ''}</span>
        </button>
    `;
}

function openPatchModal(appKey, patchKey) {
    activeModalAppKey = appKey;
    activeModalPatchKey = patchKey;

    const app = currentAppCatalog.find(item => item.appKey === appKey);
    const patch = app ? app.patches.find(item => item.patchKey === patchKey) : null;
    const hasStableBuild = patch ? getFilteredBuildsForFilter(patch, 'stable').length > 0 : false;
    const hasBetaBuild = patch ? getFilteredBuildsForFilter(patch, 'beta').length > 0 : false;
    const hasVariantBuild = patch ? getFilteredBuildsForFilter(patch, 'variant').length > 0 : false;

    if (hasStableBuild) {
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

    const patchAssets = patch ? patch.builds.flatMap(build => build.assets || []) : [];
    const parsedSample = patchAssets.find(asset => asset?.parsed)?.parsed || null;

    const appSlug = parsedSample?.appSlug || slugifyForRegex(app?.appName || 'app');
    const patchSlug = parsedSample?.patchSlug || slugifyForRegex(patch?.patchName || 'patch');

    const variantBuilds = patch ? getFilteredBuildsForFilter(patch, 'variant') : [];
    const variantOptions = Array.from(new Set(
        variantBuilds
            .flatMap(build => build.assets || [])
            .map(asset => (asset?.parsed?.variant || '').toLowerCase())
            .filter(Boolean)
    ));

    const specificRegex = `^${appSlug}-${patchSlug}.*\\.apk$`;
    const isVariantFilter = modalBuildFilter === 'variant';

    const copyCode = (text) => `onclick="navigator.clipboard.writeText('${text}').then(() => { this.textContent='Copied!'; setTimeout(() => { this.textContent='Copy'; }, 2000); })" `;

    const selectedExamplesMarkup = isVariantFilter
        ? (variantOptions.length > 0
            ? variantOptions.map(variant => {
                const variantRegex = `^${appSlug}-${patchSlug}-${variant}.*\\.apk$`;
                const variantLabel = formatBrandDisplayName(variant);
                return `
                        <div class="example">
                            <strong>${app?.appName || 'App'} ${patch?.patchName || 'patch'} ${variantLabel}:</strong>
                            <div class="code-with-copy">
                                <code>${escapeHtml(variantRegex)}</code>
                                <button type="button" class="copy-btn" ${copyCode(variantRegex)}>Copy</button>
                            </div>
                        </div>`;
            }).join('')
            : `
                        <div class="example">
                            <strong>${app?.appName || 'App'} ${patch?.patchName || 'patch'} variants:</strong>
                            <div class="code-with-copy">
                                <code>${escapeHtml(`^${appSlug}-${patchSlug}-.*\\.apk$`)}</code>
                                <button type="button" class="copy-btn" ${copyCode(`^${appSlug}-${patchSlug}-.*\\.apk$`)}>Copy</button>
                            </div>
                        </div>`)
        : `
                        <div class="example">
                            <strong>${app?.appName || 'App'} with ${patch?.patchName || 'patch'}:</strong>
                            <div class="code-with-copy">
                                <code>${escapeHtml(specificRegex)}</code>
                                <button type="button" class="copy-btn" ${copyCode(specificRegex)}>Copy</button>
                            </div>
                        </div>`;

    return `
        <div class="obtainium-instructions">
            <ol>
                <li>Download and install Obtainium from <a href="${obtainiumLatestUrl}" target="_blank" rel="noopener noreferrer">GitHub</a>.</li>
                <li>Open Obtainium on your device.</li>
                <li>Tap Add app.</li>
                <li>In the App source URL box, enter:
                    <div class="instruction-code">
                        <code>${escapeHtml(repoUrl)}</code>
                        <button type="button" class="copy-btn" ${copyCode(repoUrl)}>Copy</button>
                    </div>
                </li>
                <li>Scroll down to Filter APKs by regular expression and enter:
                    <div class="filter-examples">
                        ${selectedExamplesMarkup}
                    </div>
                </li>
                <li>Tap Add to begin downloading. In future, Obtainium will automatically fetch updates when new releases are published.</li>
            </ol>
        </div>
    `;
}

function renderOpenPatchModal() {
    if (!activeModalAppKey || !activeModalPatchKey) {
        return;
    }

    const app = currentAppCatalog.find(item => item.appKey === activeModalAppKey);
    if (!app) {
        return;
    }

    const patch = app.patches.find(item => item.patchKey === activeModalPatchKey);
    if (!patch) {
        return;
    }

    const body = document.getElementById('patchModalBody');
    const title = document.getElementById('patchModalTitle');
    title.textContent = `${app.appName} • ${patch.patchName}`;

    updateModalFilterButtons(patch);
    body.innerHTML = createPatchModalContent(patch, modalBuildFilter);
}

function updateModalFilterButtons(patch = null) {
    const hasStableBuild = patch ? getFilteredBuildsForFilter(patch, 'stable').length > 0 : true;
    const hasBetaBuild = patch ? getFilteredBuildsForFilter(patch, 'beta').length > 0 : true;
    const hasVariantBuild = patch ? getFilteredBuildsForFilter(patch, 'variant').length > 0 : true;

    if (modalBuildFilter === 'stable' && !hasStableBuild) {
        modalBuildFilter = hasBetaBuild ? 'beta' : hasVariantBuild ? 'variant' : 'all';
    } else if (modalBuildFilter === 'beta' && !hasBetaBuild) {
        modalBuildFilter = hasStableBuild ? 'stable' : hasVariantBuild ? 'variant' : 'all';
    } else if (modalBuildFilter === 'variant' && !hasVariantBuild) {
        modalBuildFilter = hasStableBuild ? 'stable' : hasBetaBuild ? 'beta' : 'all';
    }

    document.querySelectorAll('.modal-filter-btn').forEach(btn => {
        const filter = btn.dataset.filter;
        const available = filter === 'all'
            ? true
            : filter === 'stable'
                ? hasStableBuild
                : filter === 'beta'
                    ? hasBetaBuild
                    : hasVariantBuild;

        btn.style.display = available ? '' : 'none';
        btn.disabled = !available;
        btn.classList.toggle('active', available && filter === modalBuildFilter);
    });
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
        if (build.releaseType !== 'stable') {
            return [];
        }

        return assets.filter(asset => !isVariantAsset(asset));
    }

    if (buildFilter === 'beta') {
        if (build.releaseType !== 'beta') {
            return [];
        }

        return assets.filter(asset => !isVariantAsset(asset));
    }

    if (buildFilter === 'variant') {
        return assets.filter(asset => isVariantAsset(asset));
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
        if (assets.length === 0) {
            return;
        }

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
        arm64: [],
        arm32: [],
        universal: [],
        x86: [],
        other: []
    };

    assets.forEach(asset => {
        const detectedArch = detectArchitecture(asset.name);
        groups[detectedArch].push(asset);
    });

    // Remove empty groups and maintain order
    const filtered = {};
    ['arm64', 'arm32', 'universal', 'x86', 'other'].forEach(arch => {
        if (groups[arch].length > 0) {
            // Sort: APK files first, then Modules (zip files)
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

// Get file type for display
function getFileType(filename) {
    const lower = filename.toLowerCase();
    if (lower.endsWith('.apk')) return 'APK';
    if (lower.endsWith('.zip')) return 'Module';
    return 'File';
}

function detectArchitecture(filename) {
    const name = (filename || '').toLowerCase();

    if (name.includes('arm64') || name.includes('aarch64') || name.includes('arm64-v8a')) {
        return 'arm64';
    }

    if ((name.includes('arm') && !name.includes('arm64')) || name.includes('arm-v7a') || name.includes('armeabi')) {
        return 'arm32';
    }

    if (name.includes('universal') || name.includes('-all.') || /^(?!.*arm|x86|x64|i386)[^-]*\.apk$/.test(name)) {
        return 'universal';
    }

    if (name.includes('x86_64') || name.includes('x64') || name.includes('x86')) {
        return 'x86';
    }

    return 'other';
}

function parseAssetDisplay(filename, arch, fileType) {
    const baseName = filename.replace(/\.(apk|zip)$/i, '');
    const tokens = baseName.split('-').filter(Boolean);
    const versionIndex = tokens.findIndex(token => /^v?\d+(?:\.\d+)+/i.test(token));
    const moduleIndex = tokens.findIndex(token => token.toLowerCase() === 'module');
    const stopIndexCandidates = [versionIndex, moduleIndex].filter(index => index >= 0);
    const stopIndex = stopIndexCandidates.length > 0 ? Math.min(...stopIndexCandidates) : tokens.length;
    const preMetaTokens = tokens.slice(0, stopIndex);

    const knownPatchTokens = new Set(['revanced', 'morphe', 'anddea', 'piko']);
    const variantKeywords = new Set(['exp', 'nord', 'mocha', 'privacy', 'materialu']);

    let patchStartIndex = preMetaTokens.findIndex(token => knownPatchTokens.has(token.toLowerCase()));

    if (patchStartIndex < 0) {
        patchStartIndex = Math.max(preMetaTokens.length - 1, 0);
    }

    const appTokens = preMetaTokens.slice(0, patchStartIndex);
    let patchTokens = preMetaTokens.slice(patchStartIndex);

    // Extract variant keywords from the end of patch tokens
    let variant = null;
    while (patchTokens.length > 1 && variantKeywords.has(patchTokens[patchTokens.length - 1].toLowerCase())) {
        variant = patchTokens[patchTokens.length - 1];
        patchTokens = patchTokens.slice(0, -1);
    }

    const version = versionIndex >= 0 ? tokens[versionIndex] : 'Version unknown';
    const appSlug = (appTokens.length > 0 ? appTokens : preMetaTokens).join('-').toLowerCase();
    const patchSlug = (patchTokens.length > 0 ? patchTokens : ['patched', 'build']).join('-').toLowerCase();

    return {
        appName: formatBrandDisplayName(appTokens.length > 0 ? appTokens.join(' ') : preMetaTokens.join(' ') || baseName),
        patchName: formatBrandDisplayName(patchTokens.length > 0 ? patchTokens.join(' ') : 'Patched Build'),
        appSlug,
        patchSlug,
        variant: variant ? formatBrandDisplayName(variant) : null,
        version,
        archLabel: formatArchitectureLabel(arch, fileType),
        fileType
    };
}

function slugifyForRegex(value) {
    return (value || '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '') || 'app';
}

function toTitleWords(value) {
    return (value || '').replace(/\s+/g, ' ').trim().replace(/\b\w/g, char => char.toUpperCase());
}

function formatBrandDisplayName(value) {
    const brandOverrides = {
        youtube: 'YouTube',
        revanced: 'ReVanced',
        tiktok: 'TikTok',
        soundcloud: 'SoundCloud',
        vpn: 'VPN',
        reddit: 'Reddit',
        instagram: 'Instagram',
        twitter: 'Twitter',
        rvx: 'ReVanced Extended',
        anddea: 'ReVanced Advanced'
    };

    return toTitleWords(value)
        .split(' ')
        .map(token => brandOverrides[token.toLowerCase()] || token)
        .join(' ');
}

function formatArchitectureLabel(arch, fileType) {
    const labels = {
        arm64: 'ARM64',
        arm32: 'ARM32',
        universal: 'Universal',
        x86: 'x86/x64',
        other: fileType
    };

    return labels[arch] || arch.toUpperCase();
}

// Utility functions
function capitalizeArch(arch) {
    const map = {
        'arm64': '📱 ARM64',
        'arm32': '📱 ARM32',
        'universal': '📦 Universal',
        'x86': '💻 X86',
        'other': 'Other'
    };
    return map[arch] || arch;
}

function formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function formatDate(value) {
    return new Date(value).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function normalizeForSearch(value) {
    // Remove separators so "youtube music" can match "youtube-music" and similar variants.
    return (value || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

function matchesSearch(value, rawQuery, normalizedQuery) {
    const lowerValue = (value || '').toLowerCase();
    const normalizedValue = normalizeForSearch(lowerValue);

    if (lowerValue.includes(rawQuery)) {
        return true;
    }

    if (!normalizedQuery) {
        return false;
    }

    if (normalizedValue.includes(normalizedQuery)) {
        return true;
    }

    // For typo tolerance, compare query tokens against value tokens with small edit distance.
    // Example: "youtbe music" -> "youtube-music".
    if (normalizedQuery.length < 4) {
        return false;
    }

    const queryTokens = getSearchTokens(rawQuery);
    const valueTokens = getSearchTokens(lowerValue);

    if (queryTokens.length === 0 || valueTokens.length === 0) {
        return false;
    }

    return queryTokens.every(queryToken =>
        valueTokens.some(valueToken => tokensFuzzyMatch(queryToken, valueToken))
    );
}

function getSearchTokens(value) {
    return (value || '').toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
}

function tokensFuzzyMatch(queryToken, valueToken) {
    if (!queryToken || !valueToken) {
        return false;
    }

    if (valueToken.includes(queryToken) || queryToken.includes(valueToken)) {
        return true;
    }

    if (queryToken.length < 3) {
        return false;
    }

    const maxDistance = getMaxEditDistance(queryToken.length);
    return isWithinEditDistance(queryToken, valueToken, maxDistance);
}

function getMaxEditDistance(length) {
    if (length <= 4) return 1;
    if (length <= 8) return 2;
    return 3;
}

function isWithinEditDistance(a, b, maxDistance) {
    if (Math.abs(a.length - b.length) > maxDistance) {
        return false;
    }

    const bLength = b.length;
    let previousRow = new Array(bLength + 1);
    for (let j = 0; j <= bLength; j++) {
        previousRow[j] = j;
    }

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
            if (currentRow[j] < rowMin) {
                rowMin = currentRow[j];
            }
        }

        if (rowMin > maxDistance) {
            return false;
        }

        previousRow = currentRow;
    }

    return previousRow[bLength] <= maxDistance;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Update the "last updated" timestamp
window.addEventListener('load', () => {
    const now = new Date();
    const datePart = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
    const timePart = now.toLocaleTimeString('en-US');
    document.getElementById('lastUpdate').textContent = `${datePart}, ${timePart}`;
});
