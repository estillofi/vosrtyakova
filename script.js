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

/* ---------- Lightbox ---------- */

const lightbox = document.getElementById('lightbox');

if (lightbox) {
  const lightboxImg = document.getElementById('lightboxImg');
  const stage = document.getElementById('lightboxStage');
  const zoomInBtn = document.getElementById('zoomIn');
  const zoomOutBtn = document.getElementById('zoomOut');
  const closeBtn = document.getElementById('lightboxClose');
  let zoomed = false;
  let canZoomFurther = false;

  function updateZoomButtons() {
    const disable = !canZoomFurther || zoomed;
    zoomInBtn.disabled = disable;
    zoomInBtn.classList.toggle('disabled', disable);
    zoomOutBtn.disabled = !zoomed;
    zoomOutBtn.classList.toggle('disabled', !zoomed);
  }

  function setZoom(next) {
    if (next && !canZoomFurther) return;
    zoomed = next;
    lightboxImg.classList.toggle('zoomed', zoomed);
    updateZoomButtons();
  }

  function openLightbox(src, alt) {
    canZoomFurther = false;
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    setZoom(false);
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    setZoom(false);
  }

  lightboxImg.addEventListener('load', () => {
    canZoomFurther = Math.max(lightboxImg.naturalWidth, lightboxImg.naturalHeight) >= 3000;
    updateZoomButtons();
  });

  document.querySelectorAll('[data-lightbox]').forEach((el) => {
    el.addEventListener('click', () => {
      openLightbox(el.dataset.lightbox, el.dataset.lightboxAlt || '');
    });
  });

  lightboxImg.addEventListener('click', () => setZoom(!zoomed));
  zoomInBtn.addEventListener('click', () => setZoom(true));
  zoomOutBtn.addEventListener('click', () => setZoom(false));
  closeBtn.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target === stage) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
  });
}

/* ---------- Preload paintings on the homepage ---------- */

const PAINTING_IMAGES = [
  'images/hammock.jpg',
  'images/triptych.png',
  'images/railing.jpeg',
  'images/bloom.png',
  'images/hideseek.png',
  'images/lemurs.png',
  'images/IMG_1818.jpeg',
  'images/IMG_1987.jpeg',
  'images/IMG_2470.jpeg',
  'images/IMG_2486.jpeg',
  'images/IMG_2488.jpeg',
  'images/IMG_3170-2.jpg',
  'images/IMG_3171.jpeg',
  'images/IMG_3184.jpg',
  'images/IMG_3677.jpg',
  'images/IMG_4118-2.jpg',
  'images/IMG_4283.jpg',
];

if (document.body.dataset.preload === 'paintings') {
  const preload = () => {
    PAINTING_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  };
  if ('requestIdleCallback' in window) {
    requestIdleCallback(preload);
  } else {
    setTimeout(preload, 300);
  }
}
