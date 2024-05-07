
import styles from "./styles.module.scss";
import useAccessToken from "@src/hooks/useAccessToken";
import { useAuth0 } from "@auth0/auth0-react";
import { SurfSpot, UseSurfSpotsReturn } from "@src/hooks/useSurfSpots";
import { unSubscribeUserToSpot } from "@src/api/spots";
import useForecasts, { Forecast } from "@src/hooks/useForecasts";
import { nextGoodForecast } from "@src/lib/forecasts/nextGoodForecast";

interface NextGoodForecast {
    forecastDay: string;
    observation: string;
    rating: string;
    dayPeriod: string;
    dateString: string;

} 

interface SpotForecast {
  forecast: Forecast;
  spot: SurfSpot;
  nextGood: NextGoodForecast | null;
  
}

const Forecasts = ({
  surfSpotsData,
}: {
  surfSpotsData: UseSurfSpotsReturn;
}) => {
  const { user } = useAuth0();
  const { accessToken } = useAccessToken();

  //TODO: handle locaing errors etc.
  const { surfSpots, isLoading, isServerError, refetch } = surfSpotsData;

  const userSurfSpots = surfSpots?.filter(
    ({ user_id }) => user_id === user?.sub
  );

  const { forecasts } = useForecasts();

  // Show surf spots user is subscribed to.
  const userForecasts:Array<SpotForecast>= [];

  userSurfSpots?.forEach((spot) => {
    forecasts?.forEach((forecast) => {
      if (forecast.spot_id === spot.surfline_id) {

        //find when forecast is next good for this spot
        const nextGood = nextGoodForecast(forecast)
        userForecasts.push({ spot, forecast, nextGood });
      }
    });
  });

  return (
    <div className={styles.forecastComponent}>
      {user && !isLoading && !isServerError && (
        <div className={styles.contentWrapper}>
          <div className={styles.content}>
            <div className={`${styles.titleRow} ${styles.forecastRow}`}>
              <div className={styles.col}>
                <h2>Forecasts</h2>
              </div>
              <div className={styles.col}>
                <h4>Current</h4>
              </div>
              <div className={styles.col}>
                <h4>Future</h4>
              </div>
              <div className={styles.col}>
                <h4 className={`${styles.titleRow} ${styles.forecastRow}`}>
                  Unsubscribe
                </h4>
              </div>
            </div>

            {userForecasts && userForecasts?.length > 0 ? (
              userForecasts?.map(
                ({ spot, forecast, nextGood }) => (
                  <li
                    key={spot.surfline_id}
                    className={styles.forecastRow}
                  >
                    <div className={styles.col}>
                    
                      <h5>{spot.spotname}</h5>
                    </div>
                    <div className={styles.col}>
                      <div className={styles.forecastHeading}>
                      <h4>Current: </h4>
                      {forecast.forecast[0] && (
                          <p className={styles.rating}>{forecast.forecast[0].am.rating}</p>)}
                      </div>
                        {forecast.forecast[0] ? (
                        <>
                          <p>{forecast.forecast[0].observation}</p>

                        </>) : <p>Data not available for this location</p> }
                    </div>
                    <div className={styles.col}>
                    <div className={styles.forecastHeading}>
                    <h4>Future: </h4>
                    {nextGood && (
                        <p className={styles.rating}>{nextGood?.rating} - {nextGood.dateString} {nextGood?.dayPeriod.toUpperCase()}</p>)}
                    </div>
                     {nextGood ? (
                        <p>{nextGood?.observation}</p>
                ) : <p>No good forecasts...</p>}

                    </div>
                    <div className={styles.col}>
                      <button
                        aria-label="unsubcribe"
                        className={` ${styles.removeIcon}`}
                        onClick={async () => {
                          await unSubscribeUserToSpot({
                            spotId: spot.surfline_id,
                            userId: user.sub,
                            accessToken: accessToken,
                          });
                          refetch();
                        }}
                      >
                        <img
                          src="/images/icons/delete_remove_icon.svg"
                          alt="delete"
                        />
                      </button>
                    </div>
                  </li>
                )
              )
            ) : (
              <li className={styles.forecastRow}>
                <div className={styles.col1}>
                  <h5>No forecasts selected....</h5>
                </div>
                <div className={styles.col2}></div>
              </li>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Forecasts;
