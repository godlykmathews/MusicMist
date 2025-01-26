function searchSongs() {
    const searchInput = document.getElementById('search');
    const songList = document.getElementById('song-list');
    const songs = Array.from(songList.getElementsByTagName('li'));

    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        songs.forEach(song => {
            const songName = song.querySelector('span').textContent.toLowerCase();
            if (songName.includes(query)) {
                song.style.display = '';
            } else {
                song.style.display = 'none';
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', searchSongs);