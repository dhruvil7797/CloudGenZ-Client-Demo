// Donation amount selection
document.querySelectorAll('.amt-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.amt-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});

// Smooth horizontal scroll on wheel
let isScrolling = false;
document.addEventListener('wheel', (e) => {
    if (!isScrolling) {
        isScrolling = true;
        setTimeout(() => isScrolling = false, 50);
    }
});