// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Donation Toggle (One-time vs Monthly)
const toggleBtns = document.querySelectorAll('.toggle-btn');
toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        toggleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

// Donation Amount Buttons
const amountBtns = document.querySelectorAll('.amount-btn');
const customAmount = document.querySelector('.custom-amount');

amountBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const amount = btn.textContent.replace('$', '');
        customAmount.value = amount;
        
        // Visual feedback
        amountBtns.forEach(b => b.style.background = 'rgba(255, 255, 255, 0.1)');
        btn.style.background = 'rgba(255, 255, 255, 0.2)';
    });
});

// Custom amount input
customAmount.addEventListener('input', () => {
    amountBtns.forEach(b => b.style.background = 'rgba(255, 255, 255, 0.1)');
});

// Smooth scroll for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        // In a real implementation, this would scroll to sections
        console.log('Navigation clicked:', link.textContent);
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for animations
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Duplicate banner content for infinite scroll effect
const bannerContent = document.querySelector('.banner-content');
if (bannerContent) {
    const content = bannerContent.innerHTML;
    bannerContent.innerHTML = content + content;
}