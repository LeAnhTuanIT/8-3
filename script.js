// ========== ANIMATED STARS ==========
function initStars() {
  const canvas = document.getElementById("stars-canvas");
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const stars = Array.from({ length: 200 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.8 + 0.3,
    alpha: Math.random(),
    delta: (Math.random() * 0.018 + 0.004) * (Math.random() > 0.5 ? 1 : -1),
  }));

  (function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach((s) => {
      s.alpha += s.delta;
      if (s.alpha <= 0.05 || s.alpha >= 1) s.delta *= -1;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 210, 240, ${s.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  })();
}

// ========== FALLING PETALS ==========
function initPetals() {
  const emojis = ["🌸", "🌹", "🌷", "✨", "💖", "🌼", "💫", "⭐", "🌺"];
  const container = document.getElementById("petals-container");

  setInterval(() => {
    const el = document.createElement("div");
    el.className = "petal";
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = Math.random() * 100 + "vw";
    el.style.fontSize = Math.random() * 18 + 11 + "px";
    const dur = Math.random() * 5 + 6;
    el.style.animationDuration = dur + "s";
    el.style.opacity = (Math.random() * 0.5 + 0.5).toString();
    container.appendChild(el);
    setTimeout(() => el.remove(), dur * 1000 + 300);
  }, 420);
}

// ========== CURSOR SPARKLES ==========
function initCursorSparkles() {
  const style = document.createElement("style");
  style.textContent = `
    .spark {
      position: fixed;
      border-radius: 50%;
      pointer-events: none;
      z-index: 999;
      animation: sparkOut 0.6s ease forwards;
    }
    @keyframes sparkOut {
      0%   { transform: scale(1) translateY(0);   opacity: 1; }
      100% { transform: scale(0) translateY(-22px); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  const colors = ["#ffd700", "#ff758c", "#ff4e8b", "#d4106f", "#ffffff", "#ffafbd"];

  document.addEventListener("mousemove", (e) => {
    if (Math.random() > 0.8) {
      const s = document.createElement("div");
      s.className = "spark";
      const size = Math.random() * 9 + 4;
      s.style.cssText = `
        left: ${e.clientX - size / 2}px;
        top:  ${e.clientY - size / 2}px;
        width: ${size}px;
        height: ${size}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
      `;
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 650);
    }
  });
}

// ========== MUSIC TOGGLE ==========
const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("music-btn");
let musicOn = false;

musicBtn.addEventListener("click", () => {
  if (musicOn) {
    bgMusic.pause();
    musicBtn.textContent = "🔇";
    musicBtn.classList.add("off");
  } else {
    bgMusic.play().catch(() => {});
    musicBtn.textContent = "🎵";
    musicBtn.classList.remove("off");
  }
  musicOn = !musicOn;
});

// ========== MESSAGE ROTATION ==========
const msgs = Array.from(document.querySelectorAll(".msg"));
const dots = Array.from(document.querySelectorAll(".dot"));
let current = 0;
let autoTimer = null;

function goTo(idx) {
  msgs[current].classList.remove("active");
  dots[current].classList.remove("active");
  current = idx;
  msgs[current].classList.add("active");
  dots[current].classList.add("active");
}

function startAuto() {
  autoTimer = setInterval(() => goTo((current + 1) % msgs.length), 3800);
}

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    clearInterval(autoTimer);
    goTo(parseInt(dot.dataset.to));
    startAuto();
  });
});

// ========== GIFT CLICK ==========
const giftSection = document.getElementById("gift-section");
const cardSection = document.getElementById("card-section");

giftSection.addEventListener("click", function () {
  // Play music
  bgMusic.play().catch(() => {});
  musicOn = true;
  musicBtn.textContent = "🎵";
  musicBtn.classList.remove("off");

  // Big confetti from sides
  const end = Date.now() + 3000;
  const colors = ["#ff758c", "#ffafbd", "#ffd700", "#ffffff", "#d4106f", "#ff4e8b"];

  (function burst() {
    confetti({ particleCount: 6, angle: 60, spread: 80, origin: { x: 0, y: 0.65 }, colors });
    confetti({ particleCount: 6, angle: 120, spread: 80, origin: { x: 1, y: 0.65 }, colors });
    if (Date.now() < end) requestAnimationFrame(burst);
  })();

  // Center explosion
  confetti({
    particleCount: 100,
    spread: 130,
    origin: { x: 0.5, y: 0.55 },
    colors,
    startVelocity: 38,
    gravity: 0.85,
  });

  // Spin-out gift
  giftSection.style.transition = "all 0.55s cubic-bezier(0.6, -0.28, 0.74, 0.05)";
  giftSection.style.transform = "scale(0) rotate(720deg)";
  giftSection.style.opacity = "0";

  setTimeout(() => {
    giftSection.style.display = "none";
    cardSection.classList.add("open");
    startAuto();
  }, 560);
});

// ========== INIT ==========
window.addEventListener("load", () => {
  initStars();
  initPetals();
  initCursorSparkles();
});
