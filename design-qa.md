# Design QA — AVONFlow

Date: 2026-08-28

## Evidence

- source visual truth path: `https://flowbybunny.com/`, `https://flowbybunny.com/pricing`, `https://flowbybunny.com/about`, and `https://flowbybunny.com/earn`
- implementation screenshot path: in-session Cloud Browser captures of the verified local preview at routes `/`, `/pricing`, `/about`, and `/earn`; the browser surface rendered the screenshots inline and did not expose an export path
- desktop viewport: 1363 × 936 CSS px, 1363 × 936 captured px, DPR 1
- mobile viewport: 390 × 844 iframe viewport; 378 × 842 content CSS px after the native scrollbar, DPR 1
- density normalization: source and implementation desktop captures used the same CSS viewport and DPR; no resampling was required
- state: dark theme, unauthenticated, top-of-page; pricing also checked with USD selected and the Max signup dialog open

## Full-view comparison evidence

- Homepage: the source and implementation were emitted together in one comparison input at 1363 × 936. The implementation preserves the source navbar proportions, left-aligned oversized three-line hero, CTA/rating cluster, right-side cinematic character art, and three-part stats bar. Cyan/navy color and the single humanoid camera robot are intentional rebrand changes.
- Pricing: the source and implementation were emitted together in one comparison input at 1363 × 936 and scroll position 0. The implementation preserves the centered free-trial hero, horizontal creation rail, currency control, and three-card Plus/Max/Heavy hierarchy.
- Responsive structure: all four implementation routes were rendered inside a real 390 × 844 iframe viewport. Each route had document `scrollWidth === clientWidth`; the mobile nav replaced the desktop nav, cards stacked or became contained horizontal rails, and primary actions remained reachable.

## Focused region comparison evidence

- Hero typography and art: checked headline scale, three-line wrapping, left/right balance, CTA grouping, rating placement, image crop, and bottom stats against the source hero.
- Pricing conversion region: checked gallery height, gallery-to-toggle spacing, toggle-to-card spacing, card widths, badges, prices, and visible card density against the source pricing capture.
- Interaction regions: visually checked the Max signup dialog, success state, pricing and About FAQ expansion, referral wallet/copy state, support chat, and mobile drawer.
- Additional zoomed crops were not needed because these regions were legible at the captured 1363 × 936 viewport and were separately brought into the viewport during interaction testing.

## Required fidelity surfaces

- Fonts and typography: Archivo Black supplies the compressed cinematic display treatment; Inter supplies UI/body copy. Display scale, weight, line-height, negative tracking, and mobile wrapping preserve the source hierarchy without truncation.
- Spacing and layout rhythm: desktop section width, navbar pill, hero split, stats rhythm, pricing rail, and card grouping match the source hierarchy. Mobile containers retain 14 px side margins and no document-level horizontal overflow.
- Colors and visual tokens: the source purple system is intentionally remapped to near-black/navy, electric cyan, and violet-blue secondary accents. Text contrast and cyan focus indicators remain clear.
- Image quality and asset fidelity: all hero/gallery assets are original generated WebP images stored locally. The hero uses the requested humanoid camera robot and clapperboard composition; no source assets, hotlinks, handmade SVG illustrations, or placeholder boxes are used.
- Copy and content: all BunnyFlow naming is replaced with AVONFlow. Required Google disclaimer, support hours, trial language, plan names, referral conversion, earnings examples, and withdrawal details are present.
- Icons and controls: Lucide icons provide a consistent stroke family. Buttons, tabs, accordions, mobile menu, modal close, password visibility, copy state, and chat states have semantic controls and visible focus styles.
- Accessibility: headings are ordered, images have descriptive alt text, form controls have explicit labels, icon-only buttons have accessible names, focus-visible styling is present, reduced motion is honored, and tap targets remain practical on mobile.

## Findings

No actionable P0, P1, or P2 findings remain.

## Comparison history

1. [P1 resolved] Route-change reveal race could capture above-the-fold content as blank.
   - Fix: made content visible by default and retained progressive observer behavior without hiding initial route content.
   - Post-fix evidence: fresh `/about` and `/earn` route captures show fully painted heroes immediately.
2. [P1 resolved] Mobile drawer had zero usable height because a fixed descendant was contained by the sticky blurred header.
   - Fix: changed the drawer to an absolute full-viewport-height panel anchored below the header and hid the chat launcher while the menu is open.
   - Post-fix evidence: 390 × 844 capture shows all five links and both auth actions; measured drawer box was 388 × 772 with opacity 1.
3. [P2 resolved] Mobile pricing/gallery rails produced 6 px of document-level horizontal overflow.
   - Fix: reduced rail widths from `100vw - 18px` to `100vw - 28px`.
   - Post-fix evidence: mobile pricing measured `clientWidth: 378`, `scrollWidth: 378`.
4. [P2 resolved] Desktop pricing pushed the currency toggle and cards materially lower than the source hierarchy.
   - Fix: reduced compact reel height, reel top spacing, and pricing-section top padding.
   - Post-fix evidence: repeated same-input pricing comparison places the toggle and card tops within roughly 20–30 px of the source while preserving AVONFlow content.
5. [P2 resolved] Password label resolution was ambiguous because the visibility control sat inside the label wrapper.
   - Fix: added explicit `htmlFor`/`id` pairs and separated field controls.
   - Post-fix evidence: exact-label automation filled both fields and reached the signup success state.
6. [P2 resolved] Referral copy feedback could report success when the modern clipboard API was unavailable.
   - Fix: added a legacy clipboard fallback and a visible retry state when both mechanisms fail.
   - Post-fix evidence: the verified browser reached the `Copied` UI state; direct clipboard inspection remained restricted by the cloud browser.

## Primary interactions tested

- desktop navigation across `/`, `/pricing`, `/about`, and `/earn`
- mobile menu open/close state and contained full-height drawer
- PKR/USD currency selection and price updates
- Max plan signup dialog, labeled email/password fields, submit, and success state
- Pricing and About FAQ expansion with `aria-expanded` updates
- referral copy state and wallet section
- support chat open, option selection, response state, and close control
- SPA direct-route rendering and scroll reset

## Console errors checked

- No application-origin warnings or errors were found on fresh Home and Pricing tabs.
- The cloud browser logged `chrome-extension://... Error sending browser metadata to extension`; this originates from the browser harness extension, not AVONFlow.

## Open Questions

- Authentication, checkout, live support, analytics, referral persistence, and verified live creator counts need production services before launch; the current interactions are intentionally frontend prototypes.

## Implementation Checklist

- [x] Match source hierarchy with AVONFlow branding and original imagery
- [x] Verify all four routes at desktop width
- [x] Verify all four routes at 390 px mobile width
- [x] Exercise the primary conversion and support interactions
- [x] Run the production build and Sites worker tests
- [x] Check application console output

## Follow-up Polish

- [P3] Self-host Archivo Black and Inter if eliminating the Google Fonts runtime request becomes a launch requirement.

final result: passed
