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

document.querySelector('.nav-contact')?.addEventListener('click', () => {
  menu.classList.remove('is-open');
  toggle.setAttribute('aria-expanded', 'false');
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape' || !menu.classList.contains('is-open')) return;
  menu.classList.remove('is-open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.focus();
});

window.addEventListener('scroll', () => {
  header.classList.toggle('is-scrolled', window.scrollY > 12);
}, { passive: true });

/* Animasi ombak mengalir ke atas seperti air saat di-scroll ke bawah */
const heroWave = document.querySelector('.hero-wave');
if (heroWave && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let targetScroll = window.scrollY;
  let currentScroll = window.scrollY;
  let rafId = null;

  const updateWave = () => {
    currentScroll += (targetScroll - currentScroll) * 0.12;
    const ySlow = -currentScroll * 0.46;
    const yFast = -currentScroll * 0.72;
    const xFast = Math.sin(currentScroll * 0.018) * 14;
    const xSlow = Math.cos(currentScroll * 0.012) * -8;
    const scale = 1.06 + Math.min(currentScroll * 0.00022, 0.14);
    const stretch = 1.08 + Math.sin(currentScroll * 0.022) * 0.035;

    heroWave.style.setProperty('--wave-y', `${ySlow.toFixed(2)}px`);
    heroWave.style.setProperty('--wave-y-fast', `${yFast.toFixed(2)}px`);
    heroWave.style.setProperty('--wave-x', `${xFast.toFixed(2)}px`);
    heroWave.style.setProperty('--wave-x-slow', `${xSlow.toFixed(2)}px`);
    heroWave.style.setProperty('--wave-scale', scale.toFixed(4));
    heroWave.style.setProperty('--wave-stretch', stretch.toFixed(4));

    if (Math.abs(targetScroll - currentScroll) > 0.15) {
      rafId = requestAnimationFrame(updateWave);
    } else {
      rafId = null;
    }
  };

  window.addEventListener('scroll', () => {
    targetScroll = Math.max(0, window.scrollY);
    if (!rafId) {
      rafId = requestAnimationFrame(updateWave);
    }
  }, { passive: true });
}

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
  if (window.__portfolioLenis) window.__portfolioLenis.stop();
  modalClose.focus();
}

function closeGallery() {
  modal.classList.remove('is-open');
  document.body.style.overflow = '';
  if (window.__portfolioLenis) window.__portfolioLenis.start();
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

/* Maps Archive Deck (Hover Auto Fan & Stack) & Lightbox */
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
let isDeckFanned = false;

function setDeckFanned(fanned) {
  const next = Boolean(fanned);
  if (isDeckFanned === next && mapsCarousel?.classList.contains('is-fanned') === next) return;
  isDeckFanned = next;
  if (!mapsCarousel) return;
  mapsCarousel.classList.toggle('is-fanned', isDeckFanned);
  mapsCarousel.setAttribute('data-deck-state', isDeckFanned ? 'fanned' : 'stacked');
}

function mapsUpdate() {
  mapsPlates.forEach((plate, i) => {
    plate.style.display = '';
    plate.classList.toggle('is-active', i === mapsIndex);
  });
  mapsThumbs.forEach((thumb, i) => {
    thumb.classList.toggle('maps-carousel__thumb--active', i === mapsIndex);
  });
  if (mapsPrev) mapsPrev.disabled = mapsIndex === 0;
  if (mapsNext) mapsNext.disabled = mapsIndex === mapsPlates.length - 1;
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
  if (window.__portfolioLenis) window.__portfolioLenis.stop();
  mapsLbClose.focus();
}

function mapsCloseLightbox() {
  mapsLightbox.classList.remove('is-open');
  document.body.style.overflow = '';
  if (window.__portfolioLenis) window.__portfolioLenis.start();
}

function mapsSyncLightbox() {
  const plate = mapsPlates[mapsIndex];
  const img = plate.querySelector('img');
  mapsLbImage.src = img.dataset.full || img.src;
  mapsLbImage.alt = img.alt;
  mapsLbImage.loading = 'eager';
  mapsLbNumber.textContent = plate.querySelector('.maps-carousel__plate-number').textContent;
  mapsLbTitle.textContent = plate.querySelector('.maps-carousel__plate-title').textContent;
  mapsLbPrev.disabled = mapsIndex === 0;
  mapsLbNext.disabled = mapsIndex === mapsPlates.length - 1;
}

if (mapsPrev) mapsPrev.addEventListener('click', () => mapsGoTo(mapsIndex - 1));
if (mapsNext) mapsNext.addEventListener('click', () => mapsGoTo(mapsIndex + 1));

const mapsMain = document.querySelector('.maps-carousel__main');
if (mapsMain) {
  mapsMain.addEventListener('mouseenter', () => {
    setDeckFanned(true);
  });
  mapsMain.addEventListener('mouseleave', () => {
    setDeckFanned(false);
  });
}

mapsPlates.forEach((plate) => {
  plate.addEventListener('click', (e) => {
    e.stopPropagation();
    const idx = Number(plate.dataset.index);
    if (!isDeckFanned) {
      mapsIndex = idx;
      mapsUpdate();
      setDeckFanned(true);
    } else {
      mapsOpenLightbox(idx);
    }
  });

  plate.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      const idx = Number(plate.dataset.index);
      if (!isDeckFanned) {
        mapsIndex = idx;
        mapsUpdate();
        setDeckFanned(true);
      } else {
        mapsOpenLightbox(idx);
      }
    }
  });
});

document.addEventListener('click', (e) => {
  if (!isDeckFanned || mapsLightbox.classList.contains('is-open')) return;
  if (mapsCarousel && !mapsCarousel.contains(e.target)) {
    setDeckFanned(false);
  }
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
setDeckFanned(false);


/* Profile Photo 2-Card Deck Swap (Touch / Tap & Keyboard Toggle) */
const portraitDeck = document.querySelector('.portrait-deck');
if (portraitDeck) {
  const setPortraitFlipped = (flipped) => {
    const next = Boolean(flipped);
    portraitDeck.classList.toggle('is-flipped', next);
    portraitDeck.setAttribute('aria-pressed', String(next));
  };

  portraitDeck.addEventListener('click', (e) => {
    e.stopPropagation();
    setPortraitFlipped(!portraitDeck.classList.contains('is-flipped'));
  });

  portraitDeck.addEventListener('mouseleave', () => {
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      setPortraitFlipped(false);
    }
  });

  portraitDeck.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setPortraitFlipped(!portraitDeck.classList.contains('is-flipped'));
    }
  });

  document.addEventListener('click', (e) => {
    if (portraitDeck.classList.contains('is-flipped') && !portraitDeck.contains(e.target)) {
      setPortraitFlipped(false);
    }
  });
}


/* ==========================================================================
   GSAP + SCROLLTRIGGER + LENIS SMOOTH MOTION ENGINE & CARTOGRAPHIC UX
   ========================================================================== */
(function initCartographicMotion() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGSAP = typeof window.gsap !== 'undefined';
  const hasScrollTrigger = typeof window.ScrollTrigger !== 'undefined';
  const hasLenis = typeof window.Lenis !== 'undefined';

  let lenis = null;

  /* 1. Initialize Lenis Smooth Scroll & Synchronize with GSAP Ticker */
  if (!prefersReducedMotion && hasLenis) {
    lenis = new window.Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.35
    });

    window.__portfolioLenis = lenis;

    if (hasGSAP && hasScrollTrigger) {
      window.gsap.registerPlugin(window.ScrollTrigger);
      lenis.on('scroll', window.ScrollTrigger.update);
      window.gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      window.gsap.ticker.lagSmoothing(0);
    } else {
      const rafLoop = (time) => {
        lenis.raf(time);
        requestAnimationFrame(rafLoop);
      };
      requestAnimationFrame(rafLoop);
    }
  } else if (hasGSAP && hasScrollTrigger) {
    window.gsap.registerPlugin(window.ScrollTrigger);
  }

  /* 2. Smooth Anchor Navigation via Lenis */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      if (lenis) {
        event.preventDefault();
        lenis.scrollTo(targetEl, {
          offset: targetId === '#home' ? 0 : -86,
          duration: 1.15
        });
      }
    });
  });

  /* 3. Top Cartographic Progress Bar & Floating Geospatial Telemetry HUD */
  const progressFill = document.querySelector('.geo-scroll-progress__fill');
  const geoHud = document.querySelector('.geo-hud');
  const geoHudSection = document.querySelector('.geo-hud__section');
  const geoHudPercent = document.querySelector('.geo-hud__percent');
  const geoHudCompassSvg = document.querySelector('.geo-hud__compass svg');

  const sectionLabels = [
    { id: 'home', label: '00 / HERO' },
    { id: 'about', label: '01 / ABOUT' },
    { id: 'experience', label: '02 / EXP' },
    { id: 'projects', label: '03 / WORK' },
    { id: 'webgis', label: '04 / WEBGIS' },
    { id: 'maps-archive', label: '05 / MAPS' },
    { id: 'publications', label: '06 / PUBS' },
    { id: 'contact', label: '07 / CONTACT' }
  ];

  const updateScrollTelemetry = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
    const docHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const ratio = Math.min(1, Math.max(0, scrollTop / docHeight));

    if (progressFill) {
      progressFill.style.transform = `scaleX(${ratio.toFixed(4)})`;
    }
    if (geoHudPercent) {
      geoHudPercent.textContent = `${Math.round(ratio * 100)}%`;
    }
    if (geoHudCompassSvg) {
      geoHudCompassSvg.style.transform = `rotate(${(ratio * 360).toFixed(1)}deg)`;
    }
    if (geoHud) {
      geoHud.classList.toggle('is-visible', scrollTop > 220);
    }

    let currentId = sectionLabels[0].id;
    let currentLabel = sectionLabels[0].label;
    const probeY = scrollTop + window.innerHeight * 0.36;
    for (let i = 0; i < sectionLabels.length; i += 1) {
      const el = document.getElementById(sectionLabels[i].id);
      if (el && el.offsetTop <= probeY) {
        currentId = sectionLabels[i].id;
        currentLabel = sectionLabels[i].label;
      }
    }

    if (geoHudSection && geoHudSection.textContent !== currentLabel) {
      geoHudSection.textContent = currentLabel;
    }

    menuLinks.forEach((link) => {
      if (currentId !== 'home' && link.getAttribute('href') === `#${currentId}`) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  if (lenis) {
    lenis.on('scroll', updateScrollTelemetry);
  }
  window.addEventListener('scroll', updateScrollTelemetry, { passive: true });
  window.addEventListener('resize', updateScrollTelemetry, { passive: true });
  updateScrollTelemetry();

  if (geoHud) {
    geoHud.addEventListener('click', () => {
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }
    });
  }

  /* 4. Interactive Hero Work Map — Leaflet + CARTO (OSM) + 7 Factual Work History Pins */
  const heroFrame = document.querySelector('.hero-showcase-frame');
  const heroMapEl = document.getElementById('hero-work-map');
  const heroMapCoords = document.getElementById('hero-map-coords');

  if (heroMapEl && typeof window.L !== 'undefined' && typeof window.L.map === 'function') {
    try {
    const L = window.L;
    const workPins = [
      {
        id: 'bulungan',
        coords: [2.8375, 117.3653],
        location: 'Bulungan, Kalimantan Utara',
        role: 'GIS Operator · Land Value Zoning (ZNT)',
        meta: 'Sep 2026 – Present · PT Wahyudi Andy Laksito Setiarso',
        color: '#60A5FA',
        action: { label: 'Open WebGIS Dashboard ↗', href: 'https://itrianto.github.io/znt-bulungan-2026/', external: true }
      },
      {
        id: 'karangkates',
        coords: [-8.1618, 112.4525],
        location: 'Karangkates, Jawa Timur',
        role: 'GIS Surveyor · Floating Solar PV 100 MWac (PLN)',
        meta: 'Aug 2025 – Aug 2026 · PT Gema Sarana Teknik',
        color: '#FBBF24',
        action: { label: 'View Field Gallery →', gallery: 'karangkates' }
      },
      {
        id: 'batam',
        coords: [1.0456, 104.0305],
        location: 'Batam, Kepulauan Riau',
        role: 'Hydrology Surveyor · Measuring Current & Vegetation Study',
        meta: 'Feb 2025 · CV. Tizen Construction · 2020–2025 NDVI Study',
        color: '#34D399',
        action: { label: 'Batam Vegetation Study ↗', href: 'projects/batam-vegetation.html', external: false }
      },
      {
        id: 'semarang',
        coords: [-6.9667, 110.4167],
        location: 'Semarang, Jawa Tengah',
        role: 'GIS Researcher · Religious Tourism Connectivity WebGIS',
        meta: '2024 – 2026 · Universitas Negeri Semarang',
        color: '#60A5FA',
        action: { label: 'Buka WebGIS Penelitian ↗', href: 'projects/wisatareligi/webgis/webgis-wisata-religi-semarang.html', external: false }
      },
      {
        id: 'karimunjawa',
        coords: [-5.8476, 110.4314],
        location: 'Karimunjawa, Jawa Tengah',
        role: 'Project Coordinator · Geosphere & Coastal Abrasion Study',
        meta: '2023 · Coastal Geomorphology Survey',
        color: '#FB7185'
      },
      {
        id: 'karanganyar',
        coords: [-7.5961, 110.9506],
        location: 'Karanganyar, Jawa Tengah',
        role: 'Project Coordinator · Community Service Program',
        meta: '2024 – 2025 · 15 Community Programs',
        color: '#34D399',
        action: { label: 'ABDIMAS Publication ↗', href: 'https://doi.org/10.15294/q7khw835', external: true }
      },
      {
        id: 'barrang-lompo',
        coords: [-5.0493, 119.3282],
        location: 'Barrang Lompo, Makassar, Sulawesi Selatan',
        role: 'Project Coordinator · Coral Reef Conservation',
        meta: 'Feb 2024 – Jun 2024 · PT Amati Karya Indonesia',
        color: '#FB7185'
      }
    ];

    const heroMap = L.map(heroMapEl, {
      center: [-2.4, 112.4],
      zoom: 5,
      minZoom: 2,
      maxZoom: 16,
      zoomControl: false,
      scrollWheelZoom: false,
      worldCopyJump: true
    });

    const tileAttribution = '&copy; <a href="https://www.esri.com/" target="_blank" rel="noopener noreferrer">Esri</a>, HERE, Garmin, OpenStreetMap contributors';
    const lightTiles = L.layerGroup([
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 16,
        attribution: tileAttribution
      }),
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 16,
        pane: 'overlayPane'
      })
    ]);
    const darkTiles = L.layerGroup([
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 16,
        attribution: tileAttribution
      }),
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 16,
        pane: 'overlayPane'
      })
    ]);

    let activeTileLayer = null;
    const syncMapTheme = () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const targetLayer = isDark ? darkTiles : lightTiles;
      if (activeTileLayer === targetLayer) return;
      if (activeTileLayer) heroMap.removeLayer(activeTileLayer);
      targetLayer.addTo(heroMap);
      activeTileLayer = targetLayer;
    };
    syncMapTheme();

    const themeObserver = new MutationObserver(syncMapTheme);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    const markerMap = new Map();
    const bounds = L.latLngBounds(workPins.map((p) => p.coords));

    const mapPills = [...document.querySelectorAll('.hero-map-pill')];
    const setActivePill = (pinId) => {
      mapPills.forEach((pill) => {
        const active = pill.dataset.pinId === pinId;
        pill.classList.toggle('is-active', active);
        pill.setAttribute('aria-selected', String(active));
      });
    };

    const fitOverview = (animate = true) => {
      heroMap.closePopup();
      heroMap.fitBounds(bounds, {
        padding: [42, 42],
        maxZoom: 5,
        animate: animate && !prefersReducedMotion,
        duration: 0.9
      });
      setActivePill('overview');
    };

    workPins.forEach((pin) => {
      const icon = L.divIcon({
        className: 'geo-pin-icon',
        html: `<div class="geo-pin" style="--pin-color: ${pin.color}"><span class="geo-pin__pulse"></span><span class="geo-pin__dot"></span></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
        popupAnchor: [0, -12]
      });

      let actionHtml = '';
      if (pin.action) {
        if (pin.action.gallery) {
          actionHtml = `<button type="button" class="geo-popup__action" data-open-gallery="${pin.action.gallery}">${pin.action.label}</button>`;
        } else {
          const extAttrs = pin.action.external ? ' target="_blank" rel="noopener noreferrer"' : '';
          actionHtml = `<a class="geo-popup__action" href="${pin.action.href}"${extAttrs}>${pin.action.label}</a>`;
        }
      }

      const popupHtml = `
        <div class="geo-popup" style="--pin-color: ${pin.color}">
          <span class="geo-popup__badge">${pin.location}</span>
          <h4 class="geo-popup__title">${pin.role}</h4>
          <p class="geo-popup__meta">${pin.meta}</p>
          ${actionHtml}
        </div>
      `;

      const marker = L.marker(pin.coords, { icon, title: `${pin.location} — ${pin.role}` })
        .addTo(heroMap)
        .bindPopup(popupHtml, { maxWidth: 260, closeButton: true });

      marker.on('click', () => {
        setActivePill(pin.id);
      });

      markerMap.set(pin.id, { pin, marker });
    });

    fitOverview(false);

    /* Wire Gallery Trigger Inside Leaflet Popup */
    heroMapEl.addEventListener('click', (event) => {
      const galleryBtn = event.target.closest('[data-open-gallery]');
      if (!galleryBtn) return;
      const galleryKey = galleryBtn.getAttribute('data-open-gallery');
      if (galleryKey && typeof openGallery === 'function') {
        openGallery(galleryKey);
      }
    });

    /* Wire Quick-Jump Clay Pills */
    mapPills.forEach((pill) => {
      pill.addEventListener('click', () => {
        const pinId = pill.dataset.pinId;
        if (pinId === 'overview') {
          fitOverview(true);
          return;
        }
        const entry = markerMap.get(pinId);
        if (!entry) return;
        setActivePill(pinId);
        if (prefersReducedMotion) {
          heroMap.setView(entry.pin.coords, 9, { animate: false });
          entry.marker.openPopup();
        } else {
          heroMap.flyTo(entry.pin.coords, 9, { duration: 1.05, easeLinearity: 0.25 });
          heroMap.once('moveend', () => entry.marker.openPopup());
        }
      });
    });

    /* Wire Custom Clay Map Controls (+ / - / Reset) */
    document.querySelectorAll('.hero-map-ctrl').forEach((btn) => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.mapAction;
        if (action === 'zoom-in') heroMap.zoomIn();
        if (action === 'zoom-out') heroMap.zoomOut();
        if (action === 'reset') fitOverview(true);
      });
    });

    /* Live WGS 84 Coordinates in Header Bar on Cursor Move */
    const formatDMS = (val, posHem, negHem) => {
      const hem = val >= 0 ? posHem : negHem;
      const abs = Math.abs(val);
      const deg = Math.floor(abs);
      const min = Math.floor((abs - deg) * 60);
      return `${String(deg).padStart(2, '0')}° ${String(min).padStart(2, '0')}′ ${hem}`;
    };

    if (heroMapCoords) {
      heroMap.on('mousemove', (e) => {
        heroMapCoords.textContent = `${formatDMS(e.latlng.lat, 'N', 'S')} · ${formatDMS(e.latlng.lng, 'E', 'W')}`;
      });
      heroMap.on('mouseout', () => {
        heroMapCoords.textContent = 'WGS 84 · EPSG:4326';
      });
    }

    window.addEventListener('load', () => {
      heroMap.invalidateSize();
    });
    } catch (err) {
      console.warn('[HeroWorkMap] Initialization error:', err);
    }
  }

  /* 5. GSAP + ScrollTrigger Motion Choreography */
  if (hasGSAP && hasScrollTrigger && !prefersReducedMotion) {
    document.documentElement.classList.add('has-gsap');
    const gsap = window.gsap;

    /* Hero Entry Timeline */
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    heroTl
      .from('.hero-kicker', { y: 18, opacity: 0, duration: 0.55 }, 0.08)
      .from('#hero-title', { y: 26, opacity: 0, duration: 0.7 }, 0.16)
      .from('.hero-narrative .hero-lead', { y: 20, opacity: 0, duration: 0.65 }, 0.28)
      .from('.hero-actions .hero-button', { y: 18, opacity: 0, scale: 0.96, duration: 0.55, stagger: 0.1, clearProps: 'transform' }, 0.36)
      .from('.hero-transition-showcase', { y: 36, opacity: 0, scale: 0.97, duration: 0.85, clearProps: 'transform' }, 0.42);

    /* Subtle Hero Showcase Parallax on Scroll */
    if (heroFrame) {
      gsap.to('.hero-transition-showcase', {
        y: -26,
        ease: 'none',
        scrollTrigger: {
          trigger: '#home',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    /* Section Intros Smooth Entrance */
    gsap.utils.toArray('.section-intro').forEach((intro) => {
      gsap.from(intro.children, {
        y: 24,
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power3.out',
        clearProps: 'transform',
        scrollTrigger: {
          trigger: intro,
          start: 'top 86%',
          once: true
        }
      });
    });

    /* 01 / About Me — Expertise Pills & Portrait Deck Choreography */
    const expertisePills = document.querySelectorAll('.about__expertise .expertise-tags li');
    if (expertisePills.length) {
      window.ScrollTrigger.create({
        trigger: '.about__expertise',
        start: 'top 92%',
        once: true,
        onEnter: () => {
          gsap.fromTo(
            expertisePills,
            { y: 16, scale: 0.95 },
            {
              y: 0,
              scale: 1,
              duration: 0.45,
              stagger: 0.055,
              ease: 'power2.out',
              clearProps: 'transform'
            }
          );
        }
      });
    }

    const aboutPortrait = document.querySelector('.about__portrait');
    if (aboutPortrait) {
      gsap.from(aboutPortrait, {
        y: 34,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        clearProps: 'transform',
        scrollTrigger: {
          trigger: aboutPortrait,
          start: 'top 84%',
          once: true
        }
      });
    }

    /* 02 / Experience — Scrubbed Timeline Rail & Staggered Cards */
    const railFill = document.querySelector('.experience-timeline-rail__fill');
    if (railFill) {
      gsap.fromTo(
        railFill,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.experience-list',
            start: 'top 76%',
            end: 'bottom 70%',
            scrub: true
          }
        }
      );
    }

    gsap.utils.toArray('.experience-item').forEach((item) => {
      gsap.from(item, {
        y: 28,
        opacity: 0,
        duration: 0.65,
        ease: 'power3.out',
        clearProps: 'transform',
        scrollTrigger: {
          trigger: item,
          start: 'top 86%',
          once: true
        }
      });
    });

    /* 03 / Selected Work — Editorial Clay Showcase Cards */
    gsap.utils.toArray('.project-card').forEach((card) => {
      gsap.from(card, {
        y: 36,
        opacity: 0,
        duration: 0.75,
        ease: 'power3.out',
        clearProps: 'transform',
        scrollTrigger: {
          trigger: card,
          start: 'top 86%',
          once: true
        }
      });
    });

    /* 04 / Interactive WebGIS Spotlight Card & Metrics */
    const webgisCard = document.querySelector('.webgis-spotlight');
    if (webgisCard) {
      gsap.from(webgisCard, {
        y: 34,
        opacity: 0,
        duration: 0.78,
        ease: 'power3.out',
        clearProps: 'transform',
        scrollTrigger: {
          trigger: webgisCard,
          start: 'top 85%',
          once: true
        }
      });

      const webgisMetrics = document.querySelectorAll('.webgis-metric');
      if (webgisMetrics.length) {
        window.ScrollTrigger.create({
          trigger: '.webgis-metrics',
          start: 'top 94%',
          once: true,
          onEnter: () => {
            gsap.fromTo(
              webgisMetrics,
              { y: 16, scale: 0.94 },
              {
                y: 0,
                scale: 1,
                duration: 0.48,
                stagger: 0.08,
                ease: 'power2.out',
                clearProps: 'transform'
              }
            );
          }
        });
      }
    }

    /* 05 / Maps Archive Deck Reveal */
    const mapsViewer = document.querySelector('.maps-carousel__viewer');
    if (mapsViewer) {
      gsap.from(mapsViewer, {
        y: 32,
        opacity: 0,
        duration: 0.75,
        ease: 'power3.out',
        clearProps: 'transform',
        scrollTrigger: {
          trigger: mapsViewer,
          start: 'top 86%',
          once: true
        }
      });
    }

    /* 06 / Publications 3-Column Bento Reveal */
    const pubCards = document.querySelectorAll('.publication-card');
    if (pubCards.length) {
      gsap.from(pubCards, {
        y: 30,
        opacity: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'transform',
        scrollTrigger: {
          trigger: '.publications-grid',
          start: 'top 85%',
          once: true
        }
      });
    }

    /* 07 / Contact Studio Card & Scenic Footer Parallax */
    const contactCard = document.querySelector('.contact-studio-card');
    if (contactCard) {
      gsap.from(contactCard, {
        y: 32,
        opacity: 0,
        duration: 0.75,
        ease: 'power3.out',
        clearProps: 'transform',
        scrollTrigger: {
          trigger: contactCard,
          start: 'top 86%',
          once: true
        }
      });
    }

    const footerStudioCard = document.querySelector('.footer-studio-card');
    if (footerStudioCard) {
      gsap.from(footerStudioCard, {
        y: 28,
        opacity: 0,
        duration: 0.72,
        ease: 'power3.out',
        clearProps: 'transform',
        scrollTrigger: {
          trigger: footerStudioCard,
          start: 'top 88%',
          once: true
        }
      });
    }

    const eagle = document.querySelector('.wildlife-eagle');
    if (eagle) {
      gsap.fromTo(
        eagle,
        { x: 34, y: 22, rotation: 3 },
        {
          x: -24,
          y: -18,
          rotation: -2.5,
          ease: 'none',
          scrollTrigger: {
            trigger: '.site-footer--fisheye',
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: 1.2
          }
        }
      );
    }

    const landscapeImg = document.querySelector('.footer-planet-img');
    if (landscapeImg) {
      gsap.fromTo(
        landscapeImg,
        { y: 24 },
        {
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '.footer-planet-stage',
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: 1
          }
        }
      );
    }

    window.addEventListener('load', () => {
      window.ScrollTrigger.refresh();
    });
  }

  /* 6. Interactive Project Archive Explorer (Powered by window.ProjectDatabase) */
  const archiveToggle = document.querySelector('.archive-drawer__toggle');
  const archiveToggleLabel = document.querySelector('.archive-drawer__toggle-label');
  const archivePanel = document.getElementById('archive-panel');
  const archiveFilters = document.querySelector('.archive-filters');
  const archiveGrid = document.getElementById('archive-grid');

  if (archiveToggle && archivePanel && archiveFilters && archiveGrid && window.ProjectDatabase) {
    const allProjects = window.ProjectDatabase.getAll();
    const filterGroups = [
      { id: 'all', label: `All (${allProjects.length})`, match: () => true },
      {
        id: 'marine',
        label: 'Marine & Hydrography',
        match: (p) => (p.category || []).some((c) => /hydro|marine|coastal/i.test(c))
      },
      {
        id: 'gis-land',
        label: 'GIS & Land',
        match: (p) => (p.category || []).some((c) => /land|infrastructure|gis/i.test(c))
      },
      {
        id: 'remote-sensing',
        label: 'Remote Sensing',
        match: (p) => (p.category || []).some((c) => /remote sensing|satellite|environment/i.test(c))
      },
      {
        id: 'webgis-community',
        label: 'WebGIS & Research',
        match: (p) => (p.category || []).some((c) => /webgis|research|community/i.test(c))
      }
    ];

    let activeFilter = 'all';

    const escapeHtml = (str) =>
      String(str || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');

    const renderArchiveCards = () => {
      const group = filterGroups.find((g) => g.id === activeFilter) || filterGroups[0];
      const filtered = allProjects.filter(group.match);

      archiveGrid.innerHTML = filtered
        .map((project) => {
          const periodLabel = escapeHtml(project.period || project.year || '');
          const locationLabel = escapeHtml(project.location || '');
          const roleLine = [project.role, project.organization].filter(Boolean).map(escapeHtml).join(' · ');
          const toolsMarkup = (project.tools || [])
            .slice(0, 4)
            .map((tool) => `<span>${escapeHtml(tool)}</span>`)
            .join('');
          const linksMarkup = (project.externalLinks || [])
            .map((link) => {
              const isExternal = /^https?:\/\//i.test(link.url);
              const attrs = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
              return `<a class="archive-card__link" href="${escapeHtml(link.url)}"${attrs}>${escapeHtml(link.label)} <span aria-hidden="true">↗</span></a>`;
            })
            .join('');

          return `
            <article class="archive-card">
              <div class="archive-card__top">
                <span class="archive-card__period">${periodLabel}</span>
                ${locationLabel ? `<span class="archive-card__location">${locationLabel}</span>` : ''}
              </div>
              <h4 class="archive-card__title">${escapeHtml(project.title)}</h4>
              ${roleLine ? `<p class="archive-card__role">${roleLine}</p>` : ''}
              <p class="archive-card__desc">${escapeHtml(project.shortDescription)}</p>
              ${toolsMarkup ? `<div class="archive-card__tools">${toolsMarkup}</div>` : ''}
              ${linksMarkup ? `<div class="archive-card__links">${linksMarkup}</div>` : ''}
            </article>
          `;
        })
        .join('');

      if (hasGSAP && !prefersReducedMotion) {
        window.gsap.from(archiveGrid.querySelectorAll('.archive-card'), {
          y: 18,
          opacity: 0,
          duration: 0.42,
          stagger: 0.05,
          ease: 'power2.out',
          clearProps: 'transform'
        });
      }

      if (hasScrollTrigger) {
        window.ScrollTrigger.refresh();
      }
    };

    const renderFilters = () => {
      archiveFilters.innerHTML = filterGroups
        .map(
          (g) => `
            <button
              class="archive-filter-btn${g.id === activeFilter ? ' is-active' : ''}"
              type="button"
              role="tab"
              aria-selected="${g.id === activeFilter}"
              data-filter="${g.id}"
            >${escapeHtml(g.label)}</button>
          `
        )
        .join('');
    };

    archiveFilters.addEventListener('click', (event) => {
      const btn = event.target.closest('.archive-filter-btn');
      if (!btn) return;
      activeFilter = btn.dataset.filter || 'all';
      renderFilters();
      renderArchiveCards();
    });

    archiveToggle.addEventListener('click', () => {
      const isExpanded = archiveToggle.getAttribute('aria-expanded') === 'true';
      const next = !isExpanded;
      archiveToggle.setAttribute('aria-expanded', String(next));
      archivePanel.hidden = !next;
      if (archiveToggleLabel) {
        archiveToggleLabel.textContent = next ? 'Tutup Arsip' : 'Buka Arsip Lengkap';
      }
      if (next) {
        renderFilters();
        renderArchiveCards();
      } else if (hasScrollTrigger) {
        window.ScrollTrigger.refresh();
      }
    });
  }
})();
