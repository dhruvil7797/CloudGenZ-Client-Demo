// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isOpen);
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    });
});

// ===== DONATION TOGGLES =====
const toggleBtns = document.querySelectorAll('.toggle-btn');
toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        toggleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

// ===== AMOUNT SELECTION =====
const amountBtns = document.querySelectorAll('.amount-btn');
const customInput = document.getElementById('customAmount');

amountBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        amountBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        if (customInput) customInput.value = '';
    });
});

if (customInput) {
    customInput.addEventListener('input', () => {
        if (customInput.value) {
            amountBtns.forEach(b => b.classList.remove('active'));
        }
    });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offset = document.querySelector('.navbar').offsetHeight + 10;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ===== SCROLL ANIMATIONS =====
const animateElements = document.querySelectorAll('[data-animate]');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

animateElements.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ===== BANNER DUPLICATION =====
const bannerTrack = document.getElementById('bannerTrack');
if (bannerTrack) {
    const content = bannerTrack.innerHTML;
    bannerTrack.innerHTML = content + content;
}

// ===== NAVBAR SHADOW ON SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        navbar.style.boxShadow = '0 2px 12px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
}, { passive: true });

// ===== DONATE BUTTON FEEDBACK =====
const donateSubmit = document.querySelector('.donate-submit-btn');
if (donateSubmit) {
    donateSubmit.addEventListener('click', () => {
        const activeAmount = document.querySelector('.amount-btn.active');
        const custom = customInput ? customInput.value : '';
        const amount = custom || (activeAmount ? activeAmount.dataset.amount : '50');
        const type = document.querySelector('.toggle-btn.active')?.dataset.type || 'one-time';

        donateSubmit.textContent = `Thank you! $${amount} ${type} ♥`;
        donateSubmit.style.background = '#4ECDC4';

        setTimeout(() => {
            donateSubmit.textContent = 'Donate Now ♥';
            donateSubmit.style.background = '';
        }, 2500);
    });
}