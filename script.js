document.addEventListener("DOMContentLoaded", function() {
  // QR CODE
  new QRCode(document.getElementById("qrcode"), {
    text: window.location.href,
    width: 140,
    height: 140,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });

  // COPY EMAIL BUTTON
  const copyBtn = document.getElementById("copyEmail");
  const toast = document.getElementById("toast");
  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText("contact.saltpepperduo@gmail.com").then(() => {
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 1500);
    });
  });

  // SCROLL ARROWS
  document.querySelectorAll(".down-arrow").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = document.querySelector(btn.dataset.target);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });

  // SCROLL WITH ARROW KEYS
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
});
