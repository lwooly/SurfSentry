import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import ButtonWithArrow from "../global/ButtonWithArrow";

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/profile",
      },
    });
  };

  return (
    <ButtonWithArrow handleClick={handleLogin}>
        Login
    </ButtonWithArrow>
  );
};