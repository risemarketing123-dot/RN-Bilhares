
const menuBtn=document.querySelector('.menu-btn');const mobileNav=document.querySelector('.mobile-nav');if(menuBtn&&mobileNav){menuBtn.addEventListener('click',()=>{const open=mobileNav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(open));});mobileNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobileNav.classList.remove('open');menuBtn.setAttribute('aria-expanded','false');}));}
const reveals=[...document.querySelectorAll('.reveal')];if('IntersectionObserver'in window){const io=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);}})},{threshold:.08,rootMargin:'0px 0px -5% 0px'});reveals.forEach(el=>io.observe(el));}else{reveals.forEach(el=>el.classList.add('visible'));}
const lb=document.querySelector('.lightbox');if(lb){const img=lb.querySelector('img');const close=()=>{lb.classList.remove('open');lb.setAttribute('aria-hidden','true');document.body.classList.remove('no-scroll');};document.querySelectorAll('[data-img]').forEach(btn=>btn.addEventListener('click',()=>{img.src=btn.dataset.img;img.alt=btn.querySelector('img')?.alt||'Imagem ampliada';lb.classList.add('open');lb.setAttribute('aria-hidden','false');document.body.classList.add('no-scroll');}));lb.querySelector('.lightbox-close').addEventListener('click',close);lb.addEventListener('click',e=>{if(e.target===lb)close();});document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});}




// V5.4 — vídeo toca normalmente; o banner participa do fluxo da página.
(()=>{
  const hero=document.querySelector('.hero-motion');
  const video=document.getElementById('hero-motion-video');
  const progress=document.getElementById('hero-motion-progress');
  if(!hero||!video) return;

  const update=()=>{
    if(progress && video.duration && Number.isFinite(video.duration)){
      const pct=Math.max(0,Math.min(1,video.currentTime/video.duration));
      progress.style.transform=`scaleX(${pct})`;
    }
  };
  const play=()=>{
    video.muted=true;
    video.play().then(()=>hero.classList.add('playing')).catch(()=>{});
  };
  if(document.readyState==='complete') play();
  else window.addEventListener('load',play,{once:true});
  ['touchstart','pointerdown','wheel'].forEach(type=>window.addEventListener(type,play,{once:true,passive:true}));
  video.addEventListener('timeupdate',update);
  video.addEventListener('ended',()=>{if(progress)progress.style.transform='scaleX(1)';});
})();
