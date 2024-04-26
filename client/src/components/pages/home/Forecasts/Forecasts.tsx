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
    <div className={styles.forecastComponent}>
      {user && !isLoading && !isServerError && (
        <div className={styles.contentWrapper}>
          <div className={styles.content}>
            <h1>Forecasts</h1>
            {surfSpots?.map(({ spotname, user_id, surfline_id }, index) => (
              <>
                {user_id === user.sub ? (
                  <li key={`${spotname}-${user_id}-${index}`} className={styles.forecastRow}>
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
        </div>
      )}
    </div>
  );
};

export default Forecasts;
