import React, { useState } from 'react';
import { Link } from 'react-router';
import { useSelector } from 'react-redux';

const Features_page = () => {
    const { isAuthenticated } = useSelector((state) => state.Auth);
    const [activeTab, setActiveTab] = useState('slugs');

    return (
        <div className="min-h-[calc(100vh-73px)] bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-16 animate-fade-in">
                {/* Hero Header */}
                <div className="text-center max-w-3xl mx-auto space-y-4">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                        <span>Platform Capabilities</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
                        Built for speed, simplicity, and{' '}
                        <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                            maximum impact
                        </span>
                    </h1>
                    <p className="text-base text-slate-600 leading-relaxed">
                        Discover the full suite of tools designed to help you shorten, organize, brand, and track your links effortlessly.
                    </p>
                </div>

                {/* Interactive Feature Deep Dive */}
                <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-10">
                    <div className="flex flex-wrap items-center justify-center gap-2 pb-8 border-b border-slate-100">
                        <button
                            onClick={() => setActiveTab('slugs')}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                activeTab === 'slugs'
                                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/25'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                        >
                            Custom Slugs
                        </button>
                        <button
                            onClick={() => setActiveTab('analytics')}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                activeTab === 'analytics'
                                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/25'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                        >
                            Real-Time Analytics
                        </button>
                        <button
                            onClick={() => setActiveTab('qr')}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                activeTab === 'qr'
                                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/25'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                        >
                            Instant QR Codes
                        </button>
                        <button
                            onClick={() => setActiveTab('speed')}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                activeTab === 'speed'
                                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/25'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                        >
                            Speed & Reliability
                        </button>
                    </div>

                    <div className="mt-8">
                        {activeTab === 'slugs' && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-fade-in">
                                <div className="space-y-4">
                                    <div className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-indigo-50 text-indigo-700">
                                        Brand Recognition
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900">Custom Branded Link Aliases</h3>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        Build trust and increase click-through rates by up to 34% with human-readable, custom link slugs like <span className="font-mono text-indigo-600">link/summer-sale</span> instead of random characters.
                                    </p>
                                    <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
                                        <li className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                            Choose any memorable keyword or brand identifier
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                            Instant availability validation
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                            Edit and manage slugs right from your dashboard
                                        </li>
                                    </ul>
                                </div>
                                <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-slate-100 border border-slate-200 flex flex-col justify-center">
                                    <div className="bg-white p-4 rounded-xl shadow-xs border border-slate-200 space-y-3">
                                        <span className="text-[11px] font-semibold uppercase text-slate-400">Before & After</span>
                                        <div className="p-2.5 bg-red-50/70 border border-red-200 rounded-lg text-xs text-red-700 truncate font-mono line-through">
                                            https://store.com/products/catalog?item=98432&session=x839
                                        </div>
                                        <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 font-mono font-bold">
                                            https://linkvault.link/deal
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'analytics' && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-fade-in">
                                <div className="space-y-4">
                                    <div className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700">
                                        Data-Driven Decisions
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900">Live Click Tracking & Metrics</h3>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        Gain transparent visibility into how your audience interacts with your links. Every click is tracked, aggregated, and reported without delay.
                                    </p>
                                    <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
                                        <li className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                            Total cumulative clicks per destination
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                            Comparative traffic distribution bar graphs
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                            1-click analytics summary report copy
                                        </li>
                                    </ul>
                                </div>
                                <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-slate-100 border border-slate-200">
                                    <div className="bg-white p-4 rounded-xl shadow-xs border border-slate-200 space-y-2.5">
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="font-semibold text-slate-800">/launch-2026</span>
                                            <span className="font-bold text-indigo-600">842 clicks</span>
                                        </div>
                                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-indigo-600 rounded-full w-4/5"></div>
                                        </div>
                                        <div className="flex justify-between items-center text-xs pt-1">
                                            <span className="font-semibold text-slate-800">/newsletter</span>
                                            <span className="font-bold text-indigo-600">312 clicks</span>
                                        </div>
                                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-500 rounded-full w-1/3"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'qr' && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-fade-in">
                                <div className="space-y-4">
                                    <div className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-purple-50 text-purple-700">
                                        Physical to Digital
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900">Instant Scannable QR Codes</h3>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        Every shortened URL automatically generates a high-definition, scannable QR code suitable for business cards, flyers, banners, and digital slides.
                                    </p>
                                    <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
                                        <li className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                            Direct modal preview on every link
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                            Compatible with all iOS and Android cameras
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                            No additional software required
                                        </li>
                                    </ul>
                                </div>
                                <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-slate-100 border border-slate-200 text-center">
                                    <div className="inline-block p-4 bg-white rounded-2xl shadow-sm border border-slate-200">
                                        <img
                                            src="https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=https://linkvault.link/demo"
                                            alt="Demo QR"
                                            className="w-32 h-32 mx-auto rounded-lg"
                                        />
                                        <span className="block text-[11px] font-medium text-slate-400 mt-2">Scan Demo QR</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'speed' && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-fade-in">
                                <div className="space-y-4">
                                    <div className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-50 text-amber-700">
                                        Zero Lag
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900">Sub-Millisecond Redirection</h3>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        Our streamlined backend architecture handles redirection instantly without tracking intermediate bloat or intrusive interstitial redirect pages.
                                    </p>
                                    <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
                                        <li className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                            99.9% Uptime with instant database lookups
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                            CORS-enabled secure endpoints
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                            Automatic URL sanitization and validation
                                        </li>
                                    </ul>
                                </div>
                                <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-slate-100 border border-slate-200">
                                    <div className="bg-white p-5 rounded-xl shadow-xs border border-slate-200 space-y-3 text-center">
                                        <span className="text-4xl font-extrabold text-indigo-600">&lt; 15ms</span>
                                        <p className="text-xs font-semibold text-slate-700">Average redirect latency</p>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                                            Ultra High Speed
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                            🔒
                        </div>
                        <h4 className="text-base font-bold text-slate-900">Secure Link Cookies</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">
                            Protected user sessions utilizing strict HTTP credentials and authentication state persistence.
                        </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                            📱
                        </div>
                        <h4 className="text-base font-bold text-slate-900">Mobile Optimized</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">
                            Fluid interface designed for touchscreens, mobile drawers, and responsive card layouts.
                        </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                            ⚡
                        </div>
                        <h4 className="text-base font-bold text-slate-900">1-Click Clipboard</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">
                            Native clipboard integration with animated checkmark feedback for swift link distribution.
                        </p>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="text-center pt-4">
                    <Link
                        to={isAuthenticated ? "/dashboard" : "/auth"}
                        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/25 transition-all active:scale-[0.98]"
                    >
                        <span>{isAuthenticated ? 'Go to Dashboard' : 'Get Started Free'}</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Features_page;
