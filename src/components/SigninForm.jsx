import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { SignIn } from '../API/User.api.js';
import { useDispatch } from 'react-redux';
import { login } from '../store/slice/Auth.Slice.js';

const SigninForm = ({ state }) => {
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        if (!Email.trim()) {
            newErrors.Email = 'Email is required';
        } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(Email)) {
            newErrors.Email = 'Please enter a valid email address';
        }

        if (!Password) {
            newErrors.Password = 'Password is required';
        } else if (Password.length < 6) {
            newErrors.Password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;
        setIsLoading(true);

        try {
            const { data } = await SignIn(Email, Password);
            if (data?.token) {
                localStorage.setItem('token', data.token);
            }
            dispatch(login(data.user));
            navigate('/dashboard');

        } catch (error) {
            console.log(error?.response?.data?.error);
            setErrors({
                general: error?.response?.data?.error || 'Failed to sign in. Please check your credentials.'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/70 border border-slate-200/80 p-8 sm:p-10 animate-fade-in backdrop-blur-sm">
                {/* Header */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-700 bg-clip-text text-transparent">
                            LinkVault
                        </span>

                    </Link>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900">Welcome Back</h2>
                    <p className="text-xs text-slate-500 mt-1.5">Sign in to manage your shortened URLs and analytics</p>
                </div>

                {/* Error Banner */}
                {errors.general && (
                    <div className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-start gap-2.5 animate-fade-in">
                        <svg className="w-4 h-4 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span className="font-medium">{errors.general}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email */}
                    <div className="space-y-1.5">
                        <label htmlFor="Email" className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                            Email Address
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" />
                                </svg>
                            </div>
                            <input
                                id="Email"
                                name="Email"
                                type="email"
                                value={Email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`block w-full pl-10 pr-3.5 py-3 bg-slate-50/70 hover:bg-slate-50 border ${
                                    errors.Email ? 'border-red-400 focus:ring-red-200' : 'border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500'
                                } rounded-xl text-sm placeholder-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 transition-all`}
                                placeholder="you@example.com"
                            />
                        </div>
                        {errors.Email && (
                            <p className="text-xs text-red-600 font-medium animate-fade-in">{errors.Email}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                            <label htmlFor="Password" className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                                Password
                            </label>
                            <button
                                type="button"
                                onClick={() => state('forgot')}
                                className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold transition-colors cursor-pointer"
                            >
                                Forgot password?
                            </button>
                        </div>
                        <div className="relative">

                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <input
                                id="Password"
                                name="Password"
                                type={showPassword ? 'text' : 'password'}
                                value={Password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`block w-full pl-10 pr-10 py-3 bg-slate-50/70 hover:bg-slate-50 border ${
                                    errors.Password ? 'border-red-400 focus:ring-red-200' : 'border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500'
                                } rounded-xl text-sm placeholder-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 transition-all`}
                                placeholder="••••••••"
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
                        {errors.Password && (
                            <p className="text-xs text-red-600 font-medium animate-fade-in">{errors.Password}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full mt-2 py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold rounded-xl text-sm shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-200 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2 cursor-pointer"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Signing In...</span>
                            </>
                        ) : (
                            <span>Sign In</span>
                        )}
                    </button>
                </form>

                {/* Footer Switch */}
                <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                    <p className="text-xs text-slate-500">
                        Don't have an account?{' '}
                        <button
                            type="button"
                            onClick={() => state('signup')}
                            className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors cursor-pointer"
                        >
                            Sign Up for free
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SigninForm;