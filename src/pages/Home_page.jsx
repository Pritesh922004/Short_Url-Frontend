import React, { useEffect } from 'react';
import ShortUrlFrom from '../components/ShortUrlFrom';
import { VerifyUser } from '../API/User.api';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/slice/Auth.Slice';
import { Link } from 'react-router';
import SEO from '../components/SEO';

const Home_page = () => {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.Auth);

    useEffect(() => {
        const verify = async () => {
            try {
                const response = await VerifyUser();
                if (response?.user) {
                    dispatch(login(response.user));
                }
            } catch {
                // User is unauthenticated or session expired - handled gracefully
            }
        };
        verify();
    }, [dispatch]);

    return (
        <div className="min-h-[calc(100vh-73px)] flex flex-col justify-between">
            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    {/* Background subtle radial gradients */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-200/20 rounded-full blur-3xl -z-10 pointer-events-none"></div>

                    <div className="text-center max-w-3xl mx-auto mb-10">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100/80 mb-5 shadow-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-ping"></span>
                            <span>Lightning-Fast URL Shortener & Analytics</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                            Make every link{' '}
                            <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 bg-clip-text text-transparent">
                                memorable & trackable
                            </span>
                        </h1>
                        <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                            Create clean, compact links in seconds. Generate instant QR codes, customize aliases, and monitor real-time click engagement.
                        </p>
                    </div>

                    {/* Shortener Widget Container */}
                    <div className="max-w-xl mx-auto">
                        <ShortUrlFrom />
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-16 bg-white border-t border-b border-slate-200/70">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto mb-12">
                            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">Powerful Features</h2>
                            <p className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Everything you need for link management</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* Feature 1 */}
                            <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-indigo-300 hover:shadow-md transition-all duration-200 group">
                                <div className="w-11 h-11 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-base font-bold text-slate-900 mb-1.5">Fast Redirection</h3>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    Sub-millisecond link resolution ensuring your visitors reach destination websites instantly.
                                </p>
                            </div>

                            {/* Feature 2 */}
                            <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-indigo-300 hover:shadow-md transition-all duration-200 group">
                                <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <h3 className="text-base font-bold text-slate-900 mb-1.5">Real-time Analytics</h3>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    Accurate click tracking per link to analyze campaign performance and audience engagement.
                                </p>
                            </div>

                            {/* Feature 3 */}
                            <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-indigo-300 hover:shadow-md transition-all duration-200 group">
                                <div className="w-11 h-11 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </div>
                                <h3 className="text-base font-bold text-slate-900 mb-1.5">Custom Aliases</h3>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    Replace random characters with clean, branded custom slugs tailored for your marketing channels.
                                </p>
                            </div>

                            {/* Feature 4 */}
                            <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-indigo-300 hover:shadow-md transition-all duration-200 group">
                                <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                    </svg>
                                </div>
                                <h3 className="text-base font-bold text-slate-900 mb-1.5">Instant QR Codes</h3>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    Automatic QR code generation for every link ready to download or display for mobile visitors.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">Simplicity First</h2>
                        <p className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">How it works in 3 easy steps</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs relative">
                            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-sm flex items-center justify-center mb-4 shadow-sm shadow-indigo-500/20">
                                1
                            </div>
                            <h3 className="text-base font-bold text-slate-900 mb-2">Paste Destination URL</h3>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                Copy any long or complex URL and paste it into the shortener box at the top.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs relative">
                            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-sm flex items-center justify-center mb-4 shadow-sm shadow-indigo-500/20">
                                2
                            </div>
                            <h3 className="text-base font-bold text-slate-900 mb-2">Shorten & Customize</h3>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                Click Shorten to generate a compact URL or add a custom alias if you're signed in.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs relative">
                            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-sm flex items-center justify-center mb-4 shadow-sm shadow-indigo-500/20">
                                3
                            </div>
                            <h3 className="text-base font-bold text-slate-900 mb-2">Share & Track Clicks</h3>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                Copy with 1-click, scan QR code, and monitor your total click traffic in real time.
                            </p>
                        </div>
                    </div>

                    {/* AI Hub Feature Highlight */}
                    <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-indigo-50 via-white to-purple-50 border border-indigo-100 shadow-sm relative overflow-hidden group">
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-200/50 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div>
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[10px] font-bold tracking-wider uppercase mb-4 shadow-sm">
                                    <span className="animate-pulse">✨</span>
                                    <span>New Release</span>
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
                                    Introducing the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">LinkVault AI Hub</span>
                                </h3>
                                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                                    Supercharge your productivity with our integrated AI suite. Instantly review and refactor code, detect vulnerabilities, and translate PDF documents into multiple languages—all powered by advanced AI models.
                                </p>
                                <ul className="space-y-3 mb-6">
                                    <li className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                        <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs">✓</div>
                                        Instant AI Code Reviews
                                    </li>
                                    <li className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                        <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs">✓</div>
                                        Smart Document Translation
                                    </li>
                                </ul>
                                <Link
                                    to="/ai-hub"
                                    className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-bold text-xs bg-slate-900 hover:bg-slate-800 text-white shadow-lg transition-all duration-200 active:scale-[0.98] gap-2"
                                >
                                    <span>Explore AI Hub</span>
                                    <span className="text-lg">🚀</span>
                                </Link>
                            </div>
                            <div className="hidden md:flex justify-center items-center">
                                <div className="relative w-full max-w-sm aspect-square bg-gradient-to-br from-slate-800 to-slate-950 rounded-2xl shadow-2xl overflow-hidden border border-slate-700 p-6 flex flex-col justify-between">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                                    </div>
                                    <div className="text-[10px] font-mono text-emerald-400 space-y-2 opacity-80">
                                        <p>&gt; Initializing AI Models...</p>
                                        <p>&gt; Analyzing architecture...</p>
                                        <p className="text-indigo-300">&gt; Generating optimization report...</p>
                                        <p className="text-emerald-300 mt-4">✔ Code Review Complete. Score: 95/100</p>
                                    </div>
                                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden mt-4">
                                        <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 w-11/12"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Card */}
                    {!isAuthenticated && (
                        <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white text-center relative overflow-hidden shadow-xl">
                            <div className="relative z-10 max-w-2xl mx-auto">
                                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">Ready to optimize your links?</h3>
                                <p className="text-sm text-slate-300 mb-6">
                                    Create a free account to manage all your links in one dashboard, customize slugs, and track detailed analytics.
                                </p>
                                <Link
                                    to="/auth"
                                    className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-semibold text-sm bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 transition-all duration-200 active:scale-[0.98]"
                                >
                                    Get Started Free &rarr;
                                </Link>
                            </div>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default Home_page;