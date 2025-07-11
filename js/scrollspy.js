// Active Navbar on page scroll
document.addEventListener('DOMContentLoaded', () => {
  const header       = document.querySelector('header');
  const sections     = Array.from(document.querySelectorAll('section[id]'));
  const navLinks     = document.querySelectorAll('.nav-links a');
  let   highlightTimer;
  let   isAutoScroll = false;

  function doHighlight(id) {
    navLinks.forEach(l => l.parentElement.classList.remove('active'));
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) link.parentElement.classList.add('active');
  }

  function scheduleHighlight(id) {
    if (isAutoScroll) return;
    clearTimeout(highlightTimer);
    highlightTimer = setTimeout(() => doHighlight(id), 250);
  }

  function onScroll() {
    const headerHeight = header.getBoundingClientRect().height;
    let current = sections[0].id;
    sections.forEach(sec => {
      if (sec.getBoundingClientRect().top <= headerHeight + 5) {
        current = sec.id;
      }
    });
    scheduleHighlight(current);
  }

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      isAutoScroll = true;
      clearTimeout(highlightTimer);
      const dest = link.getAttribute('href').slice(1);
      setTimeout(() => {
        doHighlight(dest);
        isAutoScroll = false;
      }, 500);
    });
  });

  window.addEventListener('scroll', onScroll);
  onScroll();
});