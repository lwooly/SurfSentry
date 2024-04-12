import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import ButtonWithArrow from "../global/ButtonWithArrow";

export const SignUpButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/profile",
      },
      authorizationParams: {
        screen_hint: "signup",
      },
    });
  };

  return (
    <ButtonWithArrow handleClick={handleLogin}>
        SignUp
    </ButtonWithArrow>
  );
};