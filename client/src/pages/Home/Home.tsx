import EnableNotifications from "@src/components/global/EnableNotifications";
import { useAuth0 } from "@auth0/auth0-react";
import Forecasts from "@src/components/pages/home/Forecasts/Forecasts";
import useSurfSpots from "@src/hooks/useSurfSpots";
import useAccessToken from "@src/hooks/useAccessToken";
import SelectForecastForm from "@src/components/pages/home/SelectForecastForm";

import styles from "./styles.module.scss";
import Features from "@src/components/pages/home/Features";
import HeroMain from "@src/components/pages/home/heroMain";
import { useContext } from "react";
import { NotificationVisibilityContext } from "@src/components/contexts/Notifications.context";
import SendNotificationsButton from "@src/components/global/SendNotificationsButton";


const Home = () => {
  const { isAuthenticated, user } = useAuth0();

  const {enableNotifyVisible} = useContext(NotificationVisibilityContext)

  const surfSpotsData = useSurfSpots({ userId: user?.sub });

  const { accessToken } = useAccessToken;

  return (
    <div className={styles.home}>
      <div className={styles.contentContainer}>


        {isAuthenticated ? (
          <div className={styles.content}>
            {enableNotifyVisible ? 
            <h1>Monitor Forecasts</h1> :
            <div className={styles.monitoring}>
              <div className={styles.titleWrapper}>
              <h1>Monitoring Forecasts</h1>
              <div className={styles.loader}></div>
                 </div>
             
            <p>Leave the browser open on any page to ensure you recieve notifications.</p>
            </div>
           
            }
            <SendNotificationsButton />
            <EnableNotifications />

            {!enableNotifyVisible && <SelectForecastForm surfSpotsData={surfSpotsData} />}
            
          </div>
          
        ) : (<HeroMain />)}
        
      </div>
      <Forecasts surfSpotsData={surfSpotsData} />

      {!isAuthenticated && 
    
      <Features />
     }
    </div>
  );
};

export default Home;
