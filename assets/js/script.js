document.documentElement.classList.add('js');

const themeToggle = document.querySelector('.theme-toggle');
if (themeToggle) {
  const applyTheme = (dark) => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    themeToggle.setAttribute('aria-pressed', String(dark));
    themeToggle.setAttribute('aria-label', dark ? 'Aktifkan mode terang' : 'Aktifkan mode gelap');
  };
  applyTheme(document.documentElement.getAttribute('data-theme') === 'dark');
  themeToggle.addEventListener('click', () => {
    const dark = document.documentElement.getAttribute('data-theme') !== 'dark';
    applyTheme(dark);
    try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (e) {}
  });
}

const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.nav-panel');
const menuLinks = [...document.querySelectorAll('.nav-menu a')];

toggle.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', String(isOpen));
});

menuLinks.forEach((link) => link.addEventListener('click', () => {
  menu.classList.remove('is-open');
  toggle.setAttribute('aria-expanded', 'false');
}));

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape' || !menu.classList.contains('is-open')) return;
  menu.classList.remove('is-open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.focus();
});

window.addEventListener('scroll', () => {
  header.classList.toggle('is-scrolled', window.scrollY > 12);
}, { passive: true });

const sections = menuLinks.map((link) => document.querySelector(link.getAttribute('href')));
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    menuLinks.forEach((link) => link.removeAttribute('aria-current'));
    document.querySelector(`.nav-menu a[href="#${entry.target.id}"]`)?.setAttribute('aria-current', 'page');
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach((section) => section && observer.observe(section));

const aboutElements = document.querySelectorAll('.about-reveal');
const aboutObserver = new IntersectionObserver((entries, currentObserver) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    currentObserver.unobserve(entry.target);
  });
}, { threshold: 0.18 });

aboutElements.forEach((element) => aboutObserver.observe(element));

/* Scroll reveal for new sections */
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries, currentObserver) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    currentObserver.unobserve(entry.target);
  });
}, { threshold: 0.12 });

revealElements.forEach((element) => revealObserver.observe(element));

document.querySelector('#current-year').textContent = new Date().getFullYear();

/* Gallery modal and slider */
const galleryData = {
  'wisata-reelligi': [
    'projects/wisatareligi/gallery/gereja-katolik-st-yusuf.jpg',
    'projects/wisatareligi/gallery/gereja-katedral-santa-maria.jpg',
    'projects/wisatareligi/gallery/gereja-blenduk.jpg',
    'projects/wisatareligi/gallery/firdaus-fatimah-zahra.jpg',
    'projects/wisatareligi/gallery/klenteng-tay-kak-sie.jpg',
    'projects/wisatareligi/gallery/klenteng-kong-tik-soe.jpg',
    'projects/wisatareligi/gallery/klenteng-grajen.jpg',
    'projects/wisatareligi/gallery/makam-habib-thoha-bin-muhammad-bin-yahya.jpg',
    'projects/wisatareligi/gallery/makam-hasan-bin-thoha.jpg',
    'projects/wisatareligi/gallery/makam-kh-soleh-darat.jpg',
    'projects/wisatareligi/gallery/vihara-mahavira-graha.jpg',
    'projects/wisatareligi/gallery/sam-poo-kong.jpg',
    'projects/wisatareligi/gallery/pura-agung-giri-natha.jpg',
    'projects/wisatareligi/gallery/pagoda-avalokitesvara.jpg',
    'projects/wisatareligi/gallery/masjid-raya-baiturrahman.jpg',
    'projects/wisatareligi/gallery/masjid-layur.jpg',
    'projects/wisatareligi/gallery/masjid-kauman.jpg',
    'projects/wisatareligi/gallery/masjid-kapal.jpg',
    'projects/wisatareligi/gallery/masjid-agung-jawa-tengah.jpg',
    'projects/wisatareligi/gallery/makam-syeikh-maulana.jpg',
    'projects/wisatareligi/gallery/makam-sunan-koening.jpg',
    'projects/wisatareligi/gallery/makam-ki-ageng-pandanaran.jpg'
  ],
  'karangkates': [
    'projects/karangkates/gallery/IMG_0689.JPG',
    'projects/karangkates/gallery/IMG_0640.JPG',
    'projects/karangkates/gallery/IMG_0567.JPG',
    'projects/karangkates/gallery/IMG_1417.JPG',
    'projects/karangkates/gallery/IMG_2474.PNG'
  ]
};

const modal = document.getElementById('gallery-modal');
const modalBackdrop = modal.querySelector('.gallery-modal__backdrop');
const modalClose = modal.querySelector('.gallery-modal__close');
const modalSlides = modal.querySelector('.gallery-slides');
const modalPrev = modal.querySelector('.gallery-nav--prev');
const modalNext = modal.querySelector('.gallery-nav--next');
const modalCounter = modal.querySelector('.gallery-counter');
const modalDots = modal.querySelector('.gallery-dots');

let currentGallery = [];
let currentIndex = 0;
let touchStartX = 0;
let touchEndX = 0;
let activeTrigger = null;

function openGallery(name) {
  activeTrigger = document.querySelector(`[data-gallery="${name}"]`);
  currentGallery = galleryData[name] || [];
  if (!currentGallery.length) return;
  currentIndex = 0;
  renderSlides();
  renderDots();
  updateSlider();
  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  modalClose.focus();
}

function closeGallery() {
  modal.classList.remove('is-open');
  document.body.style.overflow = '';
  if (activeTrigger) activeTrigger.focus();
}

function renderSlides() {
  modalSlides.innerHTML = currentGallery.map((src, i) => `
    <div class="gallery-slide" role="tabpanel" aria-hidden="${i !== currentIndex}">
      <img src="${src}" alt="Galeri gambar ${i + 1}" loading="${i === currentIndex ? 'eager' : 'lazy'}" width="1200" height="675">
    </div>
  `).join('');
}

function renderDots() {
  modalDots.innerHTML = currentGallery.map((_, i) => `
    <button class="gallery-dot${i === currentIndex ? ' is-active' : ''}" type="button" role="tab" aria-label="Gambar ${i + 1}" aria-selected="${i === currentIndex}" data-index="${i}"></button>
  `).join('');
}

function updateSlider() {
  modalSlides.style.transform = `translateX(-${currentIndex * 100}%)`;
  modalCounter.textContent = `${currentIndex + 1} / ${currentGallery.length}`;
  modalDots.querySelectorAll('.gallery-dot').forEach((dot, i) => {
    dot.classList.toggle('is-active', i === currentIndex);
    dot.setAttribute('aria-selected', String(i === currentIndex));
  });
  const currentImg = modalSlides.querySelector('.gallery-slide img');
  if (currentImg) currentImg.loading = 'eager';
}

function goTo(index) {
  currentIndex = (index + currentGallery.length) % currentGallery.length;
  updateSlider();
}

document.querySelectorAll('.gallery-trigger').forEach((btn) => {
  btn.addEventListener('click', () => {
    const name = btn.dataset.gallery;
    openGallery(name);
  });
});

modalClose.addEventListener('click', closeGallery);
modalBackdrop.addEventListener('click', closeGallery);

modalPrev.addEventListener('click', () => goTo(currentIndex - 1));
modalNext.addEventListener('click', () => goTo(currentIndex + 1));

modalDots.addEventListener('click', (e) => {
  const dot = e.target.closest('.gallery-dot');
  if (!dot) return;
  goTo(Number(dot.dataset.index));
});

modal.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') { closeGallery(); return; }
  if (event.key === 'ArrowLeft') { event.preventDefault(); goTo(currentIndex - 1); }
  if (event.key === 'ArrowRight') { event.preventDefault(); goTo(currentIndex + 1); }
});

const slider = modal.querySelector('.gallery-slider');
slider.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
slider.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  const diff = touchStartX - touchEndX;
  if (Math.abs(diff) > 50) { goTo(diff > 0 ? currentIndex + 1 : currentIndex - 1); }
}, { passive: true });

/* Lazy load images with IntersectionObserver */
const lazyImages = document.querySelectorAll('img[loading="lazy"]');
const imageObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const img = entry.target;
    if (img.dataset.src) { img.src = img.dataset.src; img.removeAttribute('data-src'); }
    obs.unobserve(img);
  });
}, { rootMargin: '200px' });

lazyImages.forEach((img) => imageObserver.observe(img));

/* Maps Archive Carousel & Lightbox */
const mapsCarousel = document.querySelector('.maps-carousel');
const mapsPlates = [...document.querySelectorAll('.maps-carousel__plate')];
const mapsThumbs = [...document.querySelectorAll('.maps-carousel__thumb')];
const mapsPrev = document.querySelector('.maps-carousel__nav--prev');
const mapsNext = document.querySelector('.maps-carousel__nav--next');

const mapsLightbox = document.getElementById('maps-lightbox');
const mapsLbClose = mapsLightbox.querySelector('.maps-lightbox__close');
const mapsLbPrev = mapsLightbox.querySelector('.maps-lightbox__nav--prev');
const mapsLbNext = mapsLightbox.querySelector('.maps-lightbox__nav--next');
const mapsLbImage = mapsLightbox.querySelector('.maps-lightbox__image');
const mapsLbNumber = mapsLightbox.querySelector('.maps-lightbox__plate-number');
const mapsLbTitle = mapsLightbox.querySelector('.maps-lightbox__plate-title');
const mapsLbBackdrop = mapsLightbox.querySelector('.maps-lightbox__backdrop');

let mapsIndex = 0;

function mapsUpdate() {
  mapsPlates.forEach((plate, i) => {
    const show = i === mapsIndex;
    plate.style.display = show ? '' : 'none';
    if (show) plate.querySelector('img').loading = 'eager';
  });
  mapsThumbs.forEach((thumb, i) => {
    thumb.classList.toggle('maps-carousel__thumb--active', i === mapsIndex);
    thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  });
  mapsPrev.disabled = mapsIndex === 0;
  mapsNext.disabled = mapsIndex === mapsPlates.length - 1;
}

function mapsGoTo(index) {
  if (index < 0 || index >= mapsPlates.length) return;
  mapsIndex = index;
  mapsUpdate();
}

function mapsOpenLightbox(index) {
  mapsIndex = index;
  mapsUpdate();
  mapsSyncLightbox();
  mapsLightbox.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  mapsLbClose.focus();
}

function mapsCloseLightbox() {
  mapsLightbox.classList.remove('is-open');
  document.body.style.overflow = '';
}

function mapsSyncLightbox() {
  const plate = mapsPlates[mapsIndex];
  const img = plate.querySelector('img');
  mapsLbImage.src = img.src;
  mapsLbImage.alt = img.alt;
  mapsLbImage.loading = 'eager';
  mapsLbNumber.textContent = plate.querySelector('.maps-carousel__plate-number').textContent;
  mapsLbTitle.textContent = plate.querySelector('.maps-carousel__plate-title').textContent;
  mapsLbPrev.disabled = mapsIndex === 0;
  mapsLbNext.disabled = mapsIndex === mapsPlates.length - 1;
}

mapsPrev.addEventListener('click', () => mapsGoTo(mapsIndex - 1));
mapsNext.addEventListener('click', () => mapsGoTo(mapsIndex + 1));

mapsPlates.forEach((plate) => {
  plate.addEventListener('click', () => mapsOpenLightbox(Number(plate.dataset.index)));
});

mapsThumbs.forEach((thumb) => {
  thumb.addEventListener('click', () => mapsGoTo(Number(thumb.dataset.index)));
});

mapsLbClose.addEventListener('click', mapsCloseLightbox);
mapsLbBackdrop.addEventListener('click', mapsCloseLightbox);

mapsLbPrev.addEventListener('click', () => {
  mapsGoTo(mapsIndex - 1);
  mapsSyncLightbox();
});
mapsLbNext.addEventListener('click', () => {
  mapsGoTo(mapsIndex + 1);
  mapsSyncLightbox();
});

mapsLightbox.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') { mapsCloseLightbox(); return; }
  if (event.key === 'ArrowLeft') { event.preventDefault(); mapsGoTo(mapsIndex - 1); mapsSyncLightbox(); }
  if (event.key === 'ArrowRight') { event.preventDefault(); mapsGoTo(mapsIndex + 1); mapsSyncLightbox(); }
});

let mapsTouchStartX = 0;
const mapsMain = document.querySelector('.maps-carousel__main');
mapsMain.addEventListener('touchstart', (e) => {
  mapsTouchStartX = e.changedTouches[0].screenX;
}, { passive: true });
mapsMain.addEventListener('touchend', (e) => {
  const diff = mapsTouchStartX - e.changedTouches[0].screenX;
  if (Math.abs(diff) > 50) { mapsGoTo(diff > 0 ? mapsIndex + 1 : mapsIndex - 1); }
}, { passive: true });

const mapsLbContent = mapsLightbox.querySelector('.maps-lightbox__content');
let mapsLbTouchStartX = 0;
mapsLbContent.addEventListener('touchstart', (e) => {
  mapsLbTouchStartX = e.changedTouches[0].screenX;
}, { passive: true });
mapsLbContent.addEventListener('touchend', (e) => {
  const diff = mapsLbTouchStartX - e.changedTouches[0].screenX;
  if (Math.abs(diff) > 50) { mapsGoTo(diff > 0 ? mapsIndex + 1 : mapsIndex - 1); mapsSyncLightbox(); }
}, { passive: true });

mapsUpdate();
