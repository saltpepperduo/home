// Kopier epost til utklippstavlen
document.getElementById("copyEmail").addEventListener("click", () => {
  const email = "saltpepperduo@gmail.com"; // din epostadresse
  navigator.clipboard.writeText(email).then(() => {
    alert("Epostadresse kopiert: " + email);
  });
});

// Lag QR-kode til nettsiden
const siteUrl = window.location.href;
QRCode.toCanvas(document.getElementById("qrCode"), siteUrl, { width: 80 });

// Last inn YouTube-videoer fra videos.txt
fetch("videos.txt")
  .then((response) => response.text())
  .then((data) => {
    const lines = data.trim().split("\n");
    const container = document.getElementById("videos");

    lines.forEach((line) => {
      const [url, title] = line.split(",");
      if (!url) return;

      let videoId = null;

      // Hent video-id fra URL
      try {
        const ytUrl = new URL(url.trim());
        if (ytUrl.hostname.includes("youtube.com")) {
          videoId = ytUrl.searchParams.get("v");
        } else if (ytUrl.hostname.includes("youtu.be")) {
          videoId = ytUrl.pathname.slice(1);
        }
      } catch (e) {
        console.warn("Ugyldig URL:", url);
      }

      if (videoId) {
        const section = document.createElement("div");
        section.className = "video-block";

        const h2 = document.createElement("h2");
        h2.textContent = title ? title.trim() : "";

        const iframe = document.createElement("iframe");
        iframe.src = `https://www.youtube.com/embed/${videoId}`;
        iframe.allowFullscreen = true;

        section.appendChild(h2);
        section.appendChild(iframe);
        container.appendChild(section);
      }
    });
  });
