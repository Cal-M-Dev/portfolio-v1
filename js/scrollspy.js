document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const sections = Array.from(document.querySelectorAll("section[id]"));
  const navLinks = document.querySelectorAll(".nav-links a");
  
  function setActive(id) {
    navLinks.forEach((a) => {
      const li = a.closest("li");
      if (!li) return;
      if (a.getAttribute("href") === `#${id}`) {
        li.classList.add("active");
      } else {
        li.classList.remove("active");
      }
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    {
      root: null,
      rootMargin: `-${header.offsetHeight}px 0px 0px 0px`,
      threshold: 0.5,
    }
  );

  sections.forEach((sec) => observer.observe(sec));

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const dest = link.getAttribute("href").slice(1);
      setActive(dest);
    });
  });
});