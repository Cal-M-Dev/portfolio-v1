// Canvas
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
const header = document.querySelector('header');
const hero = document.querySelector('.hero');
const navHeight = header.offsetHeight;

const MAX_SPEED = 0.15;
const VELOCITY_SCALE = 0.25;
const morphInterval = 15;
const BASE_PARTICLE_OPACITY = 1.0;
const BASE_LINE_OPACITY = 1.0;
const MIN_VISIBILITY_OPACITY = 0.25;
const RED_RGB = '152, 18, 49';
const BLUE_RGB = '120,200,255';
const mouse = { x: null, y: null };
const DURATION = 3000;
const STATIC_VELOCITY_SCALE = 0.02;
const STATIC_MAX_SPEED = 0.03;

let INTERACTIVE_COUNT,
    STATIC_COUNT,
    CONNECT_DIST,
    CONNECT_CURSOR_RADIUS,
    VISIBILITY_RADIUS,
    FULL_OPACITY_RADIUS,
    HALF_DISTANCE;

let isHomeMode = true;
let wasHomeMode = true;
let particles = [];
let frameCounter = 0;
let staticPoint = { x: 0, y: 0 };

updateResponsiveParams();
updateStaticPoint();

let currentFocus = { x: canvas.width/2, y: canvas.height/2};
let currentCount = INTERACTIVE_COUNT;
let targetCount = INTERACTIVE_COUNT;
let currentVelScale = VELOCITY_SCALE;
let targetVelScale = VELOCITY_SCALE;
let currentMaxSpeed = MAX_SPEED;
let targetMaxSpeed = MAX_SPEED;
let Time = performance.now();

const observer = new IntersectionObserver(
    ([entry]) => {
        isHomeMode = entry.intersectionRatio > 0;
        targetCount = isHomeMode ? INTERACTIVE_COUNT : STATIC_COUNT;
        targetVelScale = isHomeMode ? VELOCITY_SCALE : STATIC_VELOCITY_SCALE;
        targetMaxSpeed = isHomeMode ? MAX_SPEED : STATIC_MAX_SPEED;
    }, {
        root: null,
        rootMargin: `-${navHeight}px 0px 0px 0px`,
        threshold: 0
    }
);

observer.observe(hero);

window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

window.addEventListener('resize', () => {
    resizeCanvas();
    updateStaticPoint();
    updateResponsiveParams();
    initParticles();
});

window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function updateResponsiveParams(){
    const w = window.innerWidth;

    if (w < 600) {
        // Small Screen
        INTERACTIVE_COUNT = 250;
        STATIC_COUNT = 100;
        CONNECT_DIST = 90;
        CONNECT_CURSOR_RADIUS = 200;
        VISIBILITY_RADIUS = 400;
        FULL_OPACITY_RADIUS = 100;
        HALF_DISTANCE = 200;

    } else if (w < 1200) {
        // Medium Screen
        INTERACTIVE_COUNT = 350;
        STATIC_COUNT = 200;
        CONNECT_DIST = 85;
        CONNECT_CURSOR_RADIUS = 200;
        VISIBILITY_RADIUS = 450;
        FULL_OPACITY_RADIUS = 200;
        HALF_DISTANCE = 150;
    
    } else if (w < 1600) {
        // Medium Screen
        INTERACTIVE_COUNT = 500;
        STATIC_COUNT = 200;
        CONNECT_DIST = 100;
        CONNECT_CURSOR_RADIUS = 250;
        VISIBILITY_RADIUS = 600;
        FULL_OPACITY_RADIUS = 250;
        HALF_DISTANCE = 200;

    } else {
        // Large Screen
        INTERACTIVE_COUNT = 700;
        STATIC_COUNT = 450;
        CONNECT_DIST = 100;
        CONNECT_CURSOR_RADIUS = 350;
        VISIBILITY_RADIUS = 900;
        FULL_OPACITY_RADIUS = 300;
        HALF_DISTANCE = 350;
    }
}

function updateStaticPoint() {
    staticPoint.x = canvas.width * 0.8;
    staticPoint.y = canvas.height * 0.15;
}

function Particle(index, interactive) {
    this.interactive = interactive;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * currentVelScale;
    this.vy = (Math.random() - 0.5) * currentVelScale;
    this.maxSpeed = currentMaxSpeed;
    this.size = Math.random() * 1 + 0.5;

    const count = interactive
        ? INTERACTIVE_COUNT
        : STATIC_COUNT;
    
    this.rgb = index < count/2
        ? RED_RGB
        : BLUE_RGB;

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
    if (speed > this.maxSpeed) {
        this.vx = (this.vx / speed) * this.maxSpeed;
        this.vy = (this.vy / speed) * this.maxSpeed;
    }
};

function initParticles() {
    particles = [];
    const count = isHomeMode ? INTERACTIVE_COUNT : STATIC_COUNT;
    for (let i = 0; i < count; i++) {
        particles.push(new Particle(i, isHomeMode));
    }
}

function animate(now) {

    const dt = now - Time;
    Time = now;
    const t = Math.min(dt / DURATION, 1);

    currentCount += (targetCount - currentCount) * t;
    currentVelScale += (targetVelScale - currentVelScale) * t;
    currentMaxSpeed += (targetMaxSpeed - currentMaxSpeed) * t;

    staticPoint.x = canvas.width * 0.75;
    staticPoint.y = canvas.height * 0.25;
    ctx.clearRect(0,0, canvas.width, canvas.height);

    const target = isHomeMode ? mouse : staticPoint;
    if (!isHomeMode && wasHomeMode) {
        currentFocus.x = mouse.x;
        currentFocus.y = mouse.y;
    }
    if (!isHomeMode) {
        currentFocus.x += (target.x - currentFocus.x) * t;
        currentFocus.y += (target.y - currentFocus.y) * t;
    } else {
        currentFocus.x = mouse.x;
        currentFocus.y = mouse.y;
    }
    wasHomeMode = isHomeMode;
    const focus = currentFocus;

    const visibleCount = Math.round(currentCount);

    if (++frameCounter >= morphInterval) {
      frameCounter = 0;

      if (particles.length < visibleCount) {
        particles.push(new Particle(particles.length, isHomeMode));
      } else if (particles.length > visibleCount) {
        particles[particles.length - 1].fading = true;
      }
    }

    particles.forEach((p, i) => {

        p.rgb = i < Math.ceil(visibleCount/2)
            ? RED_RGB
            : BLUE_RGB;
    
        const dx = p.x - focus.x;
        const dy = p.y - focus.y;
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
    
        const d1 = Math.hypot(p1.x - focus.x, p1.y - focus.y);
        const d2 = Math.hypot(p2.x - focus.x, p2.y - focus.y);

        if (d1 > CONNECT_CURSOR_RADIUS || d2 > CONNECT_CURSOR_RADIUS) continue;

        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.hypot(dx, dy);
        
        if (dist >= CONNECT_DIST) continue;

        const v1 = Math.pow(2, -d1 / HALF_DISTANCE);
        const v2 = Math.pow(2, -d2 / HALF_DISTANCE);

        const visLine = Math.min(v1, v2);

        const baseAlpha = 1 - dist / CONNECT_DIST;
        const alpha     = baseAlpha * BASE_LINE_OPACITY * visLine;

        ctx.strokeStyle = `rgba(${BLUE_RGB}, ${alpha})`;
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
requestAnimationFrame(animate);