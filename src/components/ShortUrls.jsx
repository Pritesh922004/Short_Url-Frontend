import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUrls } from '../store/slice/Url.slice';
import { FetchUrls, DeleteUrl } from '../API/CreateShortUrl.api';

const ShortUrls = () => {
  const { urls } = useSelector((state) => state.Urls);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [qrModalUrl, setQrModalUrl] = useState(null);
  const [auditModalItem, setAuditModalItem] = useState(null);

  // Fetch URLs on component mount
  useEffect(() => {
    const loadUrls = async () => {
      try {
        setLoading(true);
        const data = await FetchUrls();
        dispatch(fetchUrls(data));
      } catch (err) {
        setError('Failed to load your URLs. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadUrls();
  }, [dispatch]);

  // Handle copy to clipboard
  const handleCopy = async (url, id) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  // Handle URL deletion with confirmation
  const handleDelete = async (id) => {
    try {
      setDeleteLoading(true);
      await DeleteUrl(id);
      // Refresh the URLs list
      const data = await FetchUrls();
      dispatch(fetchUrls(data));
    } catch (err) {
      setError('Failed to delete URL. Please try again.');
      console.error(err);
    } finally {
      setDeleteLoading(false);
      setDeleteConfirm(null);
    }
  };

  // Filter and sort URLs
  const rawList = urls?.data || [];
  const filteredUrls = rawList.filter(url =>
    (url.Url || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (url.Short_Url || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUrls = [...filteredUrls].sort((a, b) => {
    if (sortBy === 'clicks') {
      return sortOrder === 'asc' ? (a.Clicks || 0) - (b.Clicks || 0) : (b.Clicks || 0) - (a.Clicks || 0);
    } else if (sortBy === 'createdAt') {
      return sortOrder === 'asc'
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      // Sort by short URL
      return sortOrder === 'asc'
        ? (a.Short_Url || '').localeCompare(b.Short_Url || '')
        : (b.Short_Url || '').localeCompare(a.Short_Url || '');
    }
  });

  // Analytics KPIs
  const totalLinks = rawList.length;
  const totalClicks = rawList.reduce((sum, item) => sum + (item.Clicks || 0), 0);
  const topLink = rawList.length > 0
    ? [...rawList].sort((a, b) => (b.Clicks || 0) - (a.Clicks || 0))[0]
    : null;
  const avgClicks = totalLinks > 0 ? (totalClicks / totalLinks).toFixed(1) : 0;

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Truncate long URLs for display
  const truncateUrl = (url, maxLength = 45) => {
    if (!url) return '';
    if (url.length <= maxLength) return url;
    return url.substring(0, maxLength) + '...';
  };

  const getFullShortUrl = (shortSlug) => {
    const origin = window.location.origin;
    return `${origin}/r/${shortSlug}`;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="w-10 h-10 border-3 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-sm font-medium text-slate-500">Loading your links & analytics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 flex items-start gap-3 my-4">
        <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <div>
          <h4 className="text-sm font-semibold">Error Loading Links</h4>
          <p className="text-xs text-red-600 mt-0.5">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Analytics KPI Overview */}
      {rawList.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Links</span>
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
            </div>
            <div className="mt-2 text-2xl font-bold text-slate-900">{totalLinks}</div>
            <p className="mt-1 text-xs text-slate-500">Active shortened links</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Clicks</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
            </div>
            <div className="mt-2 text-2xl font-bold text-slate-900">{totalClicks}</div>
            <p className="mt-1 text-xs text-slate-500">Across all destinations</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Top Performer</span>
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
            <div className="mt-2 text-2xl font-bold text-slate-900">{topLink?.Clicks || 0} <span className="text-sm font-normal text-slate-500">clicks</span></div>
            <p className="mt-1 text-xs text-slate-500 truncate" title={topLink?.Short_Url ? getFullShortUrl(topLink.Short_Url) : ''}>
              {topLink?.Short_Url ? `/${topLink.Short_Url}` : 'None'}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Avg Clicks / Link</span>
              <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <div className="mt-2 text-2xl font-bold text-slate-900">{avgClicks}</div>
            <p className="mt-1 text-xs text-slate-500">Average engagement</p>
          </div>
        </div>
      )}

      {/* Main Table / Links Container */}
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 overflow-hidden">
        {/* Header Toolbar */}
        <div className="p-4 sm:p-5 border-b border-slate-200/80 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by destination URL or short alias..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-9 pr-8 py-2 text-sm bg-white border border-slate-200 rounded-xl placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            <label htmlFor="sort" className="text-xs font-semibold text-slate-500 whitespace-nowrap">Sort:</label>
            <select
              id="sort"
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [newSortBy, newSortOrder] = e.target.value.split('-');
                setSortBy(newSortBy);
                setSortOrder(newSortOrder);
              }}
              className="text-xs font-medium bg-white px-3 py-2 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer text-slate-700"
            >
              <option value="createdAt-desc">Newest First</option>
              <option value="createdAt-asc">Oldest First</option>
              <option value="clicks-desc">Most Clicks</option>
              <option value="clicks-asc">Least Clicks</option>
              <option value="shortUrl-asc">Alias (A-Z)</option>
              <option value="shortUrl-desc">Alias (Z-A)</option>
            </select>
          </div>
        </div>

        {/* Empty State */}
        {rawList.length === 0 ? (
          <div className="text-center py-16 px-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-slate-900">No links created yet</h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto mt-1">
              Shorten your first destination URL using the form above to start tracking clicks in real-time.
            </p>
          </div>
        ) : filteredUrls.length === 0 ? (
          <div className="text-center py-12 px-4">
            <p className="text-sm font-medium text-slate-600">No URLs match "{searchTerm}"</p>
            <button
              onClick={() => setSearchTerm('')}
              className="mt-2 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
            >
              Clear search query
            </button>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50/80">
                  <tr>
                    <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Short Link
                    </th>
                    <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Original URL
                    </th>
                    <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Security
                    </th>
                    <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Clicks
                    </th>
                    <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Created Date
                    </th>
                    <th scope="col" className="px-6 py-3.5 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100">
                  {sortedUrls.map((url) => {
                    const fullShortUrl = getFullShortUrl(url.Short_Url);
                    const isCopied = copiedId === url._id;

                    return (
                      <tr key={url._id} className="hover:bg-slate-50/70 transition-colors group">
                        {/* Short URL */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
                              /{url.Short_Url}
                            </span>
                            <button
                              onClick={() => handleCopy(fullShortUrl, url._id)}
                              className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                                isCopied ? 'bg-emerald-100 text-emerald-700' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                              }`}
                              title={isCopied ? 'Copied!' : 'Copy to clipboard'}
                            >
                              {isCopied ? (
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              ) : (
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                </svg>
                              )}
                            </button>
                          </div>
                        </td>

                        {/* Original URL */}
                        <td className="px-6 py-4 text-sm text-slate-500 max-w-xs">
                          <div className="truncate flex items-center gap-1.5" title={url.Url}>
                            <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            <span className="truncate">{url.Url}</span>
                          </div>
                        </td>

                        {/* Security Threat Status */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          {url.threatScore >= 65 || url.isQuarantined ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-100 text-red-700 border border-red-200" title={`Threat Score: ${url.threatScore}/100`}>
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                              <span>Quarantined</span>
                            </span>
                          ) : url.threatScore >= 30 ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-800 border border-amber-200" title={`Threat Score: ${url.threatScore}/100`}>
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                              <span>Suspicious</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200" title="Zero Threats Detected">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                              <span>Verified Safe</span>
                            </span>
                          )}
                        </td>

                        {/* Clicks */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">
                            {url.Clicks || 0} clicks
                          </span>
                        </td>

                        {/* Created Date */}
                        <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500 font-medium">
                          {formatDate(url.createdAt)}
                        </td>

                        {/* Action buttons */}
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* Security Audit Trigger */}
                            <button
                              onClick={() => setAuditModalItem(url)}
                              className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                              title="View AI Threat Audit"
                            >
                              <span className="text-xs">🛡️</span>
                            </button>

                            {/* QR Modal Trigger */}
                            <button
                              onClick={() => setQrModalUrl(fullShortUrl)}
                              className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                              title="Show QR Code"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                              </svg>
                            </button>

                            {/* Open in new tab */}
                            <a
                              href={fullShortUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Open link"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>

                            {/* Delete button */}
                            <button
                              onClick={() => setDeleteConfirm(url._id)}
                              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                              title="Delete short URL"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards View */}
            <div className="md:hidden divide-y divide-slate-100">
              {sortedUrls.map((url) => {
                const fullShortUrl = getFullShortUrl(url.Short_Url);
                const isCopied = copiedId === url._id;

                return (
                  <div key={url._id} className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-sm text-indigo-600">
                        /{url.Short_Url}
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">
                        {url.Clicks || 0} clicks
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <div className="text-slate-500 truncate max-w-[200px]" title={url.Url}>
                        {truncateUrl(url.Url, 32)}
                      </div>
                      {url.threatScore >= 65 || url.isQuarantined ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-700">
                          🚨 Quarantined
                        </span>
                      ) : url.threatScore >= 30 ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-800">
                          ⚠️ Suspicious
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                          🛡️ Safe
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-1 text-xs text-slate-400">
                      <span>{formatDate(url.createdAt)}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setAuditModalItem(url)}
                          className="p-1 bg-slate-100 text-slate-700 rounded-md text-xs cursor-pointer"
                          title="Security Threat Audit"
                        >
                          🛡️
                        </button>
                        <button
                          onClick={() => handleCopy(fullShortUrl, url._id)}
                          className={`px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                            isCopied ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {isCopied ? 'Copied' : 'Copy'}
                        </button>
                        <button
                          onClick={() => setQrModalUrl(fullShortUrl)}
                          className="p-1 bg-slate-100 text-slate-700 rounded-md"
                          title="QR Code"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                          </svg>
                        </button>
                        <a
                          href={fullShortUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 bg-slate-100 text-slate-700 rounded-md"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                        <button
                          onClick={() => setDeleteConfirm(url._id)}
                          className="p-1 bg-red-50 text-red-600 rounded-md"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* QR Code Popup Modal */}
      {qrModalUrl && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
            onClick={() => setQrModalUrl(null)}
          ></div>
          <div className="relative bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 animate-fade-in text-center z-10">
            <button
              onClick={() => setQrModalUrl(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-base font-bold text-slate-900 mb-1">QR Code</h3>
            <p className="text-xs text-slate-500 mb-4 truncate">{qrModalUrl}</p>

            <div className="inline-block p-3 bg-white rounded-xl shadow-xs border border-slate-200">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrModalUrl)}`}
                alt="QR Code"
                className="w-48 h-48 mx-auto rounded-lg"
              />
            </div>

            <p className="text-xs text-slate-400 mt-4">Scan with your smartphone camera to visit link</p>

            <div className="mt-5 flex gap-2">
              <button
                onClick={async () => {
                  await navigator.clipboard.writeText(qrModalUrl);
                  alert('Short link copied to clipboard!');
                }}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors cursor-pointer"
              >
                Copy Link
              </button>
              <button
                onClick={() => setQrModalUrl(null)}
                className="py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
            onClick={() => !deleteLoading && setDeleteConfirm(null)}
          ></div>
          <div className="relative bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-fade-in z-10">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-slate-900">Delete Shortened Link</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Are you sure you want to delete this shortened URL? Anyone visiting this link will no longer be redirected.
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirm(null)}
                disabled={deleteLoading}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors disabled:opacity-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteConfirm)}
                disabled={deleteLoading}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-red-600 hover:bg-red-700 shadow-sm shadow-red-500/20 transition-all disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
              >
                {deleteLoading ? (
                  <>
                    <svg className="animate-spin h-3.5 w-3.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Deleting...</span>
                  </>
                ) : (
                  'Delete Link'
                )}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Security Threat Audit Modal */}
      {auditModalItem && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setAuditModalItem(null)}
          ></div>
          <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 animate-fade-in z-10 space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xl">🛡️</span>
                <h3 className="text-base font-bold text-slate-900">Security Threat Audit</h3>
              </div>
              <button
                onClick={() => setAuditModalItem(null)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Target URL */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Destination</span>
              <p className="text-xs font-mono text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200 break-all select-all">
                {auditModalItem.Url}
              </p>
            </div>

            {/* Score & Verdict Banner */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className={`p-3 rounded-2xl border ${
                auditModalItem.threatScore >= 65 ? 'bg-red-50 border-red-200 text-red-700' :
                auditModalItem.threatScore >= 30 ? 'bg-amber-50 border-amber-200 text-amber-700' :
                'bg-emerald-50 border-emerald-200 text-emerald-700'
              }`}>
                <span className="text-[10px] uppercase font-bold tracking-wider opacity-75">Threat Score</span>
                <div className="text-2xl font-black mt-0.5">{auditModalItem.threatScore || 0}<span className="text-xs font-normal">/100</span></div>
              </div>

              <div className="p-3 rounded-2xl border border-slate-200 bg-slate-50 text-slate-800">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Category</span>
                <div className="text-sm font-bold mt-1 truncate">{auditModalItem.threatCategory || 'Safe'}</div>
              </div>

              <div className="p-3 rounded-2xl border border-slate-200 bg-slate-50 text-slate-800">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Policy</span>
                <div className={`text-sm font-bold mt-1 ${auditModalItem.isQuarantined ? 'text-red-600' : 'text-emerald-600'}`}>
                  {auditModalItem.isQuarantined ? 'Quarantined' : 'Clean'}
                </div>
              </div>
            </div>

            {/* Threat Details */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Security Findings</span>
              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                {auditModalItem.threatDetails && auditModalItem.threatDetails.length > 0 ? (
                  auditModalItem.threatDetails.map((flag, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-2 rounded-xl bg-slate-50 text-xs text-slate-700 border border-slate-100">
                      <span>{auditModalItem.threatScore >= 65 ? '🔴' : auditModalItem.threatScore >= 30 ? '🟡' : '🟢'}</span>
                      <span className="leading-relaxed">{flag}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-500">Verified legitimate domain. No anomaly flags detected.</p>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setAuditModalItem(null)}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
              >
                Close Audit
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default ShortUrls;
