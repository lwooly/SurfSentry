import enableNotifications from "@src/lib/serviceWorker/enableNotifications";
import sendNotification from "@src/services/pushManager/sendNotification";
import ButtonWithArrow from "@src/components/global/ButtonWithArrow";
import { LoginButton } from "@src/components/auth0/loginButton";
import EnableNotificationsButton from "@src/components/global/EnableNotificationsButton";
import { useAuth0 } from "@auth0/auth0-react";
import SendNotificationsButton from "@src/components/global/SendNotificationsButton";

const Home = () => {
  const { isAuthenticated } = useAuth0();


  return (
    <div>
      {isAuthenticated && (
        <>
          <EnableNotificationsButton />
          <SendNotificationsButton />
        </>
      )}
    </div>
  );
};

export default Home;
