import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import * as THREE from 'three';

// ===== Plugins =====
gsap.registerPlugin(ScrollTrigger);

// ===== Lenis Smooth Scroll =====
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  wheelMultiplier: 0.8,
  smoothTouch: true,
});
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// ===== Loader =====
const loader = document.getElementById('js-loader');
const loaderBar = document.getElementById('js-loader-bar');
if (loader && loaderBar) {
  gsap.to(loaderBar, {
    width: '100%',
    duration: 2,
    ease: 'power3.inOut',
    onComplete: () => {
      gsap.to(loader, {
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: 'power2.out',
        onComplete: () => { loader.style.display = 'none'; },
      });
    },
  });
}

// ===== Header =====
const header = document.getElementById('js-header');
if (header) {
  lenis.on('scroll', (e) => {
    header.classList.toggle('is-scrolled', e.scroll > 80);
  });
}

// ===== Menu Button =====
const menuBtn = document.getElementById('js-menu-btn');
const nav = document.getElementById('js-nav');
if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('is-active');
    nav.classList.toggle('is-open');
    document.body.style.overflow = nav.classList.contains('is-open') ? 'hidden' : '';
  });
  nav.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      menuBtn.classList.remove('is-active');
      nav.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });
}

// ===== Theme Toggle =====
const themeBtn = document.getElementById('js-theme-btn');
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const html = document.documentElement;
    const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    themeBtn.querySelector('span').textContent = next === 'light' ? '☀️' : '🌙';
  });
}

// ===== Hero Decoration (GSAP morphing circle) =====
const decoShape = document.getElementById('js-deco-shape');
if (decoShape) {
  gsap.to(decoShape, {
    scale: 1.2,
    rotation: 45,
    duration: 8,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });
}

// ===== Hero Visual Cards =====
const heroCards = document.querySelectorAll('[data-anim="hero-visual"]');
if (heroCards.length) {
  gsap.set(heroCards, { opacity: 0, y: 40, scale: 0.9 });
  gsap.to(heroCards, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 1,
    stagger: 0.15,
    ease: 'power3.out',
    delay: 2.2,
  });
  // Float animation
  heroCards.forEach((card, i) => {
    gsap.to(card, {
      y: -8 + i * 4,
      duration: 3 + i * 0.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: i * 0.3,
    });
  });
}

// ===== Hero Title =====
const heroLines = document.querySelectorAll('[data-anim="hero-title"] .hero__title-line');
heroLines.forEach((line) => {
  const spans = line.querySelectorAll('span');
  gsap.set(spans, { y: 80, opacity: 0, rotateX: 20 });
  gsap.to(spans, {
    y: 0,
    opacity: 1,
    rotateX: 0,
    duration: 0.9,
    stagger: 0.12,
    ease: 'power3.out',
    delay: 2.4,
  });
});

// ===== Text Split =====
document.querySelectorAll('[data-anim="split"]').forEach((el) => {
  const spans = el.querySelectorAll('span');
  gsap.fromTo(spans, { y: 60, opacity: 0 }, {
    y: 0, opacity: 1, duration: 0.8, stagger: 0.08,
    ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 82%', toggleActions: 'play none none none' },
  });
});

// ===== Reveal =====
document.querySelectorAll('[data-anim="reveal"]').forEach((el) => {
  ScrollTrigger.create({
    trigger: el,
    start: 'top 85%',
    onEnter: () => el.classList.add('is-visible'),
  });
});

// ===== Fade =====
document.querySelectorAll('[data-anim="fade"]').forEach((el) => {
  ScrollTrigger.create({
    trigger: el,
    start: 'top 90%',
    onEnter: () => el.classList.add('is-visible'),
  });
});

// ===== Works Filter =====
const filterBtns = document.querySelectorAll('.works__filter-btn');
const worksCards = document.querySelectorAll('.works__card');
filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterBtns.forEach((b) => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    const filter = btn.dataset.filter;
    worksCards.forEach((card) => {
      const match = filter === '*' || card.dataset.category === filter;
      gsap.to(card, {
        scale: 0.8, opacity: 0, duration: 0.3, ease: 'power2.in',
        onComplete: () => {
          card.style.display = match ? 'block' : 'none';
          if (match) {
            gsap.fromTo(card, { scale: 0.8, opacity: 0 }, {
              scale: 1, opacity: 1, duration: 0.5, ease: 'power3.out',
            });
          }
          ScrollTrigger.refresh();
        },
      });
    });
  });
});

// ===== Works Masonry Stagger =====
function worksStagger() {
  const cards = document.querySelectorAll('.works__card');
  if (cards.length) {
    gsap.fromTo(cards, { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: 'power2.out',
      scrollTrigger: { trigger: '.works__masonry', start: 'top 78%', toggleActions: 'play none none none' },
    });
  }
}

// ===== Staff Slider =====
function staffSlider() {
  const track = document.querySelector('.staff__track');
  const cards = document.querySelectorAll('.staff__card');
  const navBtns = document.querySelectorAll('.staff__nav-btn');
  if (!track || !cards.length) return;
  let current = 0;
  const goTo = (index) => {
    current = index;
    gsap.to(track, {
      x: -index * 100 + '%',
      duration: 0.6,
      ease: 'power3.out',
    });
    navBtns.forEach((b) => b.classList.toggle('is-active', +b.dataset.index === index));
  };
  navBtns.forEach((btn) => {
    btn.addEventListener('click', () => goTo(+btn.dataset.index));
  });
  // Auto play
  setInterval(() => {
    goTo((current + 1) % cards.length);
  }, 5000);
}

// ===== Reviews Marquee =====
function reviewsMarquee() {
  const track = document.querySelector('.reviews__track');
  if (!track) return;
  const clone = track.cloneNode(true);
  track.parentElement.appendChild(clone);
  gsap.to([track, clone], {
    xPercent: -50,
    duration: 30,
    repeat: -1,
    ease: 'none',
  });
}

// ===== Parallax Effects =====
function parallax(el, amount) {
  if (!el) return;
  gsap.to(el, {
    y: amount * 0.15,
    scale: 1.05,
    ease: 'none',
    scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
  });
}

// ===== Footer Waves =====
function footerWaves() {
  const wave = document.querySelector('.footer__waves svg path');
  if (!wave) return;
  gsap.to(wave, {
    attr: { d: 'M0,60 C360,0 720,120 1440,60 L1440,120 L0,120 Z' },
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });
}

// ===== BG Parallax =====
parallax(document.querySelector('.hero__bg'), 15);
parallax(document.querySelector('.pricing__bg'), 10);
parallax(document.querySelector('.reserve__bg'), 12);

// ===== Init on Load =====
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(worksStagger, 600);
  staffSlider();
  reviewsMarquee();
  footerWaves();
  setTimeout(() => ScrollTrigger.refresh(), 1200);
});

window.addEventListener('resize', () => ScrollTrigger.refresh());