// ============================================================
//  API KEY
// ============================================================
const API_KEY = '3d9629ac3b6a5dae5ccfde20fe1e3197';

// ============================================================
//  DOM REFERENCES
// ============================================================
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const locationBtn = document.getElementById('locationBtn');
const refreshBtn = document.getElementById('refreshBtn');
const themeToggle = document.getElementById('themeToggle');
const favoriteBtn = document.getElementById('favoriteBtn');
const loading = document.getElementById('loading');
const errorMsg = document.getElementById('errorMsg');
const currentWeatherDiv = document.getElementById('currentWeather');
const forecastDiv = document.getElementById('forecast');
const hourlyDiv = document.getElementById('hourlyForecast');
const alertsDiv = document.getElementById('weatherAlerts');
const quickStatsDiv = document.getElementById('quickStats');
const favoritesBar = document.getElementById('favoritesBar');
const favoritesList = document.getElementById('favoritesList');
const tempToggle = document.getElementById('tempToggle');

// ============================================================
//  STATE
// ============================================================
let currentCity = 'New York';
let currentData = null;
let isCelsius = true;
let favorites = JSON.parse(localStorage.getItem('weatherFavorites')) || [];
let isDark = true;

// ============================================================
//  LIVE CLOCK
// ============================================================
function updateClock() {
    const now = new Date();
    document.getElementById('liveTime').textContent = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    document.getElementById('liveDate').textContent = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
updateClock();
setInterval(updateClock, 1000);

// ============================================================
//  PARTICLE SYSTEM
// ============================================================
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createParticles() {
    particles = [];
    const colors = ['#f59e0b', '#fbbf24', '#f97316', '#8b5cf6', '#06b6d4', '#3b82f6', '#ec4899'];
    for (let i = 0; i < 80; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 0.3,
            speedY: (Math.random() - 0.5) * 0.3,
            opacity: Math.random() * 0.3 + 0.1,
            color: colors[Math.floor(Math.random() * colors.length)]
        });
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.round(p.opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();
    });
    requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', () => {
    resizeCanvas();
    createParticles();
});

resizeCanvas();
createParticles();
animateParticles();

// ============================================================
//  THEME TOGGLE
// ============================================================
themeToggle.addEventListener('click', () => {
    isDark = !isDark;
    document.body.classList.toggle('light-theme', !isDark);
    themeToggle.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    
    // Update particle colors based on theme
    createParticles();
});

// ============================================================
//  HELPER FUNCTIONS
// ============================================================
function showLoading() {
    loading.style.display = 'block';
    errorMsg.style.display = 'none';
    currentWeatherDiv.style.display = 'none';
    forecastDiv.style.display = 'none';
    hourlyDiv.style.display = 'none';
    alertsDiv.style.display = 'none';
    quickStatsDiv.style.display = 'none';
}

function hideLoading() {
    loading.style.display = 'none';
}

function showError(message) {
    errorMsg.style.display = 'block';
    errorMsg.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${message}`;
    setTimeout(() => {
        errorMsg.style.display = 'none';
    }, 4000);
}

function getWeatherIcon(iconCode) {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

function formatTime(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

function formatDate(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

function convertTemp(celsius) {
    return isCelsius ? celsius : (celsius * 9/5 + 32);
}

function getTempUnit() {
    return isCelsius ? '°C' : '°F';
}

function animateNumber(element, target, suffix = '', decimals = 0) {
    let current = 0;
    const step = target / 40;
    const interval = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target.toFixed(decimals) + suffix;
            clearInterval(interval);
        } else {
            element.textContent = current.toFixed(decimals) + suffix;
        }
    }, 20);
}

// ============================================================
//  FAVORITES
// ============================================================
function updateFavoritesUI() {
    favoritesList.innerHTML = '';
    if (favorites.length === 0) {
        favoritesBar.style.display = 'none';
        return;
    }
    favoritesBar.style.display = 'flex';
    favorites.forEach(city => {
        const tag = document.createElement('span');
        tag.className = 'favorite-tag';
        tag.innerHTML = `${city} <span class="remove-fav" data-city="${city}">✕</span>`;
        tag.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-fav')) {
                favorites = favorites.filter(c => c !== city);
                localStorage.setItem('weatherFavorites', JSON.stringify(favorites));
                updateFavoritesUI();
            } else {
                fetchWeather(city);
            }
        });
        favoritesList.appendChild(tag);
    });
}

function toggleFavorite() {
    const city = document.getElementById('cityName').textContent;
    if (favorites.includes(city)) {
        favorites = favorites.filter(c => c !== city);
        favoriteBtn.classList.remove('active');
    } else {
        favorites.push(city);
        favoriteBtn.classList.add('active');
    }
    localStorage.setItem('weatherFavorites', JSON.stringify(favorites));
    updateFavoritesUI();
}

favoriteBtn.addEventListener('click', toggleFavorite);

// ============================================================
//  DISPLAY FUNCTIONS
// ============================================================
function displayCurrentWeather(data) {
    currentData = data;
    const city = data.name;
    currentCity = city;

    if (favorites.includes(city)) {
        favoriteBtn.classList.add('active');
    } else {
        favoriteBtn.classList.remove('active');
    }

    document.getElementById('cityName').textContent = city;
    document.getElementById('countryCode').textContent = data.sys.country;
    document.getElementById('weatherIcon').src = getWeatherIcon(data.weather[0].icon);
    document.getElementById('description').textContent = data.weather[0].description;

    const temp = convertTemp(data.main.temp);
    animateNumber(document.getElementById('temp'), temp, '', 1);
    document.getElementById('feelsLikeText').textContent = `Feels like ${Math.round(convertTemp(data.main.feels_like))}${getTempUnit()}`;

    document.getElementById('humidity').textContent = data.main.humidity + '%';
    document.getElementById('windSpeed').textContent = Math.round(data.wind.speed * 3.6) + ' km/h';
    document.getElementById('pressure').textContent = data.main.pressure + ' hPa';
    document.getElementById('visibility').textContent = (data.visibility / 1000).toFixed(1) + ' km';
    document.getElementById('cloudCover').textContent = data.clouds.all + '%';

    const high = convertTemp(data.main.temp_max);
    const low = convertTemp(data.main.temp_min);
    document.getElementById('quickHigh').textContent = Math.round(high) + getTempUnit();
    document.getElementById('quickLow').textContent = Math.round(low) + getTempUnit();
    document.getElementById('quickSunrise').textContent = formatTime(data.sys.sunrise);
    document.getElementById('quickSunset').textContent = formatTime(data.sys.sunset);

    document.getElementById('lastUpdated').textContent = `Updated: ${new Date().toLocaleTimeString()}`;

    const uv = Math.round((100 - data.clouds.all) / 20);
    document.getElementById('uvIndex').textContent = Math.min(uv, 10);

    currentWeatherDiv.style.display = 'block';
    quickStatsDiv.style.display = 'grid';
}

function displayHourlyForecast(data) {
    const hourlyGrid = document.getElementById('hourlyGrid');
    hourlyGrid.innerHTML = '';

    const hourlyData = data.list.slice(0, 24);

    hourlyData.forEach(hour => {
        const item = document.createElement('div');
        item.className = 'hourly-item';
        const time = new Date(hour.dt * 1000);
        const temp = convertTemp(hour.main.temp);
        item.innerHTML = `
            <div class="hour">${time.toLocaleTimeString('en-US', { hour: '2-digit' })}</div>
            <img src="${getWeatherIcon(hour.weather[0].icon)}" alt="${hour.weather[0].description}">
            <div class="hour-temp">${Math.round(temp)}${getTempUnit()}</div>
        `;
        hourlyGrid.appendChild(item);
    });

    hourlyDiv.style.display = 'block';
}

function displayForecast(data) {
    const forecastGrid = document.getElementById('forecastGrid');
    forecastGrid.innerHTML = '';

    const dailyForecasts = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 5);

    dailyForecasts.forEach(day => {
        const date = new Date(day.dt * 1000);
        const card = document.createElement('div');
        card.className = 'forecast-card-3d';
        const high = convertTemp(day.main.temp_max);
        const low = convertTemp(day.main.temp_min);
        card.innerHTML = `
            <div class="day">${date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
            <div class="date-small">${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
            <img src="${getWeatherIcon(day.weather[0].icon)}" alt="${day.weather[0].description}">
            <div class="temp-high">${Math.round(high)}${getTempUnit()}</div>
            <div class="temp-low">${Math.round(low)}${getTempUnit()}</div>
            <div class="humidity"><i class="fas fa-tint"></i> ${day.main.humidity}%</div>
        `;
        forecastGrid.appendChild(card);
    });

    forecastDiv.style.display = 'block';
}

function displayAlerts(data) {
    const alertsList = document.getElementById('alertsList');
    alertsList.innerHTML = '';

    if (data.alerts && data.alerts.length > 0) {
        data.alerts.forEach(alert => {
            const item = document.createElement('div');
            item.className = 'alert-item';
            item.innerHTML = `
                <i class="fas fa-exclamation-circle"></i>
                <span class="alert-text">${alert.event}: ${alert.description.substring(0, 100)}...</span>
                <span class="alert-source">${alert.sender_name}</span>
            `;
            alertsList.appendChild(item);
        });
        alertsDiv.style.display = 'block';
    } else {
        alertsDiv.style.display = 'none';
    }
}

function displayAirQuality(lat, lon) {
    const aqiDiv = document.getElementById('airQuality');
    const aqiValue = document.getElementById('aqiValue');
    const aqiFill = document.getElementById('aqiFill');
    const aqiLabel = document.getElementById('aqiLabel');

    fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            const aqi = data.list[0].main.aqi;
            aqiDiv.style.display = 'block';
            aqiValue.textContent = aqi;

            const aqiMap = {
                1: { label: 'Good', color: '#10b981', width: 20 },
                2: { label: 'Fair', color: '#34d399', width: 40 },
                3: { label: 'Moderate', color: '#f59e0b', width: 60 },
                4: { label: 'Poor', color: '#f97316', width: 80 },
                5: { label: 'Very Poor', color: '#ef4444', width: 100 }
            };

            const info = aqiMap[aqi] || aqiMap[3];
            aqiFill.style.width = info.width + '%';
            aqiFill.style.background = info.color;
            aqiLabel.textContent = `${info.label} · PM2.5: ${data.list[0].components.pm2_5} µg/m³`;
        })
        .catch(() => {
            aqiDiv.style.display = 'none';
        });
}

// ============================================================
//  FETCH WEATHER
// ============================================================
async function fetchWeather(city) {
    if (!city) {
        showError('Please enter a city name');
        return;
    }

    showLoading();

    try {
        const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        const currentResponse = await fetch(currentUrl);

        if (!currentResponse.ok) {
            throw new Error('City not found');
        }

        const currentData = await currentResponse.json();

        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();

        hideLoading();
        displayCurrentWeather(currentData);
        displayHourlyForecast(forecastData);
        displayForecast(forecastData);
        displayAlerts(currentData);
        displayAirQuality(currentData.coord.lat, currentData.coord.lon);

    } catch (error) {
        hideLoading();
        showError(error.message);
    }
}

async function fetchWeatherByCoords(lat, lon) {
    showLoading();

    try {
        const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
        const currentResponse = await fetch(currentUrl);
        const currentData = await currentResponse.json();

        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();

        hideLoading();
        displayCurrentWeather(currentData);
        displayHourlyForecast(forecastData);
        displayForecast(forecastData);
        displayAlerts(currentData);
        displayAirQuality(lat, lon);

    } catch (error) {
        hideLoading();
        showError('Unable to get weather for your location');
    }
}

function getUserLocation() {
    if (!navigator.geolocation) {
        showError('Geolocation not supported');
        return;
    }

    showLoading();
    navigator.geolocation.getCurrentPosition(
        (position) => fetchWeatherByCoords(position.coords.latitude, position.coords.longitude),
        () => {
            hideLoading();
            showError('Please allow location access');
        }
    );
}

// ============================================================
//  TEMPERATURE TOGGLE
// ============================================================
tempToggle.addEventListener('click', () => {
    isCelsius = !isCelsius;
    tempToggle.textContent = isCelsius ? '°F' : '°C';

    if (currentData) {
        const temp = convertTemp(currentData.main.temp);
        document.getElementById('temp').textContent = temp.toFixed(1);
        document.getElementById('feelsLikeText').textContent =
            `Feels like ${Math.round(convertTemp(currentData.main.feels_like))}${getTempUnit()}`;
        document.getElementById('quickHigh').textContent =
            Math.round(convertTemp(currentData.main.temp_max)) + getTempUnit();
        document.getElementById('quickLow').textContent =
            Math.round(convertTemp(currentData.main.temp_min)) + getTempUnit();

        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${currentCity}&appid=${API_KEY}&units=metric`;
        fetch(forecastUrl)
            .then(res => res.json())
            .then(data => {
                displayHourlyForecast(data);
                displayForecast(data);
            });
    }
});

// ============================================================
//  REFRESH
// ============================================================
refreshBtn.addEventListener('click', () => {
    if (currentCity) {
        fetchWeather(currentCity);
    }
});

// ============================================================
//  EVENT LISTENERS
// ============================================================
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) fetchWeather(city);
    else showError('Enter a city name');
});

locationBtn.addEventListener('click', getUserLocation);

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) fetchWeather(city);
    }
});

// ============================================================
//  INIT
// ============================================================
updateFavoritesUI();
fetchWeather('New York');

// ============================================================
//  VOICE SEARCH
// ============================================================
const voiceBtn = document.getElementById('voiceSearchBtn');
let recognition = null;

if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        cityInput.value = transcript;
        fetchWeather(transcript);
        voiceBtn.classList.remove('listening');
    };

    recognition.onerror = () => {
        voiceBtn.classList.remove('listening');
        showError('Voice recognition failed. Please try typing.');
    };

    recognition.onend = () => {
        voiceBtn.classList.remove('listening');
    };
}

voiceBtn.addEventListener('click', () => {
    if (!recognition) {
        showError('Voice search is not supported in your browser');
        return;
    }

    if (voiceBtn.classList.contains('listening')) {
        recognition.stop();
        voiceBtn.classList.remove('listening');
        return;
    }

    voiceBtn.classList.add('listening');
    recognition.start();
});

// ============================================================
//  SHARE WEATHER
// ============================================================
const shareBtn = document.getElementById('shareBtn');

shareBtn.addEventListener('click', async () => {
    const city = document.getElementById('cityName').textContent;
    const temp = document.getElementById('temp').textContent;
    const condition = document.getElementById('description').textContent;
    const icon = document.getElementById('weatherIcon').src;

    const shareData = {
        title: `Weather in ${city}`,
        text: `🌤️ Weather in ${city}\nTemperature: ${temp}°C\nCondition: ${condition}\n\nPowered by WeatherSphere Pro`,
        url: window.location.href,
    };

    try {
        if (navigator.share) {
            await navigator.share(shareData);
        } else {
            // Fallback: copy to clipboard
            await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
            showError('Weather info copied to clipboard! 📋');
        }
    } catch (err) {
        if (err.name !== 'AbortError') {
            showError('Unable to share weather info');
        }
    }
});

// ============================================================
//  COMPARE CITIES
// ============================================================
const compareBtn = document.getElementById('compareBtn');
const compareSection = document.getElementById('compareSection');
const compareGrid = document.getElementById('compareGrid');
const closeCompare = document.getElementById('closeCompare');
let compareCities = ['New York', 'London', 'Tokyo'];

compareBtn.addEventListener('click', () => {
    if (compareSection.style.display === 'block') {
        compareSection.style.display = 'none';
        return;
    }
    loadCompareCities();
});

closeCompare.addEventListener('click', () => {
    compareSection.style.display = 'none';
});

async function loadCompareCities() {
    compareGrid.innerHTML = '<div class="loading-screen" style="padding:0.5rem;"><div class="loader-ring" style="width:30px;height:30px;"></div></div>';
    compareSection.style.display = 'block';

    try {
        const promises = compareCities.map(city =>
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
                .then(res => res.json())
        );

        const results = await Promise.all(promises);

        compareGrid.innerHTML = '';
        results.forEach(data => {
            const card = document.createElement('div');
            card.className = 'compare-card';
            const temp = isCelsius ? data.main.temp : (data.main.temp * 9/5 + 32);
            const unit = isCelsius ? '°C' : '°F';
            card.innerHTML = `
                <div class="city-name">${data.name}</div>
                <div class="city-temp">${Math.round(temp)}${unit}</div>
                <div class="city-condition">${data.weather[0].description}</div>
                <div class="city-details">
                    💧 ${data.main.humidity}% · 🌬️ ${Math.round(data.wind.speed * 3.6)} km/h
                </div>
            `;
            compareGrid.appendChild(card);
        });
    } catch (error) {
        compareGrid.innerHTML = '<p style="color:#94a3b8;text-align:center;">Unable to load comparison data</p>';
    }
}

// ============================================================
//  AMBIENT SOUND
// ============================================================
const soundToggle = document.getElementById('soundToggle');
let audioContext = null;
let isSoundPlaying = false;

function getAmbientSound(weather) {
    const condition = weather?.toLowerCase() || '';
    if (condition.includes('rain')) return 'rain';
    if (condition.includes('cloud')) return 'wind';
    if (condition.includes('clear') || condition.includes('sun')) return 'birds';
    return 'ambient';
}

function createAmbientAudio(type) {
    // Create a simple ambient sound using Web Audio API
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    const sounds = {
        rain: { frequency: 200, type: 'sawtooth', gain: 0.05 },
        wind: { frequency: 120, type: 'triangle', gain: 0.04 },
        birds: { frequency: 800, type: 'sine', gain: 0.03 },
        ambient: { frequency: 440, type: 'sine', gain: 0.02 }
    };

    const config = sounds[type] || sounds.ambient;

    // Create oscillator
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = config.type;
    oscillator.frequency.value = config.frequency;
    gain.gain.value = config.gain;

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start();
    
    // Add some subtle variation
    const interval = setInterval(() => {
        if (!isSoundPlaying) {
            clearInterval(interval);
            return;
        }
        oscillator.frequency.value = config.frequency + (Math.random() - 0.5) * 20;
        gain.gain.value = config.gain + (Math.random() - 0.5) * 0.01;
    }, 1000);

    return { oscillator, gain, interval };
}

let ambientAudio = null;

soundToggle.addEventListener('click', () => {
    if (!isSoundPlaying) {
        const weather = document.getElementById('description').textContent;
        const soundType = getAmbientSound(weather);
        ambientAudio = createAmbientAudio(soundType);
        isSoundPlaying = true;
        soundToggle.classList.add('active');
        soundToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else {
        if (ambientAudio) {
            ambientAudio.oscillator.stop();
            clearInterval(ambientAudio.interval);
            ambientAudio = null;
        }
        isSoundPlaying = false;
        soundToggle.classList.remove('active');
        soundToggle.innerHTML = '<i class="fas fa-music"></i>';
    }
});

// ============================================================
//  MOON PHASE & POLLEN (Enhanced)
// ============================================================
function calculateMoonPhase(timestamp) {
    // Simple moon phase calculation
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    // Simplified lunar cycle (29.53 days)
    const lunarCycle = 29.53058867;
    const reference = new Date(2000, 0, 6, 18, 14).getTime();
    const diff = date.getTime() - reference;
    const days = diff / (1000 * 60 * 60 * 24);
    const phase = (days / lunarCycle) % 1;

    const phases = [
        'New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous',
        'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent'
    ];

    const index = Math.floor(phase * 8) % 8;
    return phases[index];
}

// ============================================================
//  WEATHER CHART (Temperature Timeline)
// ============================================================
let chartInstance = null;

function createWeatherChart(forecastData) {
    const ctx = document.getElementById('tempChart').getContext('2d');
    const chartDiv = document.getElementById('weatherChart');

    if (!forecastData || !forecastData.list) {
        chartDiv.style.display = 'none';
        return;
    }

    const labels = forecastData.list.slice(0, 24).map(item => {
        return new Date(item.dt * 1000).toLocaleTimeString('en-US', { hour: '2-digit' });
    });

    const temps = forecastData.list.slice(0, 24).map(item => {
        return isCelsius ? item.main.temp : (item.main.temp * 9/5 + 32);
    });

    const feelsLike = forecastData.list.slice(0, 24).map(item => {
        return isCelsius ? item.main.feels_like : (item.main.feels_like * 9/5 + 32);
    });

    // Destroy existing chart
    if (chartInstance) {
        chartInstance.destroy();
    }

    chartDiv.style.display = 'block';

    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    if (isDark) {
        gradient.addColorStop(0, 'rgba(245, 158, 11, 0.3)');
        gradient.addColorStop(1, 'rgba(245, 158, 11, 0)');
    } else {
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
    }

    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Temperature',
                    data: temps,
                    borderColor: isDark ? '#f59e0b' : '#3b82f6',
                    backgroundColor: gradient,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 2,
                    pointBackgroundColor: isDark ? '#f59e0b' : '#3b82f6',
                },
                {
                    label: 'Feels Like',
                    data: feelsLike,
                    borderColor: isDark ? '#8b5cf6' : '#8b5cf6',
                    backgroundColor: 'transparent',
                    borderDash: [5, 5],
                    tension: 0.4,
                    pointRadius: 1,
                    pointBackgroundColor: isDark ? '#8b5cf6' : '#8b5cf6',
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: isDark ? '#94a3b8' : '#4b5563',
                        font: { size: 10 }
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: isDark ? '#94a3b8' : '#4b5563',
                        font: { size: 9 },
                        maxTicksLimit: 8
                    },
                    grid: {
                        color: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
                    }
                },
                y: {
                    ticks: {
                        color: isDark ? '#94a3b8' : '#4b5563',
                        font: { size: 9 }
                    },
                    grid: {
                        color: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
                    }
                }
            }
        }
    });
}

// ============================================================
//  UPDATE MOON PHASE AND POLLEN IN DISPLAY
// ============================================================
function updateExtraWidgets(data) {
    // Moon Phase
    const moonPhase = calculateMoonPhase(data.sys.sunset);
    document.getElementById('moonPhaseText').textContent = moonPhase;

    // Pollen (simulated based on season and weather)
    const month = new Date().getMonth();
    const isSpring = month >= 2 && month <= 5;
    const isSummer = month >= 6 && month <= 8;
    const isDry = data.main.humidity < 40;

    let pollenLevel = 'Low';
    let pollenEmoji = '🟢';
    
    if (isSpring && isDry) {
        pollenLevel = 'Very High';
        pollenEmoji = '🔴';
    } else if (isSpring) {
        pollenLevel = 'High';
        pollenEmoji = '🟠';
    } else if (isSummer) {
        pollenLevel = 'Moderate';
        pollenEmoji = '🟡';
    } else {
        pollenLevel = 'Low';
        pollenEmoji = '🟢';
    }

    document.getElementById('quickPollen').textContent = pollenEmoji + ' ' + pollenLevel;
    document.getElementById('pollenLevel').textContent = pollenLevel;
}

// ============================================================
//  UPDATE DISPLAY WEATHER TO INCLUDE NEW FEATURES
// ============================================================
// Override the existing displayCurrentWeather function to include new features
const originalDisplayCurrentWeather = displayCurrentWeather;
displayCurrentWeather = function(data) {
    originalDisplayCurrentWeather(data);
    updateExtraWidgets(data);
    
    // Update ambient sound if playing
    if (isSoundPlaying) {
        const weather = data.weather[0].main;
        const soundType = getAmbientSound(weather);
        if (ambientAudio) {
            ambientAudio.oscillator.stop();
            clearInterval(ambientAudio.interval);
            ambientAudio = createAmbientAudio(soundType);
        }
    }
};

// Override the existing displayForecast to include chart
const originalDisplayForecast = displayForecast;
displayForecast = function(data) {
    originalDisplayForecast(data);
    createWeatherChart(data);
};

// ============================================================
//  DESKTOP NOTIFICATIONS
// ============================================================
function requestNotificationPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
}

function sendWeatherNotification(city, temp, condition) {
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(`🌤️ Weather Update: ${city}`, {
            body: `Temperature: ${temp}°C\nCondition: ${condition}`,
            icon: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
        });
    }
}

// Request notification permission on load
requestNotificationPermission();

// ============================================================
//  KEYBOARD SHORTCUTS
// ============================================================
document.addEventListener('keydown', (e) => {
    // Ctrl + F - Focus search
    if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        cityInput.focus();
        cityInput.select();
    }
    // Ctrl + R - Refresh
    if (e.ctrlKey && e.key === 'r') {
        e.preventDefault();
        if (currentCity) fetchWeather(currentCity);
    }
    // Escape - Close compare section
    if (e.key === 'Escape') {
        compareSection.style.display = 'none';
    }
});

console.log('🌟 WeatherSphere Pro loaded with premium features!');
console.log('📌 Keyboard Shortcuts:');
console.log('  Ctrl+F - Focus search');
console.log('  Ctrl+R - Refresh weather');
console.log('  ESC - Close compare section');