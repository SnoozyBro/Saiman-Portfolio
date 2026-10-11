'use strict';
const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const menu = $('.nav-links');
const toggle = $('.menu-toggle');
function closeMenu(returnFocus = false) {
  menu.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open navigation');
  toggle.innerHTML = 'Menu <span>＋</span>';
  if (returnFocus) toggle.focus();
}
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  menu.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  toggle.innerHTML = open ? 'Close <span>−</span>' : 'Menu <span>＋</span>';
});
$$('a', menu).forEach(a => a.addEventListener('click', () => closeMenu()));
document.addEventListener('click', e => { if (!e.target.closest('.navbar')) closeMenu(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu.classList.contains('open')) closeMenu(true); });
$('.navbar').addEventListener('focusout', () => {setTimeout(() => {if (!$('.navbar').contains(document.activeElement)) closeMenu();}, 0);});
matchMedia('(min-width: 601px)').addEventListener('change', () => closeMenu());

// Content stays visible if JavaScript or IntersectionObserver is unavailable.
let revealObserver;
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  document.body.classList.add('motion-ready');
  revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
  }), {threshold: 0.08});
  $$('.reveal').forEach(el => revealObserver.observe(el));
}
const cards = $$('.project-card');
function filterProjects(category, announce = true) {
  let count = 0;
  cards.forEach(card => {
    card.hidden = category !== 'all' && card.dataset.category !== category;
    if (!card.hidden) { count++; if (announce) card.classList.add('visible'); }
  });
  $$('.filter').forEach(button => {
    const selected = button.dataset.filter === category;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  if (announce) $('#filter-status').textContent = `${count} projects displayed.`;
}
$$('.filter').forEach(button => button.addEventListener('click', () => filterProjects(button.dataset.filter)));
filterProjects('web', false);

const dialog = $('#project-dialog');
let lastProjectButton;
function addText(tag, value, parent, className) {
  const el = document.createElement(tag); el.textContent = value;
  if (className) el.className = className;
  parent.append(el); return el;
}
$$('[data-project]').forEach(button => button.addEventListener('click', () => {
  const project = window.portfolioProjects.find(item => item.id === button.dataset.project);
  if (!project) return;
  lastProjectButton = button;
  const content = $('#dialog-content'); content.replaceChildren();
  addText('p', project.kind, content, 'eyebrow');
  addText('h2', project.title, content).id = 'dialog-title';
  if (project.logo) {
    const logo = document.createElement('img'); logo.src = project.logo; logo.alt = project.title + ' logo'; logo.className = 'dialog-brand'; content.append(logo);
  }
  if (project.image) {
    const image = document.createElement('img'); image.src = 'assets/images/optimized/' + project.image;
    image.alt = project.title; image.className = 'dialog-image'; content.append(image);
  }
  addText('h3', project.category === 'web' ? 'About the company' : 'The context', content);
  addText('p', project.company, content);
  addText('h3', 'The project', content); addText('p', project.description, content);
  addText('h3', 'Project focus', content); addText('p', project.focus, content);
  if (project.url) {
    const link = addText('a', 'Visit live website ↗', content, 'button primary');
    link.href = project.url; link.target = '_blank'; link.rel = 'noopener noreferrer';
  }
  dialog.showModal(); document.body.style.overflow = 'hidden';
}));
$('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', e => {
  const rect = dialog.getBoundingClientRect();
  if (e.target === dialog && (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom)) dialog.close();
});
dialog.addEventListener('close', () => { document.body.style.overflow = ''; lastProjectButton?.focus(); });

let scrollQueued = false;
let lastScrollY = window.scrollY;
let scrollDirection = 0;
let scrollDistance = 0;
function updateScroll() {
  const currentY = Math.max(0, window.scrollY);
  const difference = currentY - lastScrollY;
  const direction = Math.sign(difference);
  if (direction !== scrollDirection) { scrollDistance = 0; scrollDirection = direction; }
  scrollDistance += Math.abs(difference);
  const header = $('.site-header');
  if (currentY < 100 || menu.classList.contains('open') || header.querySelector(':focus-visible')) { header.classList.remove('nav-hidden'); }
  else if (scrollDistance > 12) { header.classList.toggle('nav-hidden', direction > 0); }
  lastScrollY = currentY;
  const max = document.documentElement.scrollHeight - innerHeight;
  $('.scroll-progress').style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  const sections = ['portfolio', 'about', 'experience', 'services', 'contact'];
  let active = '';
  sections.forEach(id => {if ($('#'+id).getBoundingClientRect().top < innerHeight * .4) active = id;});
  $$('.nav-links a').forEach(link => {
    if (link.hash === '#'+active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  scrollQueued = false;
}
addEventListener('scroll', () => {if (!scrollQueued) {scrollQueued = true; requestAnimationFrame(updateScroll);}}, {passive:true});
updateScroll();
const motionButton = $('#motion-toggle');
let paused = reducedMotion.matches;
function setMotion() {
  document.documentElement.classList.toggle('motion-paused', paused);
  motionButton.setAttribute('aria-pressed', String(paused));
  motionButton.textContent = paused ? 'Resume motion ▷' : 'Pause motion Ⅱ';
  if (reducedMotion.matches) motionButton.textContent = 'Reduced motion enabled';
  motionButton.disabled = reducedMotion.matches;
}
motionButton.addEventListener('click', () => {paused = !paused; setMotion();});
reducedMotion.addEventListener('change', () => {paused = reducedMotion.matches; setMotion();});
setMotion();
// Redirect to Gmail compose. Delivery happens only when the visitor presses Send in Gmail.
const email = 'Saimansuwal65@gmail.com';
$('#contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const form = e.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const body = `Hello Saiman,\n\n${String(data.get('message')).trim()}\n\nProject: ${data.get('service')}\nFrom: ${String(data.get('name')).trim()}\nReply to: ${data.get('email')}`;
  const params = new URLSearchParams({view: 'cm', fs: '1', to: email, su: 'Project enquiry: ' + data.get('service'), body});
  const url = 'https://mail.google.com/mail/?' + params.toString();
  $('#form-status').textContent = 'Opening your message in Gmail. Review it and press Send there.';
  window.location.assign(url);
});
$$('[data-service]').forEach(link => link.addEventListener('click', () => { $('#contactForm select').value = link.dataset.service; }));
$('#copy-email').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(email);
    $('#copy-email').textContent = 'Email copied ✓';
    $('#copy-status').textContent = 'Email address copied to clipboard.';
    setTimeout(() => $('#copy-email').textContent = 'Copy email ＋', 2500);
  } catch {
    $('#copy-status').classList.remove('sr-only');
    $('#copy-status').textContent = `Copy this email address: ${email}`;
  }
});
$('#year').textContent = new Date().getFullYear();

// Two equal logo groups create a seamless loop; the copy is decorative only.
const marquee = $('.logo-marquee');
const track = $('.logo-track');
const copy = $('.logo-group').cloneNode(true);
copy.setAttribute('aria-hidden', 'true');
$$('a', copy).forEach(link => {link.tabIndex = -1;});
track.append(copy);
track.classList.add('is-looping');
const logoMotion = $('#logo-motion');
let logosPaused = false;
function syncLogoMotion() {
  const disabled = paused || reducedMotion.matches;
  marquee.classList.toggle('logos-paused', logosPaused || disabled);
  logoMotion.disabled = disabled;
  logoMotion.setAttribute('aria-pressed', String(logosPaused || disabled));
  logoMotion.textContent = disabled ? 'Motion paused' : logosPaused ? 'Resume logos ▷' : 'Pause logos Ⅱ';
}
logoMotion.addEventListener('click', () => {logosPaused = !logosPaused; syncLogoMotion();});
motionButton.addEventListener('click', syncLogoMotion);
reducedMotion.addEventListener('change', syncLogoMotion);
syncLogoMotion();

// Photo-led introduction: scroll-driven movement without scroll interception.
const intro = $('.portrait-hero');
const portrait = $('.portrait-composition');
const storyWords = $$('.scroll-story span');
const heroLensCopy = {
  build: { description: 'From a business website to a mobile application, I turn a clear idea into something people can use.', tag: 'Interfaces with intention', filter: 'web' },
  design: { description: 'From a distinctive brand mark to an illustrated character, I give an idea a visual identity of its own.', tag: 'Visuals with personality', filter: 'art' }
};
let selectedLens = 'build';
$$('button[data-lens]').forEach(button => button.addEventListener('click', () => {
  selectedLens = button.dataset.lens;
  portrait.dataset.lens = selectedLens;
  $$('button[data-lens]').forEach(control => control.setAttribute('aria-pressed', String(control === button)));
  $('#lens-description').textContent = heroLensCopy[selectedLens].description;
  $('#focus-tag-text').textContent = heroLensCopy[selectedLens].tag;
}));
$('#hero-work-link').addEventListener('click', () => filterProjects(heroLensCopy[selectedLens].filter));
let introFrame = false;
function updateIntro() {
  const rect = intro.getBoundingClientRect();
  const available = Math.max(1, intro.offsetHeight - innerHeight * .55);
  const progress = Math.min(1, Math.max(0, -rect.top / available));
  const canMove = !paused && !reducedMotion.matches && innerWidth > 800 && innerHeight > 720;
  intro.style.setProperty('--photo-rise', canMove ? `${-progress * 34}px` : '0px');
  intro.style.setProperty('--photo-turn', canMove ? `${-3 + progress * 5}deg` : '0deg');
  intro.style.setProperty('--photo-scale', canMove ? `${1.035 + progress * .04}` : '1');
  intro.style.setProperty('--copy-rise', canMove ? `${-progress * 14}px` : '0px');
  storyWords.forEach((word, i) => word.classList.toggle('is-current', i === Math.min(2, Math.floor(progress * 3))));
  introFrame = false;
}
function requestIntroFrame() { if (!introFrame) { introFrame = true; requestAnimationFrame(updateIntro); } }
addEventListener('scroll', requestIntroFrame, {passive: true});
addEventListener('resize', requestIntroFrame, {passive: true});
motionButton.addEventListener('click', requestIntroFrame);
reducedMotion.addEventListener('change', requestIntroFrame);
portrait.addEventListener('pointermove', e => {
  if (paused || reducedMotion.matches || !matchMedia('(min-width: 801px) and (pointer: fine)').matches) return;
  const rect = portrait.getBoundingClientRect();
  portrait.style.setProperty('--pointer-x', `${((e.clientX - rect.left) / rect.width - .5) * 8}px`);
  portrait.style.setProperty('--pointer-y', `${((e.clientY - rect.top) / rect.height - .5) * 8}px`);
});
portrait.addEventListener('pointerleave', () => { portrait.style.setProperty('--pointer-x', '0px'); portrait.style.setProperty('--pointer-y', '0px'); });
updateIntro();
