document.getElementById('year').textContent = new Date().getFullYear();

requestAnimationFrame(() => document.body.classList.add('page-ready'));

const siteHeader = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu');
const mobileNavigation = document.getElementById('mobile-navigation');

function setMobileMenu(open, returnFocus = false) {
  siteHeader.classList.toggle('menu-open', open);
  document.body.classList.toggle('menu-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  if (open) {
    mobileNavigation.querySelector('a')?.focus({ preventScroll: true });
  } else if (returnFocus) {
    menuButton.focus({ preventScroll: true });
  }
}

menuButton.addEventListener('click', () => {
  setMobileMenu(menuButton.getAttribute('aria-expanded') !== 'true');
});

mobileNavigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMobileMenu(false));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    setMobileMenu(false, true);
  }
});

const desktopBreakpoint = window.matchMedia('(min-width: 851px)');
desktopBreakpoint.addEventListener('change', (event) => {
  if (event.matches) setMobileMenu(false);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.intro, .service-list article, .project, .process li').forEach((el) => {
  el.classList.add('reveal');
  observer.observe(el);
});
