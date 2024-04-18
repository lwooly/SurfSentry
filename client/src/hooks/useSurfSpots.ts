import { getSurfSpots } from "@src/api/spots";
import { useEffect, useState } from "react";

//gets all surf spots. If user id is provided gets user subscribed spots.
const useSurfSpots = ({accessToken, userId, isUserExcluded}) => {

  const [surfspots, setSurfspots] = useState([]);

  useEffect(() => {
    const getSpots = async () => {
        if (!accessToken) return
        
      try {
        const res = await getSurfSpots({accessToken, userId, isUserExcluded});
        setSurfspots(res.data);
        console.log("surfspots fetched");
      } catch (err) {
        console.log("failed to fetch");
      }
    };

    getSpots();
  }, [accessToken]);

  return surfspots;
};

export default useSurfSpots;
