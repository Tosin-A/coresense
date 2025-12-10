#!/bin/bash

# CoreSense Landing Page - Setup and Deploy Script

echo "🚀 CoreSense Landing Page - Setup & Deploy"
echo "=========================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the coresense-landing directory"
    exit 1
fi

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Error: Git is not initialized. Please run 'git init' first"
    exit 1
fi

echo "📦 Step 1: Creating GitHub Repository"
echo "-------------------------------------"
echo ""
echo "Please follow these steps:"
echo "1. Go to https://github.com/new"
echo "2. Repository name: coresense-landing"
echo "3. Description: CoreSense landing page - AI health coach app"
echo "4. Choose Public or Private"
echo "5. DO NOT initialize with README, .gitignore, or license"
echo "6. Click 'Create repository'"
echo ""
read -p "Press Enter after you've created the repository..."

echo ""
echo "🔗 Step 2: Enter your GitHub username"
read -p "GitHub username: " GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    echo "❌ Error: Username cannot be empty"
    exit 1
fi

echo ""
echo "📤 Step 3: Adding remote and pushing code"
echo "------------------------------------------"

# Check if remote already exists
if git remote get-url origin &>/dev/null; then
    echo "⚠️  Remote 'origin' already exists. Updating..."
    git remote set-url origin "https://github.com/${GITHUB_USERNAME}/coresense-landing.git"
else
    git remote add origin "https://github.com/${GITHUB_USERNAME}/coresense-landing.git"
fi

# Push to GitHub
echo "Pushing code to GitHub..."
git branch -M main
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Success! Code pushed to GitHub"
    echo ""
    echo "🌐 Step 4: Enable GitHub Pages"
    echo "-------------------------------"
    echo "1. Go to: https://github.com/${GITHUB_USERNAME}/coresense-landing/settings/pages"
    echo "2. Under 'Source', select 'GitHub Actions'"
    echo "3. The site will automatically deploy on the next push"
    echo ""
    echo "📝 Your site will be live at:"
    echo "   https://${GITHUB_USERNAME}.github.io/coresense-landing/"
    echo ""
    echo "✨ Alternative: Deploy to Vercel (faster, easier)"
    echo "   1. Go to https://vercel.com"
    echo "   2. Import your GitHub repository"
    echo "   3. Deploy automatically!"
    echo ""
else
    echo ""
    echo "❌ Error pushing to GitHub. Please check:"
    echo "   - Your GitHub username is correct"
    echo "   - The repository exists on GitHub"
    echo "   - You have push permissions"
    echo ""
    exit 1
fi

