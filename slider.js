(function(){
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(document.querySelectorAll('.slide'));
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  if(!track || slides.length===0) return;

  let currentIndex = 0;
  let autoplayInterval = null;

  function update() {
    const container = track.parentElement;
    const centerSlide = slides[currentIndex];
    const offset = centerSlide.offsetLeft - (container.clientWidth - centerSlide.clientWidth) / 2;
    track.style.transform = `translateX(${ -offset }px)`;

    slides.forEach((s, i)=>{
      s.classList.toggle('not-center', i !== currentIndex);
    });
  }

  function goTo(index){
    if(index<0) index = slides.length-1;
    if(index>slides.length-1) index = 0;
    currentIndex = index;
    update();
  }

  prevBtn && prevBtn.addEventListener('click', ()=>{ goTo(currentIndex-1); restartAutoplay(); });
  nextBtn && nextBtn.addEventListener('click', ()=>{ goTo(currentIndex+1); restartAutoplay(); });

  function startAutoplay(){
    autoplayInterval = setInterval(()=>{ goTo(currentIndex+1); }, 4000);
  }
  function stopAutoplay(){ clearInterval(autoplayInterval); autoplayInterval = null; }
  function restartAutoplay(){ stopAutoplay(); startAutoplay(); }

  // allow swipe gestures on touch
  let startX = 0;
  track.addEventListener('touchstart', (e)=>{ startX = e.touches[0].clientX; stopAutoplay(); });
  track.addEventListener('touchend', (e)=>{ const dx = e.changedTouches[0].clientX - startX; if(dx>40) goTo(currentIndex-1); else if(dx<-40) goTo(currentIndex+1); startAutoplay(); });

  window.addEventListener('resize', update);

  // init
  update();
  startAutoplay();
})();
