const headers = document.querySelectorAll('.header');

headers.forEach((header) => {
  const toggleButton = header.querySelector('.header__toggle');
  const mobileMenu = header.querySelector('.header__mobile-menu');

  if (!toggleButton || !mobileMenu) {
    return;
  }

  const closeMenu = () => {
    header.classList.remove('header--menu-open');
    toggleButton.setAttribute('aria-expanded', 'false');
  };

  const openMenu = () => {
    header.classList.add('header--menu-open');
    toggleButton.setAttribute('aria-expanded', 'true');
  };

  toggleButton.addEventListener('click', () => {
    const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closeMenu();
      return;
    }
    openMenu();
  });

  mobileMenu.addEventListener('click', (event) => {
    const clickedLink = event.target.closest('.header__mobile-link');
    if (clickedLink) {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 704) {
      closeMenu();
    }
  });
});
