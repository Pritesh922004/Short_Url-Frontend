import React from 'react';
import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import SEO from '../components/SEO';

const NotFound_page = () => {
    const { isAuthenticated } = useSelector((state) => state.Auth || {});

    return (
        <div className="min-h-[calc(100vh-73px)] flex items-center justify-center p-6 cyber-grid-light relative overflow-hidden">
            <SEO title="404 - Page Not Found | LinkVault Safe Link Gateway" description="The requested link or page does not exist on LinkVault." />

            {/* Ambient Beams */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-md w-full text-center space-y-6 relative z-10 bg-white/90 backdrop-blur-xl p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-2xl shadow-slate-200/50 animate-fade-in">
                {/* 404 Badge & Graphic */}
                <div className="relative inline-block">
                    <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 text-white font-black text-4xl flex items-center justify-center mx-auto shadow-xl shadow-indigo-500/25 transform hover:scale-105 transition-transform duration-200">
                        404
                    </div>
                </div>

                <div className="space-y-2">
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                        Destination Not Found
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 max-w-xs mx-auto leading-relaxed">
                        The requested link or endpoint does not exist or may have been deleted by its creator.
                    </p>
                </div>

                {/* Quick Navigation Links */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link
                        to="/"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-md active:scale-95 transition-all"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span>Back to Home</span>
                    </Link>

                    <Link
                        to="/inspector"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold bg-cyan-50 hover:bg-cyan-100 text-cyan-800 border border-cyan-200/80 active:scale-95 transition-all"
                    >
                        <span>🛡️ Threat Inspector</span>
                    </Link>

                    {isAuthenticated && (
                        <Link
                            to="/dashboard"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 active:scale-95 transition-all"
                        >
                            <span>Dashboard</span>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotFound_page;
