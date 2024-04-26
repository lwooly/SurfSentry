import { useAuth0 } from "@auth0/auth0-react";
import SlideButton from "../global/SlideButton";

export const SignUpButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/",
      },
      authorizationParams: {
        screen_hint: "signup",
      },
    });
  };

  return (
    <SlideButton onClick={handleLogin}>
        Get Started
    </SlideButton>
  );
};