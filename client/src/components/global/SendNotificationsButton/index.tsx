import enableNotifications from "@src/lib/serviceWorker/enableNotifications";
import ButtonWithArrow from "../ButtonWithArrow";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import sendNotification from "@src/api/pushManager/sendNotification";
import { access } from "fs";
import useAccessToken from "@src/hooks/useAccessToken";

const SendNotificationsButton = () => {

    // const {getAccessTokenSilently} = useAuth0()
    // const accessToken = await getAccessTokenSilently()

    const { accessToken } = useAccessToken()

  return (
    <>
        <ButtonWithArrow handleClick={() => sendNotification(accessToken)}>
          Send Notifications
        </ButtonWithArrow>
    </>
  );
};

export default SendNotificationsButton;
