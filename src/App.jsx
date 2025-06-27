import React, { useState } from 'react';
import Home_page from './pages/Home_page';
import { Routes, Route } from 'react-router';
import SignupForm from './components/SignupForm';
import SigninForm from './components/SigninForm';
import Navbar from './components/Navbar';
import Auth_page from './pages/Auth_page';
import Dashboard from './pages/Dashboard';
import ProtectedRoutes from './utilities/ProtectRoutes.jsx';
import { useSelector } from 'react-redux';
import NoNavbar from './utilities/NoNavbar.jsx';
import NavbarRoutes from './utilities/NavbarRoutes.jsx';

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<NoNavbar />}>
          <Route path='/auth' element={<Auth_page />} />
        </Route>
        <Route element={<NavbarRoutes />}>
          <Route path='/' element={<Home_page />} />
          <Route element={<ProtectedRoutes />}>
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App