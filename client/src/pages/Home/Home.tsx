import enableNotifications from "@src/lib/serviceWorker/enableNotifications";
import sendNotification from "@src/api/pushManager/sendNotification";
import ButtonWithArrow from "@src/components/global/ButtonWithArrow";
import { LoginButton } from "@src/components/auth0/loginButton";
import EnableNotificationsButton from "@src/components/global/EnableNotificationsButton";
import { useAuth0 } from "@auth0/auth0-react";
import SendNotificationsButton from "@src/components/global/SendNotificationsButton";
import Forecasts from "@src/components/pages/home/Forecasts/Forecasts";
import { Link } from "react-router-dom";
import SelectForecast from "@src/components/pages/home/SelectForecastForm";
import useSurfSpots from "@src/hooks/useSurfSpots";
import fetchCreateUser from "@src/api/users";
import useAccessToken from "@src/hooks/useAccessToken";
import startSurfCheck from "@src/api/pushManager/startSurfCheck";
import SelectForecastForm from "@src/components/pages/home/SelectForecastForm";

import styles from "./styles.module.scss";
import SlideButton from "@src/components/global/SlideButton";

const Home = () => {
  const { isAuthenticated, user } = useAuth0();

  const surfSpotsData = useSurfSpots({ userId: user?.sub });

  const { accessToken } = useAccessToken;

  return (
    <div className={styles.home}>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <h1>
            Busy? <br />
            <span>Never</span> miss a surf session again...
          </h1>
          <p>
            SurfSentry allows you to get on with things without focusing on the
            surf reports
          </p>
          {!isAuthenticated && (
            <div className={styles.buttonWrapper}>
              <SlideButton>Log in</SlideButton>
              <SlideButton> Sign up</SlideButton>
            </div>
          )}

          {isAuthenticated && (
            <div className={styles.content}>
              <EnableNotificationsButton />
              {/* <SendNotificationsButton /> */}
              <SelectForecastForm surfSpotsData={surfSpotsData} />
              <Forecasts surfSpotsData={surfSpotsData} />
              {/* <button onClick={() => {
              console.log('clicked')
              startSurfCheck(accessToken)
            }
            }>Surfcheck</button> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
