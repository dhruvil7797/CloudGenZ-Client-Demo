// G91 D5 — Dashboard Vista
document.getElementById('mb-open')?.addEventListener('click',()=>document.getElementById('sidebar').classList.add('open'));
document.getElementById('mb-close')?.addEventListener('click',()=>document.getElementById('sidebar').classList.remove('open'));
// Sidebar nav active on scroll
const sections=['hero','how','deals','why','founders','faq'];
window.addEventListener('scroll',()=>{
  let cur='hero';
  sections.forEach(id=>{const el=document.getElementById(id);if(el&&scrollY>=el.offsetTop-100)cur=id});
  document.querySelectorAll('.sn').forEach(a=>{a.classList.toggle('active',a.getAttribute('href')==='#'+cur)});
});
const io=new IntersectionObserver((es)=>es.forEach((e,i)=>{if(e.isIntersecting){setTimeout(()=>e.target.classList.add('vis'),i*70);io.unobserve(e.target)}}),{threshold:.1});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));
function count(el,t){let s=0;const f=ts=>{if(!s)s=ts;const p=Math.min((ts-s)/1800,1),e=1-Math.pow(1-p,3);el.textContent=Math.floor(e*t);p<1?requestAnimationFrame(f):el.textContent=t};requestAnimationFrame(f)}
const co=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting&&e.target.dataset.t){count(e.target,+e.target.dataset.t);co.unobserve(e.target)}}),{threshold:.5});
document.querySelectorAll('[data-t]').forEach(el=>co.observe(el));
document.querySelectorAll('.fq').forEach(b=>b.addEventListener('click',()=>{const it=b.closest('.fi'),op=it.classList.contains('open');document.querySelectorAll('.fi').forEach(i=>i.classList.remove('open'));if(!op)it.classList.add('open')}));
document.querySelectorAll('.chip').forEach(c=>c.addEventListener('click',()=>{document.querySelectorAll('.chip').forEach(x=>x.classList.remove('active'));c.classList.add('active')}));
window.addEventListener('load',()=>document.querySelectorAll('.hero .rv').forEach((el,i)=>setTimeout(()=>el.classList.add('vis'),200+i*120)));
