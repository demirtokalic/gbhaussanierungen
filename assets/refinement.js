/* Progressive enhancement: content remains accessible without JavaScript. */
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
if('IntersectionObserver' in window && !reducedMotion.matches){
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:0.06,rootMargin:'0px 0px 35px 0px'});
 document.querySelectorAll('.section-head,.services-layout,.grid3>.project,.blog-card,.process article,.review-box,.comparison,.discipline,.experience-heading,.experience-steps').forEach(el=>{if(el.getBoundingClientRect().top>innerHeight){el.classList.add('reveal-ready');observer.observe(el)}});
 reducedMotion.addEventListener('change',()=>{if(reducedMotion.matches){document.querySelectorAll('.reveal-ready').forEach(el=>el.classList.add('is-visible'));observer.disconnect()}});
}
const progress=document.querySelector('.reading-progress');
let scheduled=false;
function updateProgress(){const distance=document.documentElement.scrollHeight-innerHeight;progress.style.transform=`scaleX(${distance>0?Math.min(1,scrollY/distance):0})`;document.querySelector('.header-v3')?.classList.toggle('is-scrolled',scrollY>40);scheduled=false}
if(progress){addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(updateProgress)}},{passive:true});addEventListener('resize',updateProgress);updateProgress()}
document.querySelectorAll('[data-street-src]').forEach(container=>{
 const load=container.querySelector('.street-load'),placeholder=container.querySelector('.street-placeholder'),close=container.parentElement.querySelector('.street-close');
 load.addEventListener('click',()=>{const frame=document.createElement('iframe');frame.title='Nachher: historische Fassade in München, Google Street View, Juni 2022';frame.src=container.dataset.streetSrc;frame.referrerPolicy='strict-origin-when-cross-origin';frame.allowFullscreen=true;placeholder.hidden=true;container.append(frame);close.hidden=false;close.focus()});
 close.addEventListener('click',()=>{container.querySelector('iframe')?.remove();placeholder.hidden=false;close.hidden=true;load.focus()});
});

const currentPage=location.pathname.split("/").pop()||"index.html";
document.querySelectorAll(".header-v3 a[href]").forEach(a=>{if(a.getAttribute("href")===currentPage){a.setAttribute("aria-current","page");a.classList.add("is-current");a.closest(".navgroup")?.classList.add("group-current")}});
