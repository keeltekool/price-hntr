# Design System Document

## 1. Overview & Creative North Star
**The Creative North Star: "The Intelligent Ledger"**

This design system is engineered to feel like a high-end, utilitarian tool—a digital ledger that is as fast as it is precise. While the core mission is price comparison, the visual identity avoids the cluttered, "discount-bin" aesthetic of typical retail apps. Instead, it adopts an editorial clarity, using wide breathing room, intentional asymmetry, and a sophisticated tonal layering system. 

We move beyond the standard grid by treating the interface as a series of floating, interactive data sheets. By leveraging the contrast between vibrant savings-focused greens and a muted, off-white environment, we guide the user’s eye directly to the value: the price.

---

## 2. Colors
Our palette is rooted in the "Confident Green" of savings, balanced by a warm, editorial neutral base.

### The Palette (Core Tokens)
- **Primary (Savings):** `#006D43` (Primary) / `#00A86B` (Container). Use for success states, confirmed savings, and primary action paths.
- **Secondary (Urgency/Deals):** `#904D00` (Secondary) / `#FD8B00` (Container). Reserved strictly for discount badges and limited-time offers.
- **Surface Hierarchy:**
    - `surface`: `#F8F9FA` (The base canvas)
    - `surface-container-low`: `#F3F4F5` (Nested groupings)
    - `surface-container-lowest`: `#FFFFFF` (Elevated interactive cards)

### Signature Rules
- **The "No-Line" Rule:** Standard 1px solid borders are prohibited for sectioning. To separate content, use background shifts. For example, a `surface-container-lowest` card should sit on a `surface` background to define its boundary through value change alone.
- **The Glass & Gradient Rule:** For floating headers or bottom navigation, use a semi-transparent `surface` color with a `backdrop-blur` of 20px. This creates an integrated, premium feel. 
- **CTA Depth:** Primary buttons should use a subtle vertical gradient from `primary` (#006D43) to `primary_container` (#00A86B) to provide a tactile "soul" that flat colors lack.

### Store-Specific Identities
When rendering store-specific data, use the brand-specific tokens for logos and badges only:
- **Selver:** `#007A3D` | **Prisma:** `#0051A5` | **Rimi:** `#D52B1E` | **Barbora:** `#FF6900` | **Cityalko:** `#6B3A2A`

---

## 3. Typography
We use **Inter** to maintain a utilitarian, system-level feel, but we apply editorial scales to create authority.

- **Display-LG (The Hero):** 3.5rem. Used for major milestone savings or search results count.
- **Title-LG (The Header):** 1.375rem (22px) Semibold. Used for page titles to establish clear hierarchy.
- **Headline-SM (The Price):** 1.5rem (24px) Bold. The "North Star" metric. Always use `on-surface` or `primary` for price highlights.
- **Body-MD (The Details):** 0.875rem (14px). Used for product descriptions and store names.
- **Label-SM (The Meta):** 0.6875rem (11px). Used for unit prices (e.g., €/L) and secondary store info.

*Editorial Note:* Maintain high contrast. Use `on-surface-variant` (#3D4A41) for secondary text to ensure the primary price and product name "pop" against the white card.

---

## 4. Elevation & Depth
In this design system, depth is a product of **Tonal Layering**, not shadows.

- **The Layering Principle:** Place `surface-container-lowest` (#FFFFFF) elements on top of `surface-container-low` (#F3F4F5) backgrounds. This creates a soft, natural lift that feels like stacked fine paper.
- **Ambient Shadows:** Shadows should only be used on "Floating" elements (e.g., a floating search bar). Use a 20px blur with 4% opacity, tinted with the `on-surface` color.
- **The "Ghost Border" Fallback:** If a border is required for accessibility, use the `outline_variant` (#BCCABE) at **20% opacity**. Never use a 100% opaque border.
- **Glassmorphism:** For top navigation bars, use `surface` at 80% opacity with a blur effect. This allows the product cards to "slide" under the header, maintaining a sense of spatial continuity.

---

## 5. Components

### Search Bar (The Entry Point)
- **Style:** 24px height, `xl` (1.5rem) roundedness.
- **Background:** `surface-container-highest` (#E1E3E4).
- **Behavior:** On focus, transition to `surface-container-lowest` (#FFFFFF) with a 4% ambient shadow.

### Product Cards (The Data Unit)
- **Radius:** `md` (12px).
- **Layout:** Asymmetric. Image on the far left (64x64px), title and category stacked in the center, and the price/store badge right-aligned.
- **Rule:** Forbid divider lines between store listings. Use `spacing-2.5` (0.5rem) vertical gaps and subtle background shifts (`surface-container-low`) to define the "Cheapest" store row.

### Chips (The Filters)
- **Style:** Pill-shaped (`full` roundedness).
- **Inactive:** `surface-container-high` background with `on-surface-variant` text.
- **Active:** `on-surface` background with `surface` text. No borders.

### Badges (The Callout)
- **Discount Badges:** Use `secondary_container` (#FD8B00) with `on-secondary_fixed` (#2F1500) text. 
- **"Cheapest" Badge:** Small, `primary_fixed` (#78FBB6) capsule with `on-primary_fixed` text, placed immediately adjacent to the price.

---

## 6. Do's and Don'ts

### Do
- **Do** use whitespace as a separator. If you feel the need to add a line, add 8px of padding instead.
- **Do** align the "Store Logo" and "Price" on the same horizontal axis to allow for rapid scanning.
- **Do** use the `primary` green (#006D43) sparingly—only for the best price or the final checkout/action.

### Don't
- **Don't** use pure black (#000000) for text. Use `on-surface` (#191C1D) to maintain the premium, editorial softness.
- **Don't** use standard 1px borders (#E5E7EB) as requested in the original brief; instead, use the "Ghost Border" at 20% opacity to ensure the UI feels modern and bespoke.
- **Don't** crowd the product card. If a product has 5 stores, show the top 3 and use a "Show More" interaction to keep the initial view clean.