// tiny interactions: mobile nav toggle and year
document.addEventListener("DOMContentLoaded", function(){
  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      const isOpen = nav.getAttribute("aria-hidden") === "false";
      nav.setAttribute("aria-hidden", String(!isOpen));
      nav.style.display = isOpen ? "none" : "flex";
    });
  }

  // footer year
  document.getElementById("year").textContent = new Date().getFullYear();
  
  // Create QR code
  const siteUrl = window.location.href;
  new QRCode(document.getElementById("qrcode"), {
    text: siteUrl,
    width: 140,
    height: 140,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });
  
  // Set up email copy functionality
  const emailLink = document.getElementById('emailLink');
  const copyNotification = document.getElementById('copyNotification');
  
  if (emailLink && copyNotification) {
    emailLink.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Copy email to clipboard
      navigator.clipboard.writeText('contact.saltpepperduo@gmail.com')
        .then(() => {
          // Show notification
          copyNotification.classList.add('show');
          
          // Hide notification after 2 seconds
          setTimeout(() => {
            copyNotification.classList.remove('show');
          }, 2000);
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
          // Fallback: Open mail client
          window.location.href = 'mailto:contact.saltpepperduo@gmail.com';
        });
    });
  }
  
  // Load videos from text file
  loadVideos();
});

// Function to extract YouTube ID from URL
function extractYouTubeId(url) {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : null;
}

// Function to parse video data from text
function parseVideoData(text) {
  const lines = text.split('\n');
  const videos = [];
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine) {
      const parts = trimmedLine.split(',');
      if (parts.length >= 2) {
        const url = parts[0].trim();
        const title = parts.slice(1).join(',').trim(); // In case title contains commas
        const id = extractYouTubeId(url);
        
        if (id) {
          videos.push({ id, title, url });
        }
      }
    }
  }
  
  return videos;
}

// Function to render videos
function renderVideos(videos) {
  const videoContainer = document.getElementById('videoContainer');
  if (!videoContainer) return;
  
  videoContainer.innerHTML = ''; // Clear existing content
  
  if (videos.length === 0) {
    videoContainer.innerHTML = '<p>No videos available</p>';
    return;
  }
  
  videos.forEach(video => {
    const videoItem = document.createElement('div');
    videoItem.className = 'video-item';
    
    videoItem.innerHTML = `
      <div class="video-wrapper">
        <iframe src="https://www.youtube.com/embed/${video.id}" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen></iframe>
      </div>
      <p class="video-description">${video.title}</p>
    `;
    
    videoContainer.appendChild(videoItem);
  });
}

// Function to load videos from text file
async function loadVideos() {
  try {
    const response = await fetch('videos.txt');
    if (!response.ok) throw new Error('File not found');
    
    const videoDataText = await response.text();
    const videos = parseVideoData(videoDataText);
    renderVideos(videos);
  } catch (error) {
    console.error('Error loading videos:', error);
    // Fallback to default videos
    const defaultVideos = `https://www.youtube.com/watch?v=O3RB060qMIA, Beautiful Melody Performance
https://www.youtube.com/watch?v=KnwqhJx9qUs, Jazz & Classical Fusion
https://www.youtube.com/watch?v=F_lpJzwtIbY, Traditional Folk Arrangement`;
    
    const videos = parseVideoData(defaultVideos);
    renderVideos(videos);
  }
}
