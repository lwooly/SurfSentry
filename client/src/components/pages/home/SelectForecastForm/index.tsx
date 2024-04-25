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

  const {
    regions,
    subRegions,
    isLoading: isRegionsLoading,
    isServerError: isRegionsServerError,
  } = useRegions();

  const isLoading = isSurfSpotsLoading && isRegionsLoading ? true : false;
  const isServerError =
    isSurfSpotsServerError && isRegionsServerError ? true : false;

  const [regionId, setRegionId] = useState<Region | null>(null);
  const [subRegionId, setSubRegionId] = useState<Region | null>(null);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setRegionId(e.target.value);
  };

  const handleSubRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setSubRegionId(e.target.value);
    console.log(e.target.value);
  };

  const monitorNewForecast = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement)

    const formValues = Object.fromEntries(formData.entries())

    const surfSpotId = formValues.surfSpot
    try {
      const response = await subscribeUserToSpot({
        spotId: surfSpotId,
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
                if (regionId) {
                  if (sub.lies_in.includes(regionId)) {
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

      <select name="surfSpot">
        <option disabled selected>
          {" "}
          -- select an option --{" "}
        </option>
        {surfSpots?.map((spot) => {
          if (spot.surfline_id === "584204204e65fad6a77090d2") {
            console.log("rest bay:", spot?.lies_in);
          }
          if (spot.user_id !== user?.sub) {
            if (subRegionId) {
              if (spot?.lies_in.includes(subRegionId)) {
                return (
                  <option key={spot.surfline_id} value={spot.surfline_id}>
                    {spot.spotname}
                  </option>
                );
              }
            } else {
              return (
                <option
                  key={`${spot.spotname}${spot.surfline_id}`}
                  value={spot.surfline_id}
                >
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
