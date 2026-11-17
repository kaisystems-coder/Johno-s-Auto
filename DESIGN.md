# DESIGN.md — Johno's Auto Services (teaser homepage)

Source of truth: `brand_assets/Johns_Auto_Services_Brand_Guidelines.pdf` + `brand_assets/logo.jpg`.
Brand values are used exactly; nothing below invents a new hue.

## Scene
A driver in Diego Martin, phone in hand, often at night or roadside with a warning light on.
Dark UI under workshop lighting: black ground, white content, lime only where you act.

## Tokens
| Token | Value | Use |
|---|---|---|
| `jet` | `#080A0A` | page, hero, nav, final CTA |
| `charcoal` | `#101313` | alt sections, cards |
| `graphite` | `#151919` | elevated surfaces (derived) |
| `steel` | `#1C2121` | floating surfaces / inputs (derived) |
| `lime` | `#B6E51B` | CTAs, links, icons, focus, active state ONLY |
| `lime-hi` / `lime-lo` | `#C6EE45` / `#93BA12` | hover / pressed steps of the CTA |
| white | `#FFFFFF` | headings; body at 72%, meta at 60%, borders at 10% |

Contrast: lime on jet ≈ 13:1; jet text on lime ≈ 13:1; white/60 on jet ≈ 7:1.

## Type
Inter only (brand guide p.02), via `next/font` with `display: swap`.
- Display: Inter 700–800, tracking −0.03em, leading 0.95–1.02, `text-wrap: balance`, max clamp 5.5rem.
- Body: Inter 400/500, 16–18px, line-height 1.7, ≤ 65ch.
- Kicker: Inter 600, 12px uppercase, tracking 0.22em, lime. Echoes the logo's spaced "AUTO SERVICES".
  Used on the hero and as a voice device, not stamped above every section.
- Numbers: tabular figures.

## Shape & depth
Radii: 12px controls, 16px cards, 24px hero form card, pill for chips.
Surfaces: base (jet) → elevated (charcoal/graphite + `shadow-elevated`) → floating (form card, nav, WhatsApp: `shadow-floating`).
Hairlines: 1px white/10; lime hairline dividers between alternating sections.

## Signature
The **car-roofline swoosh** from the logo, redrawn as SVG line art (lime roof + white body lines + lime spoiler).
It draws itself in the hero, drifts with the pointer and scroll, and returns as the final-CTA divider.
Secondary motif: the **shutter wheel** (the "O" in JOHNO'S): slow 60s ring behind the form, spin-on-hover badge on service cards, favicon, success state.

## Motion
- Ease-out-quint `cubic-bezier(.22,1,.36,1)`; springs for hover/tap/magnetic.
- Hero load (CSS, no JS gating): words 60ms stagger → sub → chips → CTA → form, 150–300ms apart.
- Section reveals are additive: SSR renders visible; JS only hides below-fold content after mount and reveals it in view.
- Only transform/opacity animate (plus SVG stroke-dashoffset for line draw). No `transition-all`.
- `prefers-reduced-motion`: no loops, no parallax, no draw; content shows instantly.
- Phones: no grain, no light-sweep, no pointer parallax, no backdrop blur behind animated layers.

## Layout
Hero 55/45, form right; on phones headline → sub → form → chips/CTAs.
Services: 12-col bento (feature card + 4). Why-us: photo + 2×2 hairline grid (not cards).
Showcase: masonry with counter-parallax columns on desktop, scroll-snap rail below lg.
