document.addEventListener("DOMContentLoaded", () => {
    console.log("Projects Loaded");

    const projects = [
        {
            title: "Project 1",
            subtitle: "Starter Template",
            date: "08/2025",
            description: "Placeholder project for displaying structure and design.",
            tech: ["HTML", "CSS", "JavaScript"],
            demo: "#",
            repo: "#",
            status: "Planning",
        },
        {
            title: "Project 2",
            subtitle: "Template",
            date: "09/2025",
            description: "Template for future projects.",
            tech: ["HTML", "CSS", "JavaScript"],
            demo: "#",
            repo: "#",
            status: "In Progress",
        },
        {
            title: "Project 3",
            subtitle: "Template",
            date: "10/2025",
            description: "Template for future projects.",
            tech: ["HTML", "CSS", "JavaScript"],
            demo: "#",
            repo: "#",
            status: "In Progress",
        },
    ];

    function renderProjects() {
        const container = document.querySelector(".projects-grid");
        if (!container) return;

        container.innerHTML = projects
            .map((p) => {
                const techHtml = (p.tech || [])
                .map((t) => `<div class="tech-badge">${t}</div>`)
                .join("");

            return `
                <div class="project-card">
                    <div class="status-tag">${p.status}</div>
                    
                    <div class="project title">
                        <div>${p.title}</div>
                        <div class="project-meta">${p.date}</div>
                    </div>

                    <div class="project-desc">${p.description}</div>

                    <div class="tech-list">
                        ${techHtml}
                    </div>

                    <div class="links">
                        <a href="${p.demo}" target="_blank" rel="noopener">Project Demo</a>
                        <a href="${p.repo}" target="_blank" rel="noopener">Repository</a>
                    </div>
                </div>
            `;
        })
        .join("");
    }

    renderProjects();

    const observer = new IntersectionObserver(
        (entires) => {
            entires.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    requestAnimationFrame(() => {
        document.querySelectorAll(".project-card").forEach((card) => {
            observer.observe(card);
        });
    });
});



    