import axios from "axios";
import createSurflineEndpoint from "./forecastFns/createSurflineEndpoint.js";
import { getUserAgent } from "../../../tasks/scrape/config/userAgents.js";

//get all spots from surfline

// fetch the surfline forecast
const fetchSurflineForecast = async (spotId) => {
    const forecastEndpoint = createSurflineEndpoint(spotId);
    try {
        const response = await axios.get(forecastEndpoint)
        console.log('Request Headers:', response.config.headers);
        console.log('Request Method:', response.config.method);
        console.log('Request URL:', response.config.url);
        // return condition forecast only
        // console.log(response.data.data.conditions)
        return response.data.data.conditions
    } catch (error) {
        throw error
    }
}

export default fetchSurflineForecast;

