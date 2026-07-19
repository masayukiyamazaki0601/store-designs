// ===== Nail Room ひなた - Main =====
// GSAP is loaded via CDN (gsap.min.js + ScrollTrigger.min.js)

document.addEventListener('DOMContentLoaded', () => {

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
          onComplete: () => loader.classList.add('is-hidden'),
        });
      },
    });
  }

  // ===== Header =====
  const header = document.getElementById('js-header');
  window.addEventListener('scroll', () => {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 80);
  });

  // ===== Menu Button =====
  const menuBtn = document.getElementById('js-menu-btn');
  const nav = document.getElementById('js-nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      menuBtn.classList.toggle('is-active');
      nav.classList.toggle('is-open');
    });
    nav.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        menuBtn.classList.remove('is-active');
        nav.classList.remove('is-open');
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
      themeBtn.textContent = next === 'light' ? '☀️' : '🌙';
    });
  }

  // ===== Hero Visual Cards Float =====
  const heroCards = document.querySelectorAll('.hero__visual-card');
  if (heroCards.length) {
    gsap.set(heroCards, { opacity: 0, y: 40, scale: 0.9 });
    gsap.to(heroCards, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      delay: 0.5,
    });
    heroCards.forEach((card, i) => {
      gsap.to(card, {
        y: -8 + i * 4,
        duration: 3 + i * 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });
  }

  // ===== Hero Title Animation =====
  const heroLines = document.querySelectorAll('.hero__title-line span');
  if (heroLines.length) {
    gsap.set(heroLines, { y: 80, opacity: 0, rotateX: 20 });
    gsap.to(heroLines, {
      y: 0,
      opacity: 1,
      rotateX: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: 'power3.out',
      delay: 0.6,
    });
  }

  // ===== Scroll Animations (GSAP ScrollTrigger) =====
  if (typeof ScrollTrigger !== 'undefined') {
    // Section title split
    document.querySelectorAll('.section-title').forEach((el) => {
      const spans = el.querySelectorAll('span');
      gsap.fromTo(spans, { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 82%', toggleActions: 'play none none none' },
      });
    });

    // Reveal elements
    document.querySelectorAll('[data-anim="reveal"]').forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => el.classList.add('is-visible'),
      });
    });

    // Fade elements
    document.querySelectorAll('[data-anim="fade"]').forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        onEnter: () => el.classList.add('is-visible'),
      });
    });

    // Works stagger
    const worksCards = document.querySelectorAll('.works__card');
    if (worksCards.length) {
      gsap.fromTo(worksCards, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'power2.out',
        scrollTrigger: { trigger: '.works__grid', start: 'top 78%', toggleActions: 'play none none none' },
      });
    }

    // Staff stagger
    const staffCards = document.querySelectorAll('[data-anim="staff"]');
    if (staffCards.length) {
      gsap.fromTo(staffCards, { x: -30, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.5, stagger: 0.12, ease: 'power2.out',
        scrollTrigger: { trigger: '.staff__list', start: 'top 80%', toggleActions: 'play none none none' },
      });
    }

    // Refresh on load
    ScrollTrigger.refresh();
  }

  // ===== Works Filter =====
  const filterBtns = document.querySelectorAll('.works__filter-btn');
  const cards = document.querySelectorAll('.works__card');
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const filter = btn.dataset.filter;
      cards.forEach((card) => {
        const match = filter === '*' || card.dataset.category === filter;
        if (match) {
          card.style.display = 'block';
          gsap.fromTo(card, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'power2.out' });
        } else {
          gsap.to(card, { scale: 0.8, opacity: 0, duration: 0.2, onComplete: () => { card.style.display = 'none'; } });
        }
      });
    });
  });

});