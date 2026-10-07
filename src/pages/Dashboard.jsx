import React from 'react';
import { useSelector } from 'react-redux';
import ShortUrlFrom from '../components/ShortUrlFrom';
import ShortUrls from '../components/ShortUrls';
import SEO from '../components/SEO';

const Dashboard = () => {
    const { user } = useSelector((state) => state.Auth);

    return (
        <main className="min-h-[calc(100vh-73px)] bg-slate-50/50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
                {/* Dashboard Page Header */}
                <div className="flex flex-col  sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200/80">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100 mb-2">
                            <span>Overview & Analytics</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                            Welcome back, {user?.name || user?.email?.split('@')[0] || 'Member'} 👋
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1">
                            Create new short links, set custom aliases, and monitor your traffic metrics in real-time.
                        </p>
                    </div>
                </div>

                {/* Quick Link Shortener Widget */}
                <section className="flex flex-col items-center ">
                    <div className="mb-3 flex items-center">
                        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">Quick Shortener</h2>
                    </div>
                    <div className="max-w-2xl w-full">
                        <ShortUrlFrom />
                    </div>
                </section>

                {/* Shortened Links & Analytics Section */}
                <section className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">Active Links & Click Traffic</h2>
                    </div>
                    <ShortUrls />
                </section>
            </div>
        </main>
    );
};

export default Dashboard;
