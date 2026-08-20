const ruBtn = document.getElementById('lang-ru');
const enBtn = document.getElementById('lang-en');
const i18nEls = document.querySelectorAll('[data-ru][data-en]');

function setLang(lang) {
  i18nEls.forEach((el) => {
    el.textContent = lang === 'en' ? el.dataset.en : el.dataset.ru;
  });
  document.documentElement.setAttribute('lang', lang);
  ruBtn.classList.toggle('active', lang === 'ru');
  enBtn.classList.toggle('active', lang === 'en');
  localStorage.setItem('vostryakova-lang', lang);
}

if (ruBtn && enBtn) {
  ruBtn.addEventListener('click', () => setLang('ru'));
  enBtn.addEventListener('click', () => setLang('en'));
  setLang(localStorage.getItem('vostryakova-lang') || 'ru');
}
