import { useAuth0 } from "@auth0/auth0-react";

import { LoginButton } from "@src/components/auth0/loginButton";
import { LogoutButton } from "@src/components/auth0/logoutButton";
import { SignUpButton } from "@src/components/auth0/signUpButton";
import React from "react";

import styles from "./styles.module.scss"

const NavBarAuthButtons = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className={styles.navBarButtons}>
    {!isAuthenticated && <>
        <LoginButton/>
        {/* <SignUpButton /> */}
    </>}
    {isAuthenticated && <LogoutButton />}
      
    </div>
  );
};

export default NavBarAuthButtons;
