import axios from "axios";
import createSurflineEndpoint from "./forecastFns/createSurflineEndpoint.js";

//get all spots from surfline

// fetch the surfline forecast
const fetchSurflineForecast = async (spotId) => {
    const forecastEndpoint = createSurflineEndpoint(spotId);
    try {

          const config = {
            transitional: {
              silentJSONParsing: true,
              forcedJSONParsing: true,
              clarifyTimeoutError: false
            },
            headers: {
              "Accept": "application/json, text/plain, */*",
              "x-vercel-id": "lhr1::8vc2v-1715166782532-fa9bb24129fd"
            },
          };

        const response = await axios.get(forecastEndpoint )
        return response.data.data.conditions
    } catch (error) {
        console.error('Error response:', error.response);
        console.error('Error details:', error.message);
        throw error
    }
}

export default fetchSurflineForecast;

