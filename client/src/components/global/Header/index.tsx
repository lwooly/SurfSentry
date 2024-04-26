import { FC } from 'react';
import styles from './styles.module.scss'
import { SignUpButton } from '@src/components/auth0/signUpButton';
import { LoginButton } from '@src/components/auth0/loginButton';
import { LogoutButton } from '@src/components/auth0/logoutButton';
import NavBarAuthButtons from '../NavBarButtons';

const Header:FC = () => {
    return (
        <div className={styles.header}>
            <div className={styles.container}>
                <img className={styles.logo} src='/src/assets/images/logos/surfSentry.png' alt='SurfSentry logo'/>
                <img className={`${styles.logo} ${styles.logoText}`} src='/src/assets/images/logos/surfSentryText.png' alt='SurfSentry logo'/>
                <div className={styles.btns}>
                <NavBarAuthButtons />
                </div>
            </div>
            
        </div>
    );
};

export default Header;