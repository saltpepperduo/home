document.addEventListener("DOMContentLoaded", function() {
  // ----------------- QR KODE -----------------
  new QRCode(document.getElementById("qrcode"), {
    text: window.location.href,
    width: 140,
    height: 140,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });

  // ----------------- FOOTER YEAR -----------------
  document.getElementById("year").textContent = new Date().getFullYear();

  // ----------------- SCROLL PILER -----------------
  document.querySelectorAll(".down-arrow").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = document.querySelector(btn.dataset.target);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });

  // ----------------- COPY EMAIL MED TOAST UNDER KNAPP -----------------
  const copyBtn = document.getElementById("copyEmail");
  const toast = document.getElementById("toast");
  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText("contact.saltpepperduo@gmail.com").then(() => {
      const rect = copyBtn.getBoundingClientRect();
      toast.style.top = (rect.bottom + window.scrollY + 6) + "px";
      toast.style.left = (rect.left + rect.width/2 - toast.offsetWidth/2 + window.scrollX) + "px";
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 2000);
    });
  });

  // ----------------- YOUTUBE VIDEOS -----------------
  fetch("youtube.txt")
    .then(resp => resp.text())
    .then(data => {
      const container = document.getElementById("youtube-videos");
      const lines = data.split("\n").map(l => l.trim()).filter(l => l.length > 0);
      lines.forEach(line => {
        const parts = line.split(",");
        if (parts.length >= 2) {
          const title = parts[0].trim();
          const url = parts[1].trim();
          const videoId = url.includes("v=") ? url.split("v=")[1].split("&")[0] : url;
          const h3 = document.createElement("h3");
          h3.textContent = title;
          const iframe = document.createElement("iframe");
          iframe.src = `https://www.youtube.com/embed/${videoId}`;
          iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
          iframe.allowFullscreen = true;
          container.appendChild(h3);
          container.appendChild(iframe);
        }
      });
    });

  // ----------------- SCROLL MED PILTASTER -----------------
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

  // ----------------- YOUTUBE BAKGRUNNSFILTER -----------------
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
  }
});
