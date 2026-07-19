import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  // Preloader Logic
  const preloader = document.getElementById('preloader');
  const preFill = document.querySelector('.pre-fill') as HTMLElement;
  
  if (preloader && preFill) {
    gsap.to(preFill, {
      width: '100%',
      duration: 1.2,
      ease: 'power2.inOut',
      onComplete: () => {
        gsap.to(preloader, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
          onComplete: () => preloader.style.display = 'none'
        });
        initAnimations();
      }
    });
  } else {
    initAnimations();
  }

  // Smooth Scroll (Lenis)
  const lenis = new Lenis({
    lerp: 0.08,
    smoothWheel: true,
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => { lenis.raf(time * 1000); });
  gsap.ticker.lagSmoothing(0);

  // Custom Cursor
  const cursor = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursorDot');
  if (cursor && cursorDot && window.innerWidth > 900) {
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let cx = mx;
    let cy = my;
    
    window.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
      cursorDot.style.left = `${mx}px`;
      cursorDot.style.top = `${my}px`;
    });

    const loop = () => {
      cx += (mx - cx) * 0.15;
      cy += (my - cy) * 0.15;
      cursor.style.left = `${cx}px`;
      cursor.style.top = `${cy}px`;
      requestAnimationFrame(loop);
    };
    loop();

    document.body.addEventListener('mouseover', (e) => {
      const target = e.target as HTMLElement;
      if (target.closest('a') || target.closest('button') || target.closest('.menu-card') || target.closest('.g-item') || target.closest('.staff-card') || target.closest('.faq-q')) {
        cursor.classList.add('big');
      }
    });
    document.body.addEventListener('mouseout', (e) => {
      const target = e.target as HTMLElement;
      if (target.closest('a') || target.closest('button') || target.closest('.menu-card') || target.closest('.g-item') || target.closest('.staff-card') || target.closest('.faq-q')) {
        cursor.classList.remove('big');
      }
    });
  }

  // Progress Bar
  const progress = document.getElementById('progress');
  if (progress) {
    gsap.to(progress, {
      width: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3
      }
    });
  }

  function initAnimations() {
    // Reveal Animations
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((el) => {
      gsap.fromTo(el, 
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          }
        }
      );
    });

    // Hero Background Parallax
    const heroBg = document.getElementById('heroBg');
    if (heroBg) {
      gsap.to(heroBg, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    // Side Navigation Sync
    const sideNavLinks = document.querySelectorAll('.side-nav a');
    const sections = document.querySelectorAll('section');
    sections.forEach((sec) => {
      ScrollTrigger.create({
        trigger: sec,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => updateSideNav(sec.id),
        onEnterBack: () => updateSideNav(sec.id)
      });
    });

    function updateSideNav(id: string) {
      sideNavLinks.forEach(link => {
        link.classList.remove('active');
        if(link.getAttribute('data-sec') === id) {
          link.classList.add('active');
        }
      });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(this: HTMLAnchorElement, e) {
        if(this.getAttribute('href') === '#') return;
        e.preventDefault();
        const targetId = this.getAttribute('href')?.substring(1);
        if(!targetId) return;
        
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          lenis.scrollTo(targetElement, { offset: -80, duration: 1.2 });
        }
      });
    });
  }
});
