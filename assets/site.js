
const body = document.body;
const header = document.querySelector('.site-header');
const navToggle = document.querySelector('[data-nav-toggle]');
const nav = document.querySelector('[data-nav]');
const revealElements = document.querySelectorAll('[data-reveal]');
const yearEl = document.querySelector('[data-year]');
const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const updateHeader = () => {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 14);
};

const closeNav = () => {
  if (!nav || !navToggle) return;
  nav.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  body.classList.remove('nav-open');
};

const updateActiveLink = () => {
  if (!sections.length || !navLinks.length) return;
  const checkpoint = window.scrollY + 180;
  let currentId = sections[0].id;

  sections.forEach((section) => {
    if (checkpoint >= section.offsetTop) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
  });
};

updateHeader();
updateActiveLink();

window.addEventListener('scroll', updateHeader, { passive: true });
window.addEventListener('scroll', updateActiveLink, { passive: true });

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    body.classList.toggle('nav-open', isOpen);
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeNav);
  });

  document.addEventListener('click', (event) => {
    if (!nav.classList.contains('open')) return;
    if (nav.contains(event.target) || navToggle.contains(event.target)) return;
    closeNav();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 980) {
      closeNav();
    }
  });
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.14
  });

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('revealed'));
}

const form = document.querySelector('[data-quote-form]');

if (form) {
  const status = form.querySelector('.status');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const get = (name) => (data.get(name) || '').toString().trim();

    const subject = `Logistics inquiry - ${get('companyName') || 'New request'}`;
    const lines = [
      'Yuxinou Germany GmbH inquiry',
      '',
      `Company name: ${get('companyName')}`,
      `Contact person: ${get('contactPerson')}`,
      `Email: ${get('email')}`,
      `Phone: ${get('phone')}`,
      `Service needed: ${get('serviceNeeded')}`,
      `Origin: ${get('origin')}`,
      `Destination: ${get('destination')}`,
      `Shipment / cargo type: ${get('cargoType')}`,
      '',
      'Message / operational notes:',
      get('message') || '-'
    ];

    const mailto = `mailto:info@yuxinou.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
    window.location.href = mailto;

    if (status) {
      status.textContent = 'Your email client was opened with the inquiry prefilled.';
      status.classList.add('is-success');
    }
  });
}
