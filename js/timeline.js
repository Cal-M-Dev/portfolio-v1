
document.addEventListener("DOMContentLoaded", () => {
    console.log("Timeline Loaded");

    const timelineEvents = [
        {date: "06/2025", title: "Started CS50x", description: "Intro to computer science, multiple beginner projects using C, Python, Javascript, CSS, HTML, SQL"},
        {date: "07/2025", title: "Finished CS50x Final Project", description: "Made V1 version of my portfolio website using Javascript, CSS, HTML"},
        {date: "07/2025", title: "Started CS50 Python", description: "Building Python fluency"},
        {date: "PLACEHOLDER", title: "PLACEHOLDER", description: "PLACEHOLDER"},
        {date: "PLACEHOLDER", title: "PLACEHOLDER", description: "PLACEHOLDER"},
        {date: "PLACEHOLDER", title: "PLACEHOLDER", description: "PLACEHOLDER"}         
    ];

    const eventsList = document.querySelector(".events");
    if (!eventsList) {
        console.error("Events list not found");
        return;
    }

    timelineEvents.forEach(ev => {
        const li = document.createElement("li");

        li.innerHTML = `
            <div class="content">
                <time datetime="${ev.date}">${ev.date.replace('-', '/')}</time>
                <h4>${ev.title}</h4>
                <p>${ev.description}</p>
            </div>
        `;

        eventsList.appendChild(li);
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, {threshold: 0.15});

    document.querySelectorAll(".events li").forEach(li => {
        observer.observe(li);
    });
});