const scene = document.querySelector('[data-order-scene]');
if (scene) {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const replay = scene.querySelector('[data-motion-toggle]');
  const orders = [...scene.querySelectorAll('.stacked-order')];
  const mealCount = scene.querySelector('[data-meal-count]');
  const mealLabel = scene.querySelector('[data-meal-label]');
  const orderTotal = scene.querySelector('[data-order-total]');
  const amounts = orders.map(order => Number.parseInt(order.querySelector('b').textContent, 10));
  const duration = 1200 + (orders.length - 1) * 1500 + 700;
  let elapsed = 0;
  let lastTime = null;
  let visible = false;
  let frameId = null;

  function render(time) {
    let count = 0;
    let total = 0;
    orders.forEach((order, index) => {
      const shown = time >= 1200 + index * 1500;
      order.classList.toggle('is-visible', shown);
      if (shown) { count += 1; total += amounts[index]; }
    });
    scene.classList.toggle('is-framed', time >= 100);
    scene.classList.toggle('has-heading', time >= 350);
    scene.classList.toggle('has-summary', time >= 500);
    mealCount.textContent = count;
    mealLabel.textContent = count === 1 ? 'posiłek' : count >= 2 && count <= 4 ? 'posiłki' : 'posiłków';
    orderTotal.textContent = total;
  }

  function frame(timestamp) {
    frameId = null;
    if (lastTime !== null) elapsed = Math.min(elapsed + Math.min(timestamp - lastTime, 100), duration);
    lastTime = timestamp;
    render(elapsed);
    if (elapsed < duration) frameId = requestAnimationFrame(frame);
  }

  function updatePlayback() {
    const running = visible && !document.hidden && !reducedMotion.matches && elapsed < duration;
    scene.classList.toggle('is-paused', !visible || document.hidden);
    if (running && frameId === null) {
      lastTime = null;
      frameId = requestAnimationFrame(frame);
    } else if (!running && frameId !== null) {
      cancelAnimationFrame(frameId);
      frameId = null;
      lastTime = null;
    }
  }

  function restart() {
    elapsed = reducedMotion.matches ? duration : 0;
    lastTime = null;
    render(elapsed);
    updatePlayback();
  }

  replay.addEventListener('click', restart);
  document.addEventListener('visibilitychange', updatePlayback);
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    updatePlayback();
  }, { threshold: 0.15 }).observe(scene);
  reducedMotion.addEventListener('change', restart);
  restart();
}
