const express = require('express');
const weatherController = require('../controllers/weatherController');

const router = express.Router();

router.get('/current', weatherController.getCurrentWeather);
router.get('/hourly', weatherController.getHourlyForecast);
router.get('/daily', weatherController.getDailyForecast);
router.get('/cities', weatherController.getLargeCitiesSummary);
router.get('/search', weatherController.searchCity);

module.exports = router;
