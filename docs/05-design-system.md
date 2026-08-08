# Design System

## Tokens

The current CSS defines general tokens in `assets/css/style.css` and WebGIS-specific `--map-*` tokens in `assets/css/webgis-wisata-religi.css`. The shared semantic palette is:

```css
--color-text: #111827;
--color-primary: #0F766E;
--color-primary-hover: #115E59;
--color-background: #FAFAFA;
--color-surface: #FFFFFF;
--color-border: #E5E7EB;
--color-secondary: #6B7280;
```

## Components in use

- Header, brand, mobile menu, skip link, hero, section intro, CTA, contact links, and footer on the home page.
- WebGIS header, StoryMap panel, statistics strip, map controls, legend, custom markers, responsive popup, north arrow, and utility controls.

## Implementation rules

- Prefer existing variables and BEM-style class names.
- Keep focus states visible and interactive targets at least 44px where practical.
- Use CSS media queries and `prefers-reduced-motion`; do not add motion that blocks use.
- Do not duplicate a global component style in a page stylesheet when a shared token or component can serve it.

## Map visual grammar

Tourism categories have distinct marker colours; hubs receive stronger emphasis. Road edges, network nodes, and the analysis route remain visually subordinate to tourism points. See [07-webgis.md](07-webgis.md).
