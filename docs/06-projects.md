# Project Database & Inventory

Single source of truth for projects across the portfolio, powering:
1. Selected Work / Projects on the homepage.
2. Project Archive (`#maps-archive` and archive views).
3. Project detail pages (`projects/*.html`).
4. Historical Milestones.

---

## 1. Storage & Architecture

- **Canonical JSON Source**: `data/projects.json`
- **Client Helper / Static Fallback**: `assets/js/projects-data.js` (`window.ProjectDatabase`)
- **Compatibility**: 100% static, GitHub Pages native, zero-build required, supports both HTTP `fetch()` and local `file:///` execution without CORS blocks.

---

## 2. Standard Metadata Schema (22 Fields)

Every project item adheres to the following structure:

```json
{
  "id": "proj-unique-id",
  "slug": "unique-url-slug",
  "title": "Project Title",
  "year": "2026",
  "period": "Aug 2023 – Present",
  "location": "Kabupaten Bulungan, Kalimantan Utara",
  "category": ["Category 1", "Category 2"],
  "projectType": "Professional Work",
  "role": "Role Title",
  "organization": "Organization Name or null",
  "shortDescription": "One-line factual summary.",
  "overview": "Detailed factual narrative.",
  "myContribution": [
    "Specific personal responsibility 1",
    "Specific personal responsibility 2"
  ],
  "methodology": [
    "Methodological step 1",
    "Methodological step 2"
  ],
  "tools": ["Tool 1", "Tool 2"],
  "deliverables": ["Deliverable 1", "Deliverable 2"],
  "gallery": [
    {
      "src": "path/to/image.webp",
      "alt": "Accessible description",
      "caption": "Optional display caption"
    }
  ],
  "videos": [],
  "externalLinks": [
    {
      "label": "Link Title",
      "url": "https://..."
    }
  ],
  "featured": true,
  "milestones": [
    {
      "period": "2026",
      "title": "Milestone title",
      "description": "Milestone description"
    }
  ],
  "lastUpdated": "2026-11-02"
}
```

### Data Integrity Rules
- **No Status Fields**: Do NOT include a `status` field, and do NOT generate badges such as `Ongoing`, `Completed`, or `Active`. Factual time information is conveyed strictly through `year` and `period`.
- **Factual Restraint**: Never fabricate statistics, deliverables, or claims not verified by repository assets or approved CV records.
- **Unique Identifiers**: Each project must have a strictly unique `id` and `slug`.
- **Publications Separation**: Peer-reviewed scientific publications remain under the Publications section; they are referenced via `externalLinks` when directly relevant to a project.

---

## 3. Initial Project Inventory (9 Validated Projects)

| ID | Title | Year / Period | Role | Location | Featured |
|---|---|---|---|---|---|
| `proj-znt-bulungan` | Land Value Zoning — Bulungan | 2026 (Aug 2023 – Present) | GIS Operator | Kabupaten Bulungan, Kaltara | Yes |
| `proj-karangkates-pv` | Karangkates Floating Solar Power Plant | 2025 (50 hari deployment) | GIS Surveyor | Karangkates, Indonesia | Yes |
| `proj-measuring-current` | Offshore Hydrodynamic & Current Measurement Survey | 2026 (Feb 2023) | Hydrology Surveyor (Freelance) | Batam, Indonesia | Yes |
| `proj-coral-reef-conservation` | Coral Reef Conservation & Coastal Ecosystem Mapping | 2024 (Feb – Jun 2024) | Project Coordinator | Jakarta, Indonesia | No |
| `proj-marine-coastal-mapping` | Marine & Coastal Thematic Mapping | 2025–2026 | GIS Surveyor | Indonesia | No |
| `proj-community-service-karanganyar` | Community Service Program (Pengabdian Masyarakat) | 2024–2025 | Project Coordinator | Karanganyar, Indonesia | No |
| `proj-geosphere-phenomena-karimunjawa` | Geosphere Phenomena Study — Karimunjawa Coastal Dynamics | 2023 | Project Coordinator | Karimunjawa Island, Indonesia | No |
| `proj-batam-vegetation` | Batam Vegetation Monitoring (NDVI Change Detection) | 2020–2025 | GIS & Remote Sensing Analyst | Batam City, Indonesia | No |
| `proj-wisata-religi-semarang` | Connectivity Analysis of Religious Tourism Sites — Semarang | 2024–2026 | GIS Researcher & WebGIS Developer | Semarang City, Indonesia | Yes |

---

## 4. How to Add a New Project

To add a new project to the centralized system:

1. **Open `data/projects.json`**.
2. **Append a new project object** following the 22-field template above.
3. **Verify the data rules**:
   - Ensure `id` and `slug` are unique.
   - Set `"featured": true` if it should appear on the homepage Selected Work section, or `"featured": false` if it belongs only to the archive.
   - Omit or set empty arrays `[]` / `null` for fields without verified data (never invent data).
   - Set `"lastUpdated"` to the current date (`YYYY-MM-DD`).
4. **Mirror the object in `assets/js/projects-data.js`** inside the `defaultProjects` array if offline `file:///` local browsing fallback is required.
5. **(Optional)** If the project includes a standalone HTML detail page or WebGIS, place it in `projects/<slug>/` or `projects/<slug>.html` and link it in `"externalLinks"`.
