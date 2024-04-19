import { useAuth0 } from "@auth0/auth0-react";
import { getSurfSpots } from "@src/api/spots";
import { useCallback, useEffect, useState } from "react";

interface SurfSpot {
  surfline_id: string;
  spotname: string;
  user_id?: string;
}

export interface UseSurfSpotsReturn {
  isLoading: boolean;
  isServerError: boolean;
  surfSpots: SurfSpot[] | null;
  refetch: () => void;
}
//gets all surf spots. If user id is provided gets user subscribed spots.
const useSurfSpots = ({ userId }: {userId: string | undefined}) => {
  const { getAccessTokenSilently } = useAuth0();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isServerError, setIsServerError] = useState<boolean>(false);
  const [surfSpots , setSurfspots] = useState<undefined | SurfSpot[]>()

  // fetch surfspots
  const fetchSurfSpots = useCallback(async () => {
    try {
      setIsServerError(false)
      setIsLoading(true);
      // get access token for api call
      const accessToken = await getAccessTokenSilently();
      if (!accessToken) {
        throw new Error("Access token not found");
      }

      //TODO: cache token in local storage

      // fetch surf spots
      const res = await getSurfSpots({ accessToken, userId });
      console.log('surf spots fetched successfully', res)
      setSurfspots(res.data);
    } catch (err) {
      setIsServerError(true);
      console.log("Internal sever error", err);
    } finally {
      setIsLoading(false)
    }
  }, [getAccessTokenSilently, userId]);


  useEffect(() => {
    fetchSurfSpots()
  },[userId, fetchSurfSpots])
  
  const refetch = () => {
    fetchSurfSpots()
  }
  
  return {
    isLoading,
    isServerError,
    surfSpots,
    refetch
  }
};

export default useSurfSpots;
