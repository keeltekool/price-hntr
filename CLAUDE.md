# PriceHNTR

Mobile-only drink price comparison app. First consumer of the Alkoholiks API.

## Dev Commands

- `npm run dev` — Start dev server
- `npm run build` — Production build

## Key Files

- `PRD.md` — Full product requirements
- `docs/UI_/DESIGN (2).md` — Design system (Stitch output)
- `docs/UI_/PriceHNTR_front_code.txt` — HTML/Tailwind reference patterns
- `src/lib/alkoholiks-sdk.ts` — Official API SDK (copied from alkoholiks-api project)

## Rules

- This app connects to the Alkoholiks API ONLY via the official SDK. No direct API calls, no backdoors.
- Mobile only — design for 360-428px viewport.
- Credentials in .env.local (VITE_ALK_CLIENT_ID, VITE_ALK_CLIENT_SECRET).
