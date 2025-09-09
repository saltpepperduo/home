// Load YouTube videos
fetch("videos.txt")
  .then((response) => response.text())
  .then((data) => {
    const container = document.getElementById("videos");
    const lines = data.trim().split("\n");

    lines.forEach((line) => {
      const [url, title] = line.split(",");
      if (url && title) {
        const videoId = new URL(url).searchParams.get("v");
        const embedUrl = `https://www.youtube.com/embed/${videoId}`;

        const div = document.createElement("div");
        div.className = "video-item";
        div.innerHTML = `<h3>${title}</h3><iframe src="${embedUrl}" allowfullscreen></iframe>`;
        container.appendChild(div);
      }
    });
  });

// Copy email to clipboard
document.getElementById("copyEmail").addEventListener("click", () => {
  const email = "saltpepperduo@gmail.com";
  navigator.clipboard.writeText(email).then(() => {
    const msg = document.getElementById("copyMessage");
    msg.style.display = "block";
    msg.textContent = `${email} kopiert til utklippstavlen!`;
    setTimeout(() => {
      msg.style.display = "none";
    }, 3000);
  });
});
