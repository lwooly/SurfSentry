import enableNotifications from "@src/lib/serviceWorker/enableNotifications";
import sendNotification from "@src/api/pushManager/sendNotification";
import ButtonWithArrow from "@src/components/global/ButtonWithArrow";
import { LoginButton } from "@src/components/auth0/loginButton";
import EnableNotificationsButton from "@src/components/global/EnableNotificationsButton";
import { useAuth0 } from "@auth0/auth0-react";
import SendNotificationsButton from "@src/components/global/SendNotificationsButton";
import Forecasts from "@src/components/pages/home/Forecasts/Forecasts";
import { Link } from "react-router-dom";
import SelectForecast from "@src/components/pages/home/SelectForecast";
import useSurfSpots from "@src/hooks/useSurfSpots";
import fetchCreateUser from "@src/api/users";
import useAccessToken from "@src/hooks/useAccessToken";
import startSurfCheck from "@src/api/pushManager/startSurfCheck";

const Home = () => {
  const { isAuthenticated, user } = useAuth0();

  const surfSpotsData = useSurfSpots({ userId: user?.sub });


  const {accessToken } = useAccessToken;

  return (
    <div>
      {isAuthenticated && (
        <>
          <EnableNotificationsButton />
          <SendNotificationsButton />
          <SelectForecast surfSpotsData={surfSpotsData} />
          <Forecasts surfSpotsData={surfSpotsData} />

          <button onClick={() => {
            console.log('clicked')
            startSurfCheck(accessToken)
          }
          }>Surfcheck</button>
        </>
      )}
    </div>
  );
};

export default Home;
