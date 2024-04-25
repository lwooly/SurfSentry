import { useAuth0 } from "@auth0/auth0-react";
import { getSurfSpots } from "@src/api/spots";
import { useCallback, useEffect, useState } from "react";

interface SurfSpot {
  surfline_id: string;
  spotname: string;
  spot_ref: string;
  category?: string;
  lies_in: string[] | string;
  spot_location?: string;
  updated_at?: string;
  depth?: number;
  user_id?: string;
}

export interface UseSurfSpotsReturn {
  isLoading: boolean;
  isServerError: boolean;
  surfSpots: SurfSpot[] | undefined;
  refetch: () => void;
}
//gets all surf spots. If user id is provided gets user subscribed spots.
const useSurfSpots = ({ userId }: { userId: string | undefined }) => {
  const { getAccessTokenSilently } = useAuth0();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isServerError, setIsServerError] = useState<boolean>(false);
  const [surfSpots, setSurfspots] = useState<undefined | SurfSpot[]>();

  // fetch surfspots
  const fetchSurfSpots = useCallback(async () => {
    try {
      setIsServerError(false);
      setIsLoading(true);
      // get access token for api call
      const accessToken = await getAccessTokenSilently();
      if (!accessToken) {
        throw new Error("Access token not found");
      }

      //TODO: cache token in local storage

      // fetch surf spots
      const res = await getSurfSpots({ accessToken, userId });
      console.log("surf spots fetched successfully", res);

      const unpackedData = res?.data.map((item: SurfSpot) => {
        if (typeof item.lies_in === "string") {
          item.lies_in = item.lies_in.split(", ");
        }
        return item;
      });
      console.log(unpackedData);
      setSurfspots(unpackedData);
    } catch (err) {
      setIsServerError(true);
      console.log("Internal sever error", err);
    } finally {
      setIsLoading(false);
    }
  }, [getAccessTokenSilently, userId]);

  useEffect(() => {
    fetchSurfSpots();
  }, [userId, fetchSurfSpots]);

  const refetch = () => {
    fetchSurfSpots();
  };

  //check for rest bay

  const rb = surfSpots?.filter((spot) => {
    return spot.surfline_id === "584204204e65fad6a77090d2";
  });

  console.log("REST BAY", rb);

  return {
    isLoading,
    isServerError,
    surfSpots,
    refetch,
  };
};

export default useSurfSpots;
