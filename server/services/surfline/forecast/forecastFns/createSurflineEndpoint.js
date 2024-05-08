const SURFLINE_API = "https://services.surfline.com/kbyg/spots/forecasts/conditions?spotId=TEST"

const createSurflineEndpoint = (spotId) => {
    const forecastEndpoint = `${SURFLINE_API}${spotId}`;

    return forecastEndpoint;
}

export default createSurflineEndpoint;



