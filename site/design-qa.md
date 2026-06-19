# Design QA

- Source visual truth: `public/images/design-reference.png`
- Implementation screenshots: `screenshots/desktop-full.png`, `screenshots/mobile-full.png`
- Combined comparison: `screenshots/qa-comparison.png`
- Viewports: desktop 1080 x 800, tablet 768 x 844, mobile 390 x 844
- State: default landing page; product filters, product dialog, and mobile menu tested separately

## Full-view comparison evidence

The source and desktop implementation were placed side by side in `screenshots/qa-comparison.png`. The implementation preserves the source hierarchy: craft-led hero, dark green trust band, repair before/after, gold buying, priced products, consultation steps, and store visit.

The implementation is intentionally taller than the concept image. The concept compresses body copy below a practical reading size; the implementation keeps body text readable and gives controls usable spacing. This is an expected production constraint rather than actionable drift.

## Focused region evidence

- Hero: `screenshots/desktop-top.png` confirms the two-column crop, serif headline, restrained green call to action, and business hours. The headline was adjusted to two lines at desktop width.
- Mobile: `screenshots/mobile-top.png` and `screenshots/mobile-full.png` confirm the single-column hierarchy, working menu, two-column product grid, and fixed call/directions actions.
- Visit: the source's illustrative map was replaced with a clear Naver Map link panel. This avoids showing an inaccurate map without a configured map API while keeping the primary task functional.

## Required fidelity surfaces

- Fonts and typography: Noto Serif KR and Noto Sans KR reproduce the editorial display/body contrast. Weight, line height, wrapping, and mobile hierarchy are readable and consistent.
- Spacing and layout rhythm: major sections use the source's alternating editorial image/text rhythm, hairline dividers, and restrained surfaces. No horizontal overflow exists at 390, 768, or 1080 pixels.
- Colors and visual tokens: warm cream, walnut text, deep green, and muted brass match the selected direction. Text and controls maintain usable contrast.
- Image quality and asset fidelity: hero, repair, workshop, gold buying, and five product assets were generated individually in one art direction and optimized to responsive WebP output by Astro. Temporary imagery is labeled as staged content.
- Copy and content: address, phone, hours, Sunday closure, 20+ years of experience, and current call-first policy match the project documents. Sample products and prices are explicitly disclosed.
- Icons and controls: Phosphor icons provide one consistent line style. No handcrafted SVG, CSS art, text-symbol icon, or placeholder box is used.
- Responsiveness and accessibility: semantic headings, labels, alt text, focus styles, reduced-motion support, mobile tap targets, and keyboard-operable controls are present.
- States and interactions: mobile menu, product filters, product detail dialog, telephone links, and directions links were verified. Browser console errors were empty.

## Findings

No actionable P0, P1, or P2 findings remain.

## Patches made during QA

- Widened the desktop hero copy area so the headline matches the source's two-line composition.
- Corrected mobile trust-band line wrapping.
- Replaced the blank external map embed with an honest, functional Naver Map location panel.
- Added repeatable desktop/mobile capture and three-breakpoint interaction verification scripts.

## Follow-up polish

- [P3] Replace staged imagery and sample product prices with point-of-sale-approved content before public deployment.
- [P3] Connect the product source to the planned Sanity project after account credentials and project ID are available.

## Implementation checklist

- [x] Desktop and mobile visual comparison
- [x] Fonts, spacing, colors, imagery, and copy reviewed
- [x] 390, 768, and 1080 pixel overflow checks
- [x] Menu, filter, and dialog interactions verified
- [x] Production build completed without warnings or errors

final result: passed
