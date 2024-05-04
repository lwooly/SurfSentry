
import ButtonWithArrow from "../ButtonWithArrow";
import sendNotification from "@src/api/pushManager/sendNotification";
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
