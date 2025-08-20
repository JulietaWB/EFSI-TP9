# Weather Web App Backend

This is the backend for a weather web application, built with Node.js and Express.
It provides RESTful APIs to fetch current weather, hourly forecasts, and daily forecasts using the OpenWeatherMap API.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running Locally](#running-locally)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)

## Features

- Current weather data for a specified city or default location.
- Hourly weather forecast for the next 24 hours (3-hour intervals).
- 5-day weather forecast (daily min/max temperatures).
- Current weather summary for fixed large cities (New York, London, Tokyo).
- City search functionality.
- Support for `metric` (Celsius) and `imperial` (Fahrenheit) units.
- In-memory caching for weather data (10 minutes per city request) using `node-cache`.
- Robust error handling for invalid city names and OpenWeatherMap API errors.

## Project Structure

```
/
├── src/
│   ├── config/             # Configuration files (API keys, environment variables)
│   │   ├── config.js
│   │   └── .env.example
│   ├── controllers/        # Controllers with business logic for API endpoints
│   │   └── weatherController.js
│   ├── middleware/         # Express middleware (error handling)
│   │   └── errorHandler.js
│   ├── routes/             # Express routes definitions
│   │   └── weatherRoutes.js
│   ├── services/           # Integration with external APIs (OpenWeatherMap)
│   │   └── weatherService.js
│   └── app.js              # Main application file
├── package.json
├── package-lock.json
└── README.md
```

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

- [Node.js](https://nodejs.org/)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd EFSI-TP9
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

### Configuration

1. Obtain an API key from [OpenWeatherMap](https://openweathermap.org/api).

2. Create a `.env` file in the root directory of the project (same level as `package.json`).

3. Copy the contents of `src/config/.env.example` into your new `.env` file and replace `YOUR_API_KEY` with your actual OpenWeatherMap API key.

   ```
   PORT=3000
   OPENWEATHER_API_KEY=YOUR_API_KEY
   DEFAULT_CITY=Buenos Aires
   CACHE_DURATION=600
   ```

   - `PORT`: The port on which the server will run. (Default: 3000)
   - `OPENWEATHER_API_KEY`: Your OpenWeatherMap API key.
   - `DEFAULT_CITY`: The default city for weather requests if none is provided. (Default: Buenos Aires)
   - `CACHE_DURATION`: Duration in seconds for caching weather data. (Default: 600 seconds = 10 minutes)

### Running Locally

To start the server in development mode (with `nodemon` for auto-reloading):

```bash
npm run dev
```

To start the server in production mode:

```bash
npm start
```

The API will be accessible at `http://localhost:PORT` (e.g., `http://localhost:3000`).

## API Endpoints

All endpoints are prefixed with `/weather`.

- **Current Weather**
  `GET /weather/current?city={cityName}&unit={metric|imperial}`
  Returns temperature, location, time, wind speed, high/low temperature, and weather status.
  If no city is provided, it defaults to `DEFAULT_CITY`.
  Example: `http://localhost:3000/weather/current?city=London&unit=metric`

- **Hourly Forecast (next 24h)**
  `GET /weather/hourly?city={cityName}&unit={metric|imperial}`
  Returns the temperature and weather status for the next 24 hours in 3-hour intervals.
  Example: `http://localhost:3000/weather/hourly?city=Paris&unit=imperial`

- **5-Day Forecast**
  `GET /weather/daily?city={cityName}&unit={metric|imperial}`
  Returns weather forecast for the next 5 days with min/max temperatures and weather status.
  Example: `http://localhost:3000/weather/daily?city=Tokyo`

- **Large Cities Summary**
  `GET /weather/cities?unit={metric|imperial}`
  Returns current weather for 3 fixed large cities (New York, London, Tokyo).
  Example: `http://localhost:3000/weather/cities`

- **Search City**
  `GET /weather/search?city={cityName}&unit={metric|imperial}`
  Same as current weather endpoint, designed for search bar use.
  Example: `http://localhost:3000/weather/search?city=Berlin`

## Deployment

1. Ensure your `.env` file is properly configured for your production environment.
2. Install dependencies:
   ```bash
   npm install --production
   ```
3. Start the application:
   ```bash
   npm start
   ```

For most cloud providers (e.g., Heroku, AWS Elastic Beanstalk, Render), you would typically:

- Set environment variables directly on the platform.
- Configure a `start` script in `package.json` (already done: `"start": "node src/app.js"`).
- Push your code to a Git repository linked to your deployment service.
