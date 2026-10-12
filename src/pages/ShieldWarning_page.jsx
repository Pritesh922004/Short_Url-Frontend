import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { FetchThreatAudit } from '../API/CreateShortUrl.api.js';
import SEO from '../components/SEO';

const ShieldWarning_page = () => {
    const { id } = useParams();
    const [audit, setAudit] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        const loadAudit = async () => {
            try {
                const data = await FetchThreatAudit(id);
                if (isMounted) {
                    setAudit(data);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err?.response?.data?.error || "Unable to retrieve link security audit report.");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        if (id) {
            loadAudit();
        }
        return () => {
            isMounted = false;
        };
    }, [id]);

    const handleProceed = () => {
        // Bypass the shield by hitting the redirect with override parameter
        window.location.href = `/r/${id}?override=true`;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-white cyber-grid">
                <SEO title="Zero-Trust Shield Active | LinkVault" description="Auditing destination security credentials." />
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-4 border-rose-500/20 border-t-rose-500 animate-spin"></div>
                    <div className="absolute inset-3 rounded-full border-4 border-amber-500/20 border-b-amber-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                </div>
                <h2 className="mt-6 text-sm font-bold uppercase tracking-widest text-rose-400 font-mono">Zero-Trust Shield Active</h2>
                <p className="mt-2 text-xs text-slate-400">Auditing destination security credentials...</p>
            </div>
        );
    }

    if (error || !audit) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-white text-center cyber-grid">
                <SEO title="Audit Unavailable | LinkVault" description="The requested link could not be audited." />
                <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-3xl mb-4 shadow-xl">
                    🔍
                </div>
                <h1 className="text-xl font-black text-white">Security Audit Unavailable</h1>
                <p className="text-xs text-slate-400 max-w-sm mt-2">{error || "The requested link could not be audited or does not exist."}</p>
                <Link to="/" className="mt-6 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-cyan-500/20">
                    Return to LinkVault Home
                </Link>
            </div>
        );
    }

    const threatScore = audit.threatScore || 0;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 cyber-grid relative overflow-hidden">
            <SEO title="⚠️ Malicious Destination Intercepted | LinkVault Shield" description="Zero-Trust quarantine warning for suspicious or phishing link." />

            {/* Ultra-Performance Hardware-Accelerated Security Glow */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full ambient-glow-rose"></div>
            </div>

            <main className="relative max-w-2xl w-full bg-slate-900 border border-rose-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 animate-fade-in z-10">
                {/* Header Banner */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-600 to-red-700 flex items-center justify-center text-white text-3xl shadow-xl shadow-rose-600/35 shrink-0">
                        🛡️
                    </div>
                    <div className="space-y-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-rose-950/80 text-rose-400 border border-rose-800/80 font-mono">
                            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                            <span>Threat Intercepted by LinkVault</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                            Malicious Destination Warning
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                            Our AI Zero-Trust threat engine blocked an automatic redirect because this destination displays characteristics of a <span className="text-rose-400 font-semibold">{audit.threatCategory}</span> attack.
                        </p>
                    </div>
                </div>

                {/* Threat Score Metric Card */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-4 text-center">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Threat Score</span>
                        <div className="mt-1 text-3xl font-black text-rose-400">{threatScore}<span className="text-sm font-semibold text-slate-500">/100</span></div>
                        <span className="text-[10px] text-rose-400/80 font-medium font-mono">Critical Risk Level</span>
                    </div>

                    <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-4 text-center">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Threat Type</span>
                        <div className="mt-1 text-base sm:text-lg font-bold text-amber-300 truncate">{audit.threatCategory || 'Phishing'}</div>
                        <span className="text-[10px] text-slate-400 font-medium">Classification</span>
                    </div>

                    <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-4 text-center">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Policy Action</span>
                        <div className="mt-1 text-base sm:text-lg font-bold text-rose-500 font-mono">Quarantined</div>
                        <span className="text-[10px] text-slate-400 font-medium">Navigation Blocked</span>
                    </div>
                </div>

                {/* Target URL Inspection Box */}
                <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Hidden Destination Target:</span>
                    <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-rose-300 break-all select-all flex items-center justify-between gap-2">
                        <span>{audit.destinationUrl}</span>
                    </div>
                </div>

                {/* Detected Threat Flags */}
                <div className="space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Forensic Threat Diagnostics:</span>
                    <div className="space-y-2">
                        {audit.threatDetails && audit.threatDetails.length > 0 ? (
                            audit.threatDetails.map((reason, idx) => (
                                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-rose-950/20 border border-rose-900/40 text-xs text-rose-200">
                                    <span className="text-rose-400 font-bold">⚠️</span>
                                    <span>{reason}</span>
                                </div>
                            ))
                        ) : (
                            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400">
                                Destination flagged by LinkVault zero-trust heuristic radar.
                            </div>
                        )}
                    </div>
                </div>

                {/* User Decisions */}
                <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <Link
                        to="/"
                        className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-600/30 transition-all text-center cursor-pointer active:scale-95"
                    >
                        ← Take Me to Safety (Recommended)
                    </Link>

                    <button
                        type="button"
                        onClick={handleProceed}
                        className="text-xs font-semibold text-slate-500 hover:text-slate-300 transition-colors underline underline-offset-4 cursor-pointer"
                    >
                        Proceed at My Own Risk
                    </button>
                </div>
            </main>
        </div>
    );
};

export default ShieldWarning_page;
