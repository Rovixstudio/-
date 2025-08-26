const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.z = Math.random() * width;
    this.radius = Math.random() * 2 + 1;
    this.speed = Math.random() * 0.05 + 0.02;
    this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
  }

  update() {
    this.z -= this.speed * 10;
    if (this.z <= 0) this.reset();
  }

  draw() {
    const sx = (this.x - width / 2) * (width / this.z) + width / 2;
    const sy = (this.y - height / 2) * (width / this.z) + height / 2;
    const r = this.radius * (width / this.z);
    ctx.beginPath();
    ctx.arc(sx, sy, r, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 20;
    ctx.fill();
  }
}

const particles = [];
const particleCount = 1000;

for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle());
}

function animate() {
  ctx.fillStyle = 'rgba(0,0,0,0.15)';
  ctx.fillRect(0, 0, width, height);

  particles.forEach(p => {
    p.update();
    p.draw();
  });

  requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

animate();
