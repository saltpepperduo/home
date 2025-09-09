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
    
    // Also populate the textarea in admin panel
    const textarea = document.getElementById('videoData');
    if (textarea) {
      textarea.value = videoDataText;
    }
  } catch (error) {
    console.error('Error loading videos:', error);
    // Fallback to default videos
    const defaultVideos = `https://www.youtube.com/watch?v=O3RB060qMIA, Beautiful Melody Performance
https://www.youtube.com/watch?v=KnwqhJx9qUs, Jazz & Classical Fusion
https://www.youtube.com/watch?v=F_lpJzwtIbY, Traditional Folk Arrangement`;
    
    const videos = parseVideoData(defaultVideos);
    renderVideos(videos);
    
    const textarea = document.getElementById('videoData');
    if (textarea) {
      textarea.value = defaultVideos;
    }
  }
}

// Function to update videos
async function updateVideos() {
  const textarea = document.getElementById('videoData');
  if (!textarea) return;
  
  const videoDataText = textarea.value;
  const videos = parseVideoData(videoDataText);
  renderVideos(videos);
  
  // In a real application, you would save this to the server
  alert('Videos updated successfully! (Note: Changes are temporary and will reset on page refresh)');
}

// Function to toggle admin panel
function toggleAdmin() {
  const adminContent = document.getElementById('adminContent');
  if (adminContent) {
    adminContent.classList.toggle('show');
  }
}

// Make functions available globally for the buttons
window.loadVideos = loadVideos;
window.updateVideos = updateVideos;
window.toggleAdmin = toggleAdmin;
