const accordionContainers = document.querySelectorAll('.accordion');

accordionContainers.forEach((accordion) => {
  accordion.addEventListener('click', (event) => {
    const clickedButton = event.target.closest('.accordion__button');
    if (!clickedButton) {
      return;
    }

    const panelId = clickedButton.getAttribute('aria-controls');
    const panel = accordion.querySelector(`#${panelId}`);
    if (!panel) {
      return;
    }

    const isExpanded = clickedButton.getAttribute('aria-expanded') === 'true';
    clickedButton.setAttribute('aria-expanded', String(!isExpanded));

    if (!isExpanded) {
      panel.hidden = false;
      panel.style.maxHeight = `${panel.scrollHeight}px`;
      return;
    }

    panel.style.maxHeight = `${panel.scrollHeight}px`;

    requestAnimationFrame(() => {
      panel.style.maxHeight = '0px';
    });

    panel.addEventListener(
      'transitionend',
      () => {
        if (clickedButton.getAttribute('aria-expanded') === 'false') {
          panel.hidden = true;
        }
      },
      { once: true }
    );
  });

  accordion.querySelectorAll('.accordion__button').forEach((button) => {
    const panelId = button.getAttribute('aria-controls');
    const panel = accordion.querySelector(`#${panelId}`);
    if (!panel) {
      return;
    }

    const expanded = button.getAttribute('aria-expanded') === 'true';
    if (expanded) {
      panel.hidden = false;
      panel.style.maxHeight = `${panel.scrollHeight}px`;
      return;
    }

    panel.hidden = true;
    panel.style.maxHeight = '0px';
  });
});
