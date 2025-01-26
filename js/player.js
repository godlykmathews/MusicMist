const audio = new Audio();
let currentTrackIndex = 0;
let isPlaying = false;

const tracks = [
    "songs/Maroon 5 - Girls Like You ft. Cardi B (Official Music Video).mp3",
    "songs/Billie Eilish, Khalid - lovely.mp3", 
    "songs/One Direction - Night Changes.mp3",
    "songs/Bruno Mars - The Lazy Song (Official Music Video).mp3",
    "songs/One Direction - What Makes You Beautiful (Official Video).mp3",
    "songs/Calum Scott - You Are The Reason (Official Video).mp3",
    "songs/OneRepublic - Counting Stars.mp3",
    "songs/Charlie Puth - We Don't Talk Anymore (feat. Selena Gomez) [Official Video].mp3",
    "songs/Passenger ｜ Let Her Go (Official Video).mp3",
    "songs/Day Tour at Oceanica Formerly South Palms, Bohol ⧸ Vlog Review No. 290.mp3",
    "songs/Post Malone, Swae Lee - Sunflower (Spider-Man_ Into the Spider-Verse) (Official Video).mp3",
    "songs/Ed Sheeran - Perfect (Official Music Video).mp3",
    "songs/Post Malone, Swae Lee - Sunflower (Spider-Man： Into the Spider-Verse) (Official Video).mp3",
    "songs/Ed Sheeran - Shape of You (Official Music Video).mp3",
    "songs/Reed Waddle Bells of Brooklyn.mp3",
    "songs/Ella Mai - Boo'd Up.mp3",
    "songs/Sam Smith - Too Good At Goodbyes.mp3",
    "songs/Katy Perry - Roar.mp3",
    "songs/Taylor Swift - Blank Space.mp3",
    "songs/Luis Fonsi, Daddy Yankee - Despacito (Audio) ft. Justin Bieber.mp3",
    "songs/The Weeknd - Starboy ft. Daft Punk (Official Video).mp3",
    "songs/Major Lazer & DJ Snake - Lean On (feat. MØ) [Official Music Video].mp3",
];

// Initialize audio player
function initializePlayer() {
    loadTrack(currentTrackIndex);
    attachEventListeners();
}

function loadTrack(index) {
    try {
        audio.src = tracks[index];
        audio.load();
        updatePlayButton();
    } catch (error) {
        console.error('Error loading track:', error);
    }
}

function playTrack() {
    if (!isPlaying) {
        audio.play().then(() => {
            isPlaying = true;
            updatePlayButton();
        }).catch(error => {
            console.error('Error playing track:', error);
        });
    }
}

function pauseTrack() {
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
        updatePlayButton();
    }
}

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
    playTrack();
    updateActiveSong();
}

function previousTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
    playTrack();
    updateActiveSong();
}

function setVolume(value) {
    audio.volume = value;
}

function updatePlayButton() {
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    
    if (isPlaying) {
        playBtn.style.display = 'none';
        pauseBtn.style.display = 'block';
    } else {
        playBtn.style.display = 'block';
        pauseBtn.style.display = 'none';
    }
}

function attachEventListeners() {
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const volumeSlider = document.getElementById('volumeSlider');

    playBtn.addEventListener('click', playTrack);
    pauseBtn.addEventListener('click', pauseTrack);
    nextBtn.addEventListener('click', nextTrack);
    prevBtn.addEventListener('click', previousTrack);
    volumeSlider.addEventListener('input', (e) => setVolume(e.target.value));

    audio.addEventListener('ended', nextTrack);
    audio.addEventListener('error', (e) => console.error('Audio error:', e));
}

// Initialize player when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePlayer);