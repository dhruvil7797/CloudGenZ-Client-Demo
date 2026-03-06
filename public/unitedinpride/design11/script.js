// Scroll reveal animations for masonry cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            cardObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all masonry cards
const masonryCards = document.querySelectorAll('.masonry-card');
masonryCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    cardObserver.observe(card);
});

// Smooth scroll for navigation links
document.querySelectorAll('.main-nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        // In a real implementation, would scroll to section
        console.log('Navigate to:', targetId);
    });
});

// Header CTA click handler
document.querySelector('.header-cta')?.addEventListener('click', () => {
    console.log('Get Involved clicked');
    // In a real implementation, would open modal or navigate
});

// Card button interactions
document.querySelectorAll('.card-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log('Card button clicked:', btn.textContent);
        // In a real implementation, would navigate or show details
    });
});

// Quick donation button interactions
document.querySelectorAll('.quick-donate').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        // Visual feedback
        document.querySelectorAll('.quick-donate').forEach(b => {
            b.style.background = 'rgba(255, 255, 255, 0.1)';
        });
        btn.style.background = 'rgba(255, 255, 255, 0.25)';
        console.log('Selected donation amount:', btn.textContent);
    });
});

// Masonry card click handlers
masonryCards.forEach(card => {
    card.addEventListener('click', () => {
        const title = card.querySelector('h3')?.textContent;
        console.log('Card clicked:', title);
        // In a real implementation, would show detail view or navigate
    });
});

// Parallax effect on scroll for hero
let lastScrollY = window.pageYOffset;

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const heroOverlay = document.querySelector('.hero-overlay');
    
    if (heroContent && scrollY < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrollY * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrollY / window.innerHeight);
    }
    
    if (heroOverlay && scrollY < window.innerHeight) {
        heroOverlay.style.transform = `translateY(${scrollY * 0.3}px)`;
    }
    
    lastScrollY = scrollY;
});

// Floating header hide/show on scroll
let lastScroll = 0;
const header = document.querySelector('.floating-header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 100) {
        header.style.transform = 'translateX(-50%) translateY(0)';
    } else if (currentScroll > lastScroll && currentScroll > 200) {
        // Scrolling down
        header.style.transform = 'translateX(-50%) translateY(-120%)';
    } else {
        // Scrolling up
        header.style.transform = 'translateX(-50%) translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Add hover effect enhancement to cards
masonryCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const cardBg = card.querySelector('.card-bg');
        if (cardBg) {
            cardBg.style.filter = 'brightness(1.1)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        const cardBg = card.querySelector('.card-bg');
        if (cardBg) {
            cardBg.style.filter = 'brightness(1)';
        }
    });
});

// Scroll indicator click handler
document.querySelector('.scroll-indicator')?.addEventListener('click', () => {
    window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
    });
});

// Footer link interactions
document.querySelectorAll('.footer-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Social link clicked:', link.textContent);
    });
});

// Add CSS transitions dynamically
const style = document.createElement('style');
style.textContent = `
    .floating-header {
        transition: transform 0.3s ease;
    }
    
    .card-bg {
        transition: transform 0.4s ease, filter 0.3s ease;
    }
`;
document.head.appendChild(style);

// Log when page is fully loaded
window.addEventListener('load', () => {
    console.log('Masonry layout loaded successfully');
});