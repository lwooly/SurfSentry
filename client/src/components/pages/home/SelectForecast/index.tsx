import { useAuth0 } from "@auth0/auth0-react";
import { subscribeUserToSpot } from "@src/api/spots";
import ButtonWithArrow from "@src/components/global/ButtonWithArrow";
import useAccessToken from "@src/hooks/useAccessToken";
import useSurfSpots, { UseSurfSpotsReturn } from "@src/hooks/useSurfSpots";
import React from "react";


const SelectForecast = ({surfSpotsData}:{surfSpotsData: UseSurfSpotsReturn}) => {
  const { accessToken } = useAccessToken();
  const {user} = useAuth0()

  const { surfSpots , isLoading, isServerError, refetch} = surfSpotsData;

  const monitorNewForecast = async (e) => {
    e.preventDefault()
    const spotId = e.target[0].value
    try {
     const response =  await subscribeUserToSpot({spotId, userId: user?.sub, accessToken})
     console.log('User subscribed')
     refetch()
    } catch (err) {
      console.log("Failed to subscribe user to spot forecast");
    }
  }

  return (
    <form onSubmit={monitorNewForecast}>
      <select name="surfspots">
        { surfSpots?.map(({surfline_id, spotname, user_id}) => {
          if (user_id !== user?.sub) {
            return <option key={spotname} value={surfline_id}>{spotname}</option>
          }
      })}
      </select>
      <button type="submit">
        Monitor forecast
      </button>
    </form>
  );
};

export default SelectForecast;
