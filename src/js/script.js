// Burger menu open

const burger = document.getElementById('nav__trigger');
const mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
  const isOpen = burger.getAttribute('aria-expanded') === 'true';
  burger.setAttribute('aria-expanded', String(!isOpen));
  mobileMenu.setAttribute('aria-hidden', String(isOpen));
  mobileMenu.classList.toggle('-translate-x-full');

  // Меняем иконки
  const [menuIcon, closeIcon] = burger.querySelectorAll("i");
  menuIcon.classList.toggle("hidden");
  closeIcon.classList.toggle("hidden");
});

// Sticky header + shadow
const header = document.getElementById('siteHeader');

window.addEventListener('scroll', () => {
  if (window.scrollY === 0) {
    // На самом верху → прозрачный без тени
    header.classList.remove('bg-page', 'shadow-header');
    header.classList.add('bg-transparent');
  } else {
    // После начала скролла → фон и тень
    header.classList.add('bg-page', 'shadow-header');
    header.classList.remove('bg-transparent');
  }
});




function duplicateSlides(rootSelector, minSlides = 24) {
  const root = document.querySelector(rootSelector);
  if (!root) return;

  const wrapper = root.querySelector('.swiper-wrapper');
  if (!wrapper) return;

  const originals = Array.from(wrapper.children);
  if (originals.length === 0) return;

  // Клонируем, пока не наберём минимум (чтобы loop работал стабильно на любом экране)
  while (wrapper.children.length < minSlides) {
    originals.forEach(node => wrapper.appendChild(node.cloneNode(true)));
  }
}

function makeTicker(selector, { reverse = false } = {}) {
  return new Swiper(selector, {
    slidesPerView: 'auto',
    spaceBetween: 40,
    // Бесшовная «лента»
    loop: true,
    loopAdditionalSlides: 20,      // подстраховка от «not enough slides»
    freeMode: true,
    freeModeMomentum: false,
    allowTouchMove: false,
    speed: 4000,                   // скорость (чем больше — тем медленнее едет)
    autoplay: {
      delay: 0,
      reverseDirection: reverse,   // верхняя вправо, нижняя влево
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    // чтобы Swiper корректно реагировал на скрытые родителя/контейнеры
    observer: true,
    observeParents: true,
  });
}

window.addEventListener('load', () => {
  // 1) нарастим слайды, чтобы не было предупреждения и рывков
  duplicateSlides('.customer-swiper-right', 24);
  duplicateSlides('.customer-swiper-left',  24);

  // 2) инициализируем обе ленты
  makeTicker('.customer-swiper-right', { reverse: true });  // вправо
  makeTicker('.customer-swiper-left',  { reverse: false }); // влево
});

// FAQ
document.querySelectorAll('.faq-question').forEach((btn) => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const willOpen = !item.classList.contains('active');

    // Закрыть все кроме текущего
    document.querySelectorAll('.faq-item').forEach((el) => {
      if (el !== item) {
        el.classList.remove('active');
        el.querySelector('.faq-answer')?.classList.add('hidden');
        const icon = el.querySelector('.faq-icon');
        if (icon) icon.textContent = '+';
      }
    });

    // Переключить текущий
    if (willOpen) {
      item.classList.add('active');
      item.querySelector('.faq-answer')?.classList.remove('hidden');
      btn.querySelector('.faq-icon').textContent = '−';
    } else {
      item.classList.remove('active');
      item.querySelector('.faq-answer')?.classList.add('hidden');
      btn.querySelector('.faq-icon').textContent = '+';
    }
  });
});









