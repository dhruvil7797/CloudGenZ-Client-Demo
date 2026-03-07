// Design 1: "Roots" — NewLife Project Inc.

// NAV scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile burger
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => navLinks.classList.toggle('open'));

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));

// Donation widget
let selectedAmount = 50;
const amtBtns = document.querySelectorAll('.amt-btn');
const customAmt = document.getElementById('customAmt');
const donateBtn = document.getElementById('donateBtn');

amtBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    amtBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedAmount = parseInt(btn.dataset.amount);
    customAmt.value = '';
    donateBtn.textContent = `Donate $${selectedAmount} →`;
  });
});

customAmt.addEventListener('input', () => {
  const val = parseInt(customAmt.value);
  if (val > 0) {
    amtBtns.forEach(b => b.classList.remove('active'));
    selectedAmount = val;
    donateBtn.textContent = `Donate $${val} →`;
  }
});

// Frequency toggle
const freqBtns = document.querySelectorAll('.freq-btn');
freqBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    freqBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const isMonthly = btn.dataset.freq === 'monthly';
    donateBtn.textContent = isMonthly ? `Give $${selectedAmount}/mo →` : `Donate $${selectedAmount} →`;
  });
});

donateBtn.addEventListener('click', () => {
  alert(`Thank you for your generous gift of $${selectedAmount}! You will be redirected to our secure donation page.`);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      navLinks.classList.remove('open');
    }
  });
});
