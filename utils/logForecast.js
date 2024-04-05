const logForecast = async () => {
    const forecastData = await getSurflineForecast(spotId);
    console.log(forecastData.conditions[0].am);
}

logForecast()