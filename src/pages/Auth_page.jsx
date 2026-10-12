import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation, Navigate, Link } from 'react-router';
import { useSelector } from 'react-redux';
import SigninForm from '../components/SigninForm';
import SignupForm from '../components/SignupForm';
import ForgotPassword from '../components/ForgotPassword';
import SEO from '../components/SEO';

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
        <main className="min-h-screen flex items-center justify-center p-4 sm:p-6 cyber-grid-light relative overflow-hidden selection:bg-cyan-500 selection:text-white">
            <SEO 
                title={view === 'signup' ? 'Create Account' : view === 'forgot' ? 'Reset Password' : 'Sign In'} 
                description="Secure access to LinkVault Safe Link Gateway & Command Center." 
            />

            {/* Ambient Cyber Beams */}
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-cyan-400/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>

            {/* Floating Home Back Button */}
            <div className="absolute top-5 left-5 z-20">
                <Link
                    to="/"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/90 backdrop-blur-md border border-slate-200/90 text-xs font-bold text-slate-700 hover:text-slate-900 shadow-xs hover:shadow-md transition-all active:scale-95"
                >
                    <span>&larr; Back to Home</span>
                </Link>
            </div>

            <div className="w-full relative z-10 max-w-md mx-auto animate-fade-in">
                {view === 'forgot' && <ForgotPassword state={handleStateChange} />}
                {view === 'signup' && <SignupForm state={handleStateChange} />}
                {view === 'signin' && <SigninForm state={handleStateChange} />}
            </div>
        </main>
    );
};

export default Auth_page;