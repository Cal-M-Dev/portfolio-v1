console.log("V1 script loaded!");

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


// Canvas
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const mouse = { x: null, y: null };
window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

const PARTICLE_COUNT = 150;
const particles = [];
const MAX_SPEED = 0.1;

function Particle(index) {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.size = Math.random() * 1.2 + 0.8;

    if (index < PARTICLE_COUNT / 2) {
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
};

Particle.prototype.draw = function() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
}

for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle(i));
}

function animate() {
    ctx.clearRect (0,0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    particles.forEach(p => {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 100) {
            const force = (100 - dist) / 100 * 0.5;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;

            const speed = Math.hypot (p.vx, p.vx)
            if (speed > MAX_SPEED) {
                p.vx = (p.vx / speed) * MAX_SPEED;
                p.vy = (p.vy / speed) * MAX_SPEED;
            }
        }
    });

    requestAnimationFrame(animate);
}

animate();