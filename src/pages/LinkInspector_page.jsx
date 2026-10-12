import React, { useState, useTransition } from 'react';
import { InspectUrlApi } from '../API/CreateShortUrl.api.js';
import SEO from '../components/SEO';

const LinkInspector_page = () => {
    const [urlInput, setUrlInput] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const [report, setReport] = useState(null);
    const [error, setError] = useState(null);
    const [, startTransition] = useTransition();

    const handleInspect = async (urlToTest) => {
        const target = (urlToTest || urlInput).trim();
        if (!target) {
            setError("Please enter a URL to inspect.");
            return;
        }

        setError(null);
        setIsScanning(true);

        try {
            const data = await InspectUrlApi(target);
            startTransition(() => {
                setReport(data);
            });
        } catch (err) {
            setError(err?.response?.data?.error || "Failed to complete threat inspection. Please try again.");
        } finally {
            setIsScanning(false);
        }
    };

    const handlePreset = (sampleUrl) => {
        setUrlInput(sampleUrl);
        handleInspect(sampleUrl);
    };

    const getScoreColor = (score) => {
        if (score >= 65) return 'text-rose-400 border-rose-500/50 bg-rose-950/40';
        if (score >= 30) return 'text-amber-400 border-amber-500/50 bg-amber-950/40';
        return 'text-emerald-400 border-emerald-500/50 bg-emerald-950/40';
    };

    const getBadgeStyle = (verdict) => {
        if (verdict === 'DANGEROUS') return 'bg-rose-950 text-rose-300 border-rose-800';
        if (verdict === 'SUSPICIOUS') return 'bg-amber-950 text-amber-300 border-amber-800';
        return 'bg-emerald-950 text-emerald-300 border-emerald-800';
    };

    return (
        <div className="min-h-[calc(100vh-73px)] bg-slate-950 text-slate-100 py-10 sm:py-14 px-4 sm:px-6 lg:px-8 cyber-grid relative overflow-hidden">
            <SEO title="Link Inspector | Zero-Trust Threat Evaluation Sandbox" description="Inspect any link for phishing, brand typosquatting, and malware risks in real time." />

            {/* Ambient Cyber Beam Accents */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[320px] pointer-events-none -z-10">
                <div className="absolute top-[-30px] left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px]" />
                <div className="absolute top-[20px] right-1/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-4xl mx-auto space-y-8 animate-fade-in relative z-10">
                {/* Page Hero */}
                <div className="text-center space-y-3">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-900 text-cyan-300 border border-slate-800 mb-1 shadow-md">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                        <span className="font-mono text-[11px] uppercase tracking-wider">Zero-Trust Threat Radar Engine</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                        Public Link Threat Inspector
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Analyze any external destination in real time. LinkVault evaluates brand impersonation, protocol integrity, TLD abuse metrics, and AI contextual deception vectors.
                    </p>
                </div>

                {/* Input Card */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl backdrop-blur-xl space-y-4">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleInspect();
                        }}
                        className="flex flex-col sm:flex-row gap-3"
                    >
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Paste destination URL (e.g. https://example.com/login)..."
                                value={urlInput}
                                onChange={(e) => setUrlInput(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl px-4 py-3.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors font-mono"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isScanning}
                            className="px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-white font-bold rounded-2xl text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer shrink-0 active:scale-95"
                        >
                            {isScanning ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                    <span>Auditing...</span>
                                </>
                            ) : (
                                <>
                                    <span>🔍 Inspect Link</span>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Quick Viva Demonstration Presets */}
                    <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
                        <span className="text-slate-400 font-semibold text-[11px]">Examiner Test Cases:</span>
                        <button
                            type="button"
                            onClick={() => handlePreset('https://github.com/torvalds/linux')}
                            className="px-3 py-1 rounded-xl bg-slate-950 hover:bg-slate-800 text-emerald-400 border border-emerald-900/50 hover:border-emerald-500/50 text-[11px] font-semibold transition-colors cursor-pointer"
                        >
                            ✓ Clean Link (GitHub)
                        </button>
                        <button
                            type="button"
                            onClick={() => handlePreset('http://paypal-security-verification.xyz/login?account=verify')}
                            className="px-3 py-1 rounded-xl bg-slate-950 hover:bg-slate-800 text-rose-400 border border-rose-900/50 hover:border-rose-500/50 text-[11px] font-semibold transition-colors cursor-pointer"
                        >
                            ✗ Phishing Spoof (PayPal)
                        </button>
                        <button
                            type="button"
                            onClick={() => handlePreset('http://192.168.1.100/admin/reset-password')}
                            className="px-3 py-1 rounded-xl bg-slate-950 hover:bg-slate-800 text-amber-400 border border-amber-900/50 hover:border-amber-500/50 text-[11px] font-semibold transition-colors cursor-pointer"
                        >
                            ⚠ IP Host Deception
                        </button>
                    </div>

                    {error && (
                        <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-800/80 text-rose-300 text-xs flex items-center gap-2 animate-fade-in">
                            <span>⚠️</span>
                            <span>{error}</span>
                        </div>
                    )}
                </div>

                {/* Audit Results Report Card */}
                {report && (
                    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl backdrop-blur-xl space-y-6 animate-fade-in">
                        {/* Header Details */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Destination Inspected</span>
                                <h3 className="font-mono text-xs sm:text-sm text-cyan-300 break-all font-bold">{report.targetUrl}</h3>
                            </div>
                            <div className="shrink-0">
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase border ${getBadgeStyle(report.verdict)}`}>
                                    <span>{report.verdict === 'DANGEROUS' ? '🚨' : report.verdict === 'SUSPICIOUS' ? '⚠️' : '✅'}</span>
                                    <span>Verdict: {report.verdict}</span>
                                </span>
                            </div>
                        </div>

                        {/* Metrics Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className={`p-4 rounded-2xl border text-center ${getScoreColor(report.threatScore)}`}>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Threat Score</span>
                                <div className="mt-1 text-3xl font-black">{report.threatScore}<span className="text-xs font-normal text-slate-400">/100</span></div>
                                <span className="text-[10px] font-medium">Calculated Risk Index</span>
                            </div>

                            <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950 text-center">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Classification</span>
                                <div className="mt-1 text-base sm:text-lg font-bold text-white truncate">{report.threatCategory}</div>
                                <span className="text-[10px] text-slate-500 font-medium">Threat Category</span>
                            </div>

                            <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950 text-center">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Gateway Policy</span>
                                <div className={`mt-1 text-base sm:text-lg font-bold ${report.isQuarantined ? 'text-rose-400' : 'text-emerald-400'}`}>
                                    {report.isQuarantined ? 'Quarantine Shield' : 'Verified Pass'}
                                </div>
                                <span className="text-[10px] text-slate-500 font-medium">Routing Action</span>
                            </div>
                        </div>

                        {/* Reasons Breakdown */}
                        <div className="space-y-3 pt-2">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Forensic Diagnostics:</h4>
                            <div className="space-y-2">
                                {report.threatDetails && report.threatDetails.length > 0 ? (
                                    report.threatDetails.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className={`flex items-start gap-3 p-3 rounded-xl border text-xs ${
                                                report.threatScore >= 65
                                                    ? 'bg-rose-950/20 border-rose-900/50 text-rose-200'
                                                    : report.threatScore >= 30
                                                    ? 'bg-amber-950/20 border-amber-900/50 text-amber-200'
                                                    : 'bg-emerald-950/20 border-emerald-900/50 text-emerald-200'
                                            }`}
                                        >
                                            <span className="font-bold">
                                                {report.threatScore >= 65 ? '🔴' : report.threatScore >= 30 ? '🟡' : '🟢'}
                                            </span>
                                            <span className="leading-relaxed">{item}</span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-xs text-slate-500">No anomaly flags triggered.</p>
                                )}
                            </div>
                        </div>

                        {/* Audit Timestamp */}
                        <div className="pt-2 border-t border-slate-800/80 text-right text-[11px] text-slate-500 font-mono">
                            Inspected on: {new Date(report.scannedAt).toLocaleString()}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LinkInspector_page;
