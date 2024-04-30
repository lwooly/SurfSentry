import axios from "axios";


export const getForecasts = async (accessToken:string) => {

    const url =`${import.meta.env.VITE_API_URL}/forecasts`;

    const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

    return res

};
