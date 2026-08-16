import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router';

const NavbarRoutes = () => {
    return (
        <div className="min-h-screen flex flex-col justify-between bg-slate-50 selection:bg-indigo-500 selection:text-white">
            <Navbar />
            <div className="flex-1">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default NavbarRoutes;