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

// ========== MESSAGE DATA ==========
const messageData = {
  friend: [
    { icon: "😎", text: "Hôm nay là ngày của mày! Tao biết mày ghét lời sáo rỗng nên chỉ nói gọn: <em>mày xịn lắm đó!</em> 🔥" },
    { icon: "🤣", text: "Cảm ơn vì đã nghe tao than thở không charge phí. Chúc mày 8/3 <em>không có gì để than</em> nhé! 😄" },
    { icon: "💪", text: "Mày mạnh mẽ, thông minh, duyên dáng — và may mắn vì có <strong>tao</strong> làm bạn! Chúc 8/3 vui 😄" },
    { icon: "✨", text: "Chúc bạn thân mãi vui vẻ, mãi trẻ đẹp — và mãi <em>chịu chơi với tao</em>! 🌈" },
    { icon: "☕", text: "8/3 chúc mày: làm gì cũng thành, yêu ai cũng được đáp lại, cà phê <em>không bao giờ nguội</em>! ☕" },
    { icon: "🌺", text: "Bạn không cần ngày 8/3 để biết mình đặc biệt — nhưng hôm nay <em>tao nhắc mày thêm lần nữa</em> đó! 🌺" },
    { icon: "🦋", text: "Nhớ hồi xưa mày hay nói 'tao bình thường thôi'. Giờ nhìn lại — <em>mày có biết mày ngầu thế nào không?!</em> 😤" },
  ],
  colleague: [
    { icon: "💼", text: "Chúc đồng nghiệp 8/3 vui: <em>inbox nhẹ, meeting ít</em>, deadline vẫn là deadline nhưng tinh thần thì ok!" },
    { icon: "☕", text: "Cảm ơn vì mỗi ngày cùng chiến đấu với công việc. Bạn làm cả team <em>bớt loạn</em> đi nhiều lắm! 😄" },
    { icon: "🏆", text: "Người phụ nữ giỏi nhất team — tôi nghĩ vậy mọi ngày, <em>hôm nay mới nhớ gõ ra thôi</em> 😅 Chúc 8/3!" },
    { icon: "🌟", text: "Chúc bạn: làm việc vui, <em>lương tăng nhanh</em>, sếp hiền và có người mang cà phê lên tận bàn! ✨" },
    { icon: "🎯", text: "Ở công ty may mắn có bạn — người luôn làm việc nhóm <em>bớt... nhóm</em>. Chúc 8/3 nhiều năng lượng!" },
    { icon: "🌸", text: "Bạn chứng minh mỗi ngày: phụ nữ có thể làm tốt mọi thứ — kể cả <em>chịu đựng tôi</em>. Cảm ơn và chúc 8/3! 😄" },
    { icon: "🚀", text: "Công việc có lúc loạn, deadline có lúc căng — nhưng may mắn là có bạn trong team. <em>Cảm ơn vì không bỏ cuộc!</em>" },
  ],
  family: [
    { icon: "❤️", text: "Cảm ơn vì sự hi sinh thầm lặng, những bữa cơm ấm áp, những lần chăm sóc không cần ai nói lời cảm ơn. <em>Con/Em yêu!</em>" },
    { icon: "🌸", text: "Chúc mẹ/chị ngày 8/3: sức khỏe dồi dào, <em>luôn được yêu thương</em> xứng đáng với tất cả những gì đã cho đi." },
    { icon: "💖", text: "Bạn là người phụ nữ phi thường trong cuộc đời tôi. <em>Mỗi ngày bạn là chính mình đã là điều kỳ diệu</em>!" },
    { icon: "🌺", text: "8/3 nhắc tôi nói ra điều tôi cảm nhận mỗi ngày: <em>bạn là điểm tựa của cả gia đình</em>. Cảm ơn vì luôn ở đó!" },
    { icon: "🌙", text: "Chúc người phụ nữ tôi yêu thương nhất: luôn mạnh mẽ, hạnh phúc và biết rằng <em>luôn có người yêu thương bạn vô điều kiện</em>!" },
    { icon: "🌼", text: "Không cần ngày đặc biệt để nhớ bạn quan trọng thế nào — nhưng hôm nay 8/3, <em>tôi muốn nói to lên</em>: Con/Em yêu bạn!" },
    { icon: "🫂", text: "Bạn đã dạy tôi cách yêu thương, kiên nhẫn và mạnh mẽ — chỉ bằng cách <em>sống như bạn vẫn sống mỗi ngày</em>. Cảm ơn!" },
  ],
};

// ========== MESSAGE SYSTEM ==========
let currentCat = "friend";
const shownIndices = { friend: [], colleague: [], family: [] };

const msgIcon = document.getElementById("msg-icon");
const msgText = document.getElementById("msg-text");
const messageDisplay = document.getElementById("message-display");

function getRandomMsg(cat) {
  const msgs = messageData[cat];
  let available = msgs.map((_, i) => i).filter((i) => !shownIndices[cat].includes(i));
  if (available.length === 0) {
    shownIndices[cat] = [];
    available = msgs.map((_, i) => i);
  }
  const idx = available[Math.floor(Math.random() * available.length)];
  shownIndices[cat].push(idx);
  return msgs[idx];
}

function showMsg(cat) {
  const msg = getRandomMsg(cat);
  // Trigger re-animation
  messageDisplay.classList.remove("pop");
  void messageDisplay.offsetWidth;
  messageDisplay.classList.add("pop");
  msgIcon.textContent = msg.icon;
  msgText.innerHTML = msg.text;
}

// Category buttons
document.querySelectorAll(".cat-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".cat-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentCat = btn.dataset.cat;
    showMsg(currentCat);
  });
});

// Shuffle button
document.getElementById("shuffle-btn").addEventListener("click", () => {
  showMsg(currentCat);
});

// Swipe support (mobile)
let touchStartX = 0;
messageDisplay.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
}, { passive: true });
messageDisplay.addEventListener("touchend", (e) => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) showMsg(currentCat);
}, { passive: true });

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
    showMsg(currentCat);
  }, 560);
});

// ========== INIT ==========
window.addEventListener("load", () => {
  initStars();
  initPetals();
  initCursorSparkles();
});
