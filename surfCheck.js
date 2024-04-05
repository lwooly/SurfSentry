import fetchSurflineForecast from "./services/fetchSurflineForecast.js"
import checkForecast from "./utils/checkForecast.js"

// hardcode spotId during development
const spotIds = [{name: 'Rest Bay', spotId:"584204204e65fad6a77090d2"}]

//hardcode array of good forecasts - this can be in db
const goodForecasts = []

// check surfline forecast for each spot and save 
const surfCheck = (spotIds) => {
    spotIds.forEach(async ({name, spotId}) => {
        const forecast = await fetchSurflineForecast(spotId)

        //check spot forecast data for any good or epic ratings and return these
        const forecasts = checkForecast(forecast)

        //add spot name to forecast objects for reference
        const namedForecasts = forecasts.map(forecast => {
            forecast.name = name;
            return forecast
        })

       // send a notification to user if any good forecasts
        if (namedForecasts.length) {
            console.log('send a notification')
        }
})}

surfCheck(spotIds)