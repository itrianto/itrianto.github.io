# AI Context - Irvan Trianto Portfolio

> **Single source of truth for future development.** Update this file in the same change set as every implemented feature, content change, structural change, or data-source change.

## Product

Premium personal GIS portfolio for **Irvan Trianto**. It demonstrates GIS, spatial analysis, hydrography, environmental mapping, research, and project documentation to recruiters, engineering and marine organisations, researchers, and clients.

## Current state

- Stack: static HTML, CSS, vanilla JavaScript, Leaflet, GeoJSON; suitable for GitHub Pages.
- Home page: `index.html`; shared styles/scripts: `assets/css/style.css`, `assets/js/script.js`.
- Active research project: Religious Tourism Connectivity WebGIS at `projects/wisatareligi/webgis/webgis-wisata-religi-semarang.html`.
- The WebGIS consumes `assets/data/koordinat-pariwisata.geojson`, `nodes.geojson`, `edges.geojson`, `rute.geojson`, and `wisata-religi-atribut.csv`.
- Available assets integrated: hero image, profile image, Religious Tourism gallery (22 images), Karangkates gallery (5 images), CV, and three publications.
- Home page now includes: hero image, profile image, experience section, project cards (Religious Tourism and Karangkates), publications section, and a gallery modal with keyboard/touch/mouse support.
- Content gaps: Karangkates project narrative pending user approval; some CV-specific dates and roles not documented.

## Non-negotiable rules

1. Read this file and all relevant `docs/` files before editing.
2. Do not invent personal, research, project, visitor, client, or publication facts. Use source files; mark absent information as `TBD` or “not documented”.
3. Preserve the static stack. Do not introduce React, Tailwind, or Bootstrap without explicit approval.
4. Prefer GeoJSON over CSV in maps. CSV is an attribute or preprocessing source only.
5. Keep the experience accessible: semantic HTML, keyboard access, visible focus, WCAG AA contrast, lazy images, and reduced-motion support.
6. Keep edits scoped. Do not alter unrelated files or discard existing user changes.
7. Update `08-changelog.md` and all affected subject documents after implementation; then update this Current state section.

## Design direction

Spatial precision: minimal, editorial, modern, professional, and evidence-led. Use Manrope for headings, Inter for body copy, and JetBrains Mono for metadata. Core colours are `#111827`, `#0F766E`, `#115E59`, `#FAFAFA`, `#FFFFFF`, `#E5E7EB`, and `#6B7280`. See [05-design-system.md](05-design-system.md).

## Documentation map

- [01-project-brief.md](01-project-brief.md) - mission and audiences
- [02-brand-guidelines.md](02-brand-guidelines.md) - visual and voice rules
- [03-content.md](03-content.md) - approved copy and gaps
- [04-roadmap.md](04-roadmap.md) - evidence-based next work
- [05-design-system.md](05-design-system.md) - tokens and component conventions
- [06-projects.md](06-projects.md) - project inventory
- [07-webgis.md](07-webgis.md) - implementation and data contract
- [08-changelog.md](08-changelog.md) - documentation/system history
- [09-codex-rules.md](09-codex-rules.md) - delivery checklist

## Update protocol

For every future feature: inspect relevant source and documents; state plan, files, and risks; implement; validate proportionately; update this file plus the subject document and changelog; report modified/created/deleted files and recommendations.
