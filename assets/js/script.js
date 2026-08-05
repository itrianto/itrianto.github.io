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
document.querySelector('#current-year').textContent = new Date().getFullYear();
