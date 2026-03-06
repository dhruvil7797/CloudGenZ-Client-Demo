// ===== DESIGN 1: LUMINOUS DARK AURORA — Script =====

// NAV scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// ===== AURORA CANVAS =====
const canvas = document.getElementById('auroraCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const orbs = [
  { x: 0.2, y: 0.3, r: 0.45, color: [124, 58, 237], speed: 0.0003 },
  { x: 0.8, y: 0.6, r: 0.4, color: [236, 72, 153], speed: 0.0004 },
  { x: 0.5, y: 0.8, r: 0.35, color: [20, 184, 166], speed: 0.0005 },
  { x: 0.3, y: 0.7, r: 0.3, color: [245, 158, 11], speed: 0.00035 },
];

let time = 0;
function drawAurora() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#0a0812';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  orbs.forEach((orb, i) => {
    const x = (orb.x + Math.sin(time * orb.speed * 1000 + i) * 0.15) * canvas.width;
    const y = (orb.y + Math.cos(time * orb.speed * 1000 + i * 2) * 0.12) * canvas.height;
    const r = orb.r * Math.min(canvas.width, canvas.height);

    const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
    gradient.addColorStop(0, `rgba(${orb.color[0]},${orb.color[1]},${orb.color[2]},0.18)`);
    gradient.addColorStop(1, 'rgba(0,0,0,0)');

    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
  });

  time++;
  requestAnimationFrame(drawAurora);
}
drawAurora();

// ===== INTERSECTION OBSERVER REVEALS =====
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

reveals.forEach(el => revealObserver.observe(el));

// ===== COUNTER ANIMATION =====
function animateCounter(el, target, duration = 2000) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { start = target; clearInterval(timer); }
    el.textContent = Math.floor(start);
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      animateCounter(el, target);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(el => counterObserver.observe(el));

// ===== NEWSLETTER FORM =====
document.querySelector('.newsletter-form')?.addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  btn.textContent = '✓ You\'re in!';
  btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
});
