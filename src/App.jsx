import React from 'react';
import { Routes, Route } from 'react-router';
import Home_page from './pages/Home_page';
import Auth_page from './pages/Auth_page';
import Dashboard from './pages/Dashboard';
import Analytics_page from './pages/Analytics_page';
import Features_page from './pages/Features_page';
import Pricing_page from './pages/Pricing_page';
import FAQ_page from './pages/FAQ_page';
import NotFound_page from './pages/NotFound_page';
import ProtectedRoutes from './utilities/ProtectRoutes.jsx';
import NoNavbar from './utilities/NoNavbar.jsx';
import NavbarRoutes from './utilities/NavbarRoutes.jsx';

const App = () => {
  return (
    <Routes>
      <Route element={<NoNavbar />}>
        <Route path='/auth' element={<Auth_page />} />
      </Route>
      <Route element={<NavbarRoutes />}>
        <Route path='/' element={<Home_page />} />
        <Route path='/features' element={<Features_page />} />
        {/* <Route path='/pricing' element={<Pricing_page />} /> */}
        <Route path='/faq' element={<FAQ_page />} />
        
        {/* Protected Authenticated Routes */}
        <Route element={<ProtectedRoutes />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/analytics' element={<Analytics_page />} />
        </Route>

        {/* 404 Catch-All */}
        <Route path='*' element={<NotFound_page />} />
      </Route>
    </Routes>
  );
};

export default App;