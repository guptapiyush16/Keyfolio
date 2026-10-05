// Mobile navigation drawer toggle
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');

menuToggle?.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!open));
  mobileMenu.hidden = open;
});

document.querySelectorAll('.mobile-menu a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.hidden = true;
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

// Scroll spy for primary navigation
const navLinks = [...document.querySelectorAll('.nav a')];
const sections = [...document.querySelectorAll('main section[id]')];
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) =>
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`)
      );
    });
  },
  { rootMargin: '-30% 0px -55% 0px' }
);
sections.forEach((section) => observer.observe(section));

// Scroll reveal animations
const reveal = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        reveal.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document
  .querySelectorAll('.timeline-card, .project-card, .education-card, .keyboard-board')
  .forEach((element) => {
    element.classList.add('reveal');
    reveal.observe(element);
  });

// Tactile keyboard easter egg: typing highlights corresponding keycap
const keyMap = new Map();
document.querySelectorAll('.keyboard-row span').forEach((keyEl) => {
  const char = keyEl.textContent.trim().toUpperCase();
  keyMap.set(char, keyEl);
});

window.addEventListener('keydown', (e) => {
  let key = e.key.toUpperCase();
  if (key === 'ESCAPE') key = 'ESC';
  if (key === 'ENTER') key = '↵';

  const el = keyMap.get(key);
  if (el) {
    el.style.transform = 'translate(2px, 2px)';
    el.style.boxShadow = '0.5px 0.5px 0 var(--ink)';
    el.style.background = '#ffffff';
    setTimeout(() => {
      el.style.transform = '';
      el.style.boxShadow = '';
      el.style.background = '';
    }, 180);
  }
});
