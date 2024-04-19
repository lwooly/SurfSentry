import axios from "axios";
import createSurflineEndpoint from "../utils/forecastFns/createSurflineEndpoint.js";

// fetch the surfline forecast
const fetchSurflineForecast = async (spotId) => {
    const forecastEndpoint = createSurflineEndpoint(spotId);
    try {
        const response = await axios.get(forecastEndpoint)
        // return condition forecast only
        // console.log(response.data.data.conditions)
        return response.data.data.conditions
    } catch (error) {
        throw error
    }
}

export default fetchSurflineForecast;

