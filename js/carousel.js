const carousels = document.querySelectorAll('.carousel');

carousels.forEach((carousel) => {
  const slides = Array.from(carousel.querySelectorAll('.carousel__slide'));
  const prevButton = carousel.querySelector('.carousel__arrow--prev');
  const nextButton = carousel.querySelector('.carousel__arrow--next');

  if (!slides.length) {
    return;
  }

  let activeIndex = slides.findIndex((slide) => slide.classList.contains('is-active'));
  if (activeIndex < 0) {
    activeIndex = 0;
  }

  const renderSlides = () => {
    slides.forEach((slide, slideIndex) => {
      const isActiveSlide = slideIndex === activeIndex;
      slide.classList.toggle('is-active', isActiveSlide);
      slide.setAttribute('aria-hidden', String(!isActiveSlide));

      const slideBullets = Array.from(slide.querySelectorAll('.carousel__bullet'));
      slideBullets.forEach((bullet, bulletIndex) => {
        const isActiveBullet = bulletIndex === activeIndex;
        bullet.classList.toggle('is-active', isActiveBullet);
        bullet.setAttribute('aria-current', isActiveBullet ? 'true' : 'false');
      });
    });
  };

  const showNext = () => {
    activeIndex = (activeIndex + 1) % slides.length;
    renderSlides();
  };

  const showPrev = () => {
    activeIndex = (activeIndex - 1 + slides.length) % slides.length;
    renderSlides();
  };

  prevButton?.addEventListener('click', showPrev);
  nextButton?.addEventListener('click', showNext);

  slides.forEach((slide) => {
    const slideBullets = Array.from(slide.querySelectorAll('.carousel__bullet'));

    slideBullets.forEach((bullet, bulletIndex) => {
      bullet.addEventListener('click', () => {
        activeIndex = bulletIndex;
        renderSlides();
      });
    });
  });

  renderSlides();
});
