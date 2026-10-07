import React from 'react';
import { Link } from 'react-router';
import { useSelector } from 'react-redux';

const NotFound_page = () => {
    const { isAuthenticated } = useSelector((state) => state.Auth || {});

    return (
        <div className="min-h-[calc(100vh-73px)] flex items-center justify-center p-6 bg-gradient-to-b from-slate-50 to-slate-100/60 relative overflow-hidden">
            {/* Background Decorative Blobs */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-blue-200/25 rounded-full blur-2xl pointer-events-none" />

            <div className="max-w-md w-full text-center space-y-6 relative z-10 bg-white/80  p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/50">
                {/* 404 Badge & Graphic */}
                <div className="relative inline-block">
                    <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-indigo-600 to-blue-500 text-white font-extrabold text-4xl flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/25 transform hover:rotate-3 transition-transform duration-300">
                        404
                    </div>
                </div>

                <div className="space-y-2">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        Page Not Found
                    </h1>
                    <p className="text-sm text-slate-500 max-w-xs mx-auto leading-relaxed">
                        Oops! The page or shortened link you are trying to reach does not exist or may have been removed.
                    </p>
                </div>

                {/* Quick Navigation Links */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link
                        to="/"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20 active:scale-[0.98] transition-all duration-200"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span>Back to Home</span>
                    </Link>

                    {isAuthenticated ? (
                        <Link
                            to="/dashboard"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 active:scale-[0.98] transition-all duration-200"
                        >
                            <span>My Dashboard &rarr;</span>
                        </Link>
                    ) : (
                        <Link
                            to="/features"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 active:scale-[0.98] transition-all duration-200"
                        >
                            <span>Explore Features</span>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotFound_page;
