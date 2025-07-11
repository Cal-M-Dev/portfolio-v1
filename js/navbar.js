document.addEventListener('DOMContentLoaded', () => {
  const header       = document.querySelector('header');
  const hero         = document.querySelector('.hero');
  const headerHeight = header.getBoundingClientRect().height;

  const obs = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) {
      header.classList.add('visible');
    } else {
      header.classList.remove('visible');
    }
  }, {
    root: null,
    threshold: 0, 
    rootMargin: `-${headerHeight}px 0px 0px 0px`
  });

  obs.observe(hero);
});