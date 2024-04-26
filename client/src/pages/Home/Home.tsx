import EnableNotificationsButton from "@src/components/global/EnableNotificationsButton";
import { useAuth0 } from "@auth0/auth0-react";
import Forecasts from "@src/components/pages/home/Forecasts/Forecasts";
import useSurfSpots from "@src/hooks/useSurfSpots";
import useAccessToken from "@src/hooks/useAccessToken";
import SelectForecastForm from "@src/components/pages/home/SelectForecastForm";

import styles from "./styles.module.scss";
import Features from "@src/components/pages/home/Features";
import HeroMain from "@src/components/pages/home/heroMain";


const Home = () => {
  const { isAuthenticated, user } = useAuth0();

  const surfSpotsData = useSurfSpots({ userId: user?.sub });

  const { accessToken } = useAccessToken;

  return (
    <div className={styles.home}>
      <div className={styles.contentContainer}>
        <HeroMain />
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

      {!isAuthenticated && <Features />}
    </div>
  );
};

export default Home;
