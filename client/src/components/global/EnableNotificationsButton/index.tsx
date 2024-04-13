import enableNotifications from "@src/lib/serviceWorker/enableNotifications";
import ButtonWithArrow from "../ButtonWithArrow";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import useAccessToken from "@src/hooks/useAccessToken";

const EnableNotificationsButton = () => {
    const [visible, setVisible] = useState<boolean>(true)
    // state to make component rerended and check outer scope variable for permissions
    const [clicked, setClicked] = useState<boolean>(false)

    const {user} = useAuth0()
    const { accessToken } = useAccessToken()

    const handleClick = async () => {
        await enableNotifications(user.sub, accessToken)
        setClicked(!clicked)
    }

    useEffect(() => {
        if (Notification.permission === 'granted') {
            setVisible(false)
        }
    },[clicked])
    
  return (
    <>
      { visible &&
        <ButtonWithArrow handleClick={handleClick}>
          Enable Notifications
        </ButtonWithArrow>
      }
    </>
  );
};

export default EnableNotificationsButton;
