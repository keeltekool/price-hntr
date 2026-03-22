# PriceHNTR — Product Requirements Document

> Date: 2026-03-22
> Status: Draft
> Author: Claude + Egert

---

## 1. Problem

Estonian consumers buy drinks (beer, cider, energy drinks, long drinks) from multiple retail chains — Selver, Prisma, Rimi, Barbora, Cityalko. Each chain has different pricing, loyalty card discounts, and campaigns. There is no simple way to check which store has the cheapest price for a specific product without manually visiting each store's website or app.

The Alkoholiks API already aggregates pricing data from all 5 chains into a single authenticated API. What's missing is a consumer-facing app that makes this data accessible to a regular person standing in a parking lot wondering "should I go in here or drive to Rimi instead?"

---

## 2. Purpose (Dual)

### For the end user
A fast, mobile-only price lookup tool. Type a product name, see where it's cheapest. Browse current deals sorted by biggest discount. Make a decision. Put the phone away.

### For the API product (equally important)
PriceHNTR is the **first official consumer of the Alkoholiks API**. It must onboard and integrate exactly like any third-party developer would:

1. Register on the developer portal (Clerk sign-up at alkoholiks-api.vercel.app)
2. Receive OAuth client credentials (`alk_cid_...` + `alk_sec_...`)
3. Install and use the official TypeScript SDK (`alkoholiks-sdk`)
4. Authenticate via OAuth 2.0 Client Credentials flow
5. Respect rate limits (100 req/hr) and handle errors per the API docs

**No backdoors. No direct database access. No internal imports. No source code peeking.** If PriceHNTR can't be built from the public API surface alone, the API product isn't done. This is a proving ground — every friction point PriceHNTR hits is a bug in the API's developer experience.

---

## 3. Target User

Estonian resident (or visitor) who buys drinks from physical retail stores. Checks prices on their phone before or during a shopping trip. Not making online purchases — just looking up where to go.

- **Primary device:** Mobile phone (360px-428px viewport)
- **Language:** English (default) with Estonian toggle
- **Tech literacy:** Average consumer — no technical knowledge required
- **Session pattern:** Quick lookup (30-90 seconds), not browsing/exploring

---

## 4. Core Features

### 4.1 Search Mode (Price Comparison)

The primary use case. User types a product name, gets a comparison matrix.

**Flow:**
1. User taps search bar or Search tab
2. Types product name (e.g., "Monster Energy", "Saku Originaal")
3. Results appear in real-time (300ms debounce)
4. Each result is a **comparison card** showing all 5 stores' prices for that product
5. Cheapest store is highlighted with green tint + "CHEAPEST" / "SOODSAIM" badge

**Comparison card anatomy:**
- Product image (one per product, not per store — pick best available from API)
- Product name, brand, volume
- 5 store rows (one per chain):
  - Store logo (small icon) + store name
  - Price right-aligned
  - Unit price (e.g., "4.70 EUR/L") below the price in smaller text
  - If on sale: regular price with strikethrough + sale price
  - If unavailable at that store: dash "—" in lighter gray
- Cheapest row: green background tint, bold price, badge

**Filters available on search results:**
- Category chips (Beer, Cider, Long Drink, Cocktail, Energy Drink, Other)
- "On Sale Only" toggle chip

**SDK method used:** `api.searchProducts(query, { category, limit, offset })`

### 4.2 Deals Mode (Landing Page)

The home screen. Immediate value with no user action required. Shows all currently discounted products across all 5 stores.

**Flow:**
1. App loads → lands on Deals view
2. Shows all products where `onSale === true`
3. Organized by drink category via horizontal filter chips
4. Sorted by **steepest discount percentage** (biggest savings first)
5. Discount % computed client-side: `((regularPrice - lowestPrice) / regularPrice) * 100` where `lowestPrice = min(cardPrice, campaignPrice, regularPrice)`

**Deal card anatomy:**
- Product image (60x60 thumbnail)
- Product name (max 2 lines, truncated)
- Brand + Volume in secondary text
- Store badge (store logo + name, colored per store identity)
- Discount badge: amber/orange pill with "-23%" text
- Price: regular price strikethrough + sale price in bold green

**Filters:**
- Category chips: "All" (default), "Beer" (Olu), "Cider" (Siider), "Long Drink", "Cocktail" (Kokteil), "Energy Drink" (Energiajook), "Other" (Muu)
- "All" selected by default

**SDK method used:** `api.getProducts({ on_sale: true, category, limit, offset })`

### 4.3 Bilingual Support (EN / ET)

- English is the default language
- Estonian available via "EN | ET" toggle in the top-right corner
- All UI chrome (headings, labels, placeholders, buttons, empty states, error messages) translated
- Product data (names, categories) comes from the API in Estonian and is displayed as-is regardless of language setting
- Language preference persisted in `localStorage`

### 4.4 Category Data

Categories fetched from the API at app load and cached.

**SDK method used:** `api.getCategories()` — returns category ID, Estonian name, English name, and product count. Used to populate filter chips with correct labels per language.

### 4.5 Store Identity

Each of the 5 stores has a visual identity in the app:

| Store | Brand Color | Logo |
|-------|------------|------|
| Selver | `#007A3D` (green) | Real store logo, 16-20px height |
| Prisma | `#0051A5` (blue) | Real store logo, 16-20px height |
| Rimi | `#D52B1E` (red) | Real store logo, 16-20px height |
| Barbora | `#FF6900` (orange) | Real store logo, 16-20px height |
| Cityalko | `#6B3A2A` (brown) | Real store logo, 16-20px height |

Store logos sourced independently and stored in the project's `public/logos/` directory. Used in store badges (deals view) and price rows (search comparison view).

---

## 5. What This App Does NOT Have (v1)

Explicitly out of scope to prevent feature creep:

- No user accounts, sign-in, or registration
- No favorites, saved products, or shopping lists
- No purchase flow or outbound links to store websites
- No price history, price tracking, or price alerts
- No product detail page — all info is in the card itself
- No desktop layout — mobile only
- No dark mode
- No map or store locator
- No push notifications
- No offline mode

---

## 6. Architecture

### 6.1 Separate Project

PriceHNTR is a **standalone project** in `C:\Users\Kasutaja\Claude_Projects\price-hntr`. It has zero code dependencies on the Alkoholiks API codebase. The only connection is through the public API via the SDK.

### 6.2 Tech Stack

| Layer | Tech | Rationale |
|-------|------|-----------|
| Framework | React (Vite) | Lightweight, fast, mobile-optimized. No SSR needed — this is a client-side SPA. |
| Language | TypeScript | Type safety, SDK types |
| Styling | Tailwind CSS | Standard convention, Stitch output already uses Tailwind |
| API client | Alkoholiks SDK (`sdk/index.ts`) | Official SDK — copy into project or npm link |
| Routing | React Router (2 routes) | Deals `/` and Search `/search`, or single-page with tab state |
| State | React hooks (useState, useEffect) | No global state library needed — app is simple |
| i18n | Lightweight custom (JSON translation files) | Only 2 languages, ~50 strings. No heavy i18n library. |
| Hosting | Vercel | Already in stack, free |
| Font | Inter (Google Fonts) | Matches design system |
| Icons | Material Symbols Outlined | Matches Stitch output |

**Why Vite + React (not Next.js):**
- No SSR needed — all data fetched client-side via the API
- No API routes — the API already exists
- No auth — no Clerk needed on the consumer side
- Lighter bundle, faster build, simpler deployment
- This is a pure frontend SPA consuming an external API

### 6.3 API Integration (By the Book)

```
PriceHNTR (React SPA)
    |
    |  import { AlkoholiksAPI } from './lib/alkoholiks-sdk'
    |
    |  const api = new AlkoholiksAPI({
    |    clientId: process.env.VITE_ALK_CLIENT_ID,
    |    clientSecret: process.env.VITE_ALK_CLIENT_SECRET,
    |  })
    |
    +- api.getProducts({ on_sale: true })     -> Deals view
    +- api.searchProducts("monster")          -> Search view
    +- api.getCategories()                    -> Filter chips
    +- api.getStores()                        -> Store metadata
          |
          v
    Alkoholiks API (alkoholiks-api.vercel.app)
    OAuth 2.0 Client Credentials -> Bearer token -> API calls
```

**Credential handling:**
- `client_id` and `client_secret` stored in `.env.local` as `VITE_ALK_CLIENT_ID` and `VITE_ALK_CLIENT_SECRET`
- SDK handles OAuth token exchange automatically (acquire, cache, refresh 60s before expiry)
- Credentials are obtained by registering on the developer portal — same as any third-party would

**Important security note:** In a production consumer app, client credentials would be proxied through a backend to avoid exposing `client_secret` in the browser. For this educational project / first-consumer proof-of-concept, we accept this trade-off. The API's rate limiting (100 req/hr) provides sufficient protection.

### 6.4 Data Flow

1. **App loads** -> SDK initializes, acquires OAuth token silently
2. **Deals view** -> `getProducts({ on_sale: true, limit: 100 })` + `getCategories()` + `getStores()`
3. **Category chip tapped** -> re-fetch with `category` param, or filter client-side if all data already loaded
4. **Search initiated** -> `searchProducts(query)` with 300ms debounce
5. **Language toggled** -> UI chrome switches, product data unchanged, preference saved to localStorage

### 6.5 Error Handling

| Error | SDK behavior | App UI |
|-------|-------------|--------|
| 401 Unauthorized | SDK auto-retries with fresh token | Transparent to user |
| 429 Rate Limited | SDK waits `retry_after` seconds, retries | Banner: "Too many requests. Please wait." |
| 500 Server Error | SDK throws `AlkoholiksError` | Banner: "Prices temporarily unavailable." |
| Network error | `fetch` throws | Banner: "No connection. Check your internet." |

Error banners are non-intrusive — top of screen, auto-dismiss after 5 seconds or on tap.

---

## 7. Design System

Fully defined in the Stitch output: `docs/UI_/DESIGN (2).md`

### Key tokens (from Stitch, validated):

- **Primary:** `#006D43` (savings green) / Container: `#00A86B`
- **Secondary (deals):** `#904D00` / Container: `#FD8B00` (amber for discount badges)
- **Surface hierarchy:** `#F8F9FA` (base) -> `#F3F4F5` (low) -> `#FFFFFF` (cards)
- **Text:** `#191C1D` (primary) / `#3D4A41` (secondary)
- **Font:** Inter, system fallback
- **Cards:** 12px radius, no shadows, tonal layering (background shift, not borders)
- **Glassmorphic header/nav:** `surface` at 80% opacity + 20px backdrop-blur
- **Active chips:** `on-surface` background, `surface` text (dark on light)
- **Cheapest row highlight:** `primary-fixed` (#78FBB6) at 30% opacity background tint

### Stitch corrections to apply during build:

1. Remove "Maxima" store references -> use only real 5 stores
2. Remove "Add to Hunter List" button -> display only, no actions
3. Remove chevron/detail page patterns -> no product detail page
4. Show all 5 store rows always -> no "Show top 3" truncation
5. Strip all `dark:` classes -> no dark mode in v1
6. Fix category chips -> use real categories from API (`getCategories()`)
7. Replace Google AIDA placeholder images -> use real `imageUrl` from API
8. Replace letter circles -> real store logos when available

---

## 8. Project Structure

```
price-hntr/
+-- public/
|   +-- logos/
|   |   +-- selver.svg
|   |   +-- prisma.svg
|   |   +-- rimi.svg
|   |   +-- barbora.svg
|   |   +-- cityalko.svg
|   +-- favicon.svg
+-- src/
|   +-- main.tsx
|   +-- App.tsx
|   +-- components/
|   |   +-- TopBar.tsx
|   |   +-- SearchBar.tsx
|   |   +-- CategoryChips.tsx
|   |   +-- BottomNav.tsx
|   |   +-- DealCard.tsx
|   |   +-- ComparisonCard.tsx
|   |   +-- StoreBadge.tsx
|   |   +-- PriceRow.tsx
|   |   +-- DiscountBadge.tsx
|   |   +-- ErrorBanner.tsx
|   |   +-- SkeletonCard.tsx
|   |   +-- EmptyState.tsx
|   +-- views/
|   |   +-- DealsView.tsx
|   |   +-- SearchView.tsx
|   +-- lib/
|   |   +-- alkoholiks-sdk.ts
|   |   +-- api.ts
|   |   +-- i18n.ts
|   |   +-- utils.ts
|   +-- translations/
|   |   +-- en.json
|   |   +-- et.json
|   +-- constants/
|   |   +-- stores.ts
|   +-- index.css
+-- docs/
|   +-- plans/
|   +-- UI_/
+-- .env.local
+-- PRD.md
+-- STACK.md
+-- vite.config.ts
+-- tsconfig.json
+-- package.json
+-- .gitignore
```

---

## 9. Milestones

### Phase 1: Foundation
- Scaffold Vite + React + TypeScript + Tailwind
- Set up Tailwind config with Stitch design tokens
- Copy SDK into project
- Register on Alkoholiks API developer portal, obtain credentials
- Verify OAuth token exchange works
- GitHub repo created + pushed

### Phase 2: Core Views
- Deals view (landing page) with real API data
- Search view with comparison matrix
- Category chips with real categories from API
- Bottom navigation (tab switching)

### Phase 3: Polish
- Bilingual support (EN/ET) with toggle
- Store logos sourced and integrated
- Loading skeletons
- Empty state
- Error banners
- Micro-interactions (debounce, scale-on-tap, glassmorphic blur)

### Phase 4: Ship
- Deploy to Vercel
- Browser E2E verification via chrome-devtools MCP
- STACK.md created
- Global STACK.md updated
- Memory updated

---

## 10. Success Criteria

1. **User can search any product and see prices across all 5 stores in under 2 seconds**
2. **Cheapest price is immediately obvious** — highlighted, badged, no scanning required
3. **Deals view shows real discounted products on first load** — no user action needed
4. **The entire app is built using only the public API + SDK** — zero internal access to the API codebase
5. **Rate limiting is respected** — app handles 429 gracefully, never hammers the API
6. **Works on mobile** — tested at 390px viewport, touch-friendly, no horizontal scroll issues
