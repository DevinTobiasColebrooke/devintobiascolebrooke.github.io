// ================================
// INTERSECTION OBSERVER FOR FADE-IN
// ================================
document.addEventListener("DOMContentLoaded", function() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for timeline items
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(item => {
        observer.observe(item);
    });

    // ================================
    // STICKY NAVIGATION
    // ================================
    const nav = document.getElementById('mainNav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // ================================
    // SCROLL TO TOP BUTTON
    // ================================
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ================================
    // ACTIVE NAV LINK HIGHLIGHTING
    // ================================
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (linkPath === currentPath || 
            (currentPath === '/' && linkPath === '/') ||
            (currentPath.includes('/blog') && linkPath.includes('/blog'))) {
            link.classList.add('active');
        }
    });

    // ================================
    // LAZY LOADING FOR IMAGES
    // ================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ================================
    // KEYBOARD ACCESSIBILITY
    // ================================
    document.addEventListener('keydown', (e) => {
        // Escape key closes modals/overlays if any
        if (e.key === 'Escape') {
            // Add modal close logic here if needed
        }
    });

    // ================================
    // PERFORMANCE: THROTTLE SCROLL EVENTS
    // ================================
    function throttle(func, wait) {
        let waiting = false;
        return function() {
            if (!waiting) {
                func.apply(this, arguments);
                waiting = true;
                setTimeout(() => {
                    waiting = false;
                }, wait);
            }
        };
    }

    // Apply throttling to scroll handlers if needed
    // Example: window.addEventListener('scroll', throttle(yourScrollHandler, 100));
});