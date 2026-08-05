const CATEGORY_RULES = [
  { category: 'Masjid', keywords: ['masjid', 'mosque'], color: '#657054' },
  { category: 'Klenteng/Vihara', keywords: ['klenteng', 'temple', 'pagoda'], color: '#896c4a' },
  { category: 'Gereja', keywords: ['gereja', 'greja', 'st.', 'santo', 'santa'], color: '#8d5d58' },
  { category: 'Klenteng/Vihara', keywords: ['vihara'], color: '#896c4a' },
  { category: 'Makam/Ziarah', keywords: ['makam'], color: '#756f5d' },
  { category: 'Lainnya', keywords: [], color: '#6e5a44' }
];

const ATTRIBUTE_ALIASES = {
  'baiturrahman grand mosque semarang masjid raya baiturrahman semarang': 'masjid raya baiturrahman',
  'gereja katolik st yusuf': 'gereja katolik santo yusuf gedangan',
  'great temple giri natha': 'pura agung giri natha',
  'greja blenduk': 'gereja blenduk',
  'grajen temple': 'klenteng grajen',
  'masjid kapal asafinatunajah': 'masjid kapal keselamatan assafinatun najah',
  'st virgin': 'gereja katedral santa perawan maria ratu rosario suci',
  'makam kh sholeh': 'makam kh soleh darat',
  'makam habib thoha bin muhammad bin yahya': 'makam al habib hasan bin thoha bin yahya',
  'makam hasan bin thoha': 'makam al habib hasan bin thoha bin yahya',
  'makam waliyyulloh syeikh maulana': 'makam waliyyulloh syeikh maulana jumadil kubro',
  'vihara mahavira': 'vihara mahavira graha'
};

const HUB_NAMES = ['masjid agung jawa tengah', 'sam poo kong', 'masjid raya baiturrahman'];
const routeCache = new Map();
let places = [];
let markerCluster;
let map;

const normalize = (value = '') => value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const csv = (url) => new Promise((resolve, reject) => Papa.parse(url, { download: true, header: true, skipEmptyLines: true, complete: ({ data }) => resolve(data), error: reject }));

function categoryFor(title) {
  const source = title.toLowerCase();
  return CATEGORY_RULES.find((rule) => rule.keywords.some((word) => source.includes(word))) || CATEGORY_RULES.at(-1);
}

function matchAttribute(title, attributes) {
  const titleKey = normalize(title);
  const alias = ATTRIBUTE_ALIASES[titleKey];
  if (alias) return attributes.find((item) => normalize(item.nama) === alias) || null;
  const exact = attributes.find((item) => normalize(item.nama) === titleKey);
  if (exact) return exact;
  const titleWords = new Set(titleKey.split(' ').filter((word) => word.length > 2));
  return attributes.map((item) => ({ item, score: normalize(item.nama).split(' ').filter((word) => titleWords.has(word)).length }))
    .sort((a, b) => b.score - a.score)[0]?.item || null;
}

function isHub(place) { return HUB_NAMES.includes(normalize(place.attribute?.nama || place.title)); }
function markerIcon(place) { const rule = categoryFor(place.title); const hub = isHub(place); return L.divIcon({ className: '', html: `<div class="place-marker${hub ? ' place-marker--hub' : ''}" style="--marker-color:${hub ? '#7a8061' : rule.color}"></div>`, iconSize: hub ? [23, 23] : [16, 16], iconAnchor: hub ? [11, 11] : [8, 8] }); }
function popup(place) { const attribute = place.attribute; const visit = attribute?.jumlah_kunjungan?.trim(); const elevation = Number.parseFloat(place.elevation); return `<div class="popup-photo">Foto lokasi segera hadir</div><h2 class="popup-title">${place.title}</h2><p class="popup-meta"><b>Kategori:</b> ${categoryFor(place.title).category}</p>${attribute ? `<p class="popup-meta"><b>Kecamatan:</b> ${attribute.kecamatan}</p><p class="popup-meta"><b>Alamat:</b> ${attribute.alamat}</p>` : ''}${visit ? `<p class="popup-meta"><b>Kunjungan:</b> ${Number(visit).toLocaleString('id-ID')} kunjungan (Jan-Apr 2025)</p>` : ''}${Number.isFinite(elevation) ? `<p class="popup-meta"><b>Elevasi:</b> ${elevation.toFixed(1)} m</p>` : ''}`; }

function renderMarkers() { const selectedCategories = [...document.querySelectorAll('[data-category]:checked')].map((input) => input.value); const district = document.querySelector('#district-filter').value; markerCluster.clearLayers(); places.filter((place) => selectedCategories.includes(categoryFor(place.title).category) && (!district || place.attribute?.kecamatan === district)).forEach((place) => markerCluster.addLayer(place.marker)); }
function buildFilters() { const categories = [...new Set(CATEGORY_RULES.map((rule) => rule.category))]; document.querySelector('#category-filters').innerHTML = categories.map((category) => `<label class="filter-option"><input type="checkbox" data-category value="${category}" checked> ${category}</label>`).join(''); document.querySelectorAll('[data-category]').forEach((input) => input.addEventListener('change', renderMarkers)); const districts = [...new Set(places.map((place) => place.attribute?.kecamatan).filter(Boolean))].sort(); document.querySelector('#district-filter').insertAdjacentHTML('beforeend', districts.map((district) => `<option value="${district}">${district}</option>`).join('')); document.querySelector('#district-filter').addEventListener('change', renderMarkers); }

function setSearch() { document.querySelector('#place-search').addEventListener('input', (event) => { const query = normalize(event.target.value); if (query.length < 2) return; const found = places.find((place) => normalize(place.title).includes(query) || normalize(place.attribute?.nama).includes(query)); if (found) { map.flyTo([found.lat, found.lng], 16, { duration: .7 }); found.marker.openPopup(); } }); }
function nearestPlaces(hub) { return places.filter((place) => place !== hub).map((place) => ({ place, distance: Math.hypot(place.lat - hub.lat, place.lng - hub.lng) })).sort((a, b) => a.distance - b.distance).slice(0, 3).map(({ place }) => place); }
async function drawRoadRoute(from, to) { const key = `${from.lng},${from.lat}:${to.lng},${to.lat}`; if (routeCache.has(key)) return routeCache.get(key); try { const url = `https://router.project-osrm.org/route/v1/driving/${from.lng},${from.lat};${to.lng},${to.lat}?overview=full&geometries=geojson`; const response = await fetch(url); if (!response.ok) throw new Error('Routing unavailable'); const data = await response.json(); const coordinates = data.routes?.[0]?.geometry?.coordinates; if (!coordinates) throw new Error('No route'); const layer = L.polyline(coordinates.map(([lng, lat]) => [lat, lng]), { color: '#7a8061', weight: 3, opacity: .65, interactive: false }).addTo(map); routeCache.set(key, layer); return layer; } catch (error) { routeCache.set(key, null); return null; } }
async function loadRoutes() { for (const hub of places.filter(isHub)) { for (const destination of nearestPlaces(hub)) { await drawRoadRoute(hub, destination); } } }

async function init() { map = L.map('map', { zoomControl: false }).setView([-6.99, 110.41], 12); L.control.zoom({ position: 'bottomright' }).addTo(map); const streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; OpenStreetMap contributors' }); const imagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { maxZoom: 19, attribution: 'Tiles &copy; Esri' }); streets.addTo(map); L.control.layers({ 'OpenStreetMap': streets, 'Esri World Imagery': imagery }, null, { position: 'bottomright' }).addTo(map); markerCluster = L.markerClusterGroup(); map.addLayer(markerCluster);
  const [coordinates, attributes] = await Promise.all([csv('../assets/data/wisata-religi-semarang.csv'), csv('../assets/data/wisata-religi-atribut.csv')]); places = coordinates.map((row) => ({ title: row.Title.trim(), lat: Number(row.Latitude), lng: Number(row.Longitude), elevation: row.Elevation, attribute: matchAttribute(row.Title, attributes) })).filter((place) => Number.isFinite(place.lat) && Number.isFinite(place.lng)); places.forEach((place) => { place.marker = L.marker([place.lat, place.lng], { icon: markerIcon(place), title: place.title }).bindPopup(popup(place)); }); buildFilters(); renderMarkers(); setSearch(); loadRoutes(); }

document.querySelector('.panel-toggle').addEventListener('click', (event) => { const content = document.querySelector('.panel-content'); const hidden = content.classList.toggle('is-collapsed'); event.currentTarget.setAttribute('aria-expanded', String(!hidden)); event.currentTarget.querySelector('span').textContent = hidden ? '+' : '−'; });
init().catch(() => { document.querySelector('#map').textContent = 'Data peta tidak dapat dimuat.'; });
