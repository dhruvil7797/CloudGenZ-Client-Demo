// Design 8: Nature Distilled
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 50));
document.getElementById('hamburger').addEventListener('click', () => document.getElementById('navLinks').classList.toggle('open'));
document.querySelectorAll('#navLinks a').forEach(a => a.addEventListener('click', () => document.getElementById('navLinks').classList.remove('open')));
const ro = new IntersectionObserver((entries) => { entries.forEach((e,i) => { if(e.isIntersecting) setTimeout(()=>e.target.classList.add('visible'),i*80); }); }, {threshold:0.1,rootMargin:'0px 0px -50px 0px'});
document.querySelectorAll('.reveal').forEach(el => ro.observe(el));
const co = new IntersectionObserver((entries) => { entries.forEach(e => { if(e.isIntersecting){ const el=e.target,t=+el.dataset.target; let n=0; const s=t/120; const ti=setInterval(()=>{ n+=s; if(n>=t){n=t;clearInterval(ti);} el.textContent=Math.floor(n); },16); co.unobserve(el); } }); },{threshold:0.5});
document.querySelectorAll('.ic-n').forEach(el => co.observe(el));
document.querySelector('.nl-form')?.addEventListener('submit', e => { e.preventDefault(); const b=e.target.querySelector('button'); b.textContent='✓ Subscribed!'; b.style.background='#4a7c59'; });
