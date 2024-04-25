import { useAuth0 } from "@auth0/auth0-react";
import { subscribeUserToSpot } from "@src/api/spots";
import ButtonWithArrow from "@src/components/global/ButtonWithArrow";
import useAccessToken from "@src/hooks/useAccessToken";
import useRegions, { Region } from "@src/hooks/useRegions";
import useSurfSpots, { UseSurfSpotsReturn } from "@src/hooks/useSurfSpots";
import React, { useState } from "react";

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

  console.log(surfSpots)

  const {
    regions,
    subRegions,
    isLoading: isRegionsLoading,
    isServerError: isRegionsServerError,
  } = useRegions();

  const isLoading = isSurfSpotsLoading && isRegionsLoading ? true : false;
  const isServerError =
    isSurfSpotsServerError && isRegionsServerError ? true : false;

  const [countryId, setCountryId] = useState<Region | null>(null);
  const [subRegionId, setSubRegionId] = useState<Region | null>(null);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setCountryId(e.target.value);
  };

  const handleSubRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setSubRegionId(e.target.value);
  };

  const monitorNewForecast = async (e) => {
    e.preventDefault();
    const spotId = e.target[0].value;
    try {
      const response = await subscribeUserToSpot({
        spotId,
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
    <form onSubmit={monitorNewForecast}>
      <label>
        <select name="country" id="country" onChange={handleCountryChange}>
          {!isLoading && !isServerError && (
            <>
              <option disabled selected>
                {" "}
                -- select an option --{" "}
              </option>
              {regions?.map((region) => {
                return (
                  <option key={region.id} value={region.id}>
                    {region.region_name}
                  </option>
                );
              })}
            </>
          )}
        </select>
      </label>
      <label>
        <select
          name="subRegions"
          id="subRegions"
          onChange={handleSubRegionChange}
        >
          {!isLoading && !isServerError && (
            <>
              <option disabled selected>
                {" "}
                -- select an option --{" "}
              </option>
              {subRegions?.map((sub) => {
                if (countryId) {
                  console.log('liesin: ', sub?.lies_in)
                  console.log('country id', countryId)
                  if (sub.lies_in.split(", ").includes(countryId)) {
                    return (
                      <option key={sub.id} value={sub.id}>
                        {sub.region_name}
                      </option>
                    );
                  }
                } else {
                  return (
                    <option key={sub.id} value={sub.id}>
                      {sub.region_name}
                    </option>
                  );
                }
              })}
            </>
          )}
        </select>
      </label>

      <select name="surfspots">
        <option disabled selected>
          {" "}
          -- select an option --{" "}
        </option>
        {surfSpots?.map((spot) => {
          if (spot.user_id !== user?.sub) {
            if (subRegionId) {
              console.log('liesin: ', spot?.lies_in)
              // console.log('region id', subRegionId)
              if (spot?.lies_in.split(", ").includes(subRegionId)) {
                return (
                  <option key={spot.surfline_id} value={spot.surfline_id}>
                    {spot.spotname}
                  </option>
                );
              }
            } else {
              return (
                <option key={`${spot.spotname}${spot.surfline_id}`} value={spot.surfline_id}>
                  {spot.spotname}
                </option>
              );
            }
          }
        })}
      </select>
      <button type="submit">Monitor forecast</button>
    </form>
  );
};

export default SelectForecastForm;
