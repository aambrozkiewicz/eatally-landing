const explorer = document.querySelector('[data-feature-explorer]');
if (explorer) {
  const tabs = [...explorer.querySelectorAll('[data-feature-tab]')];
  const panels = [...explorer.querySelectorAll('.feature-view')];
  function select(tab, focus = false) {
    explorer.dataset.active = tab.dataset.featureTab;
    tabs.forEach(item => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
    });
    panels.forEach(panel => {
      const active = panel.id === tab.getAttribute('aria-controls');
      panel.setAttribute('aria-hidden', String(!active));
      panel.inert = !active;
    });
    if (focus) tab.focus({ preventScroll: true });
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      select(tabs[next], true);
    });
  });
  // Keep nested preview tabs independent; swipe only the surrounding panel.
  let start;
  const views = explorer.querySelector('.feature-views');
  views.addEventListener('touchstart', event => {
    if (event.target.closest('button, a, [role="tablist"]')) { start = undefined; return; }
    const touch = event.touches[0];
    start = { x: touch.clientX, y: touch.clientY };
  }, { passive: true });
  views.addEventListener('touchend', event => {
    if (!start || !matchMedia('(max-width: 900px)').matches) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    start = undefined;
    if (Math.abs(dx) < 65 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    const index = tabs.findIndex(tab => tab.getAttribute('aria-selected') === 'true');
    select(tabs[(index + (dx < 0 ? 1 : -1) + tabs.length) % tabs.length]);
  }, { passive: true });
  views.addEventListener('touchcancel', () => { start = undefined; }, { passive: true });
}
