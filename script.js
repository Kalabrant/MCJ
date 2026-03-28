// script.js - Updated for Web Components Compatibility
document.addEventListener('DOMContentLoaded', () => {
    // Pequeño timeout para dar tiempo a que los Web Components inyecten su innerHTML
    setTimeout(() => {
        const navbar = document.querySelector('.navbar');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');

        // Scroll effect
        if(navbar) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });
        }

        // Mobile Menu
        if(mobileMenuBtn && navLinks) {
            mobileMenuBtn.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                
                const isExpanded = navLinks.classList.contains('active');
                mobileMenuBtn.innerHTML = isExpanded 
                    ? '<i data-lucide="x"></i>' 
                    : '<i data-lucide="menu"></i>';
                if(window.lucide) lucide.createIcons();
                
                mobileMenuBtn.classList.toggle('active');
            });

            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i data-lucide="menu"></i>';
                    if(window.lucide) lucide.createIcons();
                    mobileMenuBtn.classList.remove('active');
                });
            });
        }

        // Animación Hero instantánea
        const heroContent = document.querySelector('.hero-content');
        if(heroContent) {
            heroContent.classList.add('visible');
        }

        // Observer de animaciones scroll
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll(
            '.slide-in-left, .slide-in-right, .slide-in-up'
        );
        
        animatedElements.forEach(el => observer.observe(el));
    }, 150);
});
