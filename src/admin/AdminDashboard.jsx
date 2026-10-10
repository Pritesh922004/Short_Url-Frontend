import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, Link } from 'react-router';
import {
    AdminGetStatsApi,
    AdminGetUsersApi,
    AdminDeleteUserApi,
    AdminGetUrlsApi,
    AdminDeleteUrlApi,
    AdminLogoutApi
} from './admin.api';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'users' | 'urls'
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [urls, setUrls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [userSearchTerm, setUserSearchTerm] = useState('');
    const [qrModalUrl, setQrModalUrl] = useState(null);
    const [deleteModal, setDeleteModal] = useState(null); // { type: 'user' | 'url', id, name }
    const [copiedId, setCopiedId] = useState(null);
    const [toastMessage, setToastMessage] = useState(null);

    const navigate = useNavigate();

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const loadData = async () => {
        try {
            setLoading(true);
            const [statsRes, usersRes, urlsRes] = await Promise.all([
                AdminGetStatsApi(),
                AdminGetUsersApi(),
                AdminGetUrlsApi()
            ]);

            if (statsRes && statsRes.stats) setStats(statsRes.stats);
            if (usersRes && usersRes.users) setUsers(usersRes.users);
            if (urlsRes && urlsRes.urls) setUrls(urlsRes.urls);
        } catch (error) {
            console.error('Failed to load admin data:', error);
            showToast('Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLogout = async () => {
        await AdminLogoutApi();
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
    };

    const handleCopy = async (urlText, id) => {
        try {
            await navigator.clipboard.writeText(urlText);
            setCopiedId(id);
            setTimeout(() => setCopiedId(null), 2000);
            showToast('Link copied to clipboard');
        } catch (err) {
            console.error(err);
        }
    };

    const confirmDelete = async () => {
        if (!deleteModal) return;
        setActionLoading(true);
        try {
            if (deleteModal.type === 'user') {
                await AdminDeleteUserApi(deleteModal.id);
                showToast(`User ${deleteModal.name} deleted successfully`);
            } else if (deleteModal.type === 'url') {
                await AdminDeleteUrlApi(deleteModal.id);
                showToast('Short URL deleted successfully');
            }
            setDeleteModal(null);
            await loadData();
        } catch (error) {
            console.error('Delete error:', error);
            showToast(error?.response?.data?.error || 'Failed to delete item');
        } finally {
            setActionLoading(false);
        }
    };

    const backendDomain = (import.meta.env.VITE_Domain || 'http://localhost:3000/').trim();
    const getFullShortUrl = (slug) => {
        const base = backendDomain.endsWith('/') ? backendDomain : `${backendDomain}/`;
        return `${base}${slug}`;
    };

    // Filtered lists
    const filteredUrls = urls.filter((u) => {
        const query = searchTerm.toLowerCase();
        const shortMatch = (u.Short_Url || '').toLowerCase().includes(query);
        const longMatch = (u.Url || '').toLowerCase().includes(query);
        const userMatch = (u.User?.name || u.User?.email || 'Anonymous').toLowerCase().includes(query);
        return shortMatch || longMatch || userMatch;
    });

    const filteredUsers = users.filter((u) => {
        const query = userSearchTerm.toLowerCase();
        const nameMatch = (u.name || '').toLowerCase().includes(query);
        const emailMatch = (u.email || '').toLowerCase().includes(query);
        return nameMatch || emailMatch;
    });

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
            {/* Top Admin Navigation Bar */}
            <header className="sticky top-0 z-40 bg-slate-900/90  border-b border-slate-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-3">
                    <Link to="/" className="flex items-center gap-2.5 group">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-black tracking-tight text-white flex items-center gap-1.5">
                                LinkVault <span className="text-xs px-2 py-0.5 rounded-md bg-indigo-900/80 text-indigo-300 font-bold border border-indigo-700/60">Admin</span>
                            </span>
                        </div>
                    </Link>
                </div>

                {/* Tab Switcher Pills */}
                <div className="hidden md:flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            activeTab === 'overview'
                                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                                : 'text-slate-400 hover:text-white hover:bg-slate-900'
                        }`}
                    >
                        📊 Overview
                    </button>
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                            activeTab === 'users'
                                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                                : 'text-slate-400 hover:text-white hover:bg-slate-900'
                        }`}
                    >
                        👥 Users
                        <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-800 text-indigo-300 border border-slate-700">
                            {users.length}
                        </span>
                    </button>
                    <button
                        onClick={() => setActiveTab('urls')}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                            activeTab === 'urls'
                                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                                : 'text-slate-400 hover:text-white hover:bg-slate-900'
                        }`}
                    >
                        🔗 Short Links
                        <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-800 text-indigo-300 border border-slate-700">
                            {urls.length}
                        </span>
                    </button>
                </div>

                {/* Right Profile & Logout */}
                <div className="flex items-center gap-3">
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-slate-950 rounded-full border border-slate-800">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-xs font-mono text-slate-300">root@admin</span>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-800/60 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Sign Out</span>
                    </button>
                </div>
            </header>

            {/* Mobile Tab Switcher */}
            <div className="md:hidden flex items-center justify-around bg-slate-900 border-b border-slate-800 p-2 text-xs">
                <button
                    onClick={() => setActiveTab('overview')}
                    className={`py-1.5 px-3 rounded-lg font-bold ${activeTab === 'overview' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                >
                    Overview
                </button>
                <button
                    onClick={() => setActiveTab('users')}
                    className={`py-1.5 px-3 rounded-lg font-bold ${activeTab === 'users' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                >
                    Users ({users.length})
                </button>
                <button
                    onClick={() => setActiveTab('urls')}
                    className={`py-1.5 px-3 rounded-lg font-bold ${activeTab === 'urls' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                >
                    Links ({urls.length})
                </button>
            </div>

            {/* Main Content Area */}
            <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8 animate-fade-in">
                {loading ? (
                    <div className="flex flex-col items-center justify-center min-h-[400px]">
                        <div className="w-10 h-10 border-3 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
                        <p className="mt-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Loading System Metrics...</p>
                    </div>
                ) : (
                    <>
                        {/* ================= TAB 1: OVERVIEW ================= */}
                        {activeTab === 'overview' && (
                            <div className="space-y-8 animate-fade-in">
                                {/* Page Header */}
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-800/80">
                                    <div>
                                        <h1 className="text-2xl font-black tracking-tight text-white">System Overview</h1>
                                        <p className="text-xs text-slate-400 mt-1">Live metrics and platform performance across LinkVault</p>
                                    </div>
                                    <button
                                        onClick={loadData}
                                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-semibold text-slate-300 transition-colors cursor-pointer self-start sm:self-auto"
                                    >
                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                        <span>Refresh Stats</span>
                                    </button>
                                </div>

                                {/* KPI Cards Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                                    {/* Total Users */}
                                    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
                                        <div className="flex items-center justify-between text-slate-400 mb-3">
                                            <span className="text-xs font-bold uppercase tracking-wider">Total Users</span>
                                            <div className="w-8 h-8 rounded-lg bg-indigo-950 text-indigo-400 flex items-center justify-center">
                                                👥
                                            </div>
                                        </div>
                                        <div className="text-3xl font-black text-white">{stats?.totalUsers || 0}</div>
                                        <p className="text-[11px] text-slate-500 mt-1">Registered LinkVault accounts</p>
                                    </div>

                                    {/* Total Short URLs */}
                                    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
                                        <div className="flex items-center justify-between text-slate-400 mb-3">
                                            <span className="text-xs font-bold uppercase tracking-wider">Total Short Links</span>
                                            <div className="w-8 h-8 rounded-lg bg-blue-950 text-blue-400 flex items-center justify-center">
                                                🔗
                                            </div>
                                        </div>
                                        <div className="text-3xl font-black text-white">{stats?.totalUrls || 0}</div>
                                        <p className="text-[11px] text-slate-500 mt-1">Active redirects generated</p>
                                    </div>

                                    {/* Total Clicks */}
                                    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
                                        <div className="flex items-center justify-between text-slate-400 mb-3">
                                            <span className="text-xs font-bold uppercase tracking-wider">Total Clicks</span>
                                            <div className="w-8 h-8 rounded-lg bg-emerald-950 text-emerald-400 flex items-center justify-center">
                                                📈
                                            </div>
                                        </div>
                                        <div className="text-3xl font-black text-white">{stats?.totalClicks || 0}</div>
                                        <p className="text-[11px] text-slate-500 mt-1">Global click volume logged</p>
                                    </div>

                                    {/* Avg Clicks */}
                                    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
                                        <div className="flex items-center justify-between text-slate-400 mb-3">
                                            <span className="text-xs font-bold uppercase tracking-wider">Avg Clicks / Link</span>
                                            <div className="w-8 h-8 rounded-lg bg-purple-950 text-purple-400 flex items-center justify-center">
                                                ⚡
                                            </div>
                                        </div>
                                        <div className="text-3xl font-black text-white">
                                            {stats?.totalUrls ? (stats.totalClicks / stats.totalUrls).toFixed(1) : 0}
                                        </div>
                                        <p className="text-[11px] text-slate-500 mt-1">Average engagement per URL</p>
                                    </div>
                                </div>

                                {/* 2-Column Split: Top Performing Links & Recent Registrations */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    {/* Top Clicked Links */}
                                    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                                        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                                            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                                🏆 Top Performing Links
                                            </h3>
                                            <button
                                                onClick={() => setActiveTab('urls')}
                                                className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer"
                                            >
                                                View All &rarr;
                                            </button>
                                        </div>

                                        <div className="space-y-3">
                                            {stats?.topUrls && stats.topUrls.length > 0 ? (
                                                stats.topUrls.map((item) => (
                                                    <div
                                                        key={item._id}
                                                        className="p-3.5 bg-slate-950/70 border border-slate-800/80 rounded-xl flex items-center justify-between gap-3"
                                                    >
                                                        <div className="min-w-0 flex-1">
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-xs font-bold text-indigo-400 font-mono">
                                                                    /{item.Short_Url}
                                                                </span>
                                                                <span className="text-[11px] text-slate-500 truncate">
                                                                    &bull; {item.User?.name || 'Anonymous'}
                                                                </span>
                                                            </div>
                                                            <p className="text-xs text-slate-400 truncate mt-0.5" title={item.Url}>
                                                                {item.Url}
                                                            </p>
                                                        </div>
                                                        <div className="shrink-0 text-right">
                                                            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-950 text-indigo-300 border border-indigo-800/60">
                                                                {item.Clicks} clicks
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-xs text-slate-500 text-center py-6">No links logged yet.</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Recent User Registrations */}
                                    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                                        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                                            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                                🆕 Recent User Registrations
                                            </h3>
                                            <button
                                                onClick={() => setActiveTab('users')}
                                                className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer"
                                            >
                                                View All &rarr;
                                            </button>
                                        </div>

                                        <div className="space-y-3">
                                            {stats?.recentUsers && stats.recentUsers.length > 0 ? (
                                                stats.recentUsers.map((u) => (
                                                    <div
                                                        key={u._id}
                                                        className="p-3.5 bg-slate-950/70 border border-slate-800/80 rounded-xl flex items-center justify-between gap-3"
                                                    >
                                                        <div className="flex items-center gap-3 min-w-0">
                                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                                                                {u.name ? u.name.charAt(0).toUpperCase() : 'U'}
                                                            </div>
                                                            <div className="min-w-0">
                                                                <p className="text-xs font-bold text-white truncate">{u.name}</p>
                                                                <p className="text-[11px] text-slate-400 truncate">{u.email}</p>
                                                            </div>
                                                        </div>
                                                        <div className="text-[11px] text-slate-500 shrink-0">
                                                            {new Date(u.createdAt).toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-xs text-slate-500 text-center py-6">No users found.</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ================= TAB 2: REGISTERED USERS ================= */}
                        {activeTab === 'users' && (
                            <div className="space-y-6 animate-fade-in">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-800">
                                    <div>
                                        <h1 className="text-2xl font-black text-white tracking-tight">Registered Users</h1>
                                        <p className="text-xs text-slate-400 mt-1">Manage user accounts and view individual performance</p>
                                    </div>

                                    {/* User Search Input */}
                                    <div className="relative w-full sm:w-72">
                                        <input
                                            type="text"
                                            value={userSearchTerm}
                                            onChange={(e) => setUserSearchTerm(e.target.value)}
                                            placeholder="Search by name or email..."
                                            className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-500"
                                        />
                                        <svg className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Users Table */}
                                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left text-xs">
                                            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                                                <tr>
                                                    <th className="py-3.5 px-4">User</th>
                                                    <th className="py-3.5 px-4">Total Links</th>
                                                    <th className="py-3.5 px-4">Total Clicks</th>
                                                    <th className="py-3.5 px-4">Joined Date</th>
                                                    <th className="py-3.5 px-4 text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-800/60 text-slate-300">
                                                {filteredUsers.length > 0 ? (
                                                    filteredUsers.map((u) => (
                                                        <tr key={u._id} className="hover:bg-slate-800/40 transition-colors">
                                                            <td className="py-3.5 px-4">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-blue-600 text-white font-bold text-xs flex items-center justify-center">
                                                                        {u.name ? u.name.charAt(0).toUpperCase() : 'U'}
                                                                    </div>
                                                                    <div>
                                                                        <div className="font-bold text-white">{u.name}</div>
                                                                        <div className="text-[11px] text-slate-400">{u.email}</div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="py-3.5 px-4 font-mono font-semibold">
                                                                {u.totalLinks || 0}
                                                            </td>
                                                            <td className="py-3.5 px-4">
                                                                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                                                                    {u.totalClicks || 0} clicks
                                                                </span>
                                                            </td>
                                                            <td className="py-3.5 px-4 text-slate-400">
                                                                {new Date(u.createdAt).toLocaleDateString('en-US', {
                                                                    year: 'numeric',
                                                                    month: 'short',
                                                                    day: 'numeric'
                                                                })}
                                                            </td>
                                                            <td className="py-3.5 px-4 text-right">
                                                                <button
                                                                    onClick={() =>
                                                                        setDeleteModal({
                                                                            type: 'user',
                                                                            id: u._id,
                                                                            name: u.name || u.email
                                                                        })
                                                                    }
                                                                    className="px-3 py-1 rounded-lg text-xs font-semibold bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-800/60 transition-colors cursor-pointer"
                                                                >
                                                                    Delete User
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="5" className="py-8 text-center text-slate-500">
                                                            No users found matching your search.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ================= TAB 3: ALL SHORT LINKS ================= */}
                        {activeTab === 'urls' && (
                            <div className="space-y-6 animate-fade-in">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-800">
                                    <div>
                                        <h1 className="text-2xl font-black text-white tracking-tight">All Short Links</h1>
                                        <p className="text-xs text-slate-400 mt-1">Global platform links registry with click counters and controls</p>
                                    </div>

                                    {/* URL Search Input */}
                                    <div className="relative w-full sm:w-80">
                                        <input
                                            type="text"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            placeholder="Search by alias, destination, user..."
                                            className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-500"
                                        />
                                        <svg className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                </div>

                                {/* URLs Table */}
                                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left text-xs">
                                            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                                                <tr>
                                                    <th className="py-3.5 px-4">Short Link</th>
                                                    <th className="py-3.5 px-4">Destination Target</th>
                                                    <th className="py-3.5 px-4">Creator</th>
                                                    <th className="py-3.5 px-4">Clicks</th>
                                                    <th className="py-3.5 px-4">Created</th>
                                                    <th className="py-3.5 px-4 text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-800/60 text-slate-300">
                                                {filteredUrls.length > 0 ? (
                                                    filteredUrls.map((item) => {
                                                        const fullUrl = getFullShortUrl(item.Short_Url);
                                                        return (
                                                            <tr key={item._id} className="hover:bg-slate-800/40 transition-colors">
                                                                <td className="py-3.5 px-4 font-mono font-bold text-indigo-400">
                                                                    <div className="flex items-center gap-2">
                                                                        <a
                                                                            href={fullUrl}
                                                                            target="_blank"
                                                                            rel="noreferrer"
                                                                            className="hover:underline truncate max-w-[140px]"
                                                                        >
                                                                            /{item.Short_Url}
                                                                        </a>
                                                                        <button
                                                                            onClick={() => handleCopy(fullUrl, item._id)}
                                                                            className="p-1 text-slate-500 hover:text-white transition-colors cursor-pointer"
                                                                            title="Copy Short URL"
                                                                        >
                                                                            {copiedId === item._id ? (
                                                                                <span className="text-emerald-400 font-sans text-[10px]">✓</span>
                                                                            ) : (
                                                                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                                                </svg>
                                                                            )}
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                                <td className="py-3.5 px-4">
                                                                    <a
                                                                        href={item.Url}
                                                                        target="_blank"
                                                                        rel="noreferrer"
                                                                        className="text-slate-400 hover:text-slate-200 truncate max-w-[200px] block"
                                                                        title={item.Url}
                                                                    >
                                                                        {item.Url}
                                                                    </a>
                                                                </td>
                                                                <td className="py-3.5 px-4">
                                                                    {item.User ? (
                                                                        <div>
                                                                            <span className="font-semibold text-white">{item.User.name}</span>
                                                                            <span className="text-[10px] text-slate-500 block truncate max-w-[120px]">
                                                                                {item.User.email}
                                                                            </span>
                                                                        </div>
                                                                    ) : (
                                                                        <span className="text-slate-500 italic text-[11px]">Guest / Anonymous</span>
                                                                    )}
                                                                </td>
                                                                <td className="py-3.5 px-4">
                                                                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-950 text-indigo-300 border border-indigo-800/50">
                                                                        {item.Clicks}
                                                                    </span>
                                                                </td>
                                                                <td className="py-3.5 px-4 text-slate-400">
                                                                    {new Date(item.createdAt).toLocaleDateString()}
                                                                </td>
                                                                <td className="py-3.5 px-4 text-right">
                                                                    <div className="flex items-center justify-end gap-2">
                                                                        <button
                                                                            onClick={() => setQrModalUrl(fullUrl)}
                                                                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                                                                            title="View QR Code"
                                                                        >
                                                                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                                                            </svg>
                                                                        </button>
                                                                        <button
                                                                            onClick={() =>
                                                                                setDeleteModal({
                                                                                    type: 'url',
                                                                                    id: item._id,
                                                                                    name: item.Short_Url
                                                                                })
                                                                            }
                                                                            className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-800/60 transition-colors cursor-pointer"
                                                                            title="Delete Short URL"
                                                                        >
                                                                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                            </svg>
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })
                                                ) : (
                                                    <tr>
                                                        <td colSpan="6" className="py-8 text-center text-slate-500">
                                                            No short links found matching your query.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </main>

            {/* QR Code Modal */}
            {qrModalUrl && createPortal(
                <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl animate-fade-in">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                            <h3 className="text-sm font-bold text-white">QR Code Preview</h3>
                            <button
                                onClick={() => setQrModalUrl(null)}
                                className="text-slate-400 hover:text-white p-1 cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="p-3 bg-white rounded-2xl inline-block shadow-inner">
                            <img
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(qrModalUrl)}`}
                                alt="QR Code"
                                className="w-44 h-44 mx-auto"
                            />
                        </div>
                        <p className="text-xs font-mono text-indigo-400 break-all">{qrModalUrl}</p>
                        <button
                            onClick={() => setQrModalUrl(null)}
                            className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-xs transition-colors cursor-pointer"
                        >
                            Close
                        </button>
                    </div>
                </div>,
                document.body
            )}

            {/* Delete Confirmation Modal */}
            {deleteModal && createPortal(
                <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full text-left space-y-4 shadow-2xl animate-fade-in">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-red-950 text-red-400 border border-red-800/80 flex items-center justify-center shrink-0">
                                ⚠️
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-white">Confirm Deletion</h3>
                                <p className="text-xs text-slate-400 mt-1">
                                    Are you sure you want to delete this {deleteModal.type === 'user' ? 'user account' : 'short URL'}?
                                    {deleteModal.type === 'user' && (
                                        <span className="block text-red-400 mt-1 font-semibold">
                                            Warning: This will permanently remove the user and cascade delete ALL short links created by them.
                                        </span>
                                    )}
                                </p>
                            </div>
                        </div>

                        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 truncate">
                            Item: <span className="font-bold text-white">{deleteModal.name}</span>
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-2">
                            <button
                                onClick={() => setDeleteModal(null)}
                                disabled={actionLoading}
                                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                disabled={actionLoading}
                                className="px-4 py-2 rounded-xl text-xs font-semibold bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-600/30 transition-colors flex items-center gap-1.5 cursor-pointer"
                            >
                                {actionLoading ? 'Deleting...' : 'Confirm Delete'}
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}

            {/* Toast Notification */}
            {toastMessage && (
                <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-indigo-500/60 text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-2xl flex items-center gap-2 animate-fade-in">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></span>
                    <span>{toastMessage}</span>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
