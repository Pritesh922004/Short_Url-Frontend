import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { SendOtpApi, VerifyOtpApi, ResetPasswordApi } from '../API/User.api.js';

const ForgotPassword = ({ state }) => {
    const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password, 4: Success
    const [email, setEmail] = useState('');
    const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const [error, setError] = useState('');
    const [infoMessage, setInfoMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [resendCooldown, setResendCooldown] = useState(0);

    // Refs for 6-box OTP inputs
    const otpInputRefs = useRef([]);

    // Resend countdown timer
    useEffect(() => {
        let timer;
        if (resendCooldown > 0) {
            timer = setInterval(() => {
                setResendCooldown((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [resendCooldown]);

    // Focus first OTP input when step 2 opens
    useEffect(() => {
        if (step === 2 && otpInputRefs.current[0]) {
            setTimeout(() => {
                otpInputRefs.current[0]?.focus();
            }, 100);
        }
    }, [step]);

    // Handle OTP Box Input Change
    const handleOtpChange = (index, value) => {
        // Handle multi-character paste or typed character
        const sanitized = value.replace(/\D/g, '');
        if (!sanitized) {
            const newDigits = [...otpDigits];
            newDigits[index] = '';
            setOtpDigits(newDigits);
            return;
        }

        if (sanitized.length > 1) {
            // Pasted multiple digits
            const pastedArray = sanitized.slice(0, 6).split('');
            const newDigits = [...otpDigits];
            pastedArray.forEach((char, i) => {
                if (i < 6) newDigits[i] = char;
            });
            setOtpDigits(newDigits);
            const nextIndex = Math.min(pastedArray.length, 5);
            otpInputRefs.current[nextIndex]?.focus();
            return;
        }

        const newDigits = [...otpDigits];
        newDigits[index] = sanitized;
        setOtpDigits(newDigits);

        // Auto-advance to next input box
        if (sanitized && index < 5) {
            otpInputRefs.current[index + 1]?.focus();
        }
    };

    // Handle OTP Box Keydown (Backspace, Arrows)
    const handleOtpKeyDown = (index, e) => {
        if (e.key === 'Backspace') {
            if (!otpDigits[index] && index > 0) {
                otpInputRefs.current[index - 1]?.focus();
            }
        } else if (e.key === 'ArrowLeft' && index > 0) {
            otpInputRefs.current[index - 1]?.focus();
        } else if (e.key === 'ArrowRight' && index < 5) {
            otpInputRefs.current[index + 1]?.focus();
        }
    };

    // Handle OTP Paste event explicitly
    const handleOtpPaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        if (!pasteData) return;

        const newDigits = [...otpDigits];
        for (let i = 0; i < 6; i++) {
            newDigits[i] = pasteData[i] || '';
        }
        setOtpDigits(newDigits);
        const nextIndex = Math.min(pasteData.length, 5);
        otpInputRefs.current[nextIndex]?.focus();
    };

    // Combined OTP string
    const currentOtp = otpDigits.join('');

    // Step 1: Send OTP
    const handleSendOtp = async (e) => {
        if (e) e.preventDefault();
        setError('');
        setInfoMessage('');

        const cleanedEmail = email.trim();
        if (!cleanedEmail) {
            setError('Please enter your email address');
            return;
        }

        if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(cleanedEmail)) {
            setError('Please enter a valid email address');
            return;
        }

        setIsLoading(true);
        try {
            const res = await SendOtpApi(cleanedEmail);
            setInfoMessage(res.data?.message || 'Verification code sent to your email.');
            setStep(2);
            setResendCooldown(60);
            setOtpDigits(['', '', '', '', '', '']);
        } catch (err) {
            console.error('Send OTP error:', err);
            setError(err?.response?.data?.error || 'Failed to send verification code. Please check your email.');
        } finally {
            setIsLoading(false);
        }
    };

    // Step 1.5: Resend OTP
    const handleResendOtp = async () => {
        if (resendCooldown > 0 || isLoading) return;
        setError('');
        setInfoMessage('');
        setIsLoading(true);

        try {
            const res = await SendOtpApi(email.trim());
            setInfoMessage(res.data?.message || 'A fresh verification code has been sent!');
            setResendCooldown(60);
            setOtpDigits(['', '', '', '', '', '']);
            otpInputRefs.current[0]?.focus();
        } catch (err) {
            console.error('Resend OTP error:', err);
            setError(err?.response?.data?.error || 'Failed to resend code. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Step 2: Verify OTP
    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError('');
        setInfoMessage('');

        if (currentOtp.length !== 6) {
            setError('Please enter the complete 6-digit verification code');
            return;
        }

        setIsLoading(true);
        try {
            await VerifyOtpApi(email.trim(), currentOtp);
            setError('');
            setStep(3);
        } catch (err) {
            console.error('Verify OTP error:', err);
            setError(err?.response?.data?.error || 'Invalid or expired verification code');
        } finally {
            setIsLoading(false);
        }
    };

    // Step 3: Reset Password
    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError('');
        setInfoMessage('');

        if (!newPassword || newPassword.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);
        try {
            await ResetPasswordApi(email.trim(), currentOtp, newPassword);
            setStep(4);
        } catch (err) {
            console.error('Reset password error:', err);
            setError(err?.response?.data?.error || 'Failed to reset password. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Password strength calculation
    const getPasswordStrength = () => {
        if (!newPassword) return { score: 0, text: '', color: '' };
        let score = 0;
        if (newPassword.length >= 6) score += 1;
        if (newPassword.length >= 10) score += 1;
        if (/[0-9]/.test(newPassword)) score += 1;
        if (/[^A-Za-z0-9]/.test(newPassword)) score += 1;

        if (score <= 1) return { score: 1, text: 'Weak', color: 'bg-red-500' };
        if (score === 2 || score === 3) return { score: 2, text: 'Medium', color: 'bg-amber-500' };
        return { score: 3, text: 'Strong', color: 'bg-emerald-500' };
    };

    const strength = getPasswordStrength();

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/70 border border-slate-200/80 p-8 sm:p-10 animate-fade-in backdrop-blur-sm">
                
                {/* Brand Logo Header */}
                <div className="text-center mb-6">
                    <Link to="/" className="inline-flex items-center gap-2 mb-3 group">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-700 bg-clip-text text-transparent">
                            LinkVault
                        </span>
                    </Link>

                    {/* Step Icon Badge */}
                    <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-indigo-50 to-blue-50 border border-indigo-100/80 flex items-center justify-center mb-2 shadow-xs">
                        {step === 1 && (
                            <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        )}
                        {step === 2 && (
                            <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        )}
                        {step === 3 && (
                            <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                            </svg>
                        )}
                        {step === 4 && (
                            <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        )}
                    </div>

                    <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                        {step === 1 && 'Reset Password'}
                        {step === 2 && 'Enter 6-Digit OTP'}
                        {step === 3 && 'Create New Password'}
                        {step === 4 && 'Password Reset!'}
                    </h2>
                    <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                        {step === 1 && 'Enter your registered email to receive a 6-digit verification code.'}
                        {step === 2 && (
                            <span>
                                We sent a 6-digit code to <strong className="text-slate-700 font-semibold">{email}</strong>
                            </span>
                        )}
                        {step === 3 && 'Choose a strong password with at least 6 characters.'}
                        {step === 4 && 'Your password has been reset successfully.'}
                    </p>

                    {/* Step Breadcrumb Dots */}
                    {step < 4 && (
                        <div className="flex items-center justify-center gap-1.5 mt-4">
                            {[1, 2, 3].map((s) => (
                                <div
                                    key={s}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${
                                        s === step
                                            ? 'w-7 bg-indigo-600'
                                            : s < step
                                            ? 'w-3 bg-emerald-500'
                                            : 'w-3 bg-slate-200'
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Error Banner */}
                {error && (
                    <div className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-start gap-2.5 animate-fade-in">
                        <svg className="w-4 h-4 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span className="font-medium">{error}</span>
                    </div>
                )}

                {/* Info / Success Banner */}
                {infoMessage && (
                    <div className="mb-5 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl flex items-start gap-2.5 animate-fade-in">
                        <svg className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium">{infoMessage}</span>
                    </div>
                )}

                {/* ================= STEP 1: ENTER EMAIL ================= */}
                {step === 1 && (
                    <form onSubmit={handleSendOtp} className="space-y-4 animate-fade-in">
                        <div className="space-y-1.5">
                            <label htmlFor="forgot-email" className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                                Registered Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" />
                                    </svg>
                                </div>
                                <input
                                    id="forgot-email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    required
                                    autoFocus
                                    className="block w-full pl-10 pr-3.5 py-3 bg-slate-50/70 hover:bg-slate-50 border border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500 rounded-xl text-sm placeholder-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 transition-all"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || !email.trim()}
                            className="w-full mt-2 py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold rounded-xl text-sm shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-200 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2 cursor-pointer"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Sending Verification Code...</span>
                                </>
                            ) : (
                                <span>Send Verification Code &rarr;</span>
                            )}
                        </button>
                    </form>
                )}

                {/* ================= STEP 2: ENTER OTP ================= */}
                {step === 2 && (
                    <form onSubmit={handleVerifyOtp} className="space-y-5 animate-fade-in">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                                    6-Digit Verification Code
                                </label>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setStep(1);
                                        setError('');
                                        setInfoMessage('');
                                    }}
                                    className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer transition-colors"
                                >
                                    Change email
                                </button>
                            </div>

                            {/* 6-box Segmented OTP Input */}
                            <div className="flex justify-between items-center gap-2 sm:gap-2.5" onPaste={handleOtpPaste}>
                                {otpDigits.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={(el) => (otpInputRefs.current[index] = el)}
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        maxLength="1"
                                        value={digit}
                                        onChange={(e) => handleOtpChange(index, e.target.value)}
                                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                        className={`w-11 sm:w-12 h-13 text-center font-mono font-bold text-xl sm:text-2xl rounded-xl border bg-slate-50/70 hover:bg-slate-50 transition-all focus:bg-white focus:outline-hidden focus:ring-2 ${
                                            digit
                                                ? 'border-indigo-500 ring-2 ring-indigo-500/20 bg-indigo-50/30 text-indigo-900'
                                                : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 text-slate-800'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || currentOtp.length !== 6}
                            className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold rounded-xl text-sm shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-200 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2 cursor-pointer"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Verifying Code...</span>
                                </>
                            ) : (
                                <span>Verify Code & Continue &rarr;</span>
                            )}
                        </button>

                        {/* Resend OTP Button & Cooldown */}
                        <div className="text-center pt-1">
                            {resendCooldown > 0 ? (
                                <p className="text-xs text-slate-500 font-medium">
                                    Resend code in <span className="font-bold text-indigo-600">{resendCooldown}s</span>
                                </p>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleResendOtp}
                                    disabled={isLoading}
                                    className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer hover:underline transition-colors"
                                >
                                    Didn't receive code? Resend OTP
                                </button>
                            )}
                        </div>
                    </form>
                )}

                {/* ================= STEP 3: RESET PASSWORD ================= */}
                {step === 3 && (
                    <form onSubmit={handleResetPassword} className="space-y-4 animate-fade-in">
                        {/* New Password */}
                        <div className="space-y-1.5">
                            <label htmlFor="new-password" className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                                New Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <input
                                    id="new-password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    autoFocus
                                    className="block w-full pl-10 pr-10 py-3 bg-slate-50/70 hover:bg-slate-50 border border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500 rounded-xl text-sm placeholder-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 transition-all"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label="Toggle password visibility"
                                >
                                    {showPassword ? (
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>

                            {/* Password Strength Indicator */}
                            {newPassword && (
                                <div className="space-y-1 pt-1 animate-fade-in">
                                    <div className="flex items-center justify-between text-[11px]">
                                        <span className="text-slate-500 font-medium">Strength:</span>
                                        <span className={`font-semibold ${
                                            strength.score === 1 ? 'text-red-600' : strength.score === 2 ? 'text-amber-600' : 'text-emerald-600'
                                        }`}>
                                            {strength.text}
                                        </span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex gap-1">
                                        <div className={`h-full transition-all duration-300 rounded-full flex-1 ${strength.score >= 1 ? strength.color : 'bg-transparent'}`} />
                                        <div className={`h-full transition-all duration-300 rounded-full flex-1 ${strength.score >= 2 ? strength.color : 'bg-transparent'}`} />
                                        <div className={`h-full transition-all duration-300 rounded-full flex-1 ${strength.score >= 3 ? strength.color : 'bg-transparent'}`} />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-1.5">
                            <label htmlFor="confirm-password" className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                                Confirm New Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <input
                                    id="confirm-password"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    className={`block w-full pl-10 pr-10 py-3 bg-slate-50/70 hover:bg-slate-50 border ${
                                        confirmPassword && newPassword !== confirmPassword
                                            ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                                            : confirmPassword && newPassword === confirmPassword
                                            ? 'border-emerald-300 focus:border-emerald-500 focus:ring-emerald-200'
                                            : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20'
                                    } rounded-xl text-sm placeholder-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 transition-all`}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    aria-label="Toggle confirm password visibility"
                                >
                                    {showConfirmPassword ? (
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {confirmPassword && newPassword !== confirmPassword && (
                                <p className="text-xs text-red-600 font-medium animate-fade-in">Passwords do not match</p>
                            )}
                            {confirmPassword && newPassword === confirmPassword && (
                                <p className="text-xs text-emerald-600 font-medium animate-fade-in flex items-center gap-1">
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Passwords match</span>
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || !newPassword || newPassword.length < 6 || newPassword !== confirmPassword}
                            className="w-full mt-2 py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold rounded-xl text-sm shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-200 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2 cursor-pointer"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Updating Password...</span>
                                </>
                            ) : (
                                <span>Reset Password &rarr;</span>
                            )}
                        </button>
                    </form>
                )}

                {/* ================= STEP 4: SUCCESS ================= */}
                {step === 4 && (
                    <div className="text-center space-y-5 animate-fade-in py-2">
                        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto border border-emerald-200 shadow-sm animate-bounce-short">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-1.5">All Set!</h3>
                            <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                                Your account password has been successfully updated. You can now sign in with your new password.
                            </p>
                        </div>
                        <button
                            onClick={() => state('signin')}
                            className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold rounded-xl text-sm shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/30 transition-all cursor-pointer flex items-center justify-center gap-2"
                        >
                            <span>Sign In with New Password &rarr;</span>
                        </button>
                    </div>
                )}

                {/* Footer Switch - Back to Sign In */}
                {step < 4 && (
                    <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                        <p className="text-xs text-slate-500">
                            Remember your password?{' '}
                            <button
                                type="button"
                                onClick={() => state('signin')}
                                className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors cursor-pointer"
                            >
                                Sign In
                            </button>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
