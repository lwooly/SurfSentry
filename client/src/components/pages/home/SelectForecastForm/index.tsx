import { useAuth0 } from "@auth0/auth0-react";
import { subscribeUserToSpot } from "@src/api/spots";
import ButtonWithArrow from "@src/components/global/ButtonWithArrow";
import StyledSelect from "@src/components/global/StyledSelect";
import useAccessToken from "@src/hooks/useAccessToken";
import useRegions, { Region } from "@src/hooks/useRegions";
import useSurfSpots, {
  SurfSpot,
  UseSurfSpotsReturn,
} from "@src/hooks/useSurfSpots";
import React, { useState } from "react";

import styles from './styles.module.scss'
import StyledOption from "@src/components/global/StyledOption";


const SelectForecastForm = ({
  surfSpotsData,
}: {
  surfSpotsData: UseSurfSpotsReturn;
}) => {
  const { accessToken } = useAccessToken();
  const { user } = useAuth0();

  // add error if not available.
  const {
    surfSpots,
    isLoading: isSurfSpotsLoading,
    isServerError: isSurfSpotsServerError,
    refetch,
  } = surfSpotsData;

  const {
    regions,
    subRegions,
    isLoading: isRegionsLoading,
    isServerError: isRegionsServerError,
  } = useRegions();

  const isLoading = isSurfSpotsLoading && isRegionsLoading ? true : false;
  const isServerError =
    isSurfSpotsServerError && isRegionsServerError ? true : false;

  const [currentRegion, setCurrentRegion] = useState<Region | null>(null);
  const [currentSubRegion, setCurrentSubRegion] = useState<Region | null>(null);
  const [currentSpot, setCurrentSpot] = useState<SurfSpot | null>(null);

  const handleRegionChange = (region: Region) => {
    setCurrentRegion(region);
    setCurrentSubRegion(null)
    setCurrentSpot(null)
  };

  const handleSubRegionChange = (subRegion: Region) => {
    setCurrentSubRegion(subRegion);
    setCurrentSpot(null)
  };

  const handleSpotChange = (spot: SurfSpot) => {
    setCurrentSpot(spot);
  };

  const monitorNewForecast = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentSpot(null)
    if (!currentSpot) {
      return;
    }

    try {
      await subscribeUserToSpot({
        spotId: currentSpot.surfline_id,
        userId: user?.sub,
        accessToken,
      });
      console.log("User subscribed");
      refetch();
    } catch (err) {
      console.log("Failed to subscribe user to spot forecast");
    }
  };

  return (
    <div className={styles.forecastForm}>
      <div className={styles.container}>
        <form onSubmit={monitorNewForecast}>
          <label>
          <StyledSelect
            options={regions}
            onChange={handleRegionChange}
            current={currentRegion}
          >


          </StyledSelect>
          </label>
          <label>
          <StyledSelect
            options={subRegions}
            onChange={handleSubRegionChange}
            parent={currentRegion}
            current={currentSubRegion}
          />
          </label>
          <label>
          <StyledSelect
            options={surfSpots}
            onChange={handleSpotChange}
            parent={currentSubRegion}
            current={currentSpot}
          />
          </label>
          <ButtonWithArrow handleClick={monitorNewForecast} type='button'>
            Monitor Forecast
          </ButtonWithArrow>
        </form>
      </div>
    </div>
  );
};

export default SelectForecastForm;
