const showcase = document.querySelector('[data-pages-showcase]');
const pages = {
  about: ['POZNAJ NASZĄ KUCHNIĘ', 'Dobry smak.\nDobrzy ludzie.', 'Gotujemy sezonowo, lokalnie i z sercem. Tak, jak lubisz najbardziej.', 'Nasza historia ↗', 'Sezonowe składniki. Własne przepisy. Nasz charakter.'],
  business: ['CATERING DLA FIRM', 'Dobry lunch.\nLepszy dzień.', 'Zadbaj o swój zespół. My zadbamy o świeże posiłki każdego dnia.', 'Poznaj ofertę ↗', 'Od małego biura po duży zespół. Zawsze ze smakiem.'],
  events: ['SMAK WAŻNYCH CHWIL', 'Twój moment.\nNasz catering.', 'Spotkanie, uroczystość czy firmowy event? Stworzymy menu na Twoją okazję.', 'Odkryj możliwości ↗', 'Małe spotkania. Wielkie okazje. Jedna dobra kuchnia.'],
};
if (showcase) {
  const tabs = [...showcase.querySelectorAll('[data-page]')];
  function selectPage(tab) {
    tabs.forEach(item => { item.setAttribute('aria-selected', String(item === tab)); item.tabIndex = item === tab ? 0 : -1; });
    const content = pages[tab.dataset.page];
    ['kicker', 'title', 'description', 'cta', 'footer'].forEach((field, index) => {
      const node = showcase.querySelector(`[data-page-${field}]`);
      node.textContent = content[index];
      if (field === 'title') node.style.whiteSpace = 'pre-line';
    });
    showcase.querySelectorAll('[data-page-art]').forEach(art => {
      art.toggleAttribute('hidden', art.dataset.pageArt !== tab.dataset.page);
    });
    showcase.querySelector('[role="tabpanel"]').setAttribute('aria-labelledby', tab.id);
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectPage(tab));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next === undefined) return;
      event.preventDefault(); tabs[next].focus(); selectPage(tabs[next]);
    });
  });
}
