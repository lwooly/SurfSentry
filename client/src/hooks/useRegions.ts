import { useAuth0 } from "@auth0/auth0-react";
import { getRegions } from "@src/api/regions";
import { useCallback, useEffect, useState } from "react";

export interface Region {
  id: string;
  region_name: string;
  region_type: string;
  category: string;
  has_spots: boolean;
  lies_in: string;
  depth: number;
  updated_at: string | null;
  latitude: string;
  longitude: string;
  fcode: string;
  fcl_name: string;
  fcode_name: string;
  enumerated_path: string;
  subregion_id: string | null;
}

export interface UseRegionsReturn {
  isLoading: boolean;
  isServerError: boolean;
  allRegions: Region[] | undefined;
  regions:Region[] | undefined;
  subRegions:Region[] | undefined;
  refetch: () => void;
}
//gets all surf spots. If user id is provided gets user subscribed spots.
const useRegions = () => {
  const { getAccessTokenSilently } = useAuth0();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isServerError, setIsServerError] = useState<boolean>(false);
  const [allRegions , setRegions] = useState<undefined | Region[]>()

  // fetch surfspots
  const fetchRegions = useCallback(async () => {
    try {
      setIsServerError(false)
      setIsLoading(true);
      // get access token for api call
      const accessToken = await getAccessTokenSilently();
      if (!accessToken) {
        throw new Error("Access token not found");
      }

      // fetch allRegions
      const res = await getRegions({ accessToken });
      console.log('allRegions fetched successfully', res)

      setRegions(res.data);
    } catch (err) {
      setIsServerError(true);
      console.log("Internal sever error", err);
    } finally {
      setIsLoading(false)
    }
  }, [getAccessTokenSilently]);


  useEffect(() => {
    fetchRegions()
  },[fetchRegions])
  
  const refetch = () => {
    fetchRegions()
  }

  //countries only - depth 1
  const regions = allRegions?.filter(region => {
    return region?.region_type ==='region' && region?.has_spots;
  })

  // console.log(countries)

    //subregions only
    const subRegions = allRegions?.filter(region => {
      // if ( region.region_type === 'subregion' && region?.has_spots)
      if ( region?.region_type ==='subregion' && region?.has_spots)

      return true
    })

  return {
    isLoading,
    isServerError,
    allRegions,
    regions,
    subRegions,
    refetch
  }
};

export default useRegions;
