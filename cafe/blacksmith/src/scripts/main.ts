import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export function initScripts() {
  // 1. Lenis Smooth Scroll
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // 2. Custom Cursor with GSAP
  const cursor = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursorDot');
  
  if (cursor && cursorDot && window.innerWidth > 900) {
    let mouse = { x: 0, y: 0 };
    let pos = { x: 0, y: 0 };
    let dotPos = { x: 0, y: 0 };
    const speed = 0.15;
    
    // カーソル初期化フラグ
    let isCursorActive = false;

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      
      if (!isCursorActive) {
        gsap.set(cursorDot, { x: mouse.x, y: mouse.y });
        gsap.set(cursor, { x: mouse.x, y: mouse.y });
        pos.x = mouse.x;
        pos.y = mouse.y;
        dotPos.x = mouse.x;
        dotPos.y = mouse.y;
        isCursorActive = true;
      }
    });

    const renderCursor = () => {
      if (!isCursorActive) {
        requestAnimationFrame(renderCursor);
        return;
      }
      // ドットは素早く追従
      dotPos.x += (mouse.x - dotPos.x) * 0.8;
      dotPos.y += (mouse.y - dotPos.y) * 0.8;
      gsap.set(cursorDot, { x: dotPos.x, y: dotPos.y });

      // リングは遅れて追従
      pos.x += (mouse.x - pos.x) * speed;
      pos.y += (mouse.y - pos.y) * speed;
      gsap.set(cursor, { x: pos.x, y: pos.y });

      requestAnimationFrame(renderCursor);
    };
    renderCursor();

    // ホバーエフェクト
    const hoverElements = document.querySelectorAll('a, button, .menu-item, .g-item, .insta-item, .staff-card');
    hoverElements.forEach((el) => {
      el.addEventListener('mouseenter', () => cursor.classList.add('big'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('big'));
    });
  }

  // 3. Preloader Animation
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      gsap.to(preloader, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => {
          preloader.style.display = 'none';
          
          // 初期表示アニメーション
          const heroBg = document.getElementById('heroBg');
          const heroTitles = document.querySelectorAll('.hero h1, .hero-sub, .btn-row');
          
          if(heroBg) {
             gsap.fromTo(heroBg, 
                { scale: 1.1, filter: 'blur(10px)' },
                { scale: 1, filter: 'blur(0px)', duration: 2, ease: 'power3.out' }
             );
          }
          
          if(heroTitles.length) {
            gsap.fromTo(heroTitles,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.3 }
            );
          }
        }
      });
    });
  }

  // 4. Scroll Reveal with GSAP ScrollTrigger
  const revealEls = document.querySelectorAll('.reveal');
  revealEls.forEach((el) => {
    gsap.fromTo(el, 
      { opacity: 0, y: 50 },
      {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      }
    );
  });

  // 5. Hero Parallax
  const heroBg = document.getElementById('heroBg');
  if (heroBg) {
    gsap.to(heroBg, {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }

  // 6. Navigation Active State
  const sideLinks = document.querySelectorAll('.side-nav a');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');
  
  sections.forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => updateNav(section.id),
      onEnterBack: () => updateNav(section.id),
    });
  });

  function updateNav(id: string) {
    sideLinks.forEach(link => link.classList.toggle('active', link.getAttribute('data-sec') === id));
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('data-sec') === id));
  }
}