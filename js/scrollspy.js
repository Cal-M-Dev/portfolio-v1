document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const hero = document.querySelector(".hero");
  const sections = Array.from(document.querySelectorAll("section[id]"));
  const navLinks = document.querySelectorAll(".nav-links a");

  let observer = null;
  let isAutoScroll = false;
  let scrollSettleTimer = null;

  if (hero && header) {
  const heroObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.intersectionRatio < 0.2) {
        header.classList.add("show-nav");
      } else {
        header.classList.remove("show-nav");
      }
    },
    {
      root: null,
      threshold: [0, 0.2, 0.5, 1],
    }
  );
  heroObserver.observe(hero);
}

  function setActive(id) {
    navLinks.forEach((a) => {
      const li = a.closest("li");
      if (!li) return;
      const shouldBeActive = a.getAttribute("href") === `#${id}`;
      if (shouldBeActive) {
        if (!li.classList.contains("active")) {
          li.classList.add("active");
        }
      } else {
        li.classList.remove("active");
      }
    });
  }

  function createObserver() {
    if (observer) {
      observer.disconnect();
    }

    observer = new IntersectionObserver(
      (entries) => {
        if (isAutoScroll) return;
      
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;

        visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const topSection = visible[0].target;
        setActive(topSection.id);
      },
      {
        root: null,
        rootMargin: `-${header.offsetHeight}px 0px 0px 0px`,
        threshold: [0.25, 0.5, 0.75],
      }
    );

    sections.forEach((sec) => observer.observe(sec));
  }

  createObserver();

  const resizeObserver = new ResizeObserver(() => {
    createObserver();
  });
  if (header) {
    resizeObserver.observe(header);
  }

  function scheduleAutoScrollEnd() {
    clearTimeout(scrollSettleTimer);
    scrollSettleTimer = setTimeout(() => {
      isAutoScroll = false;
    }, 250);
  }

  window.addEventListener("scroll", () => {
    if (isAutoScroll) {
      scheduleAutoScrollEnd();
      }
    }, 
    { passive: true }
  );
    
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const dest = link.getAttribute("href").slice(1);
      setActive(dest);

      isAutoScroll = true;
      scheduleAutoScrollEnd();

    });
  });
});

