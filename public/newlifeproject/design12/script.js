// Design 12: Legacy
const hb=document.getElementById('hb'),nl=document.getElementById('nl');
hb.addEventListener('click',()=>nl.classList.toggle('open'));
let a=50;const p6as=document.querySelectorAll('.p6a'),p6i=document.getElementById('p6i'),p6btn=document.getElementById('p6btn');
p6as.forEach(b=>{b.addEventListener('click',()=>{p6as.forEach(x=>x.classList.remove('active'));b.classList.add('active');a=parseInt(b.textContent.replace('$',''));p6i.value='';p6btn.textContent=`Donate $${a} →`;});});
p6i.addEventListener('input',()=>{const v=parseInt(p6i.value);if(v>0){p6as.forEach(x=>x.classList.remove('active'));a=v;p6btn.textContent=`Donate $${v} →`;}});
p6btn.addEventListener('click',()=>alert(`Thank you for your $${a} gift!`));
document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'});nl.classList.remove('open');}});});
