// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
    });
});

// ===== DONATION TOGGLE =====
const toggleBtns = document.querySelectorAll('.toggle-btn');
toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        toggleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

// ===== DONATION AMOUNT SELECTION =====
const amountBtns = document.querySelectorAll('.amount-btn');
const donateBtn = document.querySelector('.btn-donate');
const customInput = document.getElementById('customAmount');

function updateDonateButton(amount) {
    const activeToggle = document.querySelector('.toggle-btn.active');
    const prefix = activeToggle && activeToggle.dataset.type === 'monthly' ? 'DONATE $' + amount + '/MO' : 'DONATE $' + amount;
    donateBtn.textContent = prefix;
}

amountBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        amountBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        customInput.value = '';
        updateDonateButton(btn.dataset.amount);
    });
});

customInput.addEventListener('input', () => {
    if (customInput.value) {
        amountBtns.forEach(b => b.classList.remove('active'));
        updateDonateButton(customInput.value);
    }
});

toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const activeAmount = document.querySelector('.amount-btn.active');
        const amount = customInput.value || (activeAmount ? activeAmount.dataset.amount : '50');
        updateDonateButton(amount);
    });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const navHeight = document.querySelector('.nav').offsetHeight;
            const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// ===== BANNER DUPLICATION =====
const bannerTrack = document.querySelector('.banner-track');
if (bannerTrack) {
    const bannerText = bannerTrack.querySelector('.banner-text');
    const clone = bannerText.cloneNode(true);
    bannerTrack.appendChild(clone);
}

// ===== NAV BACKGROUND ON SCROLL =====
window.addEventListener('scroll', () => {
    const nav = document.getElementById('nav');
    if (window.scrollY > 50) {
        nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        nav.style.boxShadow = 'none';
    }
});
