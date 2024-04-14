import { useAuth0 } from "@auth0/auth0-react";
import { subscribeUserToSpot } from "@src/api/spots";
import ButtonWithArrow from "@src/components/global/ButtonWithArrow";
import useAccessToken from "@src/hooks/useAccessToken";
import useSurfSpots from "@src/hooks/useSurfSpots";
import React from "react";

const SelectForecast = () => {
  const { accessToken } = useAccessToken();
  const {user} = useAuth0()

  const surfspots = useSurfSpots( accessToken);

  const monitorNewForecast = async (e) => {
    e.preventDefault()
    const spotId = e.target[0].value
    try {
     const response =  await subscribeUserToSpot({spotId, userId: user.sub, accessToken})
     console.log('User subscribed')
    } catch (err) {
      console.log("Failed to subscribe user to spot forecast");
    }
    

  }


  return (
    <form onSubmit={monitorNewForecast}>
      <select name="surfspots">
        {surfspots.map((spot) => (
          <option key={spot.surfline_id} value={spot.surfline_id}>{spot.name}</option>
        ))}
      </select>
      <button type="submit">
        Monitor forecast
      </button>
    </form>
  );
};

export default SelectForecast;
