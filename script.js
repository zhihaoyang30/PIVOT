(() => {
  const root = document.documentElement;
  const text = (en, zh) => root.dataset.language === 'zh' ? zh : en;
  const sections = [...document.querySelectorAll('article section[id]')];
  function updateReading() {
    const max = document.documentElement.scrollHeight - innerHeight;
    document.querySelector('.reading-progress').style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`;
    let active = sections[0]?.id;
    for (const section of sections) if (section.getBoundingClientRect().top <= 190) active = section.id;
    document.querySelectorAll('.contents a').forEach(a => {
      const current = a.hash === '#' + active;
      a.classList.toggle('active', current);
      if (current) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
    });
  }
  function setLanguage(language, preservePosition = false) {
    if (!['en', 'zh'].includes(language)) return;
    const section = preservePosition && [...sections].reverse().find(s => s.getBoundingClientRect().top <= 170);
    const ratio = section ? Math.min(1, Math.max(0, (170 - section.getBoundingClientRect().top) / section.offsetHeight)) : 0;
    root.dataset.language = language;
    root.lang = language === 'zh' ? 'zh-CN' : 'en';
    document.title = text('PIVOT — Learning from timely teacher corrections', 'PIVOT — 让教师的纠正成为学生的推理能力');
    document.querySelectorAll('[data-set-lang]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.setLang === language)));
    document.querySelectorAll('[data-alt-en]').forEach(image => image.alt = image.dataset[language === 'en' ? 'altEn' : 'altZh']);
    document.querySelectorAll('[data-label-en]').forEach(el => el.setAttribute('aria-label', el.dataset[language === 'en' ? 'labelEn' : 'labelZh']));
    document.querySelectorAll('.figure-open').forEach(button => button.setAttribute('aria-label', text('Enlarge figure: ', '放大图片：') + button.querySelector('img').alt));
    try { localStorage.setItem('pivot-blog-language', language); } catch (_) {}
    try { const url = new URL(location.href); url.searchParams.set('lang', language); history.replaceState(null, '', url); } catch (_) {}
    if (section) scrollTo({top: section.getBoundingClientRect().top + scrollY + ratio * section.offsetHeight - 170, behavior: 'instant'});
    requestAnimationFrame(updateReading);
  }
  document.querySelectorAll('[data-set-lang]').forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.setLang, true)));
  setLanguage(root.dataset.language || 'en');
  const tabs = [...document.querySelectorAll('[role=tab]')];
  function selectTab(tab) {
    tabs.forEach(button => {
      const selected = button === tab;
      button.setAttribute('aria-selected', String(selected));
      button.tabIndex = selected ? 0 : -1;
      document.getElementById(button.getAttribute('aria-controls')).hidden = !selected;
    });
    updateReading();
  }
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', event => {
      let index;
      if (event.key === 'ArrowRight') index = (i + 1) % tabs.length;
      if (event.key === 'ArrowLeft') index = (i + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') index = 0;
      if (event.key === 'End') index = tabs.length - 1;
      if (index !== undefined) { event.preventDefault(); tabs[index].focus(); selectTab(tabs[index]); }
    });
  });
  const dialog = document.getElementById('figure-dialog');
  let lastFigure;
  document.querySelectorAll('.figure-open').forEach(button => button.addEventListener('click', () => {
    const image = button.querySelector('img');
    if (!dialog.showModal) { window.open(image.src, '_blank', 'noopener'); return; }
    lastFigure = button;
    dialog.querySelector('img').src = image.src;
    dialog.querySelector('img').alt = image.alt;
    const caption = button.closest('figure').querySelector('figcaption');
    dialog.querySelector('.dialog-caption').textContent = caption.innerText;
    dialog.showModal();
  }));
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
  dialog.addEventListener('close', () => lastFigure?.focus({preventScroll:true}));
  let scheduled = false;
  addEventListener('scroll', () => { if (!scheduled) { scheduled = true; requestAnimationFrame(() => { updateReading(); scheduled = false; }); } }, {passive:true});
  addEventListener('resize', updateReading, {passive:true});
  document.querySelectorAll('details').forEach(details => details.addEventListener('toggle', updateReading));
  document.fonts?.ready.then(updateReading);
  updateReading();
})();
