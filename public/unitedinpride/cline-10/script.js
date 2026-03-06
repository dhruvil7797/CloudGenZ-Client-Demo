// Dashboard Tab Switching
const tabButtons = document.querySelectorAll('.tab-btn');
const dashboardGrid = document.querySelector('.dashboard-grid');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all tabs
        tabButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked tab
        button.classList.add('active');
        
        // Get the view type
        const view = button.dataset.view;
        
        // Add a subtle animation effect
        dashboardGrid.style.opacity = '0.7';
        setTimeout(() => {
            dashboardGrid.style.opacity = '1';
        }, 150);
        
        // In a real application, this would filter/show different widgets
        console.log(`Switched to ${view} view`);
    });
});

// Animate Progress Bars
function animateProgressBars() {
    const barFills = document.querySelectorAll('.bar-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const percent = bar.dataset.percent;
                
                // Trigger animation
                setTimeout(() => {
                    bar.style.width = `${percent}%`;
                }, 200);
                
                observer.unobserve(bar);
            }
        });
    }, {
        threshold: 0.5
    });
    
    barFills.forEach(bar => observer.observe(bar));
}

// Animate Widget Entrance
function animateWidgets() {
    const widgets = document.querySelectorAll('.widget');
    
    widgets.forEach((widget, index) => {
        widget.style.animationDelay = `${index * 0.1}s`;
    });
}

// Action Button Interactions
const actionCards = document.querySelectorAll('.action-card');

actionCards.forEach(card => {
    card.addEventListener('click', () => {
        const label = card.querySelector('.action-label').textContent;
        
        // Add click animation
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
        
        // Show notification (in real app, would trigger actual action)
        showNotification(`Action: ${label}`);
    });
});

// Notification System
function showNotification(message) {
    // Remove existing notification if any
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: linear-gradient(135deg, #E6007E, #7B68EE);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        font-weight: 600;
        z-index: 1000;
        animation: slideInUp 0.3s ease;
    `;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInUp {
            from {
                transform: translateY(100px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        @keyframes slideOutDown {
            from {
                transform: translateY(0);
                opacity: 1;
            }
            to {
                transform: translateY(100px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutDown 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// View All Button
const viewAllBtn = document.querySelector('.view-all-btn');
if (viewAllBtn) {
    viewAllBtn.addEventListener('click', () => {
        showNotification('Opening full events calendar...');
    });
}

// Program Card Interactions
const programCards = document.querySelectorAll('.program-card');

programCards.forEach(card => {
    card.addEventListener('click', () => {
        const programName = card.querySelector('h4').textContent;
        showNotification(`Opening ${programName} program details...`);
    });
});

// Resource Link Interactions
const resourceLinks = document.querySelectorAll('.resource-link');

resourceLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const resourceName = link.querySelector('.resource-name').textContent;
        showNotification(`Opening ${resourceName}...`);
    });
});

// Event Item Hover Effects
const eventItems = document.querySelectorAll('.event-item');

eventItems.forEach(item => {
    item.addEventListener('click', () => {
        const eventName = item.querySelector('h4').textContent;
        showNotification(`Event details: ${eventName}`);
    });
});

// Pulse Animation for Live Indicator
const pulseIndicator = document.querySelector('.pulse-indicator');
if (pulseIndicator) {
    setInterval(() => {
        pulseIndicator.style.transform = 'scale(1.1)';
        setTimeout(() => {
            pulseIndicator.style.transform = 'scale(1)';
        }, 200);
    }, 2000);
}

// Real-time Clock Update (optional enhancement)
function updateWelcomeMessage() {
    const welcomeWidget = document.querySelector('.welcome-widget h1');
    if (welcomeWidget) {
        const hour = new Date().getHours();
        let greeting = 'Welcome Back';
        
        if (hour < 12) {
            greeting = 'Good Morning';
        } else if (hour < 18) {
            greeting = 'Good Afternoon';
        } else {
            greeting = 'Good Evening';
        }
        
        welcomeWidget.textContent = `${greeting}! 🌈`;
    }
}

// Animate Stats Counter
function animateCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = element.textContent;
                
                // Check if it's a number or percentage
                const isPercent = target.includes('%');
                const targetNum = parseInt(target.replace(/\D/g, ''));
                
                if (targetNum) {
                    let current = 0;
                    const increment = targetNum / 30;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= targetNum) {
                            element.textContent = isPercent ? `${targetNum}%` : targetNum;
                            clearInterval(timer);
                        } else {
                            element.textContent = isPercent ? `${Math.floor(current)}%` : Math.floor(current);
                        }
                    }, 50);
                }
                
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

// Header Action Buttons
const headerActionBtns = document.querySelectorAll('.header-actions .action-btn');

headerActionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const text = btn.textContent;
        showNotification(`${text} clicked!`);
    });
});

// Smooth Scroll for Widgets
function smoothScrollToWidget(widget) {
    widget.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
}

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    // Tab navigation with arrow keys
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const activeTab = document.querySelector('.tab-btn.active');
        const allTabs = Array.from(tabButtons);
        const currentIndex = allTabs.indexOf(activeTab);
        
        let newIndex;
        if (e.key === 'ArrowRight') {
            newIndex = (currentIndex + 1) % allTabs.length;
        } else {
            newIndex = (currentIndex - 1 + allTabs.length) % allTabs.length;
        }
        
        allTabs[newIndex].click();
    }
});

// Refresh Widgets Periodically (simulate live updates)
function refreshLiveData() {
    // Animate pulse bars slightly
    const pulseFills = document.querySelectorAll('.pulse-fill');
    pulseFills.forEach(fill => {
        const currentWidth = parseFloat(fill.style.width);
        const variance = Math.random() * 4 - 2; // Random change between -2 and +2
        const newWidth = Math.max(50, Math.min(100, currentWidth + variance));
        fill.style.width = `${newWidth}%`;
    });
}

// Initialize Everything
function init() {
    animateWidgets();
    animateProgressBars();
    animateCounters();
    updateWelcomeMessage();
    
    // Refresh live data every 5 seconds
    setInterval(refreshLiveData, 5000);
    
    // Update greeting every minute
    setInterval(updateWelcomeMessage, 60000);
}

// Run on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Add smooth transitions for dashboard grid
dashboardGrid.style.transition = 'opacity 0.3s ease';

console.log('United in Pride Dashboard initialized! 🌈');