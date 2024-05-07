import { FC } from 'react';
import styles from './styles.module.scss'
import NavBarAuthButtons from '../NavBarButtons';

const Header:FC = () => {
    return (
        <div className={styles.header}>
            <div className={styles.container}>
                <img className={styles.logo} src='/images/logos/surfSentry.png' alt='SurfSentry logo'/>
                <img className={`${styles.logo} ${styles.logoText}`} src='/images/logos/SurfSentryText.png' alt='SurfSentry logo'/>
                <div className={styles.btns}>
                <NavBarAuthButtons />
                </div>
            </div>
            
        </div>
    );
};

export default Header;