import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FetchUrls } from '../API/CreateShortUrl.api';
import { fetchUrls } from '../store/slice/Url.slice';
import { Link } from 'react-router';

const Analytics_page = () => {
    const { urls } = useSelector((state) => state.Urls);
    const { user } = useSelector((state) => state.Auth);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [copiedId, setCopiedId] = useState(null);
    const [copiedReport, setCopiedReport] = useState(false);

    useEffect(() => {
        const load = async () => {
            if (!urls?.data) {
                try {
                    setLoading(true);
                    const data = await FetchUrls();
                    dispatch(fetchUrls(data));
                } catch (err) {
                    console.error('Failed to fetch analytics:', err);
                } finally {
                    setLoading(false);
                }
            }
        };
        load();
    }, [dispatch, urls]);

    const rawList = urls?.data || [];
    const totalLinks = rawList.length;
    const totalClicks = rawList.reduce((sum, u) => sum + (u.Clicks || 0), 0);
    const avgClicks = totalLinks > 0 ? (totalClicks / totalLinks).toFixed(1) : 0;
    const maxClicks = rawList.length > 0 ? Math.max(...rawList.map(u => u.Clicks || 0), 1) : 1;

    const filtered = rawList.filter(u =>
        (u.Url || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (u.Short_Url || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedByClicks = [...rawList].sort((a, b) => (b.Clicks || 0) - (a.Clicks || 0));

    const handleCopy = async (text, id) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedId(id);
            setTimeout(() => setCopiedId(null), 2000);
        } catch (err) {
            console.error(err);
        }
    };

    const handleCopyReport = async () => {
        const report = `LinkVault Analytics Summary
Account: ${user?.name || user?.email || 'User'}
Total Shortened Links: ${totalLinks}
Total Clicks: ${totalClicks}
Average Clicks/Link: ${avgClicks}
Top URL: ${sortedByClicks[0]?.Short_Url || 'None'} (${sortedByClicks[0]?.Clicks || 0} clicks)
Generated: ${new Date().toLocaleString()}`;
        await navigator.clipboard.writeText(report);
        setCopiedReport(true);

        setTimeout(() => setCopiedReport(false), 2500);
    };

    const getFullShortUrl = (shortSlug) => {
        const origin = window.location.origin;
        return `${origin}/r/${shortSlug}`;
    };

    return (
        <div className="min-h-[calc(100vh-73px)] cyber-grid-light py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Ultra-Performance Hardware-Accelerated Ambient Beams */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[360px] pointer-events-none -z-10 overflow-hidden">
                <div className="absolute top-[-30px] left-1/4 w-[380px] h-[380px] rounded-full ambient-glow-indigo" />
                <div className="absolute top-[20px] right-1/4 w-[380px] h-[380px] rounded-full ambient-glow-cyan" />
            </div>

            <div className="max-w-7xl mx-auto space-y-8 animate-fade-in relative z-10">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200/80">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100 mb-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
                            <span>Real-Time Traffic &amp; Threat Intelligence</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                            URL Analytics &amp; Insights
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1">
                            Analyze click volumes, top performing aliases, and user engagement trends.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleCopyReport}
                            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 shadow-xs transition-colors cursor-pointer"
                        >
                            {copiedReport ? (
                                <>
                                    <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-emerald-700">Summary Copied!</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                    <span>Copy Summary Report</span>
                                </>
                            )}
                        </button>

                        <Link
                            to="/dashboard"
                            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-all"
                        >
                            <span>+ Shorten URL</span>
                        </Link>
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-slate-200 shadow-xs">
                        <div className="w-10 h-10 border-3 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                        <p className="mt-4 text-sm font-medium text-slate-500">Compiling click analytics...</p>
                    </div>
                ) : (
                    <>
                        {/* KPI Cards Grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total URLs</span>
                                <div className="mt-2 text-3xl font-extrabold text-slate-900">{totalLinks}</div>
                                <p className="mt-1 text-xs text-slate-500">Active custom slugs</p>
                            </div>

                            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Traffic</span>
                                <div className="mt-2 text-3xl font-extrabold text-indigo-600">{totalClicks}</div>
                                <p className="mt-1 text-xs text-slate-500">Total redirected clicks</p>
                            </div>

                            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Average CTR</span>
                                <div className="mt-2 text-3xl font-extrabold text-emerald-600">{avgClicks}</div>
                                <p className="mt-1 text-xs text-slate-500">Clicks per shortened link</p>
                            </div>

                            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Top Link Score</span>
                                <div className="mt-2 text-3xl font-extrabold text-amber-600">{sortedByClicks[0]?.Clicks || 0}</div>
                                <p className="mt-1 text-xs text-slate-500 truncate">
                                    {sortedByClicks[0]?.Short_Url ? `/${sortedByClicks[0].Short_Url}` : 'No links yet'}
                                </p>
                            </div>
                        </div>

                        {/* Visual Click Volume Breakdown Bar Chart */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-5">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <div>
                                    <h3 className="text-base font-bold text-slate-900">Traffic Distribution by Link</h3>
                                    <p className="text-xs text-slate-500">Comparison of clicks across your top shortened URLs</p>
                                </div>
                                <span className="text-xs font-medium text-slate-400">
                                    Showing top {Math.min(sortedByClicks.length, 6)} links
                                </span>
                            </div>

                            {sortedByClicks.length === 0 ? (
                                <div className="text-center py-10 text-slate-400 text-xs">
                                    No link data available. Shorten links to visualize traffic distribution.
                                </div>
                            ) : (
                                <div className="space-y-4 pt-2">
                                    {sortedByClicks.slice(0, 6).map((item) => {
                                        const percentage = totalClicks > 0 ? Math.round(((item.Clicks || 0) / totalClicks) * 100) : 0;
                                        const barWidth = Math.max(Math.round(((item.Clicks || 0) / maxClicks) * 100), 2);

                                        return (
                                            <div key={item._id} className="space-y-1.5">
                                                <div className="flex items-center justify-between text-xs">
                                                    <div className="flex items-center gap-2 font-medium text-slate-800">
                                                        <span className="font-semibold text-indigo-600">/{item.Short_Url}</span>
                                                        <span className="text-slate-400 hidden sm:inline truncate max-w-xs">
                                                            ({item.Url})
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <span className="font-bold text-slate-900">{item.Clicks || 0} clicks</span>
                                                        <span className="text-slate-400 font-mono text-[11px] w-10 text-right">{percentage}%</span>
                                                    </div>
                                                </div>

                                                {/* Animated Progress Bar */}
                                                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-blue-500 rounded-full transition-all duration-700 ease-out"
                                                        style={{ width: `${barWidth}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Detailed URLs Analytics Table */}
                        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                            <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                <div>
                                    <h3 className="text-base font-bold text-slate-900">All Shortened Links</h3>
                                    <p className="text-xs text-slate-500">Live click statistics for each link</p>
                                </div>
                                <div className="relative w-full sm:w-72">
                                    <input
                                        type="text"
                                        placeholder="Search URLs..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                    />
                                    <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>

                            {filtered.length === 0 ? (
                                <div className="text-center py-12 text-xs text-slate-500">
                                    No matching links found.
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-slate-100">
                                        <thead className="bg-slate-50/60">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Short Link</th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Destination</th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Clicks</th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Traffic Share</th>
                                                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 text-xs">
                                            {filtered.map((item) => {
                                                const fullUrl = getFullShortUrl(item.Short_Url);
                                                const isCopied = copiedId === item._id;
                                                const share = totalClicks > 0 ? Math.round(((item.Clicks || 0) / totalClicks) * 100) : 0;

                                                return (
                                                    <tr key={item._id} className="hover:bg-slate-50/70 transition-colors">
                                                        <td className="px-6 py-3.5 font-semibold text-indigo-600 whitespace-nowrap">
                                                            /{item.Short_Url}
                                                        </td>
                                                        <td className="px-6 py-3.5 text-slate-600 max-w-xs truncate" title={item.Url}>
                                                            {item.Url}
                                                        </td>
                                                        <td className="px-6 py-3.5 whitespace-nowrap">
                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-bold bg-indigo-50 text-indigo-700">
                                                                {item.Clicks || 0}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-3.5 whitespace-nowrap text-slate-500 font-mono">
                                                            {share}%
                                                        </td>
                                                        <td className="px-6 py-3.5 text-right whitespace-nowrap">
                                                            <div className="flex items-center justify-end gap-2">
                                                                <button
                                                                    onClick={() => handleCopy(fullUrl, item._id)}
                                                                    className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                                                                        isCopied ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                                                                    }`}
                                                                >
                                                                    {isCopied ? 'Copied' : 'Copy'}
                                                                </button>
                                                                <a
                                                                    href={fullUrl}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="p-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                                                                >
                                                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                                    </svg>
                                                                </a>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Analytics_page;
