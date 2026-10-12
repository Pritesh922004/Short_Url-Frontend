import React from 'react';
import { Link } from 'react-router';

const Footer = () => {
    return (
        <footer className="bg-slate-950 text-slate-300 border-t border-slate-800/80 mt-auto cyber-grid relative overflow-hidden">
            {/* Top Cyber Ambient Accent Line */}
            <div className="h-0.5 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 w-full opacity-80" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-10">
                    {/* Brand Column */}
                    <div className="sm:col-span-2 space-y-4">
                        <Link to="/" className="flex items-center gap-2.5 group">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                </svg>
                            </div>
                            <span className="text-xl font-black tracking-tight text-white">
                                Link<span className="text-cyan-400">Vault</span>
                            </span>
                        </Link>
                        <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                            Next-generation Safe Link Gateway &amp; URL Shortener. Defend against deceptive phishing, brand spoofing, and malware attacks in real-time with sub-millisecond indexed redirection.
                        </p>
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 text-[11px] font-mono">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                Zero-Trust Engine Active
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/80 text-purple-300 border border-purple-800/60 text-[11px] font-mono">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                                Gemini AI Powered
                            </span>
                        </div>
                    </div>

                    {/* Security & Intelligence Column (Dedicated to Inspector & Threat Defense) */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Security Suite</span>
                            <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">New</span>
                        </div>
                        <ul className="space-y-2 text-xs text-slate-400 font-medium">
                            <li>
                                <Link to="/inspector" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                                    <span>🛡️ Link Threat Inspector</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/inspector" className="hover:text-cyan-400 transition-colors">Heuristic Typosquat Radar</Link>
                            </li>
                            <li>
                                <Link to="/inspector" className="hover:text-cyan-400 transition-colors">AI Phishing Sandbox</Link>
                            </li>
                            <li>
                                <Link to="/features" className="hover:text-cyan-400 transition-colors">Zero-Trust Quarantine Shield</Link>
                            </li>
                        </ul>
                    </div>

                    {/* AI Hub & Productivity Column */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">AI Hub Suite</span>
                            <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-purple-950 text-purple-300 border border-purple-800">AI</span>
                        </div>
                        <ul className="space-y-2 text-xs text-slate-400 font-medium">
                            <li>
                                <Link to="/ai-hub" className="hover:text-purple-400 transition-colors flex items-center gap-1">
                                    <span>✨ AI Code Reviewer</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/ai-hub" className="hover:text-purple-400 transition-colors flex items-center gap-1">
                                    <span>📄 Document / PDF Translator</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/features" className="hover:text-purple-400 transition-colors">Smart Code Optimization</Link>
                            </li>
                            <li>
                                <Link to="/faq" className="hover:text-purple-400 transition-colors">AI Architecture Guide</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Platform & Links */}
                    <div className="space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Platform</h4>
                        <ul className="space-y-2 text-xs text-slate-400 font-medium">
                            <li>
                                <Link to="/" className="hover:text-indigo-400 transition-colors">URL Shortener Studio</Link>
                            </li>
                            <li>
                                <Link to="/dashboard" className="hover:text-indigo-400 transition-colors">Command Center</Link>
                            </li>
                            <li>
                                <Link to="/analytics" className="hover:text-indigo-400 transition-colors">Real-Time Traffic Analytics</Link>
                            </li>
                            <li>
                                <Link to="/faq" className="hover:text-indigo-400 transition-colors">Help Center &amp; FAQ</Link>
                            </li>
                            <li>
                                <Link to="/admin/login" className="hover:text-cyan-400 transition-colors flex items-center gap-1 text-slate-400">
                                    <svg className="w-3.5 h-3.5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    <span>Admin Portal</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-slate-500 text-center sm:text-left">
                        &copy; {new Date().getFullYear()} LinkVault Zero-Trust Security Platform. Engineered for resilient link governance.
                    </p>

                    <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
                        <Link to="/features" className="hover:text-cyan-400 transition-colors">Features</Link>
                        <span>&bull;</span>
                        <Link to="/inspector" className="hover:text-cyan-400 transition-colors">Inspector</Link>
                        <span>&bull;</span>
                        <Link to="/ai-hub" className="hover:text-purple-400 transition-colors">AI Hub</Link>
                        <span>&bull;</span>
                        <Link to="/faq" className="hover:text-indigo-400 transition-colors">FAQ</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
