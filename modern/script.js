document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       Header Scroll & Dark Mode toggle based on section
       ========================================================================== */
    const header = document.getElementById('header');
    const darkSections = document.querySelectorAll('.bg-dark');
    
    window.addEventListener('scroll', () => {
        // Basic scroll effect
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Check if header is over a dark section to invert colors
        let isOverDarkSection = false;
        const headerRect = header.getBoundingClientRect();
        const headerCenter = headerRect.top + headerRect.height / 2;

        darkSections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= headerCenter && rect.bottom >= headerCenter) {
                isOverDarkSection = true;
            }
        });

        if (isOverDarkSection) {
            header.classList.add('dark-mode');
        } else {
            header.classList.remove('dark-mode');
        }
    });

    /* ==========================================================================
       Mobile Menu Toggle
       ========================================================================== */
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
            // Force light mode on mobile menu text if dark mode was active
            header.classList.remove('dark-mode');
        } else {
            document.body.style.overflow = '';
            // Trigger scroll event to recalculate dark mode if needed
            window.dispatchEvent(new Event('scroll'));
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    /* ==========================================================================
       Tab Switch
       ========================================================================== */
    const tabBtns = document.querySelectorAll('.tab-btn');
    const menuLists = document.querySelectorAll('.menu-list');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            menuLists.forEach(m => m.classList.remove('active'));

            btn.classList.add('active');
            const target = btn.getAttribute('data-tab');
            document.getElementById(target).classList.add('active');
        });
    });

    /* ==========================================================================
       Intersection Observer for Animations & Counters
       ========================================================================== */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                
                // Counters
                if (entry.target.classList.contains('about-text')) {
                    const counters = entry.target.querySelectorAll('.count-up');
                    counters.forEach(counter => {
                        const updateCount = () => {
                            const target = +counter.getAttribute('data-target');
                            const count = +counter.innerText;
                            const speed = 100;
                            const inc = target / speed;

                            if (count < target) {
                                counter.innerText = Math.ceil(count + inc);
                                setTimeout(updateCount, 15);
                            } else {
                                counter.innerText = target;
                            }
                        };
                        updateCount();
                    });
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up, .reveal-text').forEach(el => {
        observer.observe(el);
    });

    // Initial trigger for hero text
    setTimeout(() => {
        document.querySelectorAll('.hero .reveal-text').forEach(el => {
            el.classList.add('appear');
        });
    }, 100);

    /* ==========================================================================
       Parallax Scrolling Effect
       ========================================================================== */
    const parallaxElements = document.querySelectorAll('.parallax .hero-bg, .parallax .quote-bg');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        parallaxElements.forEach(el => {
            const speed = 0.4;
            // Only apply transform if element is somewhat in viewport to save performance
            const rect = el.parentElement.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                // Calculate position relative to the element's start
                const yPos = -(rect.top * speed);
                el.style.transform = `translateY(${yPos}px)`;
            }
        });
    });

});
