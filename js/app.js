// This file is intentionally left blank.
document.addEventListener('DOMContentLoaded', function() {
    const songList = document.getElementById('song-list');
    const audioPlayer = document.getElementById('audio-player');
    const audioSource = document.getElementById('audio-source');

    // Function to extract song name from file path
    function getSongName(filePath) {
        let name = filePath.split('/').pop(); // Get filename
        name = name.replace('.mp3', ''); // Remove extension
        return name;
    }

    // Create and populate song list
    function populateSongList() {
        tracks.forEach((track, index) => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `
                <span>${getSongName(track)}</span>
                <i class="fas fa-play"></i>
            `;
            
            li.addEventListener('click', () => {
                currentTrackIndex = index;
                loadTrack(index);
                playTrack();
                updateActiveSong();
            });
            
            songList.appendChild(li);
        });
    }

    // Update active song highlight
    function updateActiveSong() {
        const songs = songList.getElementsByTagName('li');
        Array.from(songs).forEach((song, index) => {
            if (index === currentTrackIndex) {
                song.classList.add('active', 'bg-info', 'text-white');
            } else {
                song.classList.remove('active', 'bg-info', 'text-white');
            }
        });
    }

    // Event listener for when a song ends
    audioPlayer.addEventListener('ended', () => {
        nextTrack();
        updateActiveSong();
    });

    // Initialize the song list
    populateSongList();
});
