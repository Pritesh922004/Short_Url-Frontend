import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router';
import { useDispatch } from 'react-redux';
import { login, logout } from './store/slice/Auth.Slice';
import { VerifyUser } from './API/User.api';
import { FetchUrls } from './API/CreateShortUrl.api';
import { fetchUrls } from './store/slice/Url.slice';

import Home_page from './pages/Home_page';
import Auth_page from './pages/Auth_page';
import Dashboard from './pages/Dashboard';
import Analytics_page from './pages/Analytics_page';
import Features_page from './pages/Features_page';
import Pricing_page from './pages/Pricing_page';
import FAQ_page from './pages/FAQ_page';
import AiTools_page from './pages/AiTools_page';
import NotFound_page from './pages/NotFound_page';
import ProtectedRoutes from './utilities/ProtectRoutes.jsx';
import NoNavbar from './utilities/NoNavbar.jsx';
import NavbarRoutes from './utilities/NavbarRoutes.jsx';
import SmoothScroll from './utilities/SmoothScroll.jsx';

import AdminLogin from './admin/AdminLogin.jsx';
import AdminDashboard from './admin/AdminDashboard.jsx';
import AdminProtectRoute from './admin/AdminProtectRoute.jsx';

const App = () => {
  const dispatch = useDispatch();
  const [isInitializing, setIsInitializing] = useState(true);

  // Verify user session before loading the full web app
  useEffect(() => {
    let isMounted = true;

    const verifyUserSession = async () => {
      try {
        const response = await VerifyUser();
        if (isMounted && response && response.user) {
          dispatch(login(response.user));
          try {
            const { data } = await FetchUrls();
            if (isMounted && data) {
              dispatch(fetchUrls(data));
            }
          } catch (fetchErr) {
            console.error("Error fetching user links on startup:", fetchErr);
          }
        } else if (isMounted) {
          localStorage.removeItem('token');
          dispatch(logout());
        }
      } catch (error) {
        if (isMounted) {
          localStorage.removeItem('token');
          dispatch(logout());
        }
      } finally {
        if (isMounted) {
          setIsInitializing(false);
        }
      }
    };

    verifyUserSession();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  // Loading screen displayed while verifying user session on startup
  if (isInitializing) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white">
        <div className="w-10 h-10 border-3 border-indigo-400/30 border-t-indigo-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-xs font-semibold text-slate-400 tracking-wider uppercase">Loading LinkVault...</p>
      </div>
    );
  }

  return (
    <SmoothScroll>
      <Routes>
        {/* Admin Routes */}
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route element={<AdminProtectRoute />}>
          <Route path='/admin' element={<AdminDashboard />} />
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
        </Route>

        {/* User Auth */}
        <Route element={<NoNavbar />}>
          <Route path='/auth' element={<Auth_page />} />
          <Route path='/forgot-password' element={<Auth_page defaultView="forgot" />} />
          <Route path='/reset-password' element={<Auth_page defaultView="forgot" />} />
        </Route>

        {/* Public & User Protected Routes */}
        <Route element={<NavbarRoutes />}>
          <Route path='/' element={<Home_page />} />
          <Route path='/features' element={<Features_page />} />
          <Route path='/ai-hub' element={<AiTools_page />} />
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
    </SmoothScroll>
  );
};

export default App;