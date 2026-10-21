# Loyn Portfolio — React + Vite

A responsive starter portfolio with rough illustration-inspired visuals and a clean editorial UI.

## Requirements
- Node.js (LTS recommended)
- npm

## Run locally
```bash
npm install
npm run dev
```

## Build for production
```bash
npm run build
npm run preview
```

The deployable site is generated in `dist/`.

## Before publishing
1. In `src/App.jsx`, replace `VGEN_URL` with your actual VGen profile URL.
2. Replace the sample artwork/portrait placeholder with your own illustrations.
3. Replace the sample price list and draft Terms of Service with your actual information.
4. Update About Me and Queue copy.
5. Check the site on mobile and desktop.

## Free deployment
For Cloudflare Pages connected to a Git repository:
- Build command: `npm run build`
- Build output directory: `dist`

This is a client-side single-page app. If you later use React Router with path-based URLs, configure a fallback to `index.html` for direct navigation. The current starter switches views in React state and does not require server-side routing.
