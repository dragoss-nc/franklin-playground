import { loadScript, createOptimizedPicture } from '../../scripts/lib-franklin.js';
import createTag from '../../utils/tags.js';

async function loadSwiper(el) {
  await loadScript('https://cdn.jsdelivr.net/npm/swiper@9/swiper-element-bundle.min.js');

  const swiperOptions = {
    navigation: true,
    pagination: true,
    'pagination-clickable': true,
    'autoplay-delay': '2500',
    'autoplay-disable-on-interaction': false,
    'autoplay-pause-on-mouse-enter': true,
  };
  const swiperContainer = createTag('swiper-container', swiperOptions);
  const slides = el.querySelectorAll(':scope > div');

  slides.forEach((slide) => {
    const slideImg = slide.querySelector('img');
    const optimizedPicture = createOptimizedPicture(slideImg.src, slideImg.alt);
    const swiperSlide = createTag('swiper-slide', null, optimizedPicture);

    swiperContainer.append(swiperSlide);
  });

  el.replaceChildren(swiperContainer);
}

export default function decorate(block) {
  loadSwiper(block);
}
