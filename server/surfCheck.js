import { getSurfSpotsFromDB } from "./lib/apiFunctions/surfSpots/queries.js";
import fetchSurflineForecast from "./services/fetchSurflineForecast.js";
import checkForecast from "./utils/checkForecast.js";

// check surfline forecast for each spot and save
export const surfCheck = async () => {
    let spots = []
try {
    spots = await getSurfSpotsFromDB();
} catch (err) {
    console.log('Internal server error', err)
}

  spots.forEach(async ({ spotname, surfline_id }) => {
    try {
      const forecast = await fetchSurflineForecast(surfline_id);

      //add spot name to forecast objects for simple reference
      forecast.map((items) => {
        items.spotname = spotname;
        return items;
      });

      //check spot forecast data for any good or epic ratings and return these only
      const goodForecast = checkForecast(forecast);

      if (goodForecast.length > 0) {
        console.log("Notify users of good forecast at", spotname);
      }
    } catch (error) {
      console.log("Could not fetch surfline forecast:", error);
    }
  });
};
