// checks forecast data for any good surfing opportunities
const checkForecast = (spotForecasts) => {
  const goodForecasts = [];

  // limit to 3 days TODO
  spotForecasts.forEach((forecastObj) => {
    forecastObj?.forecast.forEach((forecast, index) => {
      // check am forecast
      if (
        forecast.am.rating === "POOR" ||
        forecast.am.rating === "FAIR" ||
        forecast.am.rating === "GOOD" ||
        forecast.am.rating === "EPIC"
      ) {
        goodForecasts.push(forecast);
      }
      // TODO: Check pm forecasts
      // TODO: Split forecast object into am and pm?
    });
  });

  return goodForecasts;
};

export default checkForecast;
