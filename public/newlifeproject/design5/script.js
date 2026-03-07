// Design 5: Harvest
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',window.scrollY>40));
const hb=document.getElementById('hb'),nl=document.getElementById('nl');
hb.addEventListener('click',()=>nl.classList.toggle('open'));
const ro=new IntersectionObserver(e=>e.forEach((el,i)=>{if(el.isIntersecting)setTimeout(()=>el.target.classList.add('visible'),i*80)}),{threshold:0.1});
document.querySelectorAll('.reveal').forEach(el=>ro.observe(el));
let a=50;const dbs=document.querySelectorAll('.dab'),di=document.getElementById('di'),db=document.getElementById('db');
dbs.forEach(b=>{b.addEventListener('click',()=>{dbs.forEach(x=>x.classList.remove('active'));b.classList.add('active');a=parseInt(b.textContent.replace('$',''));di.value='';db.textContent=`Donate $${a} Now →`;})});
di.addEventListener('input',()=>{const v=parseInt(di.value);if(v>0){dbs.forEach(x=>x.classList.remove('active'));a=v;db.textContent=`Donate $${v} Now →`;}});
db.addEventListener('click',()=>alert(`Thank you! Processing your $${a} donation.`));
document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'});nl.classList.remove('open');}});});
