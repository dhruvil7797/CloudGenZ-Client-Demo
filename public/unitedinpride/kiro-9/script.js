/* ============================================
   UNITED IN PRIDE — Glassmorphism JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // ---- Mobile Menu ----
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = mobileMenu.querySelectorAll('a');

    hamburger.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('open');
        hamburger.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isOpen);
        mobileMenu.setAttribute('aria-hidden', !isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            mobileMenu.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        });
    });

    // ---- Smooth Scroll for anchor links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offset = 100;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ---- Intersection Observer for fade-in ----
    const fadeEls = document.querySelectorAll('.fade-in');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    fadeEls.forEach(el => fadeObserver.observe(el));

    // ---- Stat Counter Animation ----
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    let statsCounted = false;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsCounted) {
                statsCounted = true;
                animateCounters();
                statsObserver.disconnect();
            }
        });
    }, { threshold: 0.3 });

    const statsSection = document.querySelector('.stats-chips');
    if (statsSection) statsObserver.observe(statsSection);

    function animateCounters() {
        statNumbers.forEach(el => {
            const target = parseInt(el.dataset.target, 10);
            const duration = 2000;
            const startTime = performance.now();

            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.floor(eased * target).toLocaleString();
                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    el.textContent = target.toLocaleString();
                }
            }
            requestAnimationFrame(update);
        });
    }

    // ---- Donation Amount Selection ----
    const amountPills = document.querySelectorAll('.amount-pill');
    const customAmountInput = document.getElementById('customAmount');
    const donateCta = document.getElementById('donateCta');

    amountPills.forEach(pill => {
        pill.addEventListener('click', () => {
            amountPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            if (customAmountInput) customAmountInput.value = '';
        });
    });

    if (customAmountInput) {
        customAmountInput.addEventListener('input', () => {
            if (customAmountInput.value) {
                amountPills.forEach(p => p.classList.remove('active'));
            }
        });
    }

    if (donateCta) {
        donateCta.addEventListener('click', () => {
            let amount;
            const activePill = document.querySelector('.amount-pill.active');
            if (customAmountInput && customAmountInput.value) {
                amount = customAmountInput.value;
            } else if (activePill) {
                amount = activePill.dataset.amount;
            }
            if (amount) {
                donateCta.innerHTML = '<span>Thank you! ❤️</span>';
                donateCta.style.pointerEvents = 'none';
                setTimeout(() => {
                    donateCta.innerHTML = '<span>Donate Now</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';
                    donateCta.style.pointerEvents = '';
                }, 2500);
            }
        });
    }

    // ---- Progress Bar Animation ----
    const progressFill = document.querySelector('.progress-bar-fill');
    if (progressFill) {
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = progressFill.dataset.progress || 65;
                    progressFill.style.width = target + '%';
                    progressObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        progressObserver.observe(progressFill);
    }

    // ---- Testimonial Rotation ----
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    let currentSlide = 0;
    let testimonialInterval;

    function showSlide(index) {
        testimonialCards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => {
            dot.classList.remove('active');
            dot.setAttribute('aria-selected', 'false');
        });
        currentSlide = index;
        if (testimonialCards[currentSlide]) {
            testimonialCards[currentSlide].classList.add('active');
        }
        if (dots[currentSlide]) {
            dots[currentSlide].classList.add('active');
            dots[currentSlide].setAttribute('aria-selected', 'true');
        }
    }

    function nextSlide() {
        showSlide((currentSlide + 1) % testimonialCards.length);
    }

    function startAutoRotation() {
        testimonialInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoRotation() {
        clearInterval(testimonialInterval);
        startAutoRotation();
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const slideIndex = parseInt(dot.dataset.slide, 10);
            showSlide(slideIndex);
            resetAutoRotation();
        });
    });

    if (testimonialCards.length > 0) {
        startAutoRotation();
    }

    // ---- Events Horizontal Scroll ----
    const eventsScroll = document.getElementById('eventsScroll');
    const eventsLeft = document.getElementById('eventsLeft');
    const eventsRight = document.getElementById('eventsRight');

    if (eventsLeft && eventsScroll) {
        eventsLeft.addEventListener('click', () => {
            eventsScroll.scrollBy({ left: -320, behavior: 'smooth' });
        });
    }

    if (eventsRight && eventsScroll) {
        eventsRight.addEventListener('click', () => {
            eventsScroll.scrollBy({ left: 320, behavior: 'smooth' });
        });
    }

    // Drag to scroll for events
    if (eventsScroll) {
        let isDragging = false;
        let startX;
        let scrollLeft;

        eventsScroll.addEventListener('mousedown', (e) => {
            isDragging = true;
            eventsScroll.classList.add('dragging');
            startX = e.pageX - eventsScroll.offsetLeft;
            scrollLeft = eventsScroll.scrollLeft;
        });

        eventsScroll.addEventListener('mouseleave', () => {
            isDragging = false;
            eventsScroll.classList.remove('dragging');
        });

        eventsScroll.addEventListener('mouseup', () => {
            isDragging = false;
            eventsScroll.classList.remove('dragging');
        });

        eventsScroll.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - eventsScroll.offsetLeft;
            const walk = (x - startX) * 1.5;
            eventsScroll.scrollLeft = scrollLeft - walk;
        });
    }

    // ---- Newsletter Form ----
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('.newsletter-input');
            const btn = newsletterForm.querySelector('.newsletter-btn');
            if (input && input.value) {
                const originalText = btn.textContent;
                btn.textContent = 'Subscribed ✓';
                btn.style.background = 'rgba(52, 211, 153, 0.3)';
                btn.style.borderColor = 'rgba(52, 211, 153, 0.5)';
                btn.style.color = '#6ee7b7';
                input.value = '';
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '';
                    btn.style.borderColor = '';
                    btn.style.color = '';
                }, 3000);
            }
        });
    }

    // ---- Navbar background on scroll ----
    const navPill = document.querySelector('.nav-pill');
    const announcementBanner = document.querySelector('.announcement-banner');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY > 60) {
            navPill.style.background = 'rgba(10, 10, 30, 0.85)';
            if (announcementBanner) {
                announcementBanner.style.opacity = Math.max(0, 1 - (scrollY - 60) / 120);
                announcementBanner.style.pointerEvents = scrollY > 180 ? 'none' : '';
            }
        } else {
            navPill.style.background = 'rgba(10, 10, 30, 0.6)';
            if (announcementBanner) {
                announcementBanner.style.opacity = '1';
                announcementBanner.style.pointerEvents = '';
            }
        }
    });

    // ---- Event Register Buttons ----
    document.querySelectorAll('.event-register-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const originalText = btn.textContent;
            btn.textContent = 'Registered ✓';
            btn.style.background = 'rgba(52, 211, 153, 0.2)';
            btn.style.borderColor = 'rgba(52, 211, 153, 0.4)';
            btn.style.color = '#6ee7b7';
            btn.style.pointerEvents = 'none';
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.style.borderColor = '';
                btn.style.color = '';
                btn.style.pointerEvents = '';
            }, 3000);
        });
    });

}); // end DOMContentLoaded
