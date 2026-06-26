# Design System: Bowline Federal Technologies

> Single source of truth for the visual language of the Bowline Federal public
> site. Federal-IT serious — defense/government contractor, not consumer
> startup. Generated via the taste-design methodology.

## 1. Visual Theme & Atmosphere

A precise, engineered interface in the register of a defense or government
technology contractor. The atmosphere is composed and confident — deep navy
surfaces, steel structure, and a single disciplined accent. It reads as
infrastructure: measured, low-adjective, trustworthy. No consumer-startup
warmth, no marketing flash. Government buyers distrust fluff, so the design
earns credibility through restraint and clarity rather than spectacle.

- **Density:** ~5 (balanced — substantial but never cluttered)
- **Variance:** ~5 (confident asymmetry; left-aligned and split layouts, never chaotic)
- **Motion:** ~3 (restrained; a single subtle scroll-reveal, no cinematic choreography)

## 2. Color Palette & Roles

The base navy follows the brand-kit board — a warmer, lighter navy than a stark
near-black. Tokens live in `src/styles/global.css` (`@theme`).

- **Navy** (#14243A) — Primary dark canvas; hero and dark sections (board base)
- **Navy 700** (#1B2E48) — Alternate dark section surface (adjacent-navy depth step)
- **Deep Ink** (#0A0F1A) — Deepest ink / footer base (never pure #000000)
- **Steel 900** (#22354F) — Raised dark panels on navy
- **Steel 700** (#33415A) — Borders, dividers, structural 1px lines on dark
- **Steel 500** (#4F5D75) — Blueprint gridlines, muted iconography
- **Steel 400** (#8C9BB3) — Secondary text on dark surfaces
- **Steel 300** (#BAC6D8) — Lede / tertiary text on dark
- **Mist 50** (#F4F7FB) — Light page background (board off-white)
- **Paper** (#FFFFFF) — Raised panel / table fill on light
- **Mist 200** (#DCE3EE) — Hairline borders / row rules on light
- **Steel 600** (#56657D) — Secondary text on light
- **Signal Blue** (#2563EB) — THE single accent: CTAs, active states, focus rings, key rules, the one knot crossing
- **Signal Bright** (#3B82F6) — Hover state of the accent only
- **Signal Dim** (#1D4ED8) — Pressed/active state of the accent only
- **Signal Wash** (rgba(37,99,235,0.10)) — the only tinted fill (pills/badges); never a gradient

Rules: exactly one accent hue. Saturation kept controlled. No purple/neon "AI"
aesthetic, no outer glows, no gradient text on headers. No warm cream/gold
hospitality palette. Patriotism is understated at most — thin steel/navy motif,
never literal flags-and-eagles.

## 3. Typography Rules

- **Display:** Sora (500/600/700) — modern geometric grotesk; track-tight (−0.02em on the hero), weight-driven hierarchy, confident at large sizes. 700 reserved for the hero `.display-xl`. Fluid `clamp` type scale (`.display-xl/.display-lg/.heading-2/.lede`).
- **Body:** IBM Plex Sans (400/500/600) — clean technical sans, relaxed leading, ~65ch measure, steel secondary color.
- **Mono:** IBM Plex Mono (400/500) — codes (NAICS, UEI, CAGE), corporate-data table values, the uppercase technical eyebrow labels, and the functional section locator (`S/02`).
- **Fonts are self-hosted** (`@fontsource`) — no Google Fonts CDN call.
- **Banned:** generic serifs in this software/government context; oversized gradient headers; pure system-font fallback as the primary face.

## 3a. Logo, Signature & Imagery

- **Logo — the knot-B (`KnotMark.astro`):** a letter "B" (spine + two bowls) whose
  two eyes are tied by a bowline bight. The B is steel (`currentColor`); the single
  Signal-Blue strand crossing the waist is the bight — the line "held under load."
  Reads as B from 16px (favicon) to full-bleed. Matches the brand-kit board mark.
  Variants: `mark` (default), `moored` (with a short rope tail, used where the line
  is "made fast" to a CTA/panel). Synced into `favicon.svg` and `og-default.svg`.
- **Signature — the Bearing Line (`motifs/BearingLineSeam.astro`):** a single rope
  spans a section, runs level, and ties exactly one bowline knot at the load-bearing
  point — the literal picture of *"Secure under load."* The one blue crossing strand
  is the only place Signal Blue touches the line. Used sparingly: hero (full knot,
  ends off-frame), section seams (`Section seam`), the moored CTA, the footer (line
  secured). One knot per seam — never decorative repetition.
- **Imagery (deliberate exception to "SVG-only"):** two custom-generated cinematic
  **dusk secure-facility images** (`/facility-dusk.jpg`, `/server-hall.jpg`) — the
  board's photographic register. Used at most twice site-wide via `ImageBand`, with
  a left-anchored navy scrim so any caption stays legible while the image's own cool
  window-glow is that band's accent (no doubled blue). Entity-neutral alt/filenames
  (no place names, agencies, people, or other-entity reference). Everything else
  decorative is inline SVG (`BlueprintGrid`, `SecureCoreNetwork`, `LineIcon`).

## 4. Component Stylings

- **Buttons:** Flat, no outer glow. Primary = Signal Blue fill, white text, tactile −1px translate on `:active`. Secondary = steel outline / ghost on dark. Minimum 44px tap height.
- **Cards / panels:** Sharp, engineered corners (small radius, ~0.5rem). Used only when elevation communicates hierarchy. On dark surfaces, prefer bordered Steel-700 panels or top-border dividers over heavy drop shadows. Shadows, where used, are tight and tinted toward navy — never soft consumer blur.
- **Competency grid:** A structured multi-column grid of bordered panels — explicitly NOT the banned "3 equal cards in a row" hero feature pattern. Asymmetric/zig-zag rhythm elsewhere.
- **Inputs:** Label above field, helper/error below. Focus ring in Signal Blue. No floating labels. Generous gap spacing.
- **Tables (corporate data):** Clean semantic `<table>`; labels in sans, values in mono; Steel-700 row rules.
- **Loaders/empty states:** Not applicable (static brochure site).

## 5. Layout Principles

- CSS Grid-first; max-width content rail (~1216px) centered with comfortable
  inline padding. No flexbox percentage `calc()` math.
- Hero is **left-aligned / asymmetric**, never centered. Legal name + tagline +
  one-line positioning + certification-stack callout + a single primary CTA.
- No overlapping elements — every element occupies its own clean spatial zone;
  no absolute-positioned text stacking on imagery.
- Full-height sections use `min-h-[100dvh]` semantics, never `h-screen`.
- Section rhythm alternates light (Mist) and dark (Abyss/Slate) surfaces.

## 6. Motion & Interaction

- A single restrained scroll-reveal: content settles up ~12px and fades in,
  staggered lightly. Driven by a tiny IntersectionObserver; animates only
  `transform`/`opacity`.
- Fully honors `prefers-reduced-motion: reduce` (reveal disabled, smooth scroll off).
- No perpetual loops, no parallax, no cinematic flourish — appropriate to a
  federal buyer's expectations.

## 7. Anti-Patterns (Banned)

- No emojis anywhere.
- No pure black (#000000) — deepest is Deep Ink #0A0F1A.
- No neon / outer-glow shadows; no oversaturated accent.
- No purple/blue "AI" gradient aesthetic.
- No 3-equal-card horizontal feature row.
- **No fabricated metrics or statistics** — zero invented uptime %, response
  times, contract counts, dollar figures, or "by the numbers" dashboards.
- **No fabricated clients, logos, contract numbers, or past performance.**
- No `LABEL // YEAR` typographic convention.
- No AI copywriting clichés ("Elevate", "Seamless", "Unleash", "Next-Gen").
- No "Scroll to explore" / bouncing chevrons / scroll arrows.
- No flags-and-eagles patriotic cliché.
- No broken Unsplash links — decorative visuals are inline SVG motifs.
- No warm cream/gold or any hospitality-adjacent styling.
