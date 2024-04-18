import React, { useEffect, useState } from "react";

import styles from "./styles.module.scss";
import useAccessToken from "@src/hooks/useAccessToken";
import createUser from "@src/api/users";
import { useAuth0 } from "@auth0/auth0-react";
import useSurfSpots from "@src/hooks/useSurfSpots";
import { unSubscribeUserToSpot } from "@src/api/spots";

const Forecasts = () => {
  const { user, isAuthenticated } = useAuth0();
  const { accessToken } = useAccessToken();

  const userSurfSpots = useSurfSpots({ accessToken, userId: user.sub });

  //   if (isAuthenticated && accessToken && userSurfSpots.length === 0) {
  //     createUser(user, accessToken);
  //   }

  console.log(userSurfSpots)

  return (
    <div className={styles.forecastComponent}>
      <h1>Forecasts</h1>
      {userSurfSpots.map((spot) => (
        <li key={spot.spotname}>
          <h3>{spot.spotname}</h3>
          <button
            onClick={() => unSubscribeUserToSpot({
              spotId: spot.surfline_id,
              userId: user.sub,
              accessToken: accessToken,
            })}
          >
            remove
          </button>
        </li>
      ))}
    </div>
  );
};

export default Forecasts;
