/**
 * UX/UI JS Logic:
 * - Handles tab switching
 * - Form validation (Client-side)
 * - Loading state simulation for form submission
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Tabbed Interface for Specialties
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Deselect all
            tabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            contents.forEach(c => {
                c.classList.remove('active');
                c.hidden = true;
            });

            // Select current
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');
            
            const targetId = tab.getAttribute('aria-controls');
            const targetContent = document.getElementById(targetId);
            
            targetContent.classList.add('active');
            targetContent.hidden = false;
        });
        
        // Keyboard Support for tabs (Accessibility)
        tab.addEventListener('keydown', (e) => {
            let index = Array.from(tabs).indexOf(e.target);
            if (e.key === 'ArrowRight') {
                index = (index + 1) % tabs.length;
                tabs[index].focus();
                tabs[index].click();
            } else if (e.key === 'ArrowLeft') {
                index = (index - 1 + tabs.length) % tabs.length;
                tabs[index].focus();
                tabs[index].click();
            }
        });
    });

    // Form replaced by direct WhatsApp links
    // 5. Scroll Reveal Animation
    const revealSelectors = [
        '.hero-content', '.hero-image-wrapper', 
        '.history-content', '.history-images', 
        '.section-header', '.tabs-container', 
        '.process-step', '.testimonial-card', 
        '.cta-container', '.map-section'
    ];
    
    const elementsToReveal = document.querySelectorAll(revealSelectors.join(', '));
    
    elementsToReveal.forEach((el, index) => {
        el.classList.add('reveal');
        // Add staggering for repeating elements
        if (el.classList.contains('process-step') || el.classList.contains('testimonial-card')) {
            el.style.transitionDelay = `${(index % 4) * 0.15}s`;
        }
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                // Remove active class when out of view to re-trigger on scroll back
                entry.target.classList.remove('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    elementsToReveal.forEach(el => revealObserver.observe(el));
    // 3. Scroll Spy for Nav Links (Checklist #6 - Where am I?)
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(sec => observer.observe(sec));



    // 4. Mobile Menu Toggle (Checklist #6)
    const mobileToggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.nav');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
            mobileToggle.setAttribute('aria-expanded', !isExpanded);
            nav.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.setAttribute('aria-expanded', 'false');
                nav.classList.remove('active');
            });
        });
    }


});
