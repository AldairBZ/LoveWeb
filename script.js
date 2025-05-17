const canvas = document.getElementById('fondo');
const ctx = canvas.getContext('2d');
let W, H;

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// Estrellas
const stars = Array.from({ length: 50 }, () => ({
  x: Math.random() * W,
  y: Math.random() * H,
  r: Math.random() * 1.5 + 0.5,
  alpha: Math.random()
}));

function drawStars() {
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#ffffff';
  stars.forEach(s => {
    ctx.globalAlpha = s.alpha;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;
}

// Corazones flotantes
const heartImg = new Image();
heartImg.src = 'corazon.png';

const hearts = [];
for (let i = 0; i < 15; i++) {
  hearts.push({
    x: Math.random() * (W - 30),
    y: H + Math.random() * 100,
    speed: Math.random() * 1.5 + 0.5,
    size: 30,
    grow: 0
  });
}

function drawHearts() {
  hearts.forEach(h => {
    if (h.grow > 0) {
      h.size = 40;
      h.grow--;
    } else {
      h.size = 30;
    }

    ctx.drawImage(heartImg, h.x, h.y, h.size, h.size);
    h.y -= h.speed;

    if (h.y < -20) {
      h.y = H + 20;
      h.x = Math.random() * (W - 30);
    }
  });
}

canvas.addEventListener('click', function (e) {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  hearts.forEach(h => {
    const dx = mouseX - h.x;
    const dy = mouseY - h.y;
    if (dx >= 0 && dx <= h.size && dy >= 0 && dy <= h.size) {
      h.grow = 10;
    }
  });
});

function loop() {
  drawStars();
  if (heartImg.complete) {
    drawHearts();
  }
  requestAnimationFrame(loop);
}

heartImg.onload = loop;
