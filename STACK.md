# PriceHNTR — Stack

> Last updated: 2026-03-22

## Overview

Mobile-only drink price comparison SPA. First consumer of the Alkoholiks API.

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | React 19 (Vite) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| API Client | Alkoholiks SDK (OAuth 2.0 Client Credentials) |
| Hosting | Vercel |
| Font | Inter (Google Fonts) |
| Icons | Material Symbols Outlined |

## Services

| Service | Purpose | Account |
|---------|---------|---------|
| Vercel | Hosting + API proxy (rewrites) | egertv1s-projects |
| Alkoholiks API | Drink price data | Client credentials in Vercel env vars |

## Brand

- Primary: `#006D43` (savings green)
- Secondary: `#904D00` / `#FD8B00` (deal amber)
- Surface: `#F8F9FA` base, `#FFFFFF` cards

## Dev Commands

```bash
npm run dev      # Start dev server (localhost:5173)
npm run build    # Production build
npm run preview  # Preview production build locally
```

## Deployment

```bash
npx vercel --prod --yes
```

Env vars (Vercel): `VITE_ALK_CLIENT_ID`, `VITE_ALK_CLIENT_SECRET`
These are build-time vars (Vite inlines them during build).

## Architecture

- Pure client-side SPA, no SSR
- API calls proxied through same-origin: Vite proxy (dev) + Vercel rewrites (prod)
- SDK handles OAuth token exchange automatically

## Post-Deploy Smoke Tests

1. Load landing page — deals should show with product images
2. Tap Search — type "monster" — results should appear sorted by cheapest
3. Toggle EN/ET — UI chrome switches, product data stays Estonian
4. Check console — zero errors

## Gotchas

| Issue | Solution |
|-------|----------|
| CORS blocks direct API calls from browser | Proxy through same-origin: Vite proxy (dev) + Vercel rewrites (prod) |
| Vite scaffold `--overwrite` deletes all existing files | Back up docs/ before scaffolding |
| `useRef()` without argument fails strict TS build | Pass `undefined`: `useRef<T>(undefined)` |
| Vite env vars must be available at BUILD TIME | Set in Vercel project settings, not runtime |
