// Active Navbar on page scroll
document.addEventListener('DOMContentLoaded', () => {
  const header       = document.querySelector('header');
  const headerHeight = header.getBoundingClientRect().height;
  const sections     = Array.from(document.querySelectorAll('section[id]'));
  const navLinks     = document.querySelectorAll('.nav-links a');

  function doHighlight(id) {
    navLinks.forEach(l => l.parentElement.classList.remove('active'));
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) link.parentElement.classList.add('active');
  }

  let highlightTimer = null;
  function scheduleHighlight(id) {
    if (highlightTimer) clearTimeout(highlightTimer);
    highlightTimer = setTimeout(() => {
      doHighlight(id);
      highlightTimer = null;
    }, 100);
  }

function onScroll() {
  const headerHeight = header.getBoundingClientRect().height;

  let current = sections[0].id;

  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();

    if (rect.top <= headerHeight) {
      current = sec.id;
    }
  });

  scheduleHighlight(current);
}
  onScroll();
  window.addEventListener('scroll', onScroll);
});