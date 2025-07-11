document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const hero = document.querySelector('.hero');
    const headerHeight = header.getBoundingClientRect().height;
    
    function checkNav() {
        if (window.scrollY >= hero.offsetHeight - headerHeight) {
            header.classList.add('visible');
        } else {
            header.classList.remove('visible');
        }
    }

    checkNav();
    window.addEventListener('scroll', checkNav);
});