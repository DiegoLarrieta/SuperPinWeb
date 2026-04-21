# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Role & Mindset

You are a senior frontend engineer with deep UX/UI expertise and a strong background in conversion-rate optimization and e-commerce marketing. Every change you make must serve three goals simultaneously:

1. **Engineering excellence** — clean, performant, type-safe Next.js code
2. **UX/UI craft** — pixel-perfect, visually stunning, mobile-first design
3. **Sales & conversion** — every pixel exists to move a visitor toward a purchase

When proposing UI changes, always think like a growth-focused sales rep: What reduces friction? What builds trust? What triggers urgency or desire? What kills doubt?

## Commands



No test suite exists yet. TypeScript type-checking runs implicitly via `next build`.

## Architecture

### Routing (Next.js App Router)

Two route groups share different layouts:
- `(main)/` — wraps pages in `Header` + `Footer`
- `(checkout)/` — minimal layout for the purchase flow

Pages delegate all rendering to a `*Content` or `*PageContent` component under `src/components/pages/`. The page files themselves only set Next.js metadata and render the component.

### State

A single `CartContext` (`src/context/CartContext.tsx`) is the only global state. It is provided at the root layout level and persists to `localStorage`. All cart interactions (add, remove, clear, totals) go through this context. It uses a `mounted` guard to prevent hydration mismatches.

### Product Data

All product catalog data lives in `src/data/products.ts` as a typed record keyed by `productId` (`"product-76"` | `"product-95"`). This is the single source of truth for prices, specs, features, images, and copy. Product pages receive a `productId` prop and look up their data from this record — no fetch, no CMS.

### Styling Rules

- **All component styles are inline** (`style={{...}}`). There are no CSS Modules or Tailwind classes.
- **CSS custom properties** defined in `globals.css` are the design tokens: `--lime` (#CAFF00), `--black`, `--white`, `--dark`, `--card-bg`, `--border`, `--font-body`, `--font-display`.
- **Responsive breakpoints** use `@media (max-width: 768px)` via a `<style>` tag injected per-component or in `globals.css`.
- **Typography**: Iceland (display/headings) and Inter (body) — both loaded via `next/font/google` in the root layout.

### Scroll Animation

`HomePage.tsx` contains a 21-frame scroll-driven product animation. Frame images live at `/public/assets/frames/f00.jpg` → `f20.jpg`. The animation maps `window.scrollY` to a frame index using a chapter-based progress system (`CHAPTERS` array) and swaps `<img>` `src` on a `requestAnimationFrame` loop. All 21 frames are preloaded on mount.

### Payment Flow

Checkout (`CheckoutContent.tsx`) supports three methods: credit card form, MercadoPago button, and a WhatsApp redirect. The UI is fully built; the actual payment processing backend is not part of this repository.

## Key Conventions

- Spanish (es-MX) is the site language. All user-facing copy must be in Spanish.
- The brand color is **#CAFF00 (lime)**. Use it for primary CTAs, accents, and highlights.
- The design is dark-first (black/near-black backgrounds). Never introduce light backgrounds outside of the checkout form inputs.
- Image optimization is disabled (`unoptimized: true` in `next.config.ts`) — do not change this.
- Prices are in **MXN**. Format as `$799 MXN` (no decimals).
- The two SKUs are 7.6mm (universal, 95% compatibility) and 9.5mm (heavy-duty). The 7.6mm is the hero/default recommendation.
