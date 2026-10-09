import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation, Navigate } from 'react-router';
import { useSelector } from 'react-redux';
import SigninForm from '../components/SigninForm';
import SignupForm from '../components/SignupForm';
import ForgotPassword from '../components/ForgotPassword';

const Auth_page = ({ defaultView }) => {
    const { isAuthenticated } = useSelector((state) => state.Auth);
    const [searchParams] = useSearchParams();
    const location = useLocation();

    // Determine initial view based on props, query parameter, or router state
    const resolveView = () => {
        if (defaultView) return defaultView;
        const queryMode = searchParams.get('mode') || searchParams.get('view');
        if (queryMode === 'forgot' || queryMode === 'reset') return 'forgot';
        if (queryMode === 'signup' || queryMode === 'register') return 'signup';
        if (location.state?.view) return location.state.view;
        return 'signin';
    };

    // view state: 'signin' | 'signup' | 'forgot'
    const [view, setView] = useState(resolveView);

    useEffect(() => {
        if (defaultView) {
            setView(defaultView);
        } else {
            const queryMode = searchParams.get('mode') || searchParams.get('view');
            if (queryMode === 'forgot' || queryMode === 'reset') setView('forgot');
            else if (queryMode === 'signup' || queryMode === 'register') setView('signup');
            else if (queryMode === 'signin') setView('signin');
        }
    }, [defaultView, searchParams]);

    // If user is already authenticated, redirect straight to dashboard
    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    const handleStateChange = (newView) => {
        if (typeof newView === 'boolean') {
            setView(newView ? 'signin' : 'signup');
        } else {
            setView(newView);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-slate-50 via-indigo-50/20 to-slate-100/60 relative overflow-hidden selection:bg-indigo-500 selection:text-white">
            {/* Subtle background glow effect */}
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none"></div>

            <div className="w-full relative z-10">
                {view === 'forgot' && <ForgotPassword state={handleStateChange} />}
                {view === 'signup' && <SignupForm state={handleStateChange} />}
                {view === 'signin' && <SigninForm state={handleStateChange} />}
            </div>
        </main>
    );
};

export default Auth_page;