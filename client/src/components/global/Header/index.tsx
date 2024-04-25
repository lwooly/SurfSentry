import { FC } from 'react';
import styles from './styles.module.scss'
import { SignUpButton } from '@src/components/auth0/signUpButton';
import { LoginButton } from '@src/components/auth0/loginButton';
import { LogoutButton } from '@src/components/auth0/logoutButton';
import NavBarAuthButtons from '../NavBarButtons';

const Header:FC = () => {
    return (
        <div className={styles.header}>
            <h1>SurfSentry</h1>
            <div className={styles.btns}>
            <NavBarAuthButtons />
            </div>
            
        </div>
    );
};

export default Header;