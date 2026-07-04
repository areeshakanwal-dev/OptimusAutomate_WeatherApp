# 🌤️ WeatherSphere

A **premium, feature-rich weather dashboard** built with **Vanilla JavaScript, HTML, and CSS**. WeatherSphere provides real-time weather updates, interactive forecasts, beautiful animations, and an elegant user experience.

---

# ✨ Features

## 🌍 Current Weather

- 🌡️ Real-time temperature with **Celsius/Fahrenheit** toggle
- ☁️ Detailed weather conditions with animated icons
- 🤗 Feels-like temperature
- 💧 Humidity
- 🌬️ Wind Speed
- 📊 Atmospheric Pressure
- 👀 Visibility
- ☀️ UV Index
- ☁️ Cloud Cover
- 🌅 Sunrise & Sunset times
- 🕒 Last Updated timestamp

---

## 📈 Advanced Visualizations

### 📊 Interactive Temperature Chart

- 24-hour temperature trend
- "Feels Like" comparison
- Powered by **Chart.js**

### 🕐 Hourly Forecast

- 24-hour weather breakdown
- Weather icons
- Temperature details

### 📅 5-Day Forecast

- High & Low temperatures
- Humidity information
- Daily weather conditions

---

# 🎨 Premium UI/UX

- ✨ Animated Gradient Background
- 🎈 Floating Particle System
- 🌙 Dark & Light Theme Toggle
- 🪟 Glassmorphism Design
- 📱 Fully Responsive Layout
- ⚡ Smooth Animations & Hover Effects
- ⏳ Beautiful Loading States

---

# 🚀 Smart Features

### 🎤 Voice Search

Search any city using the **Web Speech API**.

### 📍 Current Location

Automatically fetch weather using your current location.

### ❤️ Favorites

- Save favorite cities
- Stored using **LocalStorage**
- One-click access

### ↔️ Compare Cities

Compare weather conditions between multiple cities.

### 📤 Share Weather

- Web Share API
- Clipboard support

### ⚠️ Weather Alerts

Display severe weather notifications when available.

---

# 🌙 Ambient Experience

- 🎵 Dynamic Ambient Sounds
- 🌕 Moon Phase Indicator
- 🌼 Seasonal Pollen Count
- 🌫️ Air Quality Index (AQI)

Ambient sounds automatically adapt based on the current weather.

---

# ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|-----------|--------|
| **Ctrl + F** | Focus Search Bar |
| **Ctrl + R** | Refresh Weather |
| **Esc** | Close Compare Section |

---

# 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Chart.js
- Font Awesome
- Google Fonts (Inter)
- OpenWeatherMap API
- Web Speech API
- Web Audio API
- Web Share API
- LocalStorage

---

# 📖 Usage

## 🔍 Basic Search

1. Enter a city name.
2. Press **Enter** or click the search button.
3. View complete weather details.

---

## 🎤 Voice Search

1. Click the microphone icon.
2. Speak the city name.
3. Weather data loads automatically.

---

## ❤️ Favorites

1. Click the heart icon.
2. Saved cities appear in the favorites section.
3. Click any favorite to load weather instantly.

---

## ↔️ Compare Cities

1. Click the compare button.
2. Compare weather information.
3. Close using **Esc** or the close button.

---

## 🌙 Theme Toggle

Switch between **Dark Mode** and **Light Mode** using the theme button.

---

## 🌡️ Temperature Units

Toggle between:

- °C Celsius
- °F Fahrenheit

---

## 🎵 Ambient Sound

Click the music icon to enable immersive weather-based sound effects.

---

# 📂 Project Structure

```text
weathersphere-pro/
│
├── index.html          # Main HTML structure
├── style.css           # Styling & themes
├── script.js           # JavaScript functionality
├── README.md           # Documentation
└── LICENSE             # MIT License
```

---

# 🌐 API Reference

WeatherSphere uses the **OpenWeatherMap API**.

### Current Weather

```
https://api.openweathermap.org/data/2.5/weather
```

### 5-Day Forecast

```
https://api.openweathermap.org/data/2.5/forecast
```

### Air Pollution

```
https://api.openweathermap.org/data/2.5/air_pollution
```

---

# 📦 Sample Response

```javascript
{
  weather: [{
    main: "Clear",
    description: "clear sky",
    icon: "01d"
  }],
  main: {
    temp: 25.5,
    feels_like: 24.3,
    humidity: 65,
    pressure: 1012,
    temp_min: 22.0,
    temp_max: 28.0
  },
  wind: {
    speed: 5.2
  },
  clouds: {
    all: 20
  },
  sys: {
    country: "US",
    sunrise: 1623456789,
    sunset: 1623499999
  },
  coord: {
    lat: 40.7128,
    lon: -74.0060
  }
}
```

---

# 🎨 Customization

## Change Theme Colors

Modify CSS variables inside **style.css**

```css
:root {
  --primary-color: #f59e0b;
  --bg-dark: #0a0e1a;
  --bg-light: #f0f4ff;
}
```

---

## Particle Effects

Increase or decrease particle count.

```javascript
for (let i = 0; i < 80; i++) {
    // Particle configuration
}
```

---

## Ambient Sounds

Customize sound presets.

```javascript
const sounds = {
  rain: {
    frequency: 200,
    type: "sawtooth",
    gain: 0.05
  }
};
```

---

# 🌐 Browser Support

| Browser | Supported |
|----------|-----------|
| Chrome | ✅ 80+ |
| Firefox | ✅ 75+ |
| Safari | ✅ 13+ |
| Edge | ✅ 80+ |
| Opera | ✅ 67+ |

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Create your feature branch.

```bash
git checkout -b feature/AmazingFeature
```

3. Commit your changes.

```bash
git commit -m "Add some AmazingFeature"
```

4. Push the branch.

```bash
git push origin feature/AmazingFeature
```

5. Open a Pull Request.

---

# 📌 Development Guidelines

- Follow ES6+ JavaScript standards.
- Maintain clean code.
- Use consistent indentation (2 spaces).
- Comment complex logic.
- Test across multiple browsers.
- Update documentation when necessary.

---

# 📄 License

This project is licensed under the **MIT License**.

---

# 🙌 Credits

- 🌦️ Weather Data — OpenWeatherMap
- 📊 Charts — Chart.js
- 🎨 Icons — Font Awesome
- 🔤 Fonts — Google Fonts (Inter)

---

# 💼 About

**WeatherSphere** was developed as an internship project for **Optimus Automate**, showcasing modern frontend development, REST API integration, responsive design, animations, and premium UI/UX using only HTML, CSS, and Vanilla JavaScript.

---

# 📧 Contact

**Developer:** Areesha Kanwal

📩 Email: **areeshakanwal024@gmail.com**

🐙 GitHub: **@areeshakanwal-dev**

---

# ❤️ Acknowledgments

Special thanks to:

- OpenWeatherMap for providing free weather APIs.
- The open-source community for incredible libraries and inspiration.
- Optimus Automate for providing this internship opportunity.

---

## ⭐ If you like this project, don't forget to give it a Star!
