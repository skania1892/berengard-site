# Berengard Technologies – Website

Stack: **React + Vite + Tailwind CSS**

## Local development
```bash
npm install
npm run dev
```

## Production build
```bash
npm run build
npm run preview
```

## Deploy to Netlify
- Build command: `npm run build`
- Publish directory: `dist`
- Node version: latest (Netlify default is fine)
- Connect your GitHub repo and Netlify will auto-deploy on every push.

## Domain & Email (after deploy)
- Point `berengard.tech` DNS (at Squarespace) to Netlify's records.
- Set up email (e.g., Zoho Mail free plan) by adding MX records.
