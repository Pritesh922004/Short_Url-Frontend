import React, { useState } from 'react';
import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import SEO from '../components/SEO';

const Features_page = () => {
    const { isAuthenticated } = useSelector((state) => state.Auth);
    const [activeTab, setActiveTab] = useState('inspector');

    return (
        <div className="min-h-[calc(100vh-73px)] cyber-grid-light py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <SEO 
                title="Features &amp; Security Capabilities | LinkVault Zero-Trust Platform" 
                description="Explore LinkVault's Zero-Trust Link Inspector, Gemini AI Hub, real-time analytics, custom aliases, and instant QR codes." 
            />

            {/* Ambient Cyber Beams */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[380px] pointer-events-none -z-10">
                <div className="absolute top-[-40px] left-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-[110px]" />
                <div className="absolute top-[30px] right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[110px]" />
            </div>

            <div className="max-w-7xl mx-auto space-y-16 animate-fade-in relative z-10">
                {/* Hero Header */}
                <div className="text-center max-w-3xl mx-auto space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-slate-900 text-cyan-300 border border-slate-800 shadow-md">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                        <span className="font-mono text-[11px] uppercase tracking-wider">Enterprise Security &amp; AI Architecture</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-[1.15]">
                        Engineered for Speed, Precision, and{' '}
                        <span className="bg-gradient-to-r from-indigo-600 via-cyan-600 to-purple-600 bg-clip-text text-transparent">
                            Zero-Trust Defense
                        </span>
                    </h1>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
                        LinkVault merges high-performance URL shortening with proactive threat auditing, Google Gemini AI utilities, and real-time click intelligence.
                    </p>
                </div>

                {/* Interactive Deep Dive with Tabs (Featuring Inspector & AI Hub first) */}
                <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-10">
                    <div className="flex flex-wrap items-center justify-center gap-2 pb-8 border-b border-slate-100">
                        <button
                            onClick={() => setActiveTab('inspector')}
                            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                                activeTab === 'inspector'
                                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-500/25'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                        >
                            <span>🛡️ Zero-Trust Inspector</span>
                            <span className="text-[9px] bg-white/20 px-1.5 py-0.2 rounded-full">New</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('ai-hub')}
                            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                                activeTab === 'ai-hub'
                                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/25'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                        >
                            <span>✨ Gemini AI Hub</span>
                            <span className="text-[9px] bg-white/20 px-1.5 py-0.2 rounded-full">AI</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('slugs')}
                            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                activeTab === 'slugs'
                                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/25'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                        >
                            Custom Slugs
                        </button>
                        <button
                            onClick={() => setActiveTab('analytics')}
                            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                activeTab === 'analytics'
                                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/25'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                        >
                            Real-Time Analytics
                        </button>
                        <button
                            onClick={() => setActiveTab('qr')}
                            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                activeTab === 'qr'
                                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/25'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                        >
                            Instant QR Codes
                        </button>
                    </div>

                    <div className="mt-8">
                        {/* TAB 1: ZERO-TRUST INSPECTOR */}
                        {activeTab === 'inspector' && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-fade-in">
                                <div className="space-y-4">
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cyan-50 text-cyan-800 border border-cyan-200/80">
                                        <span>Proactive Threat Defense</span>
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900">
                                        Deterministic Threat Auditing &amp; Interstitial Quarantine
                                    </h3>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        Inspect URLs before they ever compromise users. LinkVault scans destinations using 9 brand cluster typosquatting models, IP host analysis, high-risk TLD checks, and Gemini AI deception classification.
                                    </p>
                                    <ul className="space-y-2.5 text-xs text-slate-700 font-medium">
                                        <li className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                                            Sub-10ms Heuristic Scoring with instant quarantine shield trigger
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                                            Brand impersonation detection across PayPal, Google, Apple, Banking &amp; Web3
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                                            Public Threat Inspector Sandbox with 1-click examiner test scenarios
                                        </li>
                                    </ul>
                                    <div className="pt-2">
                                        <Link
                                            to="/inspector"
                                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-md shadow-cyan-600/20 transition-all active:scale-95"
                                        >
                                            <span>Open Public Link Inspector</span>
                                            <span>🛡️</span>
                                        </Link>
                                    </div>
                                </div>
                                <div className="p-6 rounded-2xl bg-slate-950 text-white border border-slate-800 shadow-xl font-mono text-xs space-y-3">
                                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                                        <span className="text-cyan-400 font-bold">zero-trust-evaluator.js</span>
                                        <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800/60">PASS</span>
                                    </div>
                                    <div className="space-y-1 text-[11px] text-slate-300">
                                        <p>&gt; Heuristic Engine: Raw IP check ... [CLEAR]</p>
                                        <p>&gt; TLD Risk Engine: .com ... [SAFE]</p>
                                        <p>&gt; Typosquat Radar: 9 Brands ... [0 FLAGS]</p>
                                        <p className="text-emerald-400 font-bold pt-1">&gt; Computed Score: 0/100 (VERIFIED SAFE)</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB 2: GEMINI AI HUB */}
                        {activeTab === 'ai-hub' && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-fade-in">
                                <div className="space-y-4">
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-800 border border-purple-200/80">
                                        <span>Intelligent Developer Suite</span>
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900">
                                        Integrated Gemini AI Productivity Hub
                                    </h3>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        Supercharge your workflows with integrated generative AI models. Audit syntax, detect security bugs, refactor architecture, and translate multi-page PDF documents without leaving LinkVault.
                                    </p>
                                    <ul className="space-y-2.5 text-xs text-slate-700 font-medium">
                                        <li className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                                            Automated AI Code Reviewer with structured quality scores &amp; fix suggestions
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                                            Multi-lingual PDF document translation powered by Node-native unpdf
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                                            Instant copy &amp; download formatted outputs
                                        </li>
                                    </ul>
                                    <div className="pt-2">
                                        <Link
                                            to="/ai-hub"
                                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-600/20 transition-all active:scale-95"
                                        >
                                            <span>Explore AI Hub Tools</span>
                                            <span>✨</span>
                                        </Link>
                                    </div>
                                </div>
                                <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-950 via-slate-900 to-indigo-950 text-white border border-purple-800/60 shadow-xl space-y-3 font-mono text-xs">
                                    <div className="flex items-center justify-between pb-2 border-b border-purple-800/60">
                                        <span className="text-purple-300 font-bold">gemini-2.5-flash</span>
                                        <span className="text-[10px] text-purple-400">Review Output</span>
                                    </div>
                                    <p className="text-slate-300 text-[11px] leading-relaxed">
                                        &quot;Architecture review identified 1 vulnerability (unbounded parameter in regex). Refactored solution provided with 42% latency reduction.&quot;
                                    </p>
                                    <div className="p-2 rounded-lg bg-black/40 border border-purple-800/40 text-emerald-400 text-[10px]">
                                        ✔ Code Quality Score: 95/100 (Production Ready)
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB 3: CUSTOM SLUGS */}
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
                                        <span className="text-[11px] font-semibold uppercase text-slate-400">Before &amp; After</span>
                                        <div className="p-2.5 bg-red-50/70 border border-red-200 rounded-lg text-xs text-red-700 truncate font-mono line-through">
                                            https://store.com/products/catalog?item=98432&amp;session=x839
                                        </div>
                                        <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 font-mono font-bold">
                                            https://linkvault.link/deal
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB 4: REAL-TIME ANALYTICS */}
                        {activeTab === 'analytics' && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-fade-in">
                                <div className="space-y-4">
                                    <div className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700">
                                        Data-Driven Decisions
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900">Live Click Tracking &amp; Metrics</h3>
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

                        {/* TAB 5: INSTANT QR CODES */}
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
                    </div>
                </div>

                {/* 3 Pillar Cards with Glass Card Hover */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-sm glass-card-hover space-y-3">
                        <div className="w-12 h-12 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold text-xl">
                            🛡️
                        </div>
                        <h4 className="text-base font-bold text-slate-900">Zero-Trust Safe Link Gateway</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">
                            Proactively evaluates links with heuristic typosquatting and Gemini AI threat scanning before routing visitors.
                        </p>
                        <Link to="/inspector" className="text-xs font-bold text-cyan-600 hover:text-cyan-700 inline-flex items-center gap-1">
                            Inspect Links &rarr;
                        </Link>
                    </div>

                    <div className="p-6 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-sm glass-card-hover space-y-3">
                        <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xl">
                            ✨
                        </div>
                        <h4 className="text-base font-bold text-slate-900">Gemini AI Hub Suite</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">
                            Integrated developer tools: instant AI code review, vulnerability assessment, and multi-lingual PDF translation.
                        </p>
                        <Link to="/ai-hub" className="text-xs font-bold text-purple-600 hover:text-purple-700 inline-flex items-center gap-1">
                            Explore AI Hub &rarr;
                        </Link>
                    </div>

                    <div className="p-6 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-sm glass-card-hover space-y-3">
                        <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xl">
                            ⚡
                        </div>
                        <h4 className="text-base font-bold text-slate-900">Sub-Millisecond Engine</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">
                            Ultra-fast indexed MongoDB resolution with real-time click tracking and automatic QR code generation.
                        </p>
                        <Link to="/analytics" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1">
                            View Analytics &rarr;
                        </Link>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="text-center pt-4">
                    <Link
                        to={isAuthenticated ? "/dashboard" : "/auth"}
                        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-indigo-600 via-cyan-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white shadow-lg shadow-indigo-500/25 transition-all active:scale-95"
                    >
                        <span>{isAuthenticated ? 'Go to Command Center' : 'Get Started Free'}</span>
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
