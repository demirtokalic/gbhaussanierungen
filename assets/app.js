const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('.service-nav');
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',open);nav.classList.toggle('mobile-open',open);menu.textContent=open?'Schließen':'Menü'});
document.querySelectorAll('.navgroup').forEach(d=>d.addEventListener('toggle',()=>{if(d.open)document.querySelectorAll('.navgroup').forEach(x=>{if(x!==d)x.open=false})}));
document.addEventListener('click',e=>{if(!e.target.closest('.navgroup'))document.querySelectorAll('.navgroup').forEach(d=>d.open=false)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){document.querySelectorAll('.navgroup').forEach(d=>d.open=false);if(menu?.getAttribute('aria-expanded')==='true')menu.click()}});
const filters=document.querySelectorAll('[data-filter]'),cards=document.querySelectorAll('[data-category]'),search=document.querySelector('#article-search');let selected='Alle';
function filter(){let count=0;cards.forEach(c=>{const matches=(selected==='Alle'||c.dataset.category===selected)&&(!search||c.textContent.toLocaleLowerCase('de').includes(search.value.toLocaleLowerCase('de')));c.hidden=!matches;if(matches)count++});const status=document.querySelector('.gallery-status');if(status)status.textContent=`${count} ${search?'Artikel':'Einblicke'}`;document.querySelector('.no-results')?.toggleAttribute('hidden',count>0)}
filters.forEach(b=>b.addEventListener('click',()=>{selected=b.dataset.filter;filters.forEach(x=>x.setAttribute('aria-pressed',x===b));filter()}));search?.addEventListener('input',filter);
const dialog=document.querySelector('#lightbox');let opener;
document.querySelectorAll('[data-photo]').forEach(b=>b.addEventListener('click',()=>{opener=b;dialog.querySelector('img').src=b.dataset.photo;dialog.querySelector('img').alt=b.dataset.alt;dialog.querySelector('p').textContent=b.dataset.caption;dialog.showModal()}));
dialog?.querySelector('button').addEventListener('click',()=>dialog.close());dialog?.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});dialog?.addEventListener('close',()=>opener?.focus());
const form=document.querySelector('#inquiry');
if(form){
 const status=form.querySelector('.form-status');
 status.textContent='Designvorschau: Das Kontaktformular ist in dieser Vorschau deaktiviert.';
 const submit=form.querySelector('[type=submit]');submit.disabled=true;submit.textContent='Vorschau – kein Versand';
 form.addEventListener('submit',e=>e.preventDefault());
 const chosen=new URLSearchParams(location.search).get('leistung');
 if(chosen){const sel=form.querySelector('[name=service]');if([...sel.options].some(o=>o.value===chosen))sel.value=chosen;}
}
