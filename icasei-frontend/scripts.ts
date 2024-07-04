document.addEventListener('DOMContentLoaded', () => {
    const searchForm: HTMLFormElement = document.getElementById('search-form') as HTMLFormElement;
    const searchInput: HTMLInputElement = document.getElementById('search') as HTMLInputElement;
    const videoList: HTMLElement = document.getElementById('video-list') as HTMLElement;
    const favoriteList: HTMLElement = document.getElementById('favorite-list') as HTMLElement;
    const favoritesCount: HTMLElement = document.getElementById('favorites-count') as HTMLElement;
    const btnVideos: HTMLButtonElement = document.getElementById('btn-videos') as HTMLButtonElement;
    const btnFavoritos: HTMLButtonElement = document.getElementById('btn-favoritos') as HTMLButtonElement;
    const videosSection: HTMLElement = document.getElementById('videos-section') as HTMLElement;
    const favoritesSection: HTMLElement = document.getElementById('favorites-section') as HTMLElement;
    const suggestionsList: HTMLElement = document.getElementById('suggestions') as HTMLElement;
    const videoPlayerOverlay: HTMLElement = document.createElement('div');
    const videoPlayer: HTMLElement = document.createElement('div');

    videoPlayerOverlay.className = 'video-player-overlay';
    videoPlayer.className = 'video-player';
    videoPlayerOverlay.appendChild(videoPlayer);
    document.body.appendChild(videoPlayerOverlay);

    let favorites: any[] = JSON.parse(localStorage.getItem('favorites') || '[]');

    async function fetchVideos(query: string): Promise<any[]> {
        try {
            const response = await fetch(`http://localhost:3000/api/videos?query=${query}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erro ao buscar vídeos:', error);
            throw error; // Lança o erro para tratamento externo, se necessário
        }
    }

    async function fetchSuggestions(query: string): Promise<string[]> {
        try {
            const response = await fetch(`http://localhost:3000/api/suggestions?query=${query}`);
            const suggestions = await response.json();
            return suggestions;
        } catch (error) {
            console.error('Erro ao buscar sugestões:', error);
            throw error; // Lança o erro para tratamento externo, se necessário
        }
    }

    async function performSearch(): Promise<void> {
        try {
            const query: string = searchInput.value;
            const videos: any[] = await fetchVideos(query);

            videoList.innerHTML = '';
            videos.forEach(video => {
                const videoItem: HTMLElement = createVideoItem(video);
                videoList.appendChild(videoItem);
            });
        } catch (error) {
            console.error('Erro ao realizar a busca:', error);
            throw error; // Lança o erro para tratamento externo, se necessário
        }
    }

    searchForm.addEventListener('submit', async (event: Event) => {
        event.preventDefault(); // Evita o comportamento padrão de submissão do formulário
        try {
            await performSearch();
        } catch (error) {
            console.error('Erro ao realizar a busca:', error);
            // Trate o erro conforme necessário
        }
    });

    searchInput.addEventListener('keydown', async (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Evita o comportamento padrão de submissão
            try {
                await performSearch();
            } catch (error) {
                console.error('Erro ao realizar a busca:', error);
                // Trate o erro conforme necessário
            }
        }
    });

    searchInput.addEventListener('input', async (event: Event) => {
        try {
            const query: string = (event.target as HTMLInputElement).value;
            if (query.length > 2) {
                const suggestions: string[] = await fetchSuggestions(query);
                displaySuggestions(suggestions);
            } else {
                suggestionsList.innerHTML = '';
            }
        } catch (error) {
            console.error('Erro ao processar entrada:', error);
            // Trate o erro conforme necessário
        }
    });

    function createVideoItem(video: any): HTMLElement {
        const videoItem: HTMLElement = document.createElement('div');
        videoItem.className = 'video-item';
        videoItem.innerHTML = `
            <img src="${video.snippet.thumbnails.default.url}" alt="${video.snippet.title}" class="thumbnail" data-video-id="${video.id.videoId}">
            <div class="video-info">
                <h3>${video.snippet.title}</h3>
                <button class="favorite-btn"><img src="${isFavorite(video) ? 'https://cdn-icons-png.flaticon.com/512/1828/1828614.png' : 'https://cdn-icons-png.flaticon.com/512/1828/1828970.png'}" alt="Add to favorites" class="favorite-icon"></button>
            </div>
        `;

        videoItem.querySelector('.thumbnail')?.addEventListener('click', () => {
            playVideo(video.id.videoId);
        });

        videoItem.querySelector('.favorite-btn')?.addEventListener('click', () => {
            toggleFavorite(videoItem, video);
        });

        return videoItem;
    }

    function toggleFavorite(videoItem: HTMLElement, video: any): void {
        const favoriteBtn: HTMLButtonElement = videoItem.querySelector('.favorite-btn') as HTMLButtonElement;
        const favoriteIcon: HTMLImageElement = favoriteBtn.querySelector('.favorite-icon') as HTMLImageElement;
        const isFavoriteVideo: boolean = isFavorite(video);

        if (isFavoriteVideo) {
            favorites = favorites.filter(fav => fav.id.videoId !== video.id.videoId);
            favoriteIcon.src = 'https://cdn-icons-png.flaticon.com/512/1828/1828970.png';
        } else {
            favorites.push(video);
            favoriteIcon.src = 'https://cdn-icons-png.flaticon.com/512/1828/1828614.png';
        }

        updateFavorites();
        updateVideoListFavorites();
    }

    function toggleScrollbar(): void {
        const favoriteSection: HTMLElement = document.getElementById('favorites-section') as HTMLElement;
        if (favorites.length <= 12) {
            favoriteSection.style.overflowY = 'auto';
        } else {
            favoriteSection.style.overflowY = 'auto';
        }
    }

    function updateFavorites(): void {
        localStorage.setItem('favorites', JSON.stringify(favorites));
        favoritesCount.textContent = favorites.length.toString();
        favoriteList.innerHTML = '';
        favorites.forEach(fav => {
            const videoItem: HTMLElement = createVideoItem(fav);
            const favoriteIcon: HTMLImageElement = videoItem.querySelector('.favorite-icon') as HTMLImageElement;
            favoriteIcon.src = 'https://cdn-icons-png.flaticon.com/512/1828/1828614.png';
            favoriteList.appendChild(videoItem);
        });
        toggleScrollbar();
    }

    function updateVideoListFavorites(): void {
        const videoItems: NodeListOf<HTMLElement> = videoList.querySelectorAll('.video-item');
        videoItems.forEach(item => {
            const videoId: string = item.querySelector('.thumbnail')!.getAttribute('data-video-id')!;
            const favoriteIcon: HTMLImageElement = item.querySelector('.favorite-icon') as HTMLImageElement;
            if (favorites.some(fav => fav.id.videoId === videoId)) {
                favoriteIcon.src = 'https://cdn-icons-png.flaticon.com/512/1828/1828614.png';
            } else {
                favoriteIcon.src = 'https://cdn-icons-png.flaticon.com/512/1828/1828970.png';
            }
        });
    }

    function isFavorite(video: any): boolean {
        return favorites.some(fav => fav.id.videoId === video.id.videoId);
    }

    function displaySuggestions(suggestions: string[]): void {
        suggestionsList.innerHTML = '';
        suggestions.forEach(suggestion => {
            const suggestionItem: HTMLLIElement = document.createElement('li');
            suggestionItem.textContent = suggestion;
            suggestionItem.addEventListener('click', () => {
                searchInput.value = suggestion;
                suggestionsList.innerHTML = '';
                performSearch();
            });
            suggestionsList.appendChild(suggestionItem);
        });
    }

    btnVideos.addEventListener('click', () => {
        window.location.hash = 'videos';
    });

    btnFavoritos.addEventListener('click', () => {
        window.location.hash = 'favorites';
    });

    function playVideo(videoId: string): void {
        videoPlayer.innerHTML = `<iframe width="1512" height="452" src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" frameborder="0" allowfullscreen></iframe>`;
        videoPlayerOverlay.style.display = 'flex';
    }

    videoPlayerOverlay.addEventListener('click', () => {
        videoPlayerOverlay.style.display = 'none';
        videoPlayer.innerHTML = '';
    });

    function loadPage(): void {
        const hash: string = window.location.hash.substring(1);
        if (hash === 'favorites') {
            videosSection.style.display = 'none';
            favoritesSection.style.display = 'block';
            updateFavorites();
        } else {
            videosSection.style.display = 'block';
            favoritesSection.style.display = 'none';
            updateVideoListFavorites();
        }
    }

    window.addEventListener('hashchange', loadPage);

    // Initialize favorites and load the initial page
    updateFavorites();
    loadPage();
});
