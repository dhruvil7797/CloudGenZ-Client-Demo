// ===== DESIGN 2: COASTAL BOLD — script.js =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => { navbar.classList.toggle('scrolled', window.scrollY > 60); });

const revealEls = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
}, { threshold: 0.12 });
revealEls.forEach(el => obs.observe(el));

function animateCounter(el, target, dur = 2000) {
  let val = 0; const step = target / (dur / 16);
  const t = setInterval(() => {
    val += step; if (val >= target) { el.textContent = target.toLocaleString(); clearInterval(t); return; }
    el.textContent = Math.floor(val).toLocaleString();
  }, 16);
}

const statsSection = document.getElementById('stats');
let started = false;
new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !started) {
    started = true;
    document.querySelectorAll('.strip-num[data-target]').forEach(el => animateCounter(el, parseInt(el.dataset.target)));
  }
}, { threshold: 0.3 }).observe(statsSection);
