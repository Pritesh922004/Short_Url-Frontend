import React, { useState } from 'react';
import axios from '../config/axios_instans.js';
import { CreateShortUrl, FetchUrls } from '../API/CreateShortUrl.api.js';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUrls } from '../store/slice/Url.slice.js';

const ShortUrlFrom = () => {
    const [longUrl, setLongUrl] = useState('');
    const [customSlug, setCustomSlug] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Get authentication state from Redux
    const { isAuthenticated } = useSelector(state => state.Auth);
    const dispatch = useDispatch();

    const Handler = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            // Pass the custom slug if it's provided by an authenticated user
            const {data} = await CreateShortUrl(longUrl, customSlug);
            setShortUrl(data.ShortUrl);
            setCopied(false);

            if(isAuthenticated){
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
    }

    const handleCopy = async () => {
        if (shortUrl) {
            await navigator.clipboard.writeText(shortUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    }

    const resetForm = () => {
        setLongUrl('');
        setCustomSlug('');
        setShortUrl('');
        setError('');
    }

    return (
        <div className="w-full max-w-md mx-auto  px-4 py-8">
            <form onSubmit={Handler} className="flex flex-col gap-4 w-full">
                <div className="relative">
                    <input
                        type="url"
                        placeholder="Paste your long URL here"
                        value={longUrl}
                        required
                        onChange={(e) => setLongUrl(e.target.value)}
                        className="p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full transition-all duration-300 hover:shadow-md"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    {longUrl && (
                        <button
                            type="button"
                            onClick={() => setLongUrl('')}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>

                {/* Custom URL field - only shown to authenticated users */}
                {isAuthenticated && (
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Custom URL slug (optional)"
                            value={customSlug}
                            onChange={(e) => setCustomSlug(e.target.value)}
                            className="p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full transition-all duration-300 hover:shadow-md"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        {customSlug && (
                            <button
                                type="button"
                                onClick={() => setCustomSlug('')}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                >
                    {isLoading ? (
                        <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : "Shorten URL"}
                </button>
            </form>

            {error && (
                <div className="text-red-600 mt-4 text-center animate-pulse">{error}</div>
            )}

            {shortUrl && (
                <div className="mt-6 flex flex-col items-center gap-3 w-full animate-[fadeIn_0.5s_ease-in-out]">
                    <div className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                            <input
                                type="text"
                                value={shortUrl}
                                readOnly
                                className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none bg-white w-full overflow-x-auto"
                            />
                            <button
                                onClick={handleCopy}
                                type="button"
                                className={`px-4 py-3 ${copied ? 'bg-green-500' : 'bg-blue-500'} text-white rounded-lg hover:${copied ? 'bg-green-600' : 'bg-blue-600'} transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-2`}
                            >
                                {copied ? (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Copied!
                                    </>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                        </svg>
                                        Copy
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                    <button
                        onClick={resetForm}
                        className="text-blue-600 hover:text-blue-800 transition-colors duration-300 text-sm"
                    >
                        Shorten another URL
                    </button>
                </div>
            )}

            {!isAuthenticated && (
                <div className="mt-4 p-3 bg-blue-50 text-blue-700 rounded-lg text-sm">
                    <p className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>
                            <a href="/auth" className="font-medium underline">Sign in</a> to create custom URL slugs!
                        </span>
                    </p>
                </div>
            )}
        </div>
    );
};

export default ShortUrlFrom
