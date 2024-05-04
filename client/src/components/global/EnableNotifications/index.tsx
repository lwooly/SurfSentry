import enableNotifications from "@src/lib/serviceWorker/enableNotifications";
import { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import useAccessToken from "@src/hooks/useAccessToken";
import SlideButton from "../SlideButton";

import styles from './styles.module.scss'
import { NotificationVisibilityContext } from "@src/components/contexts/Notifications.context";

const EnableNotifications = () => {

  const {enableNotifyVisible, setEnableNotifyVisible} = useContext(NotificationVisibilityContext)

    // state to make component rerended and check outer scope variable for permissions
    const [clicked, setClicked] = useState<boolean>(false)

    const {user} = useAuth0()
    const { accessToken } = useAccessToken()

    const handleClick = async () => {
      if (user?.sub && accessToken) {
        await enableNotifications(user?.sub, accessToken)
      }
        setClicked(!clicked)
    }

    useEffect(() => {
        if (Notification.permission === 'granted') {
          setEnableNotifyVisible(false)
        }
    },[clicked, setEnableNotifyVisible])
    
  return (
    <div className={styles.enableNotifications}>
      { enableNotifyVisible &&
      <>
      <div className={styles.buttonWrapper}>
        <h3 className={styles.getReady}>Ready to get started?</h3>
          <SlideButton onClick={handleClick}>
            Enable Notifications
          </SlideButton>
          </div>
          <p>To receive timely surf updates right on this device, enable push notifications. You'll get alerts directly through your browser whenever the forecast is promising! (No need to stay on this page!)</p>
      </>
      }
    </div>
  );
};

export default EnableNotifications;
