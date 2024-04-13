import { AppState, Auth0Provider } from "@auth0/auth0-react";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  children: React.ReactNode
}


export const Auth0ProviderWithNavigate:FC<Props> = ({ children }) => {
  const navigate = useNavigate();

  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;
  console.log(audience)

  const onRedirectCallback = (appState:AppState | undefined ) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  if (!(domain && clientId && redirectUri && audience)) {
    return null;
  }
console.log(redirectUri)
  return (
    
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        audience: audience,
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};