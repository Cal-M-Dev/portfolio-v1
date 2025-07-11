// Canvas
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// PARTICLE_COUNTS
const INTERACTIVE_COUNT = 150;
const STATIC_COUNT = 40;

let isHomeMode = true;
let particles = [];
const MAX_SPEED = 0.5;

const mouse = { x: null, y: null };
window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

function Particle(index, interactive) {
    this.interactive = interactive;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.size = Math.random() * 1.2 + 0.8;

    const count = interactive
        ? INTERACTIVE_COUNT
        : STATIC_COUNT;
    
    if (index < count / 2) {
        this.color = 'rgba(175, 20, 61, 0.4)';
    } else {
        this.color = 'rgba(19, 117, 182, 0.4)';
    }
}

Particle.prototype.update = function() {
    this.x += this.vx;
    this.y += this.vy;

    if(this.x < 0 || this.x > canvas.width) {
        this.vx = -this.vx;
    }
    if(this.y < 0 || this.y> canvas.height) {
        this.vy = -this.vy;
    }

    const speed = Math.hypot(this.vx, this.vy)
    if (speed > MAX_SPEED) {
        this.vx = (this.vx / speed) * MAX_SPEED;
        this.vy = (this.vy / speed) * MAX_SPEED;
    }
};

Particle.prototype.draw = function() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
}

function initParticles() {
    particles = [];
    const count = isHomeMode ? INTERACTIVE_COUNT : STATIC_COUNT;
    for (let i = 0; i < count; i++) {
        particles.push(new Particle(i, isHomeMode));
    }
}

initParticles();

window.addEventListener('scroll', () => {
    const inHome = window.scrollY < canvas.height;
    if (inHome !== isHomeMode) {
        isHomeMode = inHome;
        initParticles();
    }
});

function animate() {
    ctx.clearRect (0,0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    if (isHomeMode) {
        particles.forEach(p => {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 100) {
            const force = (100 - dist) / 100 * 0.5;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
            }
        });
    }

    requestAnimationFrame(animate);
}

animate();