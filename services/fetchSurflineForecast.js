import axios from "axios";
import createSurflineEndpoint from "../utils/createSurflineEndpoint.js";

// fetch the surfline forecast
const fetchSurflineForecast = async (spotId) => {
    const forecastEndpoint = createSurflineEndpoint(spotId);
    try {
        const response = await axios.get(forecastEndpoint)
        // return condition forecast only
        return response.data.data.conditions
    } catch (error) {
        console.error(error)
    }
}

export default fetchSurflineForecast;

