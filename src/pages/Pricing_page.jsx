import React, { useState } from 'react';
import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import SEO from '../components/SEO';

const Pricing_page = () => {
    const [annual, setAnnual] = useState(false);
    const { isAuthenticated } = useSelector((state) => state.Auth);

    return (
        <div className="min-h-[calc(100vh-73px)] cyber-grid-light py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <SEO 
                title="Transparent Plans &amp; Pricing | LinkVault Safe Link Platform" 
                description="Explore LinkVault's flexible plans with zero-trust threat scanning, AI Hub utilities, custom slugs, and real-time click analytics." 
            />

            {/* Ambient Cyber Beams */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[380px] pointer-events-none -z-10">
                <div className="absolute top-[-30px] left-1/3 w-80 h-80 bg-cyan-400/10 rounded-full blur-[100px]" />
                <div className="absolute top-[20px] right-1/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto space-y-14 animate-fade-in relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto space-y-4">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-900 text-cyan-300 border border-slate-800 shadow-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                        <span className="font-mono text-[11px] uppercase tracking-wider">Transparent &amp; Accessible</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-[1.15]">
                        Simple Pricing for Developers &amp; Creators,{' '}
                        <span className="bg-gradient-to-r from-indigo-600 via-cyan-600 to-purple-600 bg-clip-text text-transparent">
                            Zero Hidden Fees
                        </span>
                    </h1>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                        Start free today with full Zero-Trust Link Inspector access. Upgrade anytime for branded custom slugs, advanced AI Hub quotas, and detailed click analytics.
                    </p>

                    {/* Billing Switch */}
                    <div className="pt-4 flex items-center justify-center gap-3">
                        <span className={`text-xs font-bold ${!annual ? 'text-slate-900' : 'text-slate-400'}`}>
                            Monthly Billing
                        </span>
                        <button
                            type="button"
                            onClick={() => setAnnual(!annual)}
                            className="relative w-12 h-6 bg-slate-900 rounded-full transition-colors cursor-pointer focus:outline-none p-0.5 border border-slate-700"
                            aria-label="Toggle annual billing"
                        >
                            <span
                                className={`block w-5 h-5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-transform transform shadow-sm ${
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

                {/* Pricing Cards Grid with Glass Card Styling */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Free Plan */}
                    <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 border border-slate-200/90 shadow-sm glass-card-hover flex flex-col justify-between">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Free Tier</span>
                            <h3 className="text-xl font-black text-slate-900 mt-1">Community Starter</h3>
                            <p className="text-xs text-slate-500 mt-2">Essential shortening backed by real-time heuristic security.</p>

                            <div className="my-6">
                                <span className="text-4xl font-black text-slate-900">$0</span>
                                <span className="text-xs text-slate-400 font-medium font-mono"> / forever</span>
                            </div>

                            <ul className="space-y-3 text-xs text-slate-600 font-medium border-t border-slate-100 pt-6">
                                <li className="flex items-center gap-2.5">
                                    <span className="text-emerald-500 font-bold">✓</span>
                                    Unlimited Link Shortening
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <span className="text-cyan-500 font-bold">✓</span>
                                    <strong>Public Link Threat Inspector (Unlimited)</strong>
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <span className="text-emerald-500 font-bold">✓</span>
                                    Instant Dynamic QR Code Previews
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <span className="text-emerald-500 font-bold">✓</span>
                                    1-Click Instant Clipboard Copy
                                </li>
                                <li className="flex items-center gap-2.5 text-slate-400">
                                    <span className="text-slate-300 font-bold">✕</span>
                                    Custom Aliases &amp; Branded Slugs
                                </li>
                            </ul>
                        </div>

                        <div className="pt-8">
                            <Link
                                to={isAuthenticated ? "/dashboard" : "/auth"}
                                className="block w-full text-center py-3 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
                            >
                                {isAuthenticated ? 'Go to Command Center' : 'Get Started Free'}
                            </Link>
                        </div>
                    </div>

                    {/* Pro Plan (Highlighted Glass Card) */}
                    <div className="bg-white/95 backdrop-blur-2xl rounded-3xl p-8 border-2 border-indigo-600 shadow-2xl shadow-indigo-500/15 glass-card-hover flex flex-col justify-between relative">
                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 via-cyan-600 to-purple-600 text-white text-[10px] font-black px-3.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                            Most Popular &bull; Developer Choice
                        </div>

                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Pro Tier</span>
                            <h3 className="text-xl font-black text-slate-900 mt-1">Creator &amp; Pro</h3>
                            <p className="text-xs text-slate-500 mt-2">Custom aliases, real-time analytics &amp; Gemini AI suite.</p>

                            <div className="my-6">
                                <span className="text-4xl font-black text-slate-900">
                                    {annual ? '$7' : '$9'}
                                </span>
                                <span className="text-xs text-slate-400 font-medium font-mono"> / month</span>
                            </div>

                            <ul className="space-y-3 text-xs text-slate-700 font-medium border-t border-slate-100 pt-6">
                                <li className="flex items-center gap-2.5">
                                    <span className="text-emerald-500 font-bold">✓</span>
                                    Everything in Starter Tier
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <span className="text-indigo-600 font-bold">✓</span>
                                    <strong>Custom Slugs &amp; Branded Aliases</strong>
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <span className="text-cyan-600 font-bold">✓</span>
                                    <strong>Real-Time Click Volume &amp; Traffic Intelligence</strong>
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <span className="text-purple-600 font-bold">✓</span>
                                    <strong>Full Access to Gemini AI Hub Suite</strong>
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <span className="text-emerald-500 font-bold">✓</span>
                                    Zero-Trust Interstitial Quarantine Controls
                                </li>
                            </ul>
                        </div>

                        <div className="pt-8">
                            <Link
                                to={isAuthenticated ? "/dashboard" : "/auth"}
                                className="block w-full text-center py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-600 via-cyan-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white shadow-lg shadow-indigo-500/25 transition-all active:scale-95"
                            >
                                {isAuthenticated ? 'Access Pro Features' : 'Start Pro Account'}
                            </Link>
                        </div>
                    </div>

                    {/* Enterprise Plan */}
                    <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 border border-slate-200/90 shadow-sm glass-card-hover flex flex-col justify-between">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Enterprise</span>
                            <h3 className="text-xl font-black text-slate-900 mt-1">Campus &amp; Scale</h3>
                            <p className="text-xs text-slate-500 mt-2">Unlimited throughput, team governance, and dedicated SLA.</p>

                            <div className="my-6">
                                <span className="text-4xl font-black text-slate-900">
                                    {annual ? '$24' : '$29'}
                                </span>
                                <span className="text-xs text-slate-400 font-medium font-mono"> / month</span>
                            </div>

                            <ul className="space-y-3 text-xs text-slate-600 font-medium border-t border-slate-100 pt-6">
                                <li className="flex items-center gap-2.5">
                                    <span className="text-emerald-500 font-bold">✓</span>
                                    Everything in Creator Pro
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <span className="text-emerald-500 font-bold">✓</span>
                                    Multi-User Management &amp; Admin Audit Logs
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <span className="text-emerald-500 font-bold">✓</span>
                                    Priority Redirection Index Routing
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <span className="text-emerald-500 font-bold">✓</span>
                                    Dedicated 24/7 Security Support
                                </li>
                            </ul>
                        </div>

                        <div className="pt-8">
                            <Link
                                to={isAuthenticated ? "/dashboard" : "/auth"}
                                className="block w-full text-center py-3 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-colors"
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
