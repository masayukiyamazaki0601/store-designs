/* ============================================
   BRICK & BEANS - Brooklyn Roastery Cafe
   JavaScript Functionality
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // ---------- ELEMENTS ----------
  var header = document.getElementById('header');
  var hamburger = document.getElementById('hamburger');
  var nav = document.getElementById('nav');
  var navLinks = document.querySelectorAll('.header__nav-list a');
  var menuTabs = document.querySelectorAll('.menu__tab');
  var contactForm = document.getElementById('contactForm');

  // ---------- HEADER SCROLL EFFECT ----------
  function handleScroll() {
    if (window.scrollY > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Close mobile menu on scroll
    if (nav.classList.contains('open') && window.innerWidth <= 768) {
      nav.classList.remove('open');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  // ---------- HAMBURGER MENU ----------
  function toggleMenu() {
    hamburger.classList.toggle('active');
    nav.classList.toggle('open');
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggleMenu);

  // Close menu when clicking a nav link
  for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener('click', function() {
      if (nav.classList.contains('open')) {
        nav.classList.remove('open');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (
      nav.classList.contains('open') &&
      !nav.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      nav.classList.remove('open');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Escape key to close menu
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      nav.classList.remove('open');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // ---------- MENU TABS ----------
  for (var t = 0; t < menuTabs.length; t++) {
    menuTabs[t].addEventListener('click', function() {
      // Remove active from all tabs
      for (var i = 0; i < menuTabs.length; i++) {
        menuTabs[i].classList.remove('active');
      }

      // Add active to clicked tab
      this.classList.add('active');

      // Hide all menu items
      var menuItems = document.querySelectorAll('.menu__items');
      for (var i = 0; i < menuItems.length; i++) {
        menuItems[i].classList.remove('active');
      }

      // Show corresponding menu items
      var targetMenu = document.getElementById('menu-' + this.dataset.tab);
      if (targetMenu) {
        targetMenu.classList.add('active');
      }
    });
  }

  // ---------- CONTACT FORM ----------
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      var name = document.getElementById('name');
      var email = document.getElementById('email');
      var message = document.getElementById('message');
      var isValid = true;

      // Simple validation
      if (!name.value.trim()) {
        highlightField(name);
        isValid = false;
      } else {
        unhighlightField(name);
      }

      if (!email.value.trim() || !isValidEmail(email.value)) {
        highlightField(email);
        isValid = false;
      } else {
        unhighlightField(email);
      }

      if (!message.value.trim()) {
        highlightField(message);
        isValid = false;
      } else {
        unhighlightField(message);
      }

      if (isValid) {
        // Simulate sending
        var submitBtn = contactForm.querySelector('.contact__submit');
        var originalText = submitBtn.textContent;
        submitBtn.textContent = 'SENDING...';
        submitBtn.disabled = true;

        setTimeout(function() {
          submitBtn.textContent = '✓ MESSAGE SENT';
          submitBtn.style.background = '#4a7c59';
          contactForm.reset();

          setTimeout(function() {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
          }, 3000);
        }, 1500);
      }
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function highlightField(field) {
    field.style.borderColor = '#c4563a';
    field.style.boxShadow = '0 0 0 1px #c4563a';
  }

  function unhighlightField(field) {
    field.style.borderColor = '';
    field.style.boxShadow = '';
  }

  // ---------- SMOOTH ANCHOR OFFSET (for fixed header) ----------
  var anchors = document.querySelectorAll('a[href^="#"]');
  for (var i = 0; i < anchors.length; i++) {
    anchors[i].addEventListener('click', function(e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#top' || targetId === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        e.preventDefault();
        return;
      }

      var targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        var headerHeight = header.offsetHeight;
        var targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  }

  // ---------- INTERSECTION OBSERVER (section animations) ----------
  var sections = document.querySelectorAll('.section');
  if (sections.length > 0 && 'IntersectionObserver' in window) {
    var observerOptions = {
      root: null,
      rootMargin: '0px 0px -80px 0px',
      threshold: 0.1
    };

    var sectionObserver = new IntersectionObserver(function(entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          entries[i].target.style.opacity = '1';
          entries[i].target.style.transform = 'translateY(0)';
          sectionObserver.unobserve(entries[i].target);
        }
      }
    }, observerOptions);

    for (var i = 0; i < sections.length; i++) {
      sections[i].style.opacity = '0';
      sections[i].style.transform = 'translateY(30px)';
      sections[i].style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
      sectionObserver.observe(sections[i]);
    }
  }

  // ---------- HERO SCROLL ANIMATION RESET (for Chrome bug) ----------
  var hero = document.querySelector('.hero__content');
  if (hero) {
    // Ensure animation plays on load
    hero.style.animation = 'none';
    hero.offsetHeight; // trigger reflow
    hero.style.animation = '';
  }

  // ---------- RESIZE HANDLER (close menu on resize to desktop) ----------
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && nav.classList.contains('open')) {
      nav.classList.remove('open');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});