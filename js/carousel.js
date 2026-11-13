document.querySelectorAll('.carousel').forEach((carousel) => {
  const track = carousel.querySelector('.carousel-track');
  const slides = [...track.children];
  const prev = carousel.querySelector('.carousel-prev');
  const next = carousel.querySelector('.carousel-next');
  const dots = carousel.querySelector('.carousel-dots');

  const go = (i) => {
    const n = Math.max(0, Math.min(slides.length - 1, i));
    track.scrollTo({ left: n * track.clientWidth });
  };
  const current = () => Math.round(track.scrollLeft / track.clientWidth);

  const dotButtons = slides.map((_, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', `Go to screenshot ${i + 1}`);
    b.addEventListener('click', () => go(i));
    dots.appendChild(b);
    return b;
  });

  const update = () => {
    const c = current();
    prev.disabled = c === 0;
    next.disabled = c === slides.length - 1;
    dotButtons.forEach((b, i) => b.setAttribute('aria-current', i === c));
  };

  prev.addEventListener('click', () => go(current() - 1));
  next.addEventListener('click', () => go(current() + 1));
  track.addEventListener('scroll', update, { passive: true });
  track.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(current() - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); go(current() + 1); }
  });
  window.addEventListener('resize', () => go(current()));
  update();
});
