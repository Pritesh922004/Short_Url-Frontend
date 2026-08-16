import React, { useState } from 'react';
import { Link } from 'react-router';
import { useSelector } from 'react-redux';

const Pricing_page = () => {
    const [annual, setAnnual] = useState(false);
    const { isAuthenticated } = useSelector((state) => state.Auth);

    return (
        <div className="min-h-[calc(100vh-73px)] bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-16 animate-fade-in">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto space-y-4">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                        <span>Transparent Plans</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
                        Simple, transparent pricing for{' '}
                        <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                            everyone
                        </span>
                    </h1>
                    <p className="text-base text-slate-600 leading-relaxed">
                        Start for free today. Upgrade anytime for custom brand aliases, detailed analytics, and priority support.
                    </p>

                    {/* Billing Switch */}
                    <div className="pt-4 flex items-center justify-center gap-3">
                        <span className={`text-xs font-bold ${!annual ? 'text-slate-900' : 'text-slate-400'}`}>
                            Monthly Billing
                        </span>
                        <button
                            type="button"
                            onClick={() => setAnnual(!annual)}
                            className="relative w-12 h-6 bg-indigo-600 rounded-full transition-colors cursor-pointer focus:outline-hidden p-0.5"
                            aria-label="Toggle annual billing"
                        >
                            <span
                                className={`block w-5 h-5 bg-white rounded-full transition-transform transform shadow-xs ${
                                    annual ? 'translate-x-6' : 'translate-x-0'
                                }`}
                            ></span>
                        </button>
                        <span className={`text-xs font-bold flex items-center gap-1.5 ${annual ? 'text-slate-900' : 'text-slate-400'}`}>
                            Annual Billing
                            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] rounded-full font-bold">
                                Save 20%
                            </span>
                        </span>
                    </div>
                </div>

                {/* Pricing Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Free Plan */}
                    <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Free Tier</span>
                            <h3 className="text-xl font-bold text-slate-900 mt-1">Starter</h3>
                            <p className="text-xs text-slate-500 mt-2">Essential shortening for personal use and quick sharing.</p>

                            <div className="my-6">
                                <span className="text-4xl font-extrabold text-slate-900">$0</span>
                                <span className="text-xs text-slate-400 font-medium"> / forever</span>
                            </div>

                            <ul className="space-y-3 text-xs text-slate-600 font-medium border-t border-slate-100 pt-6">
                                <li className="flex items-center gap-2.5">
                                    <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                    Unlimited Link Shortening
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                    Instant QR Code Generation
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                    1-Click Copy to Clipboard
                                </li>
                                <li className="flex items-center gap-2.5 text-slate-400">
                                    <svg className="w-4 h-4 text-slate-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                    Custom Slugs
                                </li>
                            </ul>
                        </div>

                        <div className="pt-8">
                            <Link
                                to={isAuthenticated ? "/dashboard" : "/auth"}
                                className="block w-full text-center py-3 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
                            >
                                {isAuthenticated ? 'Go to Dashboard' : 'Get Started Free'}
                            </Link>
                        </div>
                    </div>

                    {/* Pro Plan (Highlighted) */}
                    <div className="bg-white rounded-3xl p-8 border-2 border-indigo-600 shadow-xl shadow-indigo-500/10 flex flex-col justify-between relative">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                            Most Popular
                        </div>

                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Pro Tier</span>
                            <h3 className="text-xl font-bold text-slate-900 mt-1">Creator & Pro</h3>
                            <p className="text-xs text-slate-500 mt-2">Custom aliases and full real-time click metrics.</p>

                            <div className="my-6">
                                <span className="text-4xl font-extrabold text-slate-900">
                                    {annual ? '$7' : '$9'}
                                </span>
                                <span className="text-xs text-slate-400 font-medium"> / month</span>
                            </div>

                            <ul className="space-y-3 text-xs text-slate-600 font-medium border-t border-slate-100 pt-6">
                                <li className="flex items-center gap-2.5">
                                    <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                    Everything in Starter
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                    <strong>Custom Slugs & Aliases</strong>
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                    <strong>Real-Time Click Tracking Analytics</strong>
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                    Links Management Dashboard
                                </li>
                            </ul>
                        </div>

                        <div className="pt-8">
                            <Link
                                to={isAuthenticated ? "/dashboard" : "/auth"}
                                className="block w-full text-center py-3 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/25 transition-all active:scale-[0.99]"
                            >
                                {isAuthenticated ? 'Access Pro Features' : 'Start Pro Account'}
                            </Link>
                        </div>
                    </div>

                    {/* Enterprise Plan */}
                    <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Business</span>
                            <h3 className="text-xl font-bold text-slate-900 mt-1">Enterprise</h3>
                            <p className="text-xs text-slate-500 mt-2">High-volume links, SLA uptime, and dedicated support.</p>

                            <div className="my-6">
                                <span className="text-4xl font-extrabold text-slate-900">
                                    {annual ? '$24' : '$29'}
                                </span>
                                <span className="text-xs text-slate-400 font-medium"> / month</span>
                            </div>

                            <ul className="space-y-3 text-xs text-slate-600 font-medium border-t border-slate-100 pt-6">
                                <li className="flex items-center gap-2.5">
                                    <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                    Everything in Pro
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                    Custom Domain Routing
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                    Priority Redirection Routing
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                    24/7 Dedicated Support
                                </li>
                            </ul>
                        </div>

                        <div className="pt-8">
                            <Link
                                to={isAuthenticated ? "/dashboard" : "/auth"}
                                className="block w-full text-center py-3 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
                            >
                                Contact Enterprise
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pricing_page;
