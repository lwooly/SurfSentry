import enableNotifications from "@src/lib/serviceWorker/enableNotifications"
import sendNotification from "@src/services/pushManager/sendNotification"
import ButtonWithArrow from "@src/components/global/ButtonWithArrow";
import { LoginButton } from "@src/components/auth0/loginButton";
import EnableNotificationsButton from "@src/components/global/EnableNotificationsButton";

const Home = () => {
    return (
        <div>
            
            <EnableNotificationsButton />
            <ButtonWithArrow handleClick={sendNotification}>
            Send Notifications
            </ButtonWithArrow>
            
       </div>
    );
};

export default Home;