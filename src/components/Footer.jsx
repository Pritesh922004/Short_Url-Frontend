import React from 'react';
import { Link } from 'react-router';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-slate-200/80 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
                    {/* Brand Column */}
                    <div className="col-span-2 space-y-4">
                        <Link to="/" className="flex items-center gap-2.5 group">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-blue-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
                                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-700 bg-clip-text text-transparent">
                                LinkVault
                            </span>
                        </Link>
                        <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
                            The modern, lightning-fast URL shortener built for developers, creators, and businesses. Shorten links, customize slugs, generate QR codes, and measure click traffic in real time.
                        </p>
                        <div className="flex items-center gap-2 text-xs text-slate-600">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                All Systems Operational
                            </span>
                        </div>
                    </div>

                    {/* Product Links */}
                    <div className="space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Product</h4>
                        <ul className="space-y-2 text-xs text-slate-600 font-medium">
                            <li>
                                <Link to="/" className="hover:text-indigo-600 transition-colors">URL Shortener</Link>
                            </li>
                            <li>
                                <Link to="/features" className="hover:text-indigo-600 transition-colors">Features</Link>
                            </li>
                            <li>
                                <Link to="/dashboard" className="hover:text-indigo-600 transition-colors">Link Dashboard</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Analytics & Tools */}
                    <div className="space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Analytics</h4>
                        <ul className="space-y-2 text-xs text-slate-600 font-medium">
                            <li>
                                <Link to="/analytics" className="hover:text-indigo-600 transition-colors">Click Tracking</Link>
                            </li>
                            <li>
                                <Link to="/features" className="hover:text-indigo-600 transition-colors">Custom Slugs</Link>
                            </li>
                            <li>
                                <Link to="/features" className="hover:text-indigo-600 transition-colors">QR Code Generator</Link>
                            </li>
                            <li>
                                <Link to="/faq" className="hover:text-indigo-600 transition-colors">Help Center & FAQ</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company & Legal */}
                    <div className="space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Platform</h4>
                        <ul className="space-y-2 text-xs text-slate-600 font-medium">
                            <li>
                                <Link to="/faq" className="hover:text-indigo-600 transition-colors">About Us</Link>
                            </li>
                            <li>
                                <Link to="/faq" className="hover:text-indigo-600 transition-colors">Privacy Policy</Link>
                            </li>
                            <li>
                                <Link to="/faq" className="hover:text-indigo-600 transition-colors">Terms of Service</Link>
                            </li>
                            <li>
                                <Link to="/admin/login" className="hover:text-indigo-600 transition-colors flex items-center gap-1 font-semibold text-indigo-600">
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    <span>Admin Portal</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-slate-500 text-center sm:text-left">
                        &copy; {new Date().getFullYear()} LinkVault Inc. All rights reserved. Crafted for seamless link management.
                    </p>

                    <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                        <Link to="/faq" className="hover:text-indigo-600 transition-colors">Privacy</Link>
                        <span>&bull;</span>
                        <Link to="/faq" className="hover:text-indigo-600 transition-colors">Terms</Link>
                        <span>&bull;</span>
                        <Link to="/faq" className="hover:text-indigo-600 transition-colors">Support</Link>
                        <span>&bull;</span>
                        <Link to="/admin/login" className="hover:text-indigo-600 transition-colors flex items-center gap-1 font-semibold text-slate-600 hover:text-indigo-600" title="Admin Portal">
                            <svg className="w-3.5 h-3.5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <span>Admin</span>
                        </Link>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
