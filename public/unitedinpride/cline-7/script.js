// Scroll reveal animations for sections
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            // Add staggered animation to children
            const children = entry.target.querySelectorAll('.program-card, .event-item, .amount-btn');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.style.opacity = '1';
                    child.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    });
}, observerOptions);

// Observe all diagonal sections
document.querySelectorAll('.diagonal-section').forEach(section => {
    sectionObserver.observe(section);
});

// Initialize child elements for animation
document.querySelectorAll('.program-card, .event-item, .amount-btn').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

// Navigation links smooth scroll
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Navigate to:', link.getAttribute('href'));
        // In a real implementation, would scroll to section
    });
});

// Nav button click handler
document.querySelector('.nav-btn')?.addEventListener('click', () => {
    console.log('Join Us clicked');
});

// CTA buttons
document.querySelectorAll('.cta-large, .cta-outline').forEach(btn => {
    btn.addEventListener('click', () => {
        console.log('CTA clicked:', btn.textContent);
    });
});

// Donation amount selection
document.querySelectorAll('.amount-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.amount-btn').forEach(b => {
            b.classList.remove('featured');
        });
        btn.classList.add('featured');
        console.log('Selected amount:', btn.textContent);
    });
});

// Contact form submission
document.querySelector('.contact-form form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Form submitted');
    // In a real implementation, would send form data
    alert('Thank you for your message! We will get back to you soon.');
    e.target.reset();
});

// Parallax effect for diagonal backgrounds
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    document.querySelectorAll('.diagonal-bg').forEach((bg, index) => {
        const speed = 0.5;
        const yPos = -(scrolled * speed);
        bg.style.transform = `skewY(-3deg) translateY(${yPos * (index + 1) * 0.1}px)`;
    });
});

// Floating badge animation enhancement
const floatingBadge = document.querySelector('.floating-badge');
if (floatingBadge) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        floatingBadge.style.transform = `translateY(${scrolled * 0.3}px) rotate(${scrolled * 0.1}deg)`;
    });
}

// Event items hover effect
document.querySelectorAll('.event-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateX(-10px) scale(1.02)';
    });
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateX(-10px)';
    });
});

// Program cards hover enhancement
document.querySelectorAll('.program-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.15)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.boxShadow = 'none';
    });
});

// Add CSS for revealed sections
const style = document.createElement('style');
style.textContent = `
    .diagonal-section {
        opacity: 0;
        transform: translateY(50px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .diagonal-section.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .event-item:hover {
        transition: all 0.3s ease, transform 0.3s ease;
    }
    
    .program-card {
        transition: all 0.3s ease, box-shadow 0.3s ease;
    }
`;
document.head.appendChild(style);

// Footer link interactions
document.querySelectorAll('.footer-col a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Footer link clicked:', link.textContent);
    });
});

// Log when page is fully loaded
window.addEventListener('load', () => {
    console.log('Diagonal sections layout loaded successfully');
});