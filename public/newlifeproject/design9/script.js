// Design 9: Chronicle
let amt=50;const dbas=document.querySelectorAll('.dba'),dbBtn=document.getElementById('dbBtn');
dbas.forEach(b=>{b.addEventListener('click',()=>{dbas.forEach(x=>x.classList.remove('active'));b.classList.add('active');amt=parseInt(b.dataset.amt);dbBtn.textContent=`Donate $${amt} →`;});});
dbBtn.addEventListener('click',()=>alert(`Thank you for your $${amt} donation to NewLife Project Inc.!`));
document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'});}});});
