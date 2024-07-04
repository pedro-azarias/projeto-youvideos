"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
document.addEventListener('DOMContentLoaded', function () {
    var searchInput = document.getElementById('search');
    var videoList = document.getElementById('video-list');
    var favoriteList = document.getElementById('favorite-list');
    var favoritesCount = document.getElementById('favorites-count');
    var btnVideos = document.getElementById('btn-videos');
    var btnFavoritos = document.getElementById('btn-favoritos');
    var videosSection = document.getElementById('videos-section');
    var favoritesSection = document.getElementById('favorites-section');
    var suggestionsList = document.getElementById('suggestions');
    var videoPlayerOverlay = document.createElement('div');
    var videoPlayer = document.createElement('div');
    videoPlayerOverlay.className = 'video-player-overlay';
    videoPlayer.className = 'video-player';
    videoPlayerOverlay.appendChild(videoPlayer);
    document.body.appendChild(videoPlayerOverlay);
    var favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    function fetchVideos(query) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch("http://localhost:3000/api/videos?query=".concat(query))];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, data];
                    case 3:
                        error_1 = _a.sent();
                        console.error('Erro ao buscar vídeos:', error_1);
                        throw error_1; // Lança o erro para tratamento externo, se necessário
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    function fetchSuggestions(query) {
        return __awaiter(this, void 0, void 0, function () {
            var response, suggestions, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch("http://localhost:3000/api/suggestions?query=".concat(query))];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        suggestions = _a.sent();
                        return [2 /*return*/, suggestions];
                    case 3:
                        error_2 = _a.sent();
                        console.error('Erro ao buscar sugestões:', error_2);
                        throw error_2; // Lança o erro para tratamento externo, se necessário
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    function performSearch() {
        return __awaiter(this, void 0, void 0, function () {
            var query, videos, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        query = searchInput.value;
                        return [4 /*yield*/, fetchVideos(query)];
                    case 1:
                        videos = _a.sent();
                        videoList.innerHTML = '';
                        videos.forEach(function (video) {
                            var videoItem = createVideoItem(video);
                            videoList.appendChild(videoItem);
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        console.error('Erro ao realizar a busca:', error_3);
                        throw error_3; // Lança o erro para tratamento externo, se necessário
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    searchInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            performSearch();
        }
    });
    searchInput.addEventListener('input', function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var query, suggestions, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    query = event.target.value;
                    if (!(query.length > 2)) return [3 /*break*/, 2];
                    return [4 /*yield*/, fetchSuggestions(query)];
                case 1:
                    suggestions = _a.sent();
                    displaySuggestions(suggestions);
                    return [3 /*break*/, 3];
                case 2:
                    suggestionsList.innerHTML = '';
                    _a.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    error_4 = _a.sent();
                    console.error('Erro ao processar entrada:', error_4);
                    throw error_4; // Lança o erro para tratamento externo, se necessário
                case 5: return [2 /*return*/];
            }
        });
    }); });
    function createVideoItem(video) {
        var _a, _b;
        var videoItem = document.createElement('div');
        videoItem.className = 'video-item';
        videoItem.innerHTML = "\n            <img src=\"".concat(video.snippet.thumbnails.default.url, "\" alt=\"").concat(video.snippet.title, "\" class=\"thumbnail\" data-video-id=\"").concat(video.id.videoId, "\">\n            <div class=\"video-info\">\n                <h3>").concat(video.snippet.title, "</h3>\n                <button class=\"favorite-btn\"><img src=\"").concat(isFavorite(video) ? 'https://cdn-icons-png.flaticon.com/512/1828/1828614.png' : 'https://cdn-icons-png.flaticon.com/512/1828/1828970.png', "\" alt=\"Add to favorites\" class=\"favorite-icon\"></button>\n            </div>\n        ");
        (_a = videoItem.querySelector('.thumbnail')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
            playVideo(video.id.videoId);
        });
        (_b = videoItem.querySelector('.favorite-btn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
            toggleFavorite(videoItem, video);
        });
        return videoItem;
    }
    function toggleFavorite(videoItem, video) {
        var favoriteBtn = videoItem.querySelector('.favorite-btn');
        var favoriteIcon = favoriteBtn.querySelector('.favorite-icon');
        var isFavoriteVideo = isFavorite(video);
        if (isFavoriteVideo) {
            favorites = favorites.filter(function (fav) { return fav.id.videoId !== video.id.videoId; });
            favoriteIcon.src = 'https://cdn-icons-png.flaticon.com/512/1828/1828970.png';
        }
        else {
            favorites.push(video);
            favoriteIcon.src = 'https://cdn-icons-png.flaticon.com/512/1828/1828614.png';
        }
        updateFavorites();
        updateVideoListFavorites();
    }
    function toggleScrollbar() {
        var favoriteSection = document.getElementById('favorites-section');
        if (favorites.length <= 12) {
            favoriteSection.style.overflowY = 'hidden';
        }
        else {
            favoriteSection.style.overflowY = 'auto';
        }
    }
    function updateFavorites() {
        localStorage.setItem('favorites', JSON.stringify(favorites));
        favoritesCount.textContent = favorites.length.toString();
        favoriteList.innerHTML = '';
        favorites.forEach(function (fav) {
            var videoItem = createVideoItem(fav);
            var favoriteIcon = videoItem.querySelector('.favorite-icon');
            favoriteIcon.src = 'https://cdn-icons-png.flaticon.com/512/1828/1828614.png';
            favoriteList.appendChild(videoItem);
        });
        toggleScrollbar();
    }
    function updateVideoListFavorites() {
        var videoItems = videoList.querySelectorAll('.video-item');
        videoItems.forEach(function (item) {
            var videoId = item.querySelector('.thumbnail').getAttribute('data-video-id');
            var favoriteIcon = item.querySelector('.favorite-icon');
            if (favorites.some(function (fav) { return fav.id.videoId === videoId; })) {
                favoriteIcon.src = 'https://cdn-icons-png.flaticon.com/512/1828/1828614.png';
            }
            else {
                favoriteIcon.src = 'https://cdn-icons-png.flaticon.com/512/1828/1828970.png';
            }
        });
    }
    function isFavorite(video) {
        return favorites.some(function (fav) { return fav.id.videoId === video.id.videoId; });
    }
    function displaySuggestions(suggestions) {
        suggestionsList.innerHTML = '';
        suggestions.forEach(function (suggestion) {
            var suggestionItem = document.createElement('li');
            suggestionItem.textContent = suggestion;
            suggestionItem.addEventListener('click', function () {
                searchInput.value = suggestion;
                suggestionsList.innerHTML = '';
                performSearch();
            });
            suggestionsList.appendChild(suggestionItem);
        });
    }
    btnVideos.addEventListener('click', function () {
        window.location.hash = 'videos';
    });
    btnFavoritos.addEventListener('click', function () {
        window.location.hash = 'favorites';
    });
    function playVideo(videoId) {
        videoPlayer.innerHTML = "<iframe width=\"1512\" height=\"452\" src=\"https://www.youtube.com/embed/".concat(videoId, "?autoplay=1&rel=0\" frameborder=\"0\" allowfullscreen></iframe>");
        videoPlayerOverlay.style.display = 'flex';
    }
    videoPlayerOverlay.addEventListener('click', function () {
        videoPlayerOverlay.style.display = 'none';
        videoPlayer.innerHTML = '';
    });
    function loadPage() {
        var hash = window.location.hash.substring(1);
        if (hash === 'favorites') {
            videosSection.style.display = 'none';
            favoritesSection.style.display = 'block';
            updateFavorites();
        }
        else {
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
