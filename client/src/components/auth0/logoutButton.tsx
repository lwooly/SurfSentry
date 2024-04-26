import { useAuth0 } from "@auth0/auth0-react";
import SlideButton from "../global/SlideButton";

export const LogoutButton = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <SlideButton onClick={handleLogout}>
      Log Out
    </SlideButton>
  );
};