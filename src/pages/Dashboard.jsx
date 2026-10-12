import React from 'react';
import { useSelector } from 'react-redux';
import ShortUrlFrom from '../components/ShortUrlFrom';
import ShortUrls from '../components/ShortUrls';
import SEO from '../components/SEO';

const Dashboard = () => {
    const { user } = useSelector((state) => state.Auth);
    const { urls } = useSelector((state) => state.Urls);

    const rawList = urls?.data || [];
    const totalLinks = rawList.length;
    const totalClicks = rawList.reduce((sum, u) => sum + (u.Clicks || 0), 0);
    const safeCount = rawList.filter(u => (!u.isQuarantined && (!u.threatScore || u.threatScore < 65))).length;
    const quarantinedCount = rawList.filter(u => (u.isQuarantined || (u.threatScore && u.threatScore >= 65))).length;

    return (
        <main className="min-h-[calc(100vh-73px)] cyber-grid-light py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <SEO title="Dashboard | LinkVault Safe Link Command Center" description="Manage your shortened links, monitor live clicks, and inspect link security." />
            
            {/* Ultra-Performance Hardware-Accelerated Ambient Beams */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[360px] pointer-events-none -z-10 overflow-hidden">
                <div className="absolute top-[-30px] left-1/4 w-[380px] h-[380px] rounded-full ambient-glow-indigo" />
                <div className="absolute top-[20px] right-1/4 w-[380px] h-[380px] rounded-full ambient-glow-cyan" />
            </div>

            <div className="max-w-7xl mx-auto space-y-8 animate-fade-in relative z-10">
                {/* Dashboard Page Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200/80">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100 mb-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
                            <span>Command Center &amp; Security Overview</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                            Welcome back, {user?.name || user?.email?.split('@')[0] || 'Member'} 👋
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1">
                            Create new short links, set custom aliases, and monitor your traffic metrics with zero-trust defense.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-mono border border-slate-800 shadow-xs">
                            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                            Zero-Trust Radar Active
                        </span>
                    </div>
                </div>

                {/* KPI Metrics Strip */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Links</div>
                        <div className="mt-2 flex items-baseline gap-2">
                            <span className="text-2xl sm:text-3xl font-black text-slate-900">{totalLinks}</span>
                            <span className="text-xs text-indigo-600 font-semibold">Active</span>
                        </div>
                    </div>
                    <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Clicks</div>
                        <div className="mt-2 flex items-baseline gap-2">
                            <span className="text-2xl sm:text-3xl font-black text-slate-900">{totalClicks}</span>
                            <span className="text-xs text-cyan-600 font-semibold">Engagements</span>
                        </div>
                    </div>
                    <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Verified Safe</div>
                        <div className="mt-2 flex items-baseline gap-2">
                            <span className="text-2xl sm:text-3xl font-black text-emerald-600">{safeCount}</span>
                            <span className="text-xs text-emerald-600 font-semibold">Clean</span>
                        </div>
                    </div>
                    <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Quarantined Threats</div>
                        <div className="mt-2 flex items-baseline gap-2">
                            <span className="text-2xl sm:text-3xl font-black text-rose-600">{quarantinedCount}</span>
                            <span className="text-xs text-rose-600 font-semibold">Isolated</span>
                        </div>
                    </div>
                </div>

                {/* Quick Link Shortener Widget */}
                <section className="flex flex-col items-center">
                    <div className="mb-3 flex items-center">
                        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Quick Shortener Studio</h2>
                    </div>
                    <div className="max-w-2xl w-full">
                        <ShortUrlFrom />
                    </div>
                </section>

                {/* Shortened Links & Analytics Section */}
                <section className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Links &amp; Threat Defense Registry</h2>
                    </div>
                    <ShortUrls />
                </section>
            </div>
        </main>
    );
};

export default Dashboard;
