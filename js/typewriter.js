function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const sentences = [
    "Aspiring full-stack developer.",
    "Avid learner.",
];

const el = document.getElementById('typewriter');
let sentenceIndex = 0;
let charIndex = 0;
let deleting = false;

function tick() {
    const sentence = sentences[sentenceIndex];
    const nextCharCount = deleting
        ? charIndex - 1
        : charIndex + 1;
    
    charIndex = nextCharCount;
    el.textContent = sentence.slice(0, charIndex);

    if (!deleting && charIndex === sentence.length) {
        deleting = true;
        setTimeout(tick, 1000);
        return;
    }
    else if (deleting && charIndex === 0) {
        deleting = false;
        sentenceIndex = (sentenceIndex + 1) % sentences.length;
    }
    const delay = deleting
        ? randInt(30, 80)
        : randInt(50, 120);

    setTimeout(tick, delay);

}

document.addEventListener('DOMContentLoaded', tick);