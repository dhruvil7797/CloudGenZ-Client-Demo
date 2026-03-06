// Smooth scrolling for navigation
document.querySelectorAll('.nav-dot').forEach(dot => {
    dot.addEventListener('click', function(e) {
        e.preventDefault();
        const target = this.getAttribute('href');
        document.querySelector(target).scrollIntoView({
            behavior: 'smooth'
        });
        
        // Update active state
        document.querySelectorAll('.nav-dot').forEach(d => d.classList.remove('active'));
        this.classList.add('active');
    });
});

// Donation amount selection
document.querySelectorAll('.amount-option').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.amount-option').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});

// Intersection Observer for scroll animations
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

// Observe sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});