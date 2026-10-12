import React, { useState } from 'react';
import { Link } from 'react-router';
import SEO from '../components/SEO';

const FAQ_page = () => {
    const [openIndex, setOpenIndex] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');

    const faqs = [
        {
            category: 'Security & Zero-Trust',
            question: 'What is the Zero-Trust Link Inspector and Quarantine Shield?',
            answer: 'LinkVault inspects every destination URL using deterministic heuristics (checking for IP host deception, high-risk TLDs like .xyz/.top, open-redirect chains, and typosquatting across 9 major brand clusters) backed by Gemini AI. Links flagged with elevated threat scores are placed behind an interstitial Quarantine Warning Shield (/shield/:id), protecting users from drive-by phishing attacks.'
        },
        {
            category: 'AI Hub',
            question: 'What can I do inside the LinkVault AI Hub?',
            answer: 'The AI Hub features two integrated tools powered by Google Gemini: (1) AI Code Reviewer, which detects bugs, security vulnerabilities, and code smells with instant refactoring suggestions, and (2) AI PDF & Document Translator, which translates multi-page documentation into multiple languages using high-speed Node-native parsing.'
        },
        {
            category: 'General',
            question: 'What is LinkVault and how does URL redirection work?',
            answer: 'LinkVault is a modern Safe Link Gateway and URL Shortener. It resolves long destination URLs in sub-milliseconds through MongoDB indexed queries, providing clean memorable links, vector QR codes, and real-time click volume tracking.'
        },
        {
            category: 'Custom Slugs',
            question: 'How do I create custom branded aliases?',
            answer: 'When you create a free account and sign in, the "Custom Alias" option becomes available in your shortener studio. You can specify custom slugs like linkvault/summer-launch instead of random IDs.'
        },
        {
            category: 'Analytics',
            question: 'How does real-time click tracking work?',
            answer: 'Each time a visitor accesses your shortened URL, the click counter increments atomically in our database before instantly redirecting the visitor. You can view total traffic volume, link rankings, and detailed analytics in your Dashboard and Analytics tabs.'
        },
        {
            category: 'QR Codes',
            question: 'Can I generate and download QR codes for my links?',
            answer: 'Yes! Every shortened URL includes a vector QR code with instant centered modal display, allowing you to preview or scan it directly from smartphones and print media.'
        },
        {
            category: 'Security',
            question: 'Can I test a link before shortening it?',
            answer: 'Yes! Navigate to the "🛡️ Inspector" tab in the top navigation. The public sandbox allows you to paste any destination link or test 3 pre-built viva evaluation cases (Clean GitHub repository, PayPal phishing spoof, or raw IP host deception).'
        }
    ];

    const filteredFaqs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-[calc(100vh-73px)] cyber-grid-light py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <SEO 
                title="FAQ &amp; Help Center | LinkVault Zero-Trust Safe Link Gateway" 
                description="Frequently asked questions about LinkVault's Zero-Trust Link Inspector, Gemini AI Hub, custom slugs, and click analytics." 
            />

            <div className="max-w-4xl mx-auto space-y-10 animate-fade-in relative z-10">
                {/* Header */}
                <div className="text-center space-y-3">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-900 text-cyan-300 border border-slate-800 shadow-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                        <span className="font-mono text-[11px] uppercase tracking-wider">Knowledge Base &amp; FAQ</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
                        Learn how LinkVault pairs high-speed URL shortening with real-time phishing defense, AI developer utilities, and forensic click tracking.
                    </p>
                </div>

                {/* Search Input */}
                <div className="relative max-w-xl mx-auto">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Search answers (e.g. inspector, phishing, ai hub, qr, slug)..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white/95 border border-slate-200/90 rounded-2xl text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 shadow-sm transition-all"
                    />
                </div>

                {/* Accordion List */}
                <div className="space-y-3">
                    {filteredFaqs.length === 0 ? (
                        <div className="text-center py-12 text-xs text-slate-500 bg-white/80 rounded-2xl border border-slate-200">
                            No questions match &quot;{searchQuery}&quot;.
                        </div>
                    ) : (
                        filteredFaqs.map((faq, index) => {
                            const isOpen = openIndex === index;

                            return (
                                <div
                                    key={index}
                                    className="bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden transition-all duration-200"
                                >
                                    <button
                                        onClick={() => setOpenIndex(isOpen ? null : index)}
                                        className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/60 transition-colors"
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                                            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-md w-fit ${
                                                faq.category.includes('Security')
                                                    ? 'bg-cyan-50 text-cyan-800 border border-cyan-200'
                                                    : faq.category.includes('AI')
                                                    ? 'bg-purple-50 text-purple-800 border border-purple-200'
                                                    : 'bg-slate-100 text-slate-700'
                                            }`}>
                                                {faq.category}
                                            </span>
                                            <span className="text-sm font-bold text-slate-900">{faq.question}</span>
                                        </div>
                                        <svg
                                            className={`w-4 h-4 text-slate-400 transform transition-transform duration-200 shrink-0 ${
                                                isOpen ? 'rotate-180 text-cyan-600' : ''
                                            }`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2.5"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {isOpen && (
                                        <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 animate-fade-in">
                                            {faq.answer}
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Quick Callout Cards for AI Hub and Inspector */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-950 via-slate-900 to-slate-950 text-white border border-cyan-800/60 shadow-lg space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-cyan-300">🛡️ Public Threat Inspector</span>
                            <span className="text-[10px] bg-cyan-900 text-cyan-200 px-2 py-0.5 rounded-full font-mono">Live Tool</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                            Audit external destination URLs before shortening. Test phishing spoofs and punycode attacks in our laboratory.
                        </p>
                        <Link to="/inspector" className="text-xs font-bold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 pt-1">
                            Launch Inspector &rarr;
                        </Link>
                    </div>

                    <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-950 via-slate-900 to-slate-950 text-white border border-purple-800/60 shadow-lg space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-purple-300">✨ Gemini AI Hub</span>
                            <span className="text-[10px] bg-purple-900 text-purple-200 px-2 py-0.5 rounded-full font-mono">AI Suite</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                            Review code syntax, identify security bugs, and translate PDF technical documentation into multiple languages.
                        </p>
                        <Link to="/ai-hub" className="text-xs font-bold text-purple-400 hover:text-purple-300 inline-flex items-center gap-1 pt-1">
                            Open AI Hub &rarr;
                        </Link>
                    </div>
                </div>

                {/* Bottom Callout */}
                <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200/90 text-center space-y-2 shadow-xs">
                    <h3 className="text-sm font-bold text-slate-900">Ready to shorten and secure your links?</h3>
                    <p className="text-xs text-slate-500 max-w-md mx-auto">
                        Experience sub-millisecond redirection backed by zero-trust threat shielding and real-time click volume analytics.
                    </p>
                    <div className="pt-2">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-md transition-colors"
                        >
                            <span>Open LinkVault Shortener</span>
                            <span>&rarr;</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ_page;
