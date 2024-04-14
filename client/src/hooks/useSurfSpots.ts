import { getSurfSpots } from "@src/api/spots";
import { useEffect, useState } from "react";

const useSurfSpots = (accessToken: string | null) => {

  const [surfspots, setSurfspots] = useState([]);

  useEffect(() => {
    const getSpots = async () => {
        if (!accessToken) return
        
      try {
        const res = await getSurfSpots(accessToken);
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
