import React, { useState } from 'react';
import { CreateShortUrl, FetchUrls } from '../API/CreateShortUrl.api.js';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUrls } from '../store/slice/Url.slice.js';
import { Link } from 'react-router';

const ShortUrlFrom = () => {
    const [longUrl, setLongUrl] = useState('');
    const [customSlug, setCustomSlug] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showQR, setShowQR] = useState(false);
    const [threatInfo, setThreatInfo] = useState(null);

    // Get authentication state from Redux
    const { isAuthenticated } = useSelector(state => state.Auth);
    const dispatch = useDispatch();

    const Handler = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            // Pass the custom slug if it's provided by an authenticated user
            const { data } = await CreateShortUrl(longUrl, customSlug);
            setShortUrl(data.ShortUrl);
            setThreatInfo({
                score: data.threatScore ?? 0,
                category: data.threatCategory ?? 'Safe',
                quarantined: Boolean(data.isQuarantined)
            });
            setCopied(false);
            setShowQR(false);

            if (isAuthenticated) {
                const UrlData = await FetchUrls();
                dispatch(fetchUrls(UrlData));
            }
            
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setError(error.response.data.error);
            } else {
                setError('Failed to shorten URL. Please try again.');
            }
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = async () => {
        if (shortUrl) {
            await navigator.clipboard.writeText(shortUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const resetForm = () => {
        setLongUrl('');
        setCustomSlug('');
        setShortUrl('');
        setThreatInfo(null);
        setError('');
        setShowQR(false);
    };

    const qrCodeUrl = shortUrl
        ? `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(shortUrl)}`
        : '';

    return (
        <div className="w-full">
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/80 p-6 sm:p-8  transition-all">
                <form onSubmit={Handler} className="flex flex-col gap-4">
                    {/* Destination URL Input */}
                    <div className="space-y-1.5">
                        <label htmlFor="destination-url" className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Destination URL
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                </svg>
                            </div>
                            <input
                                id="destination-url"
                                type="url"
                                placeholder="https://example.com/very-long-url-to-shorten"
                                value={longUrl}
                                required
                                onChange={(e) => setLongUrl(e.target.value)}
                                className="w-full pl-11 pr-10 py-3.5 bg-slate-50/70 hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm placeholder-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
                            />
                            {longUrl && (
                                <button
                                    type="button"
                                    onClick={() => setLongUrl('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/60 transition-colors"
                                    aria-label="Clear input"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Custom URL Alias (Authenticated Users) */}
                    {isAuthenticated && (
                        <div className="space-y-1.5 animate-fade-in">
                            <div className="flex items-center justify-between">
                                <label htmlFor="custom-slug" className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Custom Alias <span className="font-normal normal-case text-slate-400">(Optional)</span>
                                </label>
                                <span className="text-xs text-indigo-600 font-medium">Pro Feature</span>
                            </div>
                            <div className="relative flex rounded-xl shadow-xs">
                                <span className="inline-flex items-center px-3.5 rounded-l-xl border border-r-0 border-slate-200 bg-slate-100/70 text-slate-500 text-xs sm:text-sm font-mono">
                                    link/
                                </span>
                                <input
                                    id="custom-slug"
                                    type="text"
                                    placeholder="my-custom-slug"
                                    value={customSlug}
                                    onChange={(e) => setCustomSlug(e.target.value)}
                                    className="flex-1 min-w-0 block w-full px-3.5 py-3 bg-slate-50/70 hover:bg-slate-50 border border-slate-200 rounded-r-xl text-slate-900 text-sm placeholder-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
                                />
                                {customSlug && (
                                    <button
                                        type="button"
                                        onClick={() => setCustomSlug('')}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/60 transition-colors"
                                        aria-label="Clear custom slug"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="mt-2 w-full py-3.5 px-5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/30 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 flex justify-center items-center gap-2 cursor-pointer"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Shortening Link...</span>
                            </>
                        ) : (
                            <>
                                <span>Shorten URL</span>
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </>
                        )}
                    </button>
                </form>

                {/* Error Banner */}
                {error && (
                    <div className="mt-4 p-3.5 bg-red-50/90 border border-red-200 text-red-700 rounded-xl text-sm flex items-start gap-2.5 animate-fade-in">
                        <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <div className="flex-1 font-medium">{error}</div>
                    </div>
                )}

                {/* Success / Result Section */}
                {shortUrl && (
                    <div className="mt-6 pt-6 border-t border-slate-200/80 animate-fade-in space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                                    Ready to Share
                                </span>
                                {threatInfo && (
                                    threatInfo.quarantined ? (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-100 text-red-700 border border-red-200">
                                            🚨 Threat Quarantined ({threatInfo.score}/100)
                                        </span>
                                    ) : threatInfo.score >= 30 ? (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                                            ⚠️ Suspicious ({threatInfo.score}/100)
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                                            🛡️ AI Verified Safe
                                        </span>
                                    )
                                )}
                            </div>
                            <button
                                onClick={resetForm}
                                className="text-xs font-medium text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer"
                            >
                                + Shorten another link
                            </button>
                        </div>

                        {/* Short URL Box */}
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                            <div className="flex-1 min-w-0 px-2 py-1">
                                <div className="text-xs text-slate-400 font-medium truncate">Shortened URL</div>
                                <a
                                    href={shortUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 hover:underline truncate block"
                                >
                                    {shortUrl}
                                </a>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                                <button
                                    onClick={handleCopy}
                                    type="button"
                                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${
                                        copied
                                            ? 'bg-emerald-600 text-white'
                                            : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                                    }`}
                                >
                                    {copied ? (
                                        <>
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span>Copied!</span>
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                            </svg>
                                            <span>Copy</span>
                                        </>
                                    )}
                                </button>

                                <button
                                    onClick={() => setShowQR(!showQR)}
                                    type="button"
                                    className={`p-2 rounded-lg text-xs border transition-colors cursor-pointer ${
                                        showQR
                                            ? 'bg-indigo-50 border-indigo-300 text-indigo-600'
                                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                                    }`}
                                    title="View QR Code"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                    </svg>
                                </button>

                                <a
                                    href={shortUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-lg text-xs bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
                                    title="Open link in new tab"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* QR Code Drawer */}
                        {showQR && (
                            <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/80 text-center animate-fade-in">
                                <p className="text-xs font-semibold text-slate-600 mb-2">Scan QR Code</p>
                                <div className="inline-block p-2 bg-white rounded-xl shadow-xs border border-slate-200">
                                    <img
                                        src={qrCodeUrl}
                                        alt="QR Code"
                                        className="w-36 h-36 mx-auto rounded-lg"
                                        loading="lazy"
                                    />
                                </div>
                                <p className="text-[11px] text-slate-400 mt-2">Scan with camera to open shortened link</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Sign-in Promotion for Unauthenticated Users */}
                {!isAuthenticated && (
                    <div className="mt-5 p-3.5 bg-indigo-50/70 border border-indigo-100 rounded-xl text-xs text-indigo-900 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                            <span>Want custom slugs & detailed click analytics?</span>
                        </div>
                        <Link
                            to="/auth"
                            className="font-semibold text-indigo-700 hover:text-indigo-900 underline whitespace-nowrap shrink-0"
                        >
                            Sign In &rarr;
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShortUrlFrom;

