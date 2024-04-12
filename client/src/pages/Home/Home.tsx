import enableNotifications from "@src/lib/serviceWorker/enableNotifications"
import sendNotification from "@src/services/pushManager/sendNotification"
import ButtonWithArrow from "@src/components/global/ButtonWithArrow";
import { LoginButton } from "@src/components/auth0/loginButton";

const Home = () => {
    return (
        <div>
            <ButtonWithArrow handleClick={enableNotifications}>
            Enable Notifications
            </ButtonWithArrow>
            <ButtonWithArrow handleClick={sendNotification}>
            Send Notifications
            </ButtonWithArrow>
            
       </div>
    );
};

export default Home;