// Canvas
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const MAX_SPEED = 0.2;
const VELOCITY_SCALE = 0.1;
const morphInterval = 15;
const BASE_PARTICLE_OPACITY = 1.0;
const BASE_LINE_OPACITY = 1.0;
const MIN_VISIBILITY_OPACITY = 0.15;

let INTERACTIVE_COUNT,
    STATIC_COUNT,
    CONNECT_DIST,
    CONNECT_CURSOR_RADIUS,
    VISIBILITY_RADIUS,
    FULL_OPACITY_RADIUS,
    HALF_DISTANCE;
    

function updateResponsiveParams(){
    const w = window.innerWidth;

    if (w < 600) {
        // Small Screen
        INTERACTIVE_COUNT = 200;
        STATIC_COUNT = 50;
        CONNECT_DIST = 80;
        CONNECT_CURSOR_RADIUS = 200;
        VISIBILITY_RADIUS = 400;
        FULL_OPACITY_RADIUS = 100;
        HALF_DISTANCE = 200;

    } else if (w < 1200) {
        // Medium Screen
        INTERACTIVE_COUNT = 400;
        STATIC_COUNT = 50;
        CONNECT_DIST = 75;
        CONNECT_CURSOR_RADIUS = 200;
        VISIBILITY_RADIUS = 450;
        FULL_OPACITY_RADIUS = 200;
        HALF_DISTANCE = 150;

    } else {
        // Large Screen
        INTERACTIVE_COUNT = 600;
        STATIC_COUNT = 50;
        CONNECT_DIST = 100;
        CONNECT_CURSOR_RADIUS = 300;
        VISIBILITY_RADIUS = 600;
        FULL_OPACITY_RADIUS = 250;
        HALF_DISTANCE = 200;
    }
}

updateResponsiveParams();

window.addEventListener('resize', () => {
    resizeCanvas();
    updateResponsiveParams();
    initParticles();
});


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
    this.size = Math.random() * 1 + 0.5;

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
       
        p.rgb = i < Math.ceil(targetCount/2)
            ? '175,20,61'
            : '19,117,182';

        const dx   = p.x - mouse.x;
        const dy   = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist >= VISIBILITY_RADIUS) return;

        let visFactor = dist <= FULL_OPACITY_RADIUS
            ? 1
            : Math.pow(2, -(dist - FULL_OPACITY_RADIUS) / HALF_DISTANCE);

    p.update();

        ctx.fillStyle = `rgba(${p.rgb}, ${p.alpha * BASE_PARTICLE_OPACITY * visFactor})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    });

  for (let i = 0; i < particles.length; i++) {
    const p1   = particles[i];
    for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
    
        const d1 = Math.hypot(p1.x - mouse.x, p1.y - mouse.y);
        const d2 = Math.hypot(p2.x - mouse.x, p2.y - mouse.y);

        if (d1 > CONNECT_CURSOR_RADIUS || d2 > CONNECT_CURSOR_RADIUS) continue;

        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.hypot(dx, dy);
        if (dist >= CONNECT_DIST) continue;

        const v1 = Math.pow(2, -(Math.hypot(p1.x - mouse.x, p1.y - mouse.y)) / 150);
        const v2 = Math.pow(2, -d2 / 150);

        const visLine = Math.min(v1, v2);

        const baseAlpha = 1 - dist / CONNECT_DIST;
        const alpha     = baseAlpha * BASE_LINE_OPACITY * visLine;

        ctx.strokeStyle = `rgba(19,117,182,${alpha})`;
        ctx.lineWidth   = 1;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
    }
  }

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