# Weather Web App Frontend

This is the frontend for a weather web application, built with Vite, React, and Tailwind CSS.
It consumes data from the Node.js Express backend to display current weather, hourly forecasts, and daily forecasts.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running Locally](#running-locally)
- [Deployment](#deployment)

## Features

- Responsive design for desktop.
- Dynamic display of current weather, hourly, and 5-day forecasts.
- Search functionality for cities.
- Global state management for:
  - Temperature unit toggle (°C / °F).
  - Dark/Light mode toggle (dark by default).
  - Last searched location caching.
- Smooth animations using Framer Motion (fade-in, hover effects).
- Weather-related icons from Lucide Icons.
- Background illustration and subtle weather-based particle animations.
- Fully translated to Spanish.

## Project Structure

```
frontend/
├── public/
├── src/
│   ├── components/         # Reusable React components
│   │   ├── CurrentWeatherCard.jsx
│   │   ├── DailyForecastCard.jsx
│   │   ├── HourlyForecastCard.jsx
│   │   ├── LargeCityWeatherCard.jsx
│   │   ├── SearchBar.jsx
│   │   ├── TemperatureUnitToggle.jsx
│   │   ├── ThemeToggle.jsx
│   │   ├── BackgroundIllustration.jsx
│   │   └── WeatherParticles.jsx
│   ├── context/            # React Context API for global state
│   │   └── WeatherContext.jsx
│   ├── utils/              # Utility functions (e.g., weather icon mapping)
│   │   └── weatherIcons.jsx
│   ├── App.jsx             # Main application component
│   └── main.jsx            # Entry point of the React application
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

- [Node.js](https://nodejs.org/)

### Installation

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```

2.  Install the dependencies:
    ```bash
    npm install
    ```

### Configuration

Ensure your backend is running and accessible. The frontend is configured to fetch data from `http://localhost:3000/weather`. If your backend is running on a different port or URL, you will need to update the `API_BASE_URL` in `frontend/src/App.jsx`.

### Running Locally

1.  Make sure you are in the `frontend` directory:
    ```bash
    cd frontend
    ```

2.  Start the development server:
    ```bash
    npm run dev
    ```

    The application will typically be available at `http://localhost:5173` (or another port if 5173 is in use).

## Deployment

Vite automatically optimizes the build for production. To create a production-ready build of the frontend:

1.  Make sure you are in the `frontend` directory:
    ```bash
    cd frontend
    ```

2.  Run the build command:
    ```bash
    npm run build
    ```

    This will generate optimized static assets in the `dist` directory. You can then deploy these static files to any static site hosting service (e.g., Netlify, Vercel, GitHub Pages, Firebase Hosting).
