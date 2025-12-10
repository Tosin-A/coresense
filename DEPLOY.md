# Deployment Guide

## Quick Deploy Options

### Option 1: GitHub Pages (Recommended)

1. **Create GitHub Repository:**
   ```bash
   # Go to https://github.com/new
   # Create a repository named "coresense-landing"
   # DO NOT initialize with README, .gitignore, or license
   ```

2. **Push to GitHub:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/coresense-landing.git
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - The workflow will automatically deploy on every push to main

4. **Your site will be live at:**
   `https://YOUR_USERNAME.github.io/coresense-landing/`

### Option 2: Vercel (Easiest)

1. **Install Vercel CLI (optional):**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```
   Or connect your GitHub repo at [vercel.com](https://vercel.com)

3. **Your site will be live instantly with a custom domain**

### Option 3: Netlify

1. **Install Netlify CLI (optional):**
   ```bash
   npm i -g netlify-cli
   ```

2. **Deploy:**
   ```bash
   netlify deploy --prod
   ```
   Or drag and drop the `dist` folder at [netlify.com](https://netlify.com)

## Build Locally

```bash
npm install
npm run build
```

The built files will be in the `dist` directory.

## Environment Variables

If you need to change the Formspree endpoint, update it in `src/App.jsx`:
- Line ~107: `form.action = "https://formspree.io/f/YOUR_FORM_ID"`

