import React, { useEffect, useState } from "react";

import styles from "./styles.module.scss";
import useAccessToken from "@src/hooks/useAccessToken";
import createUser from "@src/api/users";
import { useAuth0 } from "@auth0/auth0-react";
import useSurfSpots from "@src/hooks/useSurfSpots";

const Forecasts = () => {
  const { user, isAuthenticated } = useAuth0();
  const { accessToken } = useAccessToken();

  const userSurfSpots = useSurfSpots({ accessToken, userId: user.sub });

//   if (isAuthenticated && accessToken && userSurfSpots.length === 0) {
//     createUser(user, accessToken);
//   }

  return (
    <div className={styles.forecastComponent}>
      <h1>Forecasts</h1>
      {userSurfSpots.map((spot) => (
        <h3 key={spot.spotname}>{spot.spotname}</h3>
      ))}
    </div>
  );
};

export default Forecasts;
