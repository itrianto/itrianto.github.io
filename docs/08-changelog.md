# Changelog

## 2026-08-07 - Phase 2: Content & Asset Integration

- Integrated hero image (`assets/images/hero/hero.png`) and profile image (`assets/images/profile/aboutme.JPG`) into `index.html`.
- Populated Experience section with documented CV facts; gaps marked TBD.
- Added project cards for Religious Tourism Connectivity and Karangkates Floating Photovoltaic.
- Added premium Publications section with three publication cards and DOI/URL links.
- Created responsive gallery modal with keyboard, touch, mouse, and lazy loading support.
- Added scroll-reveal animations respecting `prefers-reduced-motion`.
- Enhanced `assets/css/style.css` with project cards, publication cards, gallery modal, and reveal animation utilities.
- Enhanced `assets/js/script.js` with gallery slider, modal, scroll observer, and lazy image observer.
- Improved WebGIS section transition on `index.html`.
- Updated documentation: `AI_CONTEXT.md`, `03-content.md`, `06-projects.md`.

## 2026-08-07 - Documentation system established

- Added `AI_CONTEXT.md` as the repository's development source of truth.
- Added project brief, brand, content, roadmap, design-system, projects, WebGIS, changelog, and Codex workflow records.
- Recorded the current static architecture, available assets, active Religious Tourism WebGIS, verified data counts, and known content gaps.

## Prior implementation context (recorded from current source)

- The Religious Tourism WebGIS currently loads the supplied GeoJSON tourism points, nodes, edges, and route layers with CSV attributes, StoryMap content, research metrics, filters, controls, and photo mappings.
- This entry documents existing source state; it does not assert an unobserved commit history.

Future changes must append a dated entry here and update [AI_CONTEXT.md](AI_CONTEXT.md).
