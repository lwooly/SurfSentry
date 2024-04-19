import { useAuth0 } from "@auth0/auth0-react";
import fetchCreateUser from "@src/api/users";
import useAccessToken from "@src/hooks/useAccessToken";
import { useEffect } from "react";

//empty component for smooth auth0 call back
const Callback = () => {
  
  const { isAuthenticated, user } = useAuth0();
  const { accessToken } = useAccessToken();

  useEffect(() => {
    const createUserIfNeeded = async () => {
      if (isAuthenticated && user && accessToken) {
        try {
          const res = await fetchCreateUser({ user, accessToken });
          console.log('result', res);
        } catch (error) {
          console.error('Failed to create user:', error);
        }
      }
    };

    createUserIfNeeded();
  }, [isAuthenticated, user, accessToken]);

  return <></>;
};

export default Callback;
