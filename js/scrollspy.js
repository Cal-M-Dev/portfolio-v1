// Active Navbar on page scroll
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            const link = document.querySelector(`.nav-links a[href="#${id}"]`);

            if (entry.isIntersecting) {
                link.parentElement.classList.add('active');
            } else {
                link.parentElement.classList.remove('active');
            }
        });
    },      {
        rootMargin: '-50% 0px -50% 0px'
    });

    sections.forEach(section => observer.observe(section));
});