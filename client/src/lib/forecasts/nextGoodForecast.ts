import { Forecast } from "@src/hooks/useForecasts";
import { timeStamp } from "console";
import { timestampToDateString } from "../date";

//find time and date of next good forecast
export const nextGoodForecast = (forecast: Forecast) => {
  for (let i = 0; i < forecast.forecast.length; i += 1) {
    const day = forecast.forecast[i];
    if (
      day.am.rating &&
      // day.am.rating === "POOR" ||
      (day.am.rating === "FAIR" ||
        day.am.rating === "GOOD" ||
        day.am.rating === "EPIC")
    ) {
      return {
        forecastDay: day.forecastDay,
        observation: day.observation,
        rating: day.am.rating,
        dayPeriod: "am",
        dateString: timestampToDateString(day.timestamp),
      };
    } else if (
      day.pm.rating &&
      // day.pm.rating === "POOR" ||
      (day.pm.rating === "FAIR" ||
        day.pm.rating === "GOOD" ||
        day.pm.rating === "EPIC")
    ) {
      return {
        forecastDay: day.forecastDay,
        observation: day.observation,
        rating: day.pm.rating,
        dayPeriod: "pm",
        dateString: timestampToDateString(day.timestamp),
      };
    }
  }

  return null;
};
