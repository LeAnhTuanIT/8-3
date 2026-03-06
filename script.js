// 1. Hiệu ứng cánh hoa rơi rực rỡ
function initPetals() {
  const petals = ["🌸", "🌹", "🌷", "✨", "💖", "🌼"];
  const container = document.getElementById("flower-container");

  setInterval(() => {
    const petal = document.createElement("div");
    petal.className = "petal";
    petal.innerHTML = petals[Math.floor(Math.random() * petals.length)];

    // Ngẫu nhiên vị trí và kích thước
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.fontSize = Math.random() * 25 + 10 + "px";
    petal.style.animationDuration = Math.random() * 4 + 4 + "s";
    petal.style.opacity = Math.random() * 0.7 + 0.3;

    container.appendChild(petal);

    // Dọn dẹp DOM (Senior tip!)
    setTimeout(() => petal.remove(), 7000);
  }, 400);
}

// 2. Logic tương tác mở quà
const giftSection = document.getElementById("gift-section");
const cardSection = document.getElementById("card-section");
const bgMusic = document.getElementById("bgMusic");

giftSection.addEventListener("click", function () {
  // Phát nhạc chill
  bgMusic.play().catch((e) => console.log("Yêu cầu tương tác để phát nhạc"));

  // Hiệu ứng pháo hoa cực mạnh
  const end = Date.now() + 2 * 1000;
  const colors = ["#ff758c", "#ffafbd", "#ffffff"];

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();

  // Chuyển đổi giao diện mượt mà
  giftSection.style.transition = "all 0.5s ease";
  giftSection.style.transform = "scale(0) rotate(180deg)";
  giftSection.style.opacity = "0";

  setTimeout(() => {
    giftSection.style.display = "none";
    cardSection.style.display = "block";
    setTimeout(() => cardSection.classList.add("show"), 50);
  }, 500);
});

// Chạy khởi tạo khi trang load xong
window.onload = initPetals;
