document.addEventListener("DOMContentLoaded", function() {
  // ----------------- QR CODE -----------------
  new QRCode(document.getElementById("qrcode"), {
    text: window.location.href,
    width: 140,
    height: 140,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });

  // ----------------- COPY EMAIL BUTTON -----------------
  const copyBtn = document.getElementById("copyEmail");
  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText("contact.saltpepperduo@gmail.com").then(() => {
      const originalText = copyBtn.textContent;
      copyBtn.textContent = "Copied!";
      copyBtn.disabled = true;
      copyBtn.style.background = "rgba(0,255,0,0.3)";
      setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.disabled = false;
        copyBtn.style.background = "rgba(255,255,255,0.15)";
      }, 1500);
    });
  });

  // ----------------- SCROLL PILER -----------------
  document.querySelectorAll(".down-arrow").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = document.querySelector(btn.dataset.target);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });

  // ----------------- SCROLL WITH ARROW KEYS -----------------
  document.addEventListener("keydown", function(e) {
    const sections = document.querySelectorAll(".section");
    const currentScroll = window.scrollY;
    let currentIndex = 0;
    sections.forEach((sec, i) => {
      if (sec.offsetTop <= currentScroll + 10) currentIndex = i;
    });
    if (e.key === "ArrowDown") {
      if (currentIndex < sections.length - 1) sections[currentIndex + 1].scrollIntoView({ behavior: "smooth" });
    }
    if (e.key === "ArrowUp") {
      if (currentIndex > 0) sections[currentIndex - 1].scrollIntoView({ behavior: "smooth" });
    }
  });

  // ----------------- YOUTUBE OVERLAY -----------------
  const youtubeSection = document.querySelector(".section-3");
  if (youtubeSection) {
    const overlay = document.createElement("div");
    overlay.style.position = "absolute";
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
    overlay.style.zIndex = "0";
    youtubeSection.appendChild(overlay);

    const container = youtubeSection.querySelector(".youtube-videos");
    if (container) container.style.position = "relative";
  }
});
