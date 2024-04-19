import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import useAccessToken from "@src/hooks/useAccessToken";
import { useAuth0 } from "@auth0/auth0-react";
import { UseSurfSpotsReturn } from "@src/hooks/useSurfSpots";
import { unSubscribeUserToSpot } from "@src/api/spots";
import createUser from "@src/api/users";

const Forecasts = ({surfSpotsData}:{surfSpotsData: UseSurfSpotsReturn}) => {
  const { user, isAuthenticated } = useAuth0();
  const { accessToken } = useAccessToken();

  //TODO: handle locaing errors etc.
  const { surfSpots, isLoading, isServerError, refetch } = surfSpotsData;

  return (
    <>
      {user && !isLoading && !isServerError && (
        <div className={styles.forecastComponent}>
          <h1>Forecasts</h1>
          {surfSpots?.map(({ spotname, user_id, surfline_id }, index) => (
            <>
              {user_id === user.sub ? (
                <li key={`${spotname}-${user_id}-${index}`}>
                  <h3>{spotname}</h3>
                  <button
                    onClick={async () => {
                      await unSubscribeUserToSpot({
                        spotId: surfline_id,
                        userId: user.sub,
                        accessToken: accessToken,
                      });
                      refetch();
                    }}
                  >
                    remove
                  </button>
                </li>
              ) : (
                ""
              )}
            </>
          ))}
        </div>
      )}
    </>
  );
};

export default Forecasts;
