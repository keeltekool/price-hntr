# PriceHNTR — Stack

> Last updated: 2026-03-22

## Overview

Mobile-only drink price comparison SPA. First consumer of the Alkoholiks API. Browse cheapest drinks across 5 Estonian retail chains, filtered by store, category, and package size.

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | React 19 (Vite 8) |
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
| Alkoholiks API | Drink price data (1,871 products, 5 stores) | Client credentials in Vercel env vars |

## Brand

- Primary: `#006D43` (savings green)
- Secondary: `#904D00` / `#FD8B00` (deal amber)
- Surface: `#F8F9FA` base, `#FFFFFF` cards
- Store colors: Selver `#007A3D`, Prisma `#0051A5`, Rimi `#D52B1E`, Barbora `#FF6900`, Cityalko `#6B3A2A`

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
- Best Prices view fetches all 5 stores in parallel, filters/sorts client-side
- Volume bucketing: Small (250-399ml), Regular (400-999ml), Multipack (1000ml+)

## Two Views

1. **Best Prices** (landing) — browse cheapest products by store, category, and size. Beer + Regular selected by default. 75 results max. Alcohol-free excluded.
2. **Search** — debounced product search across all stores, sorted by cheapest, with CHEAPEST badge.

## Post-Deploy Smoke Tests

1. Load landing page — Best Prices should show beers from multiple stores
2. Tap store chips — filter works, tap again to deselect
3. Switch categories (Cider, Energy Drink) — list updates
4. Switch sizes (Small, Multipack) — different products appear
5. Tap Search — type "monster" — results sorted by cheapest
6. Toggle EN/ET — UI chrome switches
7. Check console — zero errors

## Gotchas

| Issue | Solution |
|-------|----------|
| CORS blocks direct API calls from browser | Proxy through same-origin: Vite proxy (dev) + Vercel rewrites (prod) |
| API `limit=200` only returns 2 of 5 stores | Fetch per-store in parallel (5 calls), merge client-side |
| `onSale` flag is misleading (Selver = blanket -10% card) | Don't use `onSale`. Show real prices sorted cheapest first |
| Alcohol-free products have lower tax, skew price comparison | Filter out `alcoholFree === true` from Best Prices |
| Sort must use `getLowestPrice()` not `regularPrice` | cardPrice/campaignPrice can be lower than regularPrice |
| Vite scaffold `--overwrite` deletes all existing files | Back up docs/ before scaffolding |
| `useRef()` without argument fails strict TS build | Pass `undefined`: `useRef<T>(undefined)` |
| Vite env vars must be available at BUILD TIME | Set in Vercel project settings, not runtime |
| API cache expires daily | Cron at 6AM UTC. Force refresh: `curl -H "Authorization: Bearer $CRON_SECRET" https://alkoholiks-api.vercel.app/api/cron/refresh` |
