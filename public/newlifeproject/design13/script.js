// Design 13: Gateway — Left Sidebar Portal
const mnBtn=document.getElementById('mnBtn'),mobMenu=document.getElementById('mobMenu');
mnBtn.addEventListener('click',()=>{mobMenu.style.display=mobMenu.style.display==='flex'?'none':'flex';});

// Active sidebar navigation based on scroll
const sections=document.querySelectorAll('.section[id]');
const sbnLinks=document.querySelectorAll('.sbn');
const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){const id=e.target.id;sbnLinks.forEach(l=>{l.classList.toggle('active',l.dataset.section===id)});}});
},{threshold:0.4});
sections.forEach(s=>observer.observe(s));

// Donate
let amt=50;const dlas=document.querySelectorAll('.dla'),dlI=document.getElementById('dlI'),dlBtn=document.getElementById('dlBtn');
dlas.forEach(b=>{b.addEventListener('click',()=>{dlas.forEach(x=>x.classList.remove('active'));b.classList.add('active');amt=parseInt(b.textContent.replace('$',''));dlI.value='';dlBtn.textContent=`Donate $${amt} →`;});});
dlI.addEventListener('input',()=>{const v=parseInt(dlI.value);if(v>0){dlas.forEach(x=>x.classList.remove('active'));amt=v;dlBtn.textContent=`Donate $${v} →`;}});
dlBtn.addEventListener('click',()=>alert(`Thank you for your $${amt} donation!`));

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'});mobMenu.style.display='none';}});});
