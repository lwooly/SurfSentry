import axios from "axios";
import createSurflineEndpoint from "./forecastFns/createSurflineEndpoint.js";

//get all spots from surfline

// fetch the surfline forecast
const fetchSurflineForecast = async (spotId) => {
    const forecastEndpoint = createSurflineEndpoint(spotId);
    try {

        axios.interceptors.request.use(request => {
            console.log('Starting Request', JSON.stringify(request, null, 2))
            return request
          });

          const config = {
            transitional: {
              silentJSONParsing: true,
              forcedJSONParsing: true,
              clarifyTimeoutError: false
            },
            headers: {
              "Accept": "application/json, text/plain, */*"
            },
          };

        const response = await axios.get(forecastEndpoint, )
        // console.log('Request Headers:', response.config.headers);
        // console.log('Request Method:', response.config.method);
        // console.log('Request URL:', response.config.url);
        // return condition forecast only
        // console.log(response.data.data.conditions)
        return response.data.data.conditions
    } catch (error) {
        throw error
    }
}

export default fetchSurflineForecast;

