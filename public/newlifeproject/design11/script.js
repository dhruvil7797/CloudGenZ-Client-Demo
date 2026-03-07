// Design 11: Momentum
const burger=document.getElementById('burger'),navLinks=document.getElementById('navLinks');
burger.addEventListener('click',()=>navLinks.classList.toggle('open'));
const ro=new IntersectionObserver(e=>e.forEach((el,i)=>{if(el.isIntersecting)setTimeout(()=>el.target.classList.add('visible'),i*80)}),{threshold:0.1});
document.querySelectorAll('.reveal').forEach(el=>ro.observe(el));
let amt=50,monthly=false;
const dcwas=document.querySelectorAll('.dcwa'),dcInput=document.getElementById('dcInput'),dcBtn=document.getElementById('dcBtn');
dcwas.forEach(b=>{b.addEventListener('click',()=>{dcwas.forEach(x=>x.classList.remove('active'));b.classList.add('active');amt=parseInt(b.textContent.replace('$',''));dcInput.value='';updateBtn();});});
dcInput.addEventListener('input',()=>{const v=parseInt(dcInput.value);if(v>0){dcwas.forEach(x=>x.classList.remove('active'));amt=v;updateBtn();}});
document.querySelectorAll('.dcwt').forEach(t=>{t.addEventListener('click',()=>{document.querySelectorAll('.dcwt').forEach(x=>x.classList.remove('active'));t.classList.add('active');monthly=t.textContent.includes('Monthly');updateBtn();});});
function updateBtn(){dcBtn.textContent=monthly?`Give $${amt}/mo →`:`Donate $${amt} →`;}
dcBtn.addEventListener('click',()=>alert(`Thank you for your $${amt}${monthly?' monthly':''} donation!`));
document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'});navLinks.classList.remove('open');}});});
