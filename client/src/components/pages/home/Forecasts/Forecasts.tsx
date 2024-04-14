import React, { useEffect, useState } from 'react';

import styles from './styles.module.scss'
import useAccessToken from '@src/hooks/useAccessToken';
import createUser from '@src/api/users';
import { useAuth0 } from '@auth0/auth0-react';

const Forecasts = () => {
    const {user, isAuthenticated} = useAuth0()
    const {accessToken} = useAccessToken()

    if (isAuthenticated && accessToken) {
        createUser(user, accessToken)
    }

    return (
        <div className={styles.forecastComponent}>
            <h1>Forecasts</h1>
            <p>forecasting data etc</p>
        </div>
    );
};

export default Forecasts;