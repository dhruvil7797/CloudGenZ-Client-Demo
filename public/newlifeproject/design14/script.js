// Design 14: Covenant — Faith/Ministry
const hdHb=document.getElementById('hdHb'),hn=document.getElementById('hn');
hdHb.addEventListener('click',()=>hn.classList.toggle('open'));
const ro=new IntersectionObserver(e=>e.forEach((el,i)=>{if(el.isIntersecting)setTimeout(()=>el.target.classList.add('visible'),i*80)}),{threshold:0.1});
document.querySelectorAll('.reveal').forEach(el=>ro.observe(el));
let amt=50;const dnwas=document.querySelectorAll('.dnwa'),dnwI=document.getElementById('dnwI'),dnwBtn=document.getElementById('dnwBtn');
dnwas.forEach(b=>{b.addEventListener('click',()=>{dnwas.forEach(x=>x.classList.remove('active'));b.classList.add('active');amt=parseInt(b.textContent.replace('$',''));dnwI.value='';dnwBtn.textContent=`Give $${amt} →`;});});
dnwI.addEventListener('input',()=>{const v=parseInt(dnwI.value);if(v>0){dnwas.forEach(x=>x.classList.remove('active'));amt=v;dnwBtn.textContent=`Give $${v} →`;}});
dnwBtn.addEventListener('click',()=>alert(`Thank you for sowing a seed of $${amt}! Your generosity changes lives.`));
document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'});hn.classList.remove('open');}});});
