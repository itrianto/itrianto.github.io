# Religious Tourism WebGIS

## Scope

The WebGIS page is `projects/wisatareligi/webgis/webgis-wisata-religi-semarang.html`. Its client logic is `assets/js/webgis-wisata-religi.js` and page styling is `assets/css/webgis-wisata-religi.css`.

## Data contract

| Layer | File | Current count | Purpose |
| --- | --- | ---: | --- |
| Tourism points | `assets/data/koordinat-pariwisata.geojson` | 22 | Tourism-site point geometry |
| Network nodes | `assets/data/nodes.geojson` | 607 | Graph/network vertices |
| Network edges | `assets/data/edges.geojson` | 621 | Road-network edges |
| Analysis route | `assets/data/rute.geojson` | 1 feature | Route visualisation |
| Attributes | `assets/data/wisata-religi-atribut.csv` | 22 rows | Official name, address, district, visitor count where supplied |

`wisata-religi-semarang.csv` remains available but is not the primary map input. `edges.qmd` is dataset metadata, not an application layer.

## Research findings used

- 22 officially recorded sites are analysed.
- Alpha index: 0.0124; beta index: 1.0231; gamma index: 0.3422.
- The thesis identifies Masjid Agung Jawa Tengah and Sam Poo Kong as strategic connecting nodes; the interface also highlights Masjid Raya Baiturrahman as a configured hub.
- The thesis describes concentration in central and northwestern Semarang and recommends improving secondary and alternative roads around sites with limited access.
- Publication DOI: `10.15294/geoimage.v15i1.40537`.

## Current interactions

Layer control, basemap switch, legend, scale bar, north arrow, fullscreen, locate-me, search, category and district filters, reset, marker highlight/popup, Google Maps link, responsive popup, lazy images, fallback photo state, StoryMap panel, and statistics strip are implemented.

## Maintenance rules

Validate all GeoJSON feature counts and attribute joins when data changes. Do not replace the supplied network with generated routes. Add photo mappings only when the file clearly corresponds to the official site name. Do not add descriptive text or statistics without a source.
