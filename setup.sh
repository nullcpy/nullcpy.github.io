#!/bin/bash

# Quick Setup Script for ReVanced Builds GitHub Pages
# Run this script to set up the web branch and deploy the site

set -e

echo "🚀 ReVanced Builds GitHub Pages Setup"
echo "======================================"
echo ""

# Check if we're in a git repo
if [ ! -d .git ]; then
    echo "❌ Error: Not a git repository. Run this from your repo root."
    exit 1
fi

# Get the current repo info
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
REPO_NAME=$(basename -s .git "$(git config --get remote.origin.url)")
REPO_OWNER=$(git config --get remote.origin.url | grep -oP '(?<=:)\w+(?=/)')

echo "📦 Repository: $REPO_OWNER/$REPO_NAME"
echo "📍 Current branch: $CURRENT_BRANCH"
echo ""

# Check if web branch exists
if git rev-parse --verify origin/web >/dev/null 2>&1; then
    echo "✅ 'web' branch already exists"
    git checkout web
else
    echo "📝 Creating 'web' branch..."
    git checkout --orphan web
    git rm -rf . 2>/dev/null || true
    git commit --allow-empty -m "Initial commit for GitHub Pages"
    git push -u origin web
    git checkout web
fi

echo ""
echo "✅ Setup Complete!"
echo ""
echo "Next steps:"
echo "1. Update script.js with your GitHub username:"
echo "   CONFIG.owner = '$REPO_OWNER'"
echo ""
echo "2. Go to Settings → Pages and select:"
echo "   - Source: Deploy from a branch"
echo "   - Branch: web"
echo "   - Folder: /root"
echo ""
echo "3. Your site will be available at:"
echo "   https://$REPO_OWNER.github.io/$REPO_NAME"
echo ""
echo "4. Push this web content with:"
echo "   git add ."
echo "   git commit -m 'Add GitHub Pages site'"
echo "   git push origin web"
