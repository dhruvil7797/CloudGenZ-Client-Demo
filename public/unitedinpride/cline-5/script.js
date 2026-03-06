// Slider functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const navDots = document.querySelectorAll('.nav-dot');
const slideCounter = document.querySelector('.slide-counter .current');
const prevBtn = document.querySelector('.nav-arrow.prev');
const nextBtn = document.querySelector('.nav-arrow.next');

function goToSlide(index) {
    // Remove active class from current slide
    slides[currentSlide].classList.remove('active');
    navDots[currentSlide].classList.remove('active');
    
    // Update current slide
    currentSlide = index;
    
    // Add active class to new slide
    slides[currentSlide].classList.add('active');
    navDots[currentSlide].classList.add('active');
    
    // Update counter
    slideCounter.textContent = String(currentSlide + 1).padStart(2, '0');
}

function nextSlide() {
    const nextIndex = (currentSlide + 1) % slides.length;
    goToSlide(nextIndex);
}

function prevSlide() {
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(prevIndex);
}

// Navigation dots click handlers
navDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        goToSlide(index);
    });
});

// Arrow navigation
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        nextSlide();
    } else if (e.key === 'ArrowLeft') {
        prevSlide();
    }
});

// Swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }
}

// Auto-advance slides (optional, comment out if not desired)
let autoSlideInterval = setInterval(nextSlide, 5000);

// Pause auto-advance on hover
document.querySelector('.slider-container').addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
});

document.querySelector('.slider-container').addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(nextSlide, 5000);
});

// Donation button interactions
const donationBtns = document.querySelectorAll('.donation-btn');
donationBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        donationBtns.forEach(b => b.style.borderColor = 'rgba(255, 255, 255, 0.3)');
        btn.style.borderColor = 'white';
        console.log('Selected donation:', btn.textContent);
    });
});

// CTA button click handlers
const ctaBtns = document.querySelectorAll('.cta-btn');
ctaBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        console.log('CTA clicked:', btn.textContent);
        // In a real implementation, this would navigate or trigger an action
    });
});

// Animate slide content on enter
const slideObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const content = entry.target.querySelector('.content-wrapper');
            if (content) {
                content.style.animation = 'slideIn 0.8s ease forwards';
            }
        }
    });
}, { threshold: 0.5 });

slides.forEach(slide => slideObserver.observe(slide));

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Social links hover effect
const socialLinks = document.querySelectorAll('.social-links a');
socialLinks.forEach(link => {
    link.addEventListener('mouseenter', (e) => {
        e.target.style.transform = 'scale(1.2)';
    });
    link.addEventListener('mouseleave', (e) => {
        e.target.style.transform = 'scale(1)';
    });
});