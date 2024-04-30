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

  const userSurfSpots = surfSpots?.filter(({user_id}) => user_id === user?.sub)

  return (
    <div className={styles.forecastComponent}>
      {user && !isLoading && !isServerError && (
        <div className={styles.contentWrapper}>
          <div className={styles.content}>
            <div className={`${styles.titleRow} ${styles.forecastRow}`}>
              <div className={styles.col}>
                <h2 >Forecasts</h2>
              </div>
              <div className={styles.col}>
                <h4 >Current</h4>
              </div>
              <div className={styles.col}>
                <h4 >Next Good</h4>
              </div>
              <div className={styles.col}>
                <h4 className={`${styles.titleRow} ${styles.forecastRow}`}>Unsubscribe</h4>
              </div>
            </div>

            {userSurfSpots && userSurfSpots?.length > 0 ? (userSurfSpots?.map(({ spotname, user_id, surfline_id }, index) => (
                  <li key={`${spotname}-${user_id}-${index}`} className={styles.forecastRow}>
                    <div className={styles.col}>
                      <h5 >{spotname}</h5>
                    </div>
                    <div className={styles.col}>

                    </div>
                    <div className={styles.col}>

                    </div>
                    <div className={styles.col}>
                      <button
                      aria-label="unsubcribe"
                      className={` ${styles.removeIcon}`}
                        onClick={async () => {
                          await unSubscribeUserToSpot({
                            spotId: surfline_id,
                            userId: user.sub,
                            accessToken: accessToken,
                          });
                          refetch();
                        }}
                      >
                        <img src="/src/assets/images/icons/delete_remove_icon.svg" alt="delete" />
                      </button>
                    </div>
                  </li>
            ))) : (
              <li className={styles.forecastRow}>
                <div className={styles.col1}>
                      <h5 >No forecasts selected....</h5>
                    </div>
                    <div className={styles.col2}>

                    </div>
              </li>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Forecasts;
