# CoreSense Landing Page

A modern, professional landing page for CoreSense - an AI-powered personal health and productivity companion.

## 🚀 Quick Deploy

### Option 1: Automated Setup Script
```bash
./setup-and-deploy.sh
```

### Option 2: Manual GitHub Setup
1. Create a new repository on GitHub named `coresense-landing`
2. Run:
```bash
git remote add origin https://github.com/YOUR_USERNAME/coresense-landing.git
git push -u origin main
```
3. Enable GitHub Pages in repository settings → Pages → Source: GitHub Actions

### Option 3: Deploy to Vercel (Recommended - Fastest)
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Deploy automatically!

See [DEPLOY.md](./DEPLOY.md) for detailed deployment instructions.

## Features

- **Modern UI Design**: Beautiful, responsive design with gradient accents and smooth animations
- **Survey Integration**: Interactive feature selection survey that appears when users click "Get Early Access"
- **Form Submission**: Integrated with Formspree for email collection and survey responses
- **Professional Layout**: Clean, organized sections including hero, features, and waitlist
- **Mobile Responsive**: Fully responsive design that works on all devices

## Tech Stack

- React 19
- Vite
- CSS3 (with modern features like gradients, backdrop-filter, etc.)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd coresense-landing
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Form Configuration

The landing page uses Formspree for form submissions. To configure:

1. Sign up at [Formspree](https://formspree.io)
2. Create a new form and get your form ID
3. Update the form action URL in `src/App.jsx` (line with `formspree.io/f/manrpqwb`)

## User Flow

1. User visits landing page
2. User fills out name and email in the waitlist form
3. User clicks "Get Early Access"
4. Survey modal appears asking which feature interests them most
5. User selects a feature and clicks "Reserve My Spot"
6. Form submits to Formspree with email, name, and selected feature
7. Success page displays confirmation message
8. Follow-up email sent (configured in Formspree) asking for 5-minute interview

## Project Structure

```
coresense-landing/
├── src/
│   ├── App.jsx          # Main application component
│   ├── App.css          # Application styles
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── index.html           # HTML template
└── package.json         # Dependencies
```

## License

Private project - All rights reserved

## Built By

Tosin
