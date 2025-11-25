# 🌦️ Weather Dashboard

A modern and responsive weather dashboard built with React that allows users to monitor real-time weather conditions for multiple locations.

## 🚀 Features

* Add and manage multiple locations
* Live weather data powered by Open-Meteo API
* Hourly forecast with detailed parameters
* Sunrise & sunset indicators
* Precipitation tracking
* Geolocation support ("Use my location")
* Auto-refresh aligned with real update intervals
* Search with auto-completion for cities and airports
* Persistent data using localStorage
* Responsive and mobile-friendly design

## 🛠️ Tech Stack

* React
* Redux Toolkit
* Vite
* Open-Meteo API
* JavaScript (ES6+)
* CSS / Flexbox

## 🌍 Live Demo

👉 [https://MiBonato.github.io/weather-dashboard/](https://YOUR_USERNAME.github.io/weather-dashboard/)

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/MiBonato/weather-dashboard.git
cd weather-dashboard
```

Install dependencies:

```bash
npm install
```

Run the project locally:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## 🧠 How It Works

* Locations are added via a modal form with auto-completion
* Weather data is fetched dynamically and refreshed every 15 minutes
* Data is persisted across sessions using localStorage
* Hourly forecasts provide detailed information such as temperature, wind, cloud coverage and precipitation

## 📁 Project Structure

```
src/
 ├── app/
 │   ├── store.js
 ├── features/
 │   ├── form/
 │   │   └── weatherForm.jsx
 │   ├── layout/
 │   │   └── header.jsx
 │   │   └── footer.jsx
 │   ├── utils/
 │   │   └── loaderFull.jsx
 │   │   └── localstorage.js
 │   │   └── modal.jsx
 │   │   └── weatherIcons.js
 │   ├── weather/
 │   │   └── WeatherItem.jsx
 │   │   └── weatherList.jsx
 │   │   └── weatherSlice.js
 │   │   └── WeatherDetail.jsx
 ├── style/
 │   └── App.css
 │   └── grid.css
 ├── App.jsx
 ├── main.jsx
```

## ✨ Future improvements

* Favorite locations system
* Weather alerts
* Dark/Light theme toggle
* Weekly forecast view
* Map-based location selection

## 📜 License

This project is licensed under the MIT License.

---

👨‍💻 Developed as a personal project to explore modern front-end architecture and real-time data visualization.
