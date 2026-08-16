import React, { useState } from 'react';
import { Link } from 'react-router';

const FAQ_page = () => {
    const [openIndex, setOpenIndex] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');

    const faqs = [
        {
            category: 'General',
            question: 'What is LinkVault and how does it work?',
            answer: 'LinkVault is a modern URL shortening and link management service. It turns long, complex URLs into concise, memorable links that redirect visitors seamlessly to the original destination with real-time click tracking.'
        },
        {
            category: 'Custom Slugs',
            question: 'How do I create custom branded aliases?',
            answer: 'When you create a free account and sign in, a "Custom Alias" input appears in the shortener box. Simply enter your desired slug (e.g., "my-portfolio") to generate a link like link/my-portfolio.'
        },
        {
            category: 'Analytics',
            question: 'How does click tracking and analytics work?',
            answer: 'Every time a visitor clicks on your shortened link, our server registers the request, increments the counter in real time, and redirects the user in milliseconds. You can view total clicks, top performers, and traffic breakdown in your Dashboard and Analytics page.'
        },
        {
            category: 'QR Codes',
            question: 'Can I generate QR codes for my links?',
            answer: 'Yes! Every shortened URL includes an instant QR code preview and modal. You can scan it directly with your smartphone or copy the short URL to share across digital and physical media.'
        },
        {
            category: 'Security',
            question: 'Are my links and account secure?',
            answer: 'Yes. All user sessions are authenticated using secure HTTP cookie tokens. Your created links are safely stored and protected with unique identifiers, allowing only you to manage or delete them from your dashboard.'
        },
        {
            category: 'General',
            question: 'Do shortened links ever expire?',
            answer: 'No, your shortened links remain active indefinitely as long as you do not delete them from your dashboard.'
        }
    ];

    const filteredFaqs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-[calc(100vh-73px)] bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-10 animate-fade-in">
                {/* Header */}
                <div className="text-center space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                        <span>Help & Support</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-sm text-slate-500 max-w-xl mx-auto">
                        Find answers to common questions about URL shortening, custom slugs, click analytics, and account management.
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
                        placeholder="Search answers by keyword..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-xs transition-all"
                    />
                </div>

                {/* Accordion List */}
                <div className="space-y-3">
                    {filteredFaqs.length === 0 ? (
                        <div className="text-center py-12 text-xs text-slate-500 bg-white rounded-2xl border border-slate-200">
                            No questions match "{searchQuery}".
                        </div>
                    ) : (
                        filteredFaqs.map((faq, index) => {
                            const isOpen = openIndex === index;

                            return (
                                <div
                                    key={index}
                                    className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden transition-all"
                                >
                                    <button
                                        onClick={() => setOpenIndex(isOpen ? null : index)}
                                        className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                                                {faq.category}
                                            </span>
                                            <span className="text-sm font-bold text-slate-900">{faq.question}</span>
                                        </div>
                                        <svg
                                            className={`w-4 h-4 text-slate-400 transform transition-transform duration-200 shrink-0 ${
                                                isOpen ? 'rotate-180 text-indigo-600' : ''
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

                {/* Still have questions */}
                <div className="p-8 rounded-3xl bg-indigo-50/70 border border-indigo-100 text-center space-y-3">
                    <h3 className="text-base font-bold text-indigo-950">Still have questions?</h3>
                    <p className="text-xs text-indigo-800/80 max-w-md mx-auto">
                        Get started with our free tier to experience fast shortening, custom slug aliases, and real-time click tracking.
                    </p>
                    <div className="pt-2">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-colors"
                        >
                            <span>Try LinkVault Now</span>
                            <span>&rarr;</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ_page;
