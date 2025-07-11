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
const STATIC_COUNT = 50;
const MAX_SPEED = 0.3;
const VELOCITY_SCALE = 0.15;
const morphInterval = 15;

let isHomeMode = true;
let particles = [];
let targetCount = INTERACTIVE_COUNT;
let frameCounter = 0;


const mouse = { x: null, y: null };
window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

function Particle(index, interactive) {
    this.interactive = interactive;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * VELOCITY_SCALE;
    this.vy = (Math.random() - 0.5) * VELOCITY_SCALE;
    this.size = Math.random() * 1.2 + 0.8;

    const count = interactive
        ? INTERACTIVE_COUNT
        : STATIC_COUNT;
    
    this.rgb = index < count/2
        ? '175,20,61'
        : '19,117,182';

    this.alpha = 1;
    this.fading = false;
    this.fadeRate = 0.02;
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

    const speed = Math.hypot(this.vx, this.vy);
    if (speed > MAX_SPEED) {
        this.vx = (this.vx / speed) * MAX_SPEED;
        this.vy = (this.vy / speed) * MAX_SPEED;
    }
};

Particle.prototype.draw = function() {
    ctx.fillStyle = `rgba(${this.rgb}, ${this.alpha * 0.4})`;
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

window.addEventListener('scroll', () => {
    const inHome = window.scrollY < canvas.height;
    if (inHome !== isHomeMode) {
        isHomeMode = inHome;
        targetCount = isHomeMode ? INTERACTIVE_COUNT : STATIC_COUNT;
    }
});

function animate() {
    ctx.clearRect(0,0, canvas.width, canvas.height);

    
    if (++frameCounter >= morphInterval) {
      frameCounter = 0;

      if (particles.length < targetCount) {
        particles.push(new Particle(particles.length, isHomeMode));
      } else if (particles.length > targetCount) {
        particles[particles.length - 1].fading = true;
      }
    }

    particles.forEach((p, i) => {
        p.interactive = isHomeMode;
        const half = Math.ceil(targetCount / 2);
        p.color = i < half
            ? 'rgba(175, 20, 61, 0.4)'
            : 'rgba(19, 117, 182, 0.4)';
    });

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    if (isHomeMode) {
        particles.forEach(p => {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 50) {
            const force = (50 - dist) / 50 * 0.5;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
            }
        });
    }

    particles = particles.filter(p => {
        if (p.fading) {
            p.alpha -= p.fadeRate;
            return p.alpha > 0;
        }
        return true;
    });

    requestAnimationFrame(animate);
}
initParticles();
animate();