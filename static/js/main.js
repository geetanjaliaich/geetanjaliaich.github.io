const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#site-nav');
const panels = [...document.querySelectorAll('[data-section]')];
const sectionLinks = [...document.querySelectorAll('[data-section-link]')];
const publicationOptions = [...document.querySelectorAll('[data-publication-option]')];
const publicationLists = [...document.querySelectorAll('[data-publication-list]')];

function showSection(sectionName, updateHistory = true) {
  const requested = panels.find((panel) => panel.dataset.section === sectionName);
  const target = requested || panels[0];

  panels.forEach((panel) => {
    const active = panel === target;
    panel.hidden = !active;
    panel.classList.toggle('active', active);
  });

  sectionLinks.forEach((link) => {
    const active = link.dataset.sectionLink === target.dataset.section;
    link.classList.toggle('current', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });

  const sectionTitle = target.dataset.section.charAt(0).toUpperCase() + target.dataset.section.slice(1);
  document.title = `${sectionTitle} · Geetanjali Aich`;
  if (updateHistory && location.hash !== `#${target.dataset.section}`) history.pushState(null, '', `#${target.dataset.section}`);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

sectionLinks.forEach((link) => link.addEventListener('click', (event) => {
  event.preventDefault();
  showSection(link.dataset.sectionLink);
  toggle?.setAttribute('aria-expanded', 'false');
  nav?.classList.remove('open');
}));

toggle?.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  nav?.classList.toggle('open', !open);
});

publicationOptions.forEach((option) => option.addEventListener('click', () => {
  const category = option.dataset.publicationOption;
  const opening = option.getAttribute('aria-expanded') !== 'true';

  publicationOptions.forEach((item) => {
    const active = opening && item === option;
    item.setAttribute('aria-expanded', String(active));
    item.classList.toggle('active', active);
    const icon = item.querySelector('i');
    if (icon) icon.textContent = active ? '−' : '+';
  });

  publicationLists.forEach((list) => {
    list.hidden = !(opening && list.dataset.publicationList === category);
  });
}));

window.addEventListener('popstate', () => showSection(location.hash.slice(1) || 'about', false));
showSection(location.hash.slice(1) || 'about', false);
