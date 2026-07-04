WeatherSphere  
A premium, feature-rich weather dashboard built with vanilla JavaScript, HTML, and CSS. Get real-time weather data, interactive forecasts, and a beautiful animated interface.

Features
Current Weather
Real-time temperature with Celsius/Fahrenheit toggle

Detailed weather conditions with animated icons

Feels-like temperature

Comprehensive stats: humidity, wind speed, pressure, visibility, UV Index, cloud cover

Sunrise & sunset times

Last updated timestamp

Advanced Visualizations
Interactive Temperature Chart - 24-hour temperature trend with "feels like" comparison

Hourly Forecast - 24-hour breakdown with weather conditions

5-Day Forecast - Extended outlook with high/low temperatures and humidity

Premium UI/UX
Animated Gradient Background - Dynamic color shifts

Floating Particle System - Ambient particle effects

Dark/Light Theme - Toggle between themes with smooth transitions

Glassmorphism Design - Modern frosted glass effects

Responsive Layout - Works on desktop, tablet, and mobile

Smooth Animations - Hover effects, transitions, and loading states

Smart Features
Voice Search - Search cities using your voice (Web Speech API)

Current Location - Get weather for your current location

Favorites - Save favorite cities with localStorage persistence

Compare Cities - Compare weather across multiple cities

Share Weather - Share weather info via Web Share API or clipboard

Weather Alerts - Display severe weather notifications

Ambient Experience
Ambient Sound - Dynamic soundscapes based on weather conditions (rain, wind, birds, ambient)

Moon Phase - Track current lunar phase

Pollen Count - Seasonal pollen level indicator

Air Quality Index - Real-time AQI with color-coded indicators

Keyboard Shortcuts
Ctrl+F - Focus search bar

Ctrl+R - Refresh weather data

ESC - Close comparison section

Technologies Used
HTML5 - Semantic markup

CSS3 - Custom properties, animations, grid, flexbox

JavaScript (ES6+) - Vanilla JS, async/await, DOM manipulation

Chart.js - Interactive temperature charts

Font Awesome - Icon library

Google Fonts (Inter) - Typography

OpenWeatherMap API - Weather data

Web Speech API - Voice recognition

Web Audio API - Ambient sound generation

Web Share API - Social sharing

LocalStorage - Favorites persistence

Usage
Basic Search
Type a city name in the search bar

Press Enter or click the search button

View comprehensive weather data

Voice Search
Click the microphone icon 

Speak a city name

Weather data will load automatically

Favorites
Click the heart icon ❤️ on any city

Saved cities appear in the favorites bar

Click any favorite to load its weather

Compare Cities
Click the compare button (↔)

View weather comparison for default cities

Close with ESC key or the X button

Theme Toggle
Click the moon/sun icon to switch between dark and light themes

Temperature Units
Click °F/°C toggle to switch temperature units

Ambient Sound
Click the music note icon in the bottom-right

Sound adapts to current weather conditions

Project Structure
text
weathersphere-pro/
├── index.html          # Main HTML structure
├── style.css           # Complete styles with themes
├── script.js           # Full JavaScript functionality
├── README.md           # Project documentation
└── LICENSE             # MIT License
API Reference
OpenWeatherMap Endpoints Used
Current Weather: https://api.openweathermap.org/data/2.5/weather

5-Day Forecast: https://api.openweathermap.org/data/2.5/forecast

Air Pollution: https://api.openweathermap.org/data/2.5/air_pollution

Response Data Structure
javascript
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
  wind: { speed: 5.2 },
  clouds: { all: 20 },
  sys: {
    country: "US",
    sunrise: 1623456789,
    sunset: 1623499999
  },
  coord: { lat: 40.7128, lon: -74.0060 }
}
Customization
Colors & Themes
Modify CSS variables in style.css:

css
:root {
  --primary-color: #f59e0b;
  --bg-dark: #0a0e1a;
  --bg-light: #f0f4ff;
  /* Add your custom colors */
}
Particle Effects
Adjust particle count in script.js:

javascript
// Change 80 to desired number
for (let i = 0; i < 80; i++) {
  // Particle configuration
}
Ambient Sounds
Modify sound configurations:

javascript
const sounds = {
  rain: { frequency: 200, type: 'sawtooth', gain: 0.05 },
  // Add custom sound types
};
Browser Support
Chrome 80+

Firefox 75+

Safari 13+

Edge 80+

Opera 67+

Contributing
Fork the repository

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

Development Guidelines
Follow ES6+ JavaScript standards

Maintain consistent indentation (2 spaces)

Add comments for complex logic

Test across multiple browsers

Update documentation as needed

License
This project is licensed under the MIT License - see the LICENSE file for details.

Credits
Weather Data: OpenWeatherMap

Icons: Font Awesome

Charts: Chart.js

Fonts: Google Fonts - Inter

About
WeatherSphere was developed as an internship project for Optimus Automate, showcasing modern web development practices, API integration, and premium UI/UX design.

Contact & Support
Email: areeshakanwal024@gmail.com

GitHub: @areeshakanwal-dev


Acknowledgments
OpenWeatherMap for providing free weather data

The open-source community for amazing libraries

Optimus Automate for the internship opportunity
