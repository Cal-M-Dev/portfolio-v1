console.log("Timeline Loaded");
const timelineEvents = [
    {date: "06/2025", title: "Started CS50x", description: "Intro to computer science, multiple beginner projects using C, Python, Javascript, CSS, HTML, SQL"},
    {date: "07/2025", title: "Finished CS50x Final Project", description: "Made V1 version of my portfolio website using Javascript, CSS, HTML"},
    {date: "07/2025", title: "Started CS50 Python", description: "Building Python fluency"}   
]

const eventsList = document.querySelector(".events");

timelineEvents.forEach(event => {
    const li = document.createElement("li");

    li.innerHTML = `
        <h4>${event.date} - ${event.title}</h4>
        <p>${event.description}</p>
    `;

    eventsList.appendChild(li);
});