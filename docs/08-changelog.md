# Changelog

## 2026-11-02 - Centralized Project Database Foundation Established

- Established centralized Project Database `data/projects.json` with a consistent 22-field metadata schema (`id`, `slug`, `title`, `year`, `period`, `location`, `category`, `projectType`, `role`, `organization`, `shortDescription`, `overview`, `myContribution`, `methodology`, `tools`, `deliverables`, `gallery`, `videos`, `externalLinks`, `featured`, `milestones`, `lastUpdated`).
- Added client-side zero-build helper `assets/js/projects-data.js` (`window.ProjectDatabase`) ensuring 100% offline `file:///` compatibility and synchronous access alongside async fetch.
- Populated 9 validated projects adhering strictly to factual data:
  1. `proj-znt-bulungan` (Land Value Zoning — Bulungan)
  2. `proj-karangkates-pv` (Karangkates Floating Solar Power Plant)
  3. `proj-measuring-current` (Offshore Hydrodynamic & Current Measurement Survey)
  4. `proj-coral-reef-conservation` (Coral Reef Conservation & Coastal Ecosystem Mapping)
  5. `proj-marine-coastal-mapping` (Marine & Coastal Thematic Mapping)
  6. `proj-community-service-karanganyar` (Community Service Program)
  7. `proj-geosphere-phenomena-karimunjawa` (Geosphere Phenomena Study)
  8. `proj-batam-vegetation` (Batam Vegetation Monitoring)
  9. `proj-wisata-religi-semarang` (Connectivity Analysis of Religious Tourism Sites — Semarang)
- Enforced data integrity rules: no project status fields, no status badges, factual time periods only, unique slugs/IDs, preserved publications in Publications section, and Lab Supervisor UNNES in Experience.
- Updated `docs/06-projects.md` with schema specifications, inventory table, and step-by-step instructions for adding new projects.

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
