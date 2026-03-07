// Design 10: Foundation
const burger=document.getElementById('burger'),nav=document.getElementById('mainNav');
burger.addEventListener('click',()=>nav.classList.toggle('open'));
// Tabs
const pts=document.querySelectorAll('.pt'),pps=document.querySelectorAll('.pp');
pts.forEach(t=>t.addEventListener('click',()=>{const i=t.dataset.tab;pts.forEach(x=>x.classList.remove('active'));pps.forEach(x=>x.classList.remove('active'));t.classList.add('active');pps[i].classList.add('active');}));
// Donate
let amt=50,monthly=false;
const amtbs=document.querySelectorAll('.amtb'),customAmt=document.getElementById('customAmt'),donateBtn=document.getElementById('donateBtn');
amtbs.forEach(b=>{b.addEventListener('click',()=>{amtbs.forEach(x=>x.classList.remove('active'));b.classList.add('active');amt=parseInt(b.textContent.replace('$',''));customAmt.value='';updateBtn();});});
customAmt.addEventListener('input',()=>{const v=parseInt(customAmt.value);if(v>0){amtbs.forEach(x=>x.classList.remove('active'));amt=v;updateBtn();}});
document.querySelectorAll('.tog').forEach(t=>{t.addEventListener('click',()=>{document.querySelectorAll('.tog').forEach(x=>x.classList.remove('active'));t.classList.add('active');monthly=t.textContent.includes('Monthly');updateBtn();});});
function updateBtn(){donateBtn.textContent=monthly?`Give $${amt}/mo Now →`:`Donate $${amt} Now →`;}
donateBtn.addEventListener('click',()=>alert(`Thank you for your ${monthly?'monthly ':''}$${amt} donation!`));
// Reveal
new IntersectionObserver(e=>e.forEach((el,i)=>{if(el.isIntersecting)setTimeout(()=>el.target.classList.add('visible'),i*80)}),{threshold:0.1}).observe || document.querySelectorAll('.reveal').forEach(el=>{new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.1}).observe(el);});
const ro=new IntersectionObserver(e=>e.forEach((el,i)=>{if(el.isIntersecting)setTimeout(()=>el.target.classList.add('visible'),i*80)}),{threshold:0.1});
document.querySelectorAll('.reveal').forEach(el=>ro.observe(el));
document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'});nav.classList.remove('open');}});});
