// Scroll reveal for timeline items
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            timelineObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all timeline items
document.querySelectorAll('.timeline-item').forEach(item => {
    timelineObserver.observe(item);
});

// Smooth scroll for header navigation
document.querySelectorAll('.header-nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Navigate to:', link.getAttribute('href'));
        // In a real implementation, would scroll to section
    });
});

// Action buttons
document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        console.log('Action clicked:', btn.textContent);
    });
});

// Parallax effect for timeline line
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const timelineLine = document.querySelector('.timeline-line');
    
    if (timelineLine) {
        const windowHeight = window.innerHeight;
        const scrollProgress = Math.min(scrolled / (document.body.scrollHeight - windowHeight), 1);
        timelineLine.style.background = `linear-gradient(to bottom, 
            var(--pink) 0%, 
            var(--purple) ${scrollProgress * 100}%, 
            rgba(230, 0, 126, 0.2) ${scrollProgress * 100}%, 
            rgba(230, 0, 126, 0.2) 100%)`;
    }
});

// Animate timeline markers on scroll
const markerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'markerPop 0.5s ease forwards';
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.timeline-marker').forEach(marker => {
    markerObserver.observe(marker);
});

// Add CSS animation for markers
const style = document.createElement('style');
style.textContent = `
    @keyframes markerPop {
        from {
            transform: translateX(-50%) scale(0);
        }
        to {
            transform: translateX(-50%) scale(1);
        }
    }
    
    .timeline-marker {
        transform: translateX(-50%) scale(0);
    }
`;
document.head.appendChild(style);

// Footer links
document.querySelectorAll('.footer-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Social link clicked:', link.textContent);
    });
});

// Scroll progress indicator
const createProgressIndicator = () => {
    const indicator = document.createElement('div');
    indicator.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, var(--pink), var(--purple));
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(indicator);
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const docHeight = document.body.scrollHeight;
        const progress = (scrolled / (docHeight - windowHeight)) * 100;
        indicator.style.width = `${progress}%`;
    });
};

createProgressIndicator();

// Log when page is fully loaded
window.addEventListener('load', () => {
    console.log('Timeline layout loaded successfully');
});