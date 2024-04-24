import axios from "axios";

const BASE_SPOT_URL = "https://services.surfline.com/taxonomy/";


const cache = {};

export const fetchSpots = async (id) => {
  const baseUrl = `${BASE_SPOT_URL}?type=taxonomy&id=${id}`;

  if (cache[baseUrl]) {
    return cache[baseUrl];
  }

  try {
    const res = await axios.get(baseUrl);
    //add to cache
    cache[baseUrl] = res.data;
    return res.data;
  } catch (err) {
    console.log("Spots not found", err);
  }
};
