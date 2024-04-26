import React, { FC } from 'react';
import Header from '@src/components/global/Header'
import { Outlet } from 'react-router-dom';
import Footer from '../footer';

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
            <Footer />
        </footer>
        </>
    );
};

export default Layout;