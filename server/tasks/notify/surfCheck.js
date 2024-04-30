import { getSpotSubscriptionsFromDB } from "../../lib/apiFunctions/SWsubscriptions/queries.js";
import { addForecasttoDB } from "../../lib/apiFunctions/forecasts/queries.js";
import { getSurfSpotsFromDB } from "../../lib/apiFunctions/surfSpots/queries.js";
import checkForecast from "../../services/surfline/forecast/forecastFns/checkForecast.js";
import fetchSurflineForecast from "../../services/surfline/forecast/getForecast.js";
import { sendNotifications } from "../../utils/notificationFns/sendNotifications.js";

// check surfline forecast for each spot and save
export const surfCheck = async () => {
  let spots = [];
  try {
    spots = await getSurfSpotsFromDB();
  } catch (err) {
    console.log("Internal server error", err);
  }

  // fetch surf forecasts from surfline and review for any valid forecasts on which to notify users.
  const spotForecasts = await Promise.all(
    spots.map(async ({ spotname, surfline_id }) => {
      try {
        const forecast = await fetchSurflineForecast(surfline_id);

        //return a forecast object for each spot
        return { spotname, surfline_id, forecast };
      } catch (error) {
        console.log("Could not fetch surfline forecast:", error.message);
      }
    })
  );

  // save spot forecasts to db for client reference
  spotForecasts.map(async (forecast) => {
    try {
      const res = await addForecasttoDB(forecast);
      // console.log('Forecasts added to database')
    }catch (err){
      console.log(`Could not add ${forecast?.spotname} forecast to db`, err)
    }
  })

  //check spot forecast data for any good or epic ratings and return these only

  //TODO - check why this isnt returning anything?
  const goodForecasts = checkForecast(spotForecasts)
  console.log(goodForecasts)

//send notifications to good forecasts
  const spotSurflineIds = goodForecasts ? goodForecasts.map(forecast => forecast?.surfline_id) : [];

  if (spotSurflineIds.length === 0) {
    console.log('No data available or error in fetching data');
  }

  //get users who subscribe to this spot.
  const subscriptions = await getSpotSubscriptionsFromDB(spotSurflineIds);

  // notify them users - subscriptions.
  sendNotifications(subscriptions);
};

// surfCheck()