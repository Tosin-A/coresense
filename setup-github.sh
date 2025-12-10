#!/bin/bash

# Script to create GitHub repository and push code
# Make sure you have GitHub CLI installed: brew install gh
# Or create the repo manually on GitHub and use the commands below

echo "Setting up GitHub repository for CoreSense Landing Page..."

# Check if gh CLI is installed
if command -v gh &> /dev/null; then
    echo "GitHub CLI found. Creating repository..."
    gh repo create coresense-landing --public --source=. --remote=origin --push
    echo "✅ Repository created and code pushed!"
else
    echo "GitHub CLI not found. Please follow these steps:"
    echo ""
    echo "1. Go to https://github.com/new"
    echo "2. Create a new repository named 'coresense-landing'"
    echo "3. Do NOT initialize with README, .gitignore, or license"
    echo "4. Then run these commands:"
    echo ""
    echo "   git remote add origin https://github.com/YOUR_USERNAME/coresense-landing.git"
    echo "   git branch -M main"
    echo "   git push -u origin main"
    echo ""
    echo "Or install GitHub CLI: brew install gh"
    echo "Then run: gh auth login"
    echo "Then run this script again."
fi

