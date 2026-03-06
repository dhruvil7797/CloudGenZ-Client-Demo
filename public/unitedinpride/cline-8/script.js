// Get all cards
const cards = document.querySelectorAll('.deck-card');
const shuffleBtn = document.querySelector('.shuffle-btn');
const resetBtn = document.querySelector('.reset-btn');

// Track flipped state
let flippedCards = new Set();

// Card flip functionality
cards.forEach(card => {
    card.addEventListener('click', (e) => {
        // Don't flip if clicking on a button inside
        if (e.target.tagName === 'BUTTON') return;
        
        card.classList.toggle('flipped');
        
        if (card.classList.contains('flipped')) {
            flippedCards.add(card);
        } else {
            flippedCards.delete(card);
        }
    });
});

// Shuffle functionality
shuffleBtn.addEventListener('click', () => {
    const cardsArray = Array.from(cards);
    
    // Fisher-Yates shuffle algorithm
    for (let i = cardsArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cardsArray[i], cardsArray[j]] = [cardsArray[j], cardsArray[i]];
    }
    
    // Reposition cards with animation
    cardsArray.forEach((card, index) => {
        card.setAttribute('data-index', index);
        card.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    });
    
    console.log('Cards shuffled');
});

// Reset functionality
resetBtn.addEventListener('click', () => {
    // Reset all cards to original order
    cards.forEach((card, index) => {
        card.setAttribute('data-index', index);
        card.classList.remove('flipped');
        card.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    });
    
    flippedCards.clear();
    console.log('Cards reset');
});

// Drag and drop functionality
let draggedCard = null;
let dragStartIndex = null;

cards.forEach(card => {
    card.setAttribute('draggable', 'true');
    
    card.addEventListener('dragstart', (e) => {
        draggedCard = card;
        dragStartIndex = parseInt(card.getAttribute('data-index'));
        card.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
    });
    
    card.addEventListener('dragend', () => {
        card.classList.remove('dragging');
        draggedCard = null;
    });
    
    card.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    });
    
    card.addEventListener('drop', (e) => {
        e.preventDefault();
        
        if (draggedCard && draggedCard !== card) {
            const dropIndex = parseInt(card.getAttribute('data-index'));
            
            // Swap indices
            draggedCard.setAttribute('data-index', dropIndex);
            card.setAttribute('data-index', dragStartIndex);
            
            console.log(`Card moved from index ${dragStartIndex} to ${dropIndex}`);
        }
    });
});

// Button interactions in card backs
document.querySelectorAll('.donate-amount').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        document.querySelectorAll('.donate-amount').forEach(b => {
            b.style.background = 'rgba(255, 255, 255, 0.2)';
        });
        btn.style.background = 'rgba(255, 255, 255, 0.4)';
        console.log('Selected donation:', btn.textContent);
    });
});

document.querySelectorAll('.card-cta').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log('CTA clicked:', btn.textContent);
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'f' || e.key === 'F') {
        // Flip top card
        const topCard = document.querySelector('.deck-card[data-index="0"]');
        if (topCard) {
            topCard.classList.toggle('flipped');
        }
    } else if (e.key === 's' || e.key === 'S') {
        // Shuffle cards
        shuffleBtn.click();
    } else if (e.key === 'r' || e.key === 'R') {
        // Reset cards
        resetBtn.click();
    }
});

// Add 3D tilt effect on mouse move
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        if (card.classList.contains('flipped')) return;
        
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = card.style.transform.replace(/rotateX\([^)]*\)/, '');
        card.style.transform = card.style.transform.replace(/rotateY\([^)]*\)/, '');
        card.style.transform += ` rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = card.style.transform.replace(/rotateX\([^)]*\)/, '');
        card.style.transform = card.style.transform.replace(/rotateY\([^)]*\)/, '');
    });
});

// Animate cards on page load
window.addEventListener('load', () => {
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.animation = 'cardDrop 0.6s ease forwards';
        }, index * 100);
    });
    
    console.log('Card deck loaded');
});

// Add keyframe animation
const style = document.createElement('style');
style.textContent = `
    @keyframes cardDrop {
        from {
            transform: translateY(-100px) rotateZ(0deg);
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    .deck-card {
        opacity: 0;
    }
`;
document.head.appendChild(style);