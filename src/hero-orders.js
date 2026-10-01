const scene = document.querySelector('[data-order-scene]');
if (scene) {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const toggle = scene.querySelector('[data-motion-toggle]');
  const orders = [...scene.querySelectorAll('.stacked-order')];
  let elapsed = 0;
  let lastTime = null;
  let paused = false;
  let visible = false;
  function render(time) {
    orders.forEach((order, index) => order.classList.toggle('is-visible', time >= 400 + index * 1500));
    scene.classList.toggle('is-framed', time >= 4600);
    scene.classList.toggle('has-heading', time >= 6300);
    scene.classList.toggle('has-summary', time >= 7000);
  }
  function frame(timestamp) {
    if (lastTime !== null && visible && !paused && !document.hidden && !reducedMotion.matches) {
      elapsed = (elapsed + Math.min(timestamp - lastTime, 100)) % 12000;
      render(elapsed);
    }
    lastTime = timestamp;
    requestAnimationFrame(frame);
  }
  function updatePause() {
    scene.classList.toggle('is-paused', paused || !visible || document.hidden);
    toggle.textContent = paused ? '▶ Wznów' : 'Ⅱ Wstrzymaj';
    toggle.setAttribute('aria-label', paused ? 'Wznów animację zamówień' : 'Wstrzymaj animację zamówień');
  }
  toggle.addEventListener('click', () => { paused = !paused; updatePause(); });
  document.addEventListener('visibilitychange', updatePause);
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; updatePause(); }, { threshold: 0.15 }).observe(scene);
  function setMotion() {
    elapsed = 0;
    toggle.hidden = reducedMotion.matches;
    render(reducedMotion.matches ? 10000 : 0);
  }
  reducedMotion.addEventListener('change', setMotion);
  setMotion();
  requestAnimationFrame(frame);
}
