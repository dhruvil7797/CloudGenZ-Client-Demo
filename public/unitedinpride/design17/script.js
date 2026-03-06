/* ============================================
   UNITED IN PRIDE — SCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // --- NAVBAR SCROLL EFFECT ---
    const navbar = document.getElementById('navbar');

    const handleScroll = () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // --- HAMBURGER MENU TOGGLE ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // --- SMOOTH SCROLLING ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navHeight = navbar.offsetHeight;
                const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;

                window.scrollTo({
                    top: targetPos,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- SCROLL ANIMATIONS (Intersection Observer) ---
    const fadeElements = document.querySelectorAll('.fade-up');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => fadeObserver.observe(el));

    // --- DONATION AMOUNT BUTTON SELECTION ---
    const amountBtns = document.querySelectorAll('.amount-btn');
    const customAmountInput = document.getElementById('customAmount');

    amountBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            amountBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            if (customAmountInput) {
                customAmountInput.value = '';
            }
        });
    });

    if (customAmountInput) {
        customAmountInput.addEventListener('input', () => {
            if (customAmountInput.value) {
                amountBtns.forEach(b => b.classList.remove('active'));
            }
        });
    }

    // --- TESTIMONIAL ROTATION ---
    const testimonials = [
        {
            quote: 'United in Pride gave me a second family. For the first time, I felt truly seen and accepted for who I am. This place changed my life.',
            name: 'Alex',
            role: 'Community Member'
        },
        {
            quote: 'Volunteering here has been the most rewarding experience. Seeing the impact we make together — the smiles, the tears of joy — it reminds me why community matters.',
            name: 'Jordan',
            role: 'Volunteer'
        },
        {
            quote: 'Every time I walk through those doors, I feel at home. The programs, the people, the energy — United in Pride is truly a beacon of hope for all of us.',
            name: 'Sam',
            role: 'Regular Attendee'
        }
    ];

    const quoteEl = document.getElementById('testimonialQuote');
    const avatarBtns = document.querySelectorAll('.avatar-btn');

    avatarBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.dataset.index);
            avatarBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            quoteEl.style.opacity = '0';
            setTimeout(() => {
                quoteEl.textContent = testimonials[index].quote;
                quoteEl.style.opacity = '1';
            }, 300);
        });
    });

    // --- BANNER TEXT DUPLICATION FOR INFINITE SCROLL ---
    const bannerTrack = document.getElementById('bannerTrack');
    if (bannerTrack) {
        const bannerItems = bannerTrack.innerHTML;
        bannerTrack.innerHTML = bannerItems + bannerItems;
    }

});
