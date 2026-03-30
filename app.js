// frontend/app.js
const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:3001' : '';
let btcPrice = 60000;

// ========== FALLING BTC EFFECT ==========
function createFallingBTC() {
    const container = document.getElementById('btc-container');
    setInterval(() => {
        const btc = document.createElement('div');
        btc.className = 'btc-particle';
        btc.textContent = '₿';
        btc.style.left = Math.random() * 100 + '%';
        btc.style.animationDuration = 5 + Math.random() * 5 + 's';
        btc.style.fontSize = 20 + Math.random() * 20 + 'px';
        btc.style.opacity = 0.3 + Math.random() * 0.5;
        container.appendChild(btc);
        setTimeout(() => btc.remove(), 10000);
    }, 2000);
}

// ========== SATOSHI BIRTHDAY COUNTDOWN ==========
function startSatoshiCountdown() {
    const satoshiBirthday = new Date('2025-04-05T00:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = satoshiBirthday - now;
        
        if (distance < 0) {
            document.getElementById('satoshi-days').textContent = '00';
            document.getElementById('satoshi-hours').textContent = '00';
            document.getElementById('satoshi-minutes').textContent = '00';
            document.getElementById('satoshi-seconds').textContent = '00';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('satoshi-days').textContent = days.toString().padStart(2, '0');
        document.getElementById('satoshi-hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('satoshi-minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('satoshi-seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ========== CYCLE COUNTDOWN ==========
function startCycleCountdown() {
    updateCycleCountdown();
    setInterval(updateCycleCountdown, 1000);
}

async function updateCycleCountdown() {
    try {
        const res = await fetch(`${API_URL}/api/cycles/current`);
        const data = await res.json();
        const minutes = Math.floor(data.remainingTime / 60000);
        const seconds = Math.floor((data.remainingTime % 60000) / 1000);
        document.getElementById('cycle-minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('cycle-seconds').textContent = seconds.toString().padStart(2, '0');
        document.getElementById('cycle-number').textContent = data.cycleNumber || 0;
    } catch(e) {
        if (!window.cycleEnd) window.cycleEnd = Date.now() + 60 * 60 * 1000;
        const remaining = Math.max(0, window.cycleEnd - Date.now());
        document.getElementById('cycle-minutes').textContent = Math.floor(remaining / 60000).toString().padStart(2, '0');
        document.getElementById('cycle-seconds').textContent = Math.floor((remaining % 60000) / 1000).toString().padStart(2, '0');
        if (remaining <= 0) {
            window.cycleEnd = Date.now() + 60 * 60 * 1000;
            refreshData();
        }
    }
}

// ========== MUSIC PLAYER (50+ BÀI SÔI ĐỘNG) ==========
const MUSIC_PLAYLIST = [
    { name: '🎵 Alan Walker - Faded', id: 'H9t1I1H5fKY' },
    { name: '🎧 The Chainsmokers - Closer', id: '2Vv-BfRqR5Q' },
    { name: '🔊 Marshmello - Alone', id: '60ItHLz5WEA' },
    { name: '💿 Martin Garrix - Animals', id: 'nYh-n7EOtMA' },
    { name: '🎶 Avicii - Wake Me Up', id: 'JGwWNGJdvx8' },
    { name: '🔥 Calvin Harris - Summer', id: 'YqeW9_5kURI' },
    { name: '🕺 Mark Ronson - Uptown Funk', id: 'OPf0YbXqDm0' },
    { name: '⭐ The Kid LAROI - Stay', id: 'PT2_F-1esPk' },
    { name: '⚡ Imagine Dragons - Believer', id: '6ONRf7h3Mdk' },
    { name: '🌙 The Weeknd - Blinding Lights', id: 'hT_nvWreIhg' },
    { name: '💃 Dua Lipa - Levitating', id: 'YxWlaYCA8MU' },
    { name: '🎤 Lady Gaga - Poker Face', id: '1w7OgIMMRc4' },
    { name: '🌍 Shakira - Waka Waka', id: 'QR_qa3Ohwls' },
    { name: '💔 Justin Bieber - Sorry', id: 'D9G1VOjN_84' },
    { name: '❤️ Ed Sheeran - Shape of You', id: 'fRh_vgS2dFE' },
    { name: '💰 Bruno Mars - 24K Magic', id: '7wtfhZwyrcc' },
    { name: '🎸 Imagine Dragons - Thunder', id: 'fKopy74weus' },
    { name: '🔥 The Chainsmokers - Don\'t Let Me Down', id: 'Io0fBr1XBUA' },
    { name: '🎵 Zedd - Clarity', id: 'IxxstCcJlsc' },
    { name: '💿 David Guetta - Titanium', id: 'JRfuAukYTKg' },
    { name: '🎶 Coldplay - Hymn for the Weekend', id: 'YykjpeuMqdk' },
    { name: '⭐ Daft Punk - Get Lucky', id: 'h5EofwRzit0' },
    { name: '⚡ Major Lazer - Lean On', id: 'YqeW9_5kURI' },
    { name: '🌙 Kygo - Firestone', id: '9Sc-ir2UwGU' },
    { name: '💃 Lizzo - About Damn Time', id: 'IXXxciRUMzE' },
    { name: '🎤 Harry Styles - As It Was', id: 'H5v3kku4y6Q' },
    { name: '🔥 Doja Cat - Say So', id: 'GMqFsXqI7Ms' },
    { name: '🎵 Olivia Rodrigo - Good 4 U', id: 'gNi_6U5Pm_o' },
    { name: '💿 Lil Nas X - Montero', id: '6swmTBVI83k' },
    { name: '🎶 Glass Animals - Heat Waves', id: 'mRD0-GxqHVo' },
    { name: '⭐ The Weeknd - Save Your Tears', id: 'XXYlFuWEuKI' },
    { name: '⚡ Marshmello - Happier', id: 'm7Bc3pLyij0' },
    { name: '🌙 Clean Bandit - Rather Be', id: 'm-M1AtrxztU' },
    { name: '💃 Meghan Trainor - Made You Look', id: 'qDc_5zpBj7s' },
    { name: '🎤 Miley Cyrus - Flowers', id: 'G7KNmW9a75Y' },
    { name: '🔥 Post Malone - Circles', id: 'wXhTHyIgQ_U' },
    { name: '🎵 Tones and I - Dance Monkey', id: 'q0hyYWKXF0Q' },
    { name: '💿 Shawn Mendes - Treat You Better', id: 'lY2yjAdbvdQ' },
    { name: '🎶 Charlie Puth - Attention', id: 'nfs8NYg7yQM' },
    { name: '⭐ Maroon 5 - Memories', id: 'SlPhMPnQ58k' },
    { name: '⚡ BTS - Dynamite', id: 'gdZLi9oWNZg' },
    { name: '🌙 Lady Gaga - Rain On Me', id: 'AoAm4om0wTs' },
    { name: '💃 Jason Derulo - Savage Love', id: '0c9aVlMUcbE' },
    { name: '🎤 Saweetie - Best Friend', id: 'YcB2mZg9X3M' },
    { name: '🔥 Pitbull - Give Me Everything', id: 'EPo5wWmKEaI' }
];

let currentTrackIndex = 0;
let isMusicPlaying = false;
let musicIframe = null;

function setupMusic() {
    musicIframe = document.getElementById('youtube-music');
    const toggleBtn = document.getElementById('music-toggle');
    const nowPlaying = document.getElementById('now-playing');
    
    // Random bài đầu tiên
    currentTrackIndex = Math.floor(Math.random() * MUSIC_PLAYLIST.length);
    nowPlaying.textContent = MUSIC_PLAYLIST[currentTrackIndex].name;
    
    function playTrack(index) {
        const track = MUSIC_PLAYLIST[index % MUSIC_PLAYLIST.length];
        if (musicIframe) {
            musicIframe.src = `https://www.youtube.com/embed/${track.id}?autoplay=1&loop=1&playlist=${track.id}`;
        }
        nowPlaying.textContent = track.name;
        currentTrackIndex = index;
    }
    
    function nextTrack() {
        playTrack(currentTrackIndex + 1);
    }
    
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            if (isMusicPlaying) {
                musicIframe.src = '';
                toggleBtn.innerHTML = '🔇 OFF';
                nowPlaying.textContent = '🔇 Music Off';
                isMusicPlaying = false;
            } else {
                playTrack(currentTrackIndex);
                toggleBtn.innerHTML = '🔊 PLAY';
                isMusicPlaying = true;
            }
        });
    }
    
    // Tự động chuyển bài sau mỗi 3 phút
    setInterval(() => {
        if (isMusicPlaying) {
            nextTrack();
        }
    }, 180000);
}

// ========== FETCH DATA ==========
async function fetchBTCPrice() {
    try {
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        const data = await res.json();
        btcPrice = data.bitcoin.usd;
    } catch(e) { btcPrice = 60000; }
}

async function refreshData() {
    await fetchStats();
    await fetchLeaderboard();
    await fetchDistributions();
}

async function fetchStats() {
    try {
        const res = await fetch(`${API_URL}/api/stats/global`);
        const stats = await res.json();
        document.getElementById('total-btc').textContent = (stats.totalDistributed || 0).toFixed(4);
        document.getElementById('total-usd').textContent = ((stats.totalDistributed || 0) * btcPrice).toLocaleString();
        document.getElementById('total-cycles').textContent = stats.totalCycles || 0;
        document.getElementById('accumulating-btc').textContent = (stats.accumulatingBTC || 0).toFixed(4);
        document.getElementById('accumulating-usd').textContent = ((stats.accumulatingBTC || 0) * btcPrice).toLocaleString();
    } catch(e) { console.log('Stats fetch failed'); }
}

async function fetchLeaderboard() {
    try {
        const res = await fetch(`${API_URL}/api/holders/top?limit=10`);
        const holders = await res.json();
        const container = document.getElementById('leaderboard-list');
        if (!holders || holders.length === 0) {
            container.innerHTML = '<div class="leaderboard-row">Loading...</div>';
            return;
        }
        container.innerHTML = holders.map((h, i) => `
            <div class="leaderboard-row">
                <span class="leaderboard-rank">${i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i+1}</span>
                <span class="leaderboard-wallet">${h.wallet?.slice(0, 8)}...${h.wallet?.slice(-4)}</span>
                <span class="leaderboard-balance">${(h.balance || 0).toLocaleString()}</span>
                <span class="leaderboard-percentage">${(h.percentage || 0).toFixed(2)}%</span>
                <span class="leaderboard-rewards">${(h.rewardsEarned || 0).toFixed(4)} BTC</span>
            </div>
        `).join('');
    } catch(e) { console.log('Leaderboard fetch failed'); }
}

async function fetchDistributions() {
    try {
        const res = await fetch(`${API_URL}/api/distributions/recent?limit=10`);
        const logs = await res.json();
        const container = document.getElementById('distribution-log');
        if (!logs || logs.length === 0) {
            container.innerHTML = '<div class="log-entry">No distributions yet</div>';
            return;
        }
        container.innerHTML = logs.map(log => `
            <div class="log-entry">
                <span class="log-time">${new Date(log.time).toLocaleString()}</span>
                <span class="log-amount">${log.amount} BTC</span>
                <span>to ${log.recipients} holders</span>
                <a href="https://solscan.io/tx/${log.txId}" target="_blank" class="log-tx">🔗 View</a>
            </div>
        `).join('');
    } catch(e) { console.log('Distributions fetch failed'); }
}

// ========== INIT ==========
async function init() {
    await fetchBTCPrice();
    createFallingBTC();
    startSatoshiCountdown();
    startCycleCountdown();
    setupMusic();
    await refreshData();
    setInterval(refreshData, 30000);
}

init();