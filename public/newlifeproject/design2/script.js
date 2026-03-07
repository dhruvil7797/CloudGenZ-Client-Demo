// Design 2: "Virtue" — NewLife Project Inc.
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 40));

const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => navLinks.classList.toggle('open'));

// Scroll reveal
new IntersectionObserver((entries) => {
  entries.forEach((e, i) => { if (e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), i * 80); });
}, { threshold: 0.1 }).observe || document.querySelectorAll('.reveal').forEach(el => {
  new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 }).observe(el);
});
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((e,i) => { if (e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), i*80); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// Gift widget
let amt = 50;
const gaBtns = document.querySelectorAll('.ga-btn');
const giftInput = document.getElementById('giftInput');
const giftSubmit = document.getElementById('giftSubmit');
gaBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    gaBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    amt = parseInt(btn.textContent.replace('$',''));
    giftInput.value = '';
    updateSubmit();
  });
});
giftInput.addEventListener('input', () => {
  const v = parseInt(giftInput.value);
  if (v > 0) { gaBtns.forEach(b => b.classList.remove('active')); amt = v; updateSubmit(); }
});
const gtBtns = document.querySelectorAll('.gt-btn');
let monthly = false;
gtBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    gtBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    monthly = btn.textContent.includes('Monthly');
    updateSubmit();
  });
});
function updateSubmit() {
  giftSubmit.textContent = monthly ? `Give $${amt}/mo Securely →` : `Donate $${amt} Securely →`;
}
giftSubmit.addEventListener('click', () => alert(`Thank you! Redirecting to secure payment for $${amt}${monthly?' monthly':''}.`));
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); navLinks.classList.remove('open'); }
  });
});
