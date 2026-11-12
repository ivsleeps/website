(() => {
  'use strict';
  const $ = (selector, root=document) => root.querySelector(selector);
  const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];
  const translations = {
    en:{name:'Your name',email:'Email address',phone:'Phone (optional)',subject:'Subject',message:"Tell me about the tattoo you'd like",sending:'Sending your request…',success:'Thank you — your request has been sent.',error:'Something went wrong. Please try again or email ivsleeps@gmail.com.',network:'Could not send the form. Check your connection and try again.',selected:'Hi! I’m interested in the following design: '},
    sk:{name:'Vaše meno',email:'E-mailová adresa',phone:'Telefón (nepovinné)',subject:'Predmet',message:'Opíšte tetovanie, o ktoré máte záujem',sending:'Žiadosť sa odosiela…',success:'Ďakujem — vaša správa bola odoslaná.',error:'Niečo sa pokazilo. Skúste to znova alebo napíšte na ivsleeps@gmail.com.',network:'Formulár sa nepodarilo odoslať. Skontrolujte pripojenie a skúste znova.',selected:'Ahoj! Mám záujem o nasledujúci návrh: '}
  };
  let language='en';
  const form=$('#bookingForm');
  const message=$('#inp-message');
  const selectedBox=$('#selectedDesign');
  const selectedName=$('#selectedDesignName');
  const selectedField=$('#selectedDesignField');
  const removeDesign=$('#removeDesign');
  const formStatus=$('#formStatus');
  let selectedDesign='';

  function setLanguage(next){
    language=next==='sk'?'sk':'en';
    document.documentElement.lang=language;
    $$('[data-lang]').forEach(node=>{node.style.display=node.dataset.lang===language?'':'none';});
    const p=translations[language];
    const placeholders={'#inp-name':p.name,'#inp-email':p.email,'#inp-phone':p.phone,'#inp-subject':p.subject,'#inp-message':p.message};
    Object.entries(placeholders).forEach(([id,value])=>{const el=$(id);if(el)el.placeholder=value;});
    $$('[data-lang-toggle]').forEach(btn=>btn.setAttribute('aria-pressed',String(btn.dataset.langToggle===language)));
    try{localStorage.setItem('site-lang',language);}catch(_e){}
    if(selectedDesign && message){
      const currentText=message.value;
      const rest=currentText.replace(/^(Hi! I’m interested in the following design: |Ahoj! Mám záujem o nasledujúci návrh: )[^\n]*(\n\n)?/,'');
      message.value=translations[language].selected+selectedDesign+(rest?'\n\n'+rest:'');
    }
  }
  let saved='en';
  try{saved=localStorage.getItem('site-lang')||((navigator.language||'').startsWith('sk')?'sk':'en');}catch(_e){}
  setLanguage(saved);
  $$('[data-lang-toggle]').forEach(btn=>btn.addEventListener('click',()=>setLanguage(btn.dataset.langToggle)));
  $('#year').textContent=new Date().getFullYear();

  const hamburger=$('#hamburger'), mobileNav=$('#mobileNav');
  function closeMobileNav(){mobileNav?.classList.remove('open');mobileNav?.setAttribute('aria-hidden','true');hamburger?.setAttribute('aria-expanded','false');hamburger?.setAttribute('aria-label',language==='sk'?'Otvoriť menu':'Open menu');}
  hamburger?.addEventListener('click',()=>{const open=!mobileNav.classList.contains('open');mobileNav.classList.toggle('open',open);mobileNav.setAttribute('aria-hidden',String(!open));hamburger.setAttribute('aria-expanded',String(open));hamburger.setAttribute('aria-label',open?(language==='sk'?'Zavrieť menu':'Close menu'):(language==='sk'?'Otvoriť menu':'Open menu'));});
  $$('a[href^="#"]').forEach(link=>link.addEventListener('click',event=>{const href=link.getAttribute('href');if(!href||href==='#')return;const target=$(href);if(target){event.preventDefault();target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});history.replaceState(null,'',link.getAttribute('href'));closeMobileNav();}}));

  const galleryNodes=$$('.gallery-item');
  const items=galleryNodes.map(node=>({node,full:node.dataset.full||node.querySelector('img')?.getAttribute('src'),type:node.dataset.type||'portfolio',title:node.dataset.designName||node.querySelector('img')?.alt||'Artwork'}));
  const modal=$('#modal'), modalImage=$('#modalImage'), modalCaption=$('#modalCaption'), modalDots=$('#modalDots');
  const prevBtn=$('#prevBtn'),nextBtn=$('#nextBtn'),closeBtn=$('#closeBtn');
  let current=0,lastFocus=null,touchX=0;
  function renderDots(){modalDots.replaceChildren();items.forEach((item,index)=>{const dot=document.createElement('button');dot.type='button';dot.className='dot'+(index===current?' active':'');dot.setAttribute('aria-label',`${language==='sk'?'Prejsť na obrázok':'Go to image'} ${index+1}`);dot.setAttribute('aria-current',String(index===current));dot.addEventListener('click',()=>show(index));modalDots.append(dot);});}
  function show(index){current=(index+items.length)%items.length;const item=items[current];modalImage.src=item.full;modalImage.alt=item.title;modalCaption.textContent=`${item.title} · ${item.type.toUpperCase()} · ${current+1}/${items.length}`;renderDots();}
  function open(index){lastFocus=document.activeElement;show(index);modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';closeBtn.focus();}
  function close(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';modalImage.removeAttribute('src');lastFocus?.focus();}
  function onKey(event){if(!modal.classList.contains('open'))return;if(event.key==='Escape'){event.preventDefault();close();}else if(event.key==='ArrowLeft'){event.preventDefault();show(current-1);}else if(event.key==='ArrowRight'){event.preventDefault();show(current+1);}else if(event.key==='Tab'){const controls=$$('button',modal).filter(el=>!el.disabled);const first=controls[0],last=controls[controls.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}}}
  galleryNodes.forEach((node,index)=>node.addEventListener('click',event=>{event.preventDefault();open(index);}));
  prevBtn.addEventListener('click',()=>show(current-1));nextBtn.addEventListener('click',()=>show(current+1));closeBtn.addEventListener('click',close);
  modal.addEventListener('click',event=>{if(event.target===modal)close();});document.addEventListener('keydown',onKey);
  modalImage.addEventListener('touchstart',event=>{touchX=event.changedTouches[0].screenX;},{passive:true});modalImage.addEventListener('touchend',event=>{const delta=event.changedTouches[0].screenX-touchX;if(Math.abs(delta)>45)show(current+(delta<0?1:-1));},{passive:true});

  function chooseDesign(name){
    selectedDesign=name;selectedName.textContent=name;selectedField.value=name;selectedBox.hidden=false;
    const prefix=translations[language].selected;
    const currentText=message.value.trim();
    const previous=/^(Hi! I’m interested in the following design: |Ahoj! Mám záujem o nasledujúci návrh: )[^\n]*(\n\n)?/;
    const rest=currentText.replace(previous,'');
    message.value=prefix+name+(rest?'\n\n'+rest:'');
    $('#contact').scrollIntoView({behavior:'smooth',block:'start'});
    window.setTimeout(()=>message.focus({preventScroll:true}),450);
  }
  $$('[data-choose-design]').forEach(button=>button.addEventListener('click',()=>chooseDesign(button.dataset.chooseDesign)));
  $$('[data-view-design]').forEach(button=>button.addEventListener('click',()=>{const card=button.closest('.flash-card');const link=$('.gallery-item',card);const index=items.findIndex(item=>item.node===link);if(index>=0)open(index);}));
  removeDesign?.addEventListener('click',()=>{selectedDesign='';selectedBox.hidden=true;selectedField.value='';const p=translations[language].selected;message.value=message.value.replace(p+(selectedName.textContent||'')+'\n\n','').replace(p+(selectedName.textContent||''),'');selectedName.textContent='';});

  form?.addEventListener('submit',async event=>{
    event.preventDefault();formStatus.textContent='';formStatus.className='form-status';
    if(!form.reportValidity())return;
    const submit=$('button[type="submit"]',form);const old=submit.innerHTML;submit.disabled=true;submit.textContent=translations[language].sending;
    try{
      const response=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});
      if(response.ok){formStatus.textContent=translations[language].success;formStatus.classList.add('success');form.reset();selectedDesign='';selectedBox.hidden=true;selectedField.value='';selectedName.textContent='';}
      else{formStatus.textContent=translations[language].error;formStatus.classList.add('error');}
    }catch(_error){formStatus.textContent=translations[language].network;formStatus.classList.add('error');}
    finally{submit.disabled=false;submit.innerHTML=old;setLanguage(language);}
  });
})();
