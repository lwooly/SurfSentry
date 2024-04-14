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

const Home = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div>
      {isAuthenticated && (
        <>
          <EnableNotificationsButton />
          <SendNotificationsButton />
          <SelectForecast />
          {/* <Forecasts /> */}
        </>
      )}
    </div>
  );
};

export default Home;
