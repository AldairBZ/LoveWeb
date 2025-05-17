// Configuración
const canvas = document.getElementById('fondo');
const ctx = canvas.getContext('2d');
let W, H;

// Ajusta tamaño
function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// Dibujar estrellas
const stars = Array.from({length:50}, () => ({
  x: Math.random()*W, y: Math.random()*H,
  r: Math.random()*1.5+0.5,
  alpha: Math.random()
}));

function drawStars() {
  ctx.clearRect(0,0,W,H);
  ctx.fillStyle = '#ffffff';
  stars.forEach(s => {
    ctx.globalAlpha = s.alpha;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, 2*Math.PI);
    ctx.fill();
  });
  ctx.globalAlpha = 1;
}

// Cargar corazón
const heartImg = new Image();
heartImg.src = 'corazon.png';

// Corazones flotantes
const hearts = [];
for(let i=0;i<15;i++){
  hearts.push({
    x: Math.random()*(W-30),
    y: H + Math.random()*100,
    speed: Math.random()*1.5+0.5
  });
}

function drawHearts() {
  hearts.forEach(h => {
    ctx.drawImage(heartImg, h.x, h.y, 30, 30);
    h.y -= h.speed;
    if(h.y < -20){
      h.y = H + 20;
      h.x = Math.random()*(W-30);
    }
  });
}

function loop() {
  drawStars();
  drawHearts();
  requestAnimationFrame(loop);
}
heartImg.onload = loop;
