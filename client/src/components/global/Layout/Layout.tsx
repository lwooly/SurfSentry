import React, { FC } from 'react';
import Header from '@src/components/global/Header'
import { Outlet } from 'react-router-dom';

const Layout:FC = () => {
    return (
        <>
        <header>
            <Header />
        </header>
        <main>
            <Outlet />
        </main>
        <footer>
        </footer>
        </>
    );
};

export default Layout;