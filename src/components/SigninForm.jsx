import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import axios from '../config/axios_instans.js';
import { SignIn } from '../API/User.api.js';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/slice/Auth.Slice.js';

const SigninForm = ({ state }) => {
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    // const auth = useSelector((state) => state.Auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        if (!Email.trim()) {
            newErrors.Email = 'Email is required';
        } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Email)) {
            newErrors.Email = 'Please enter a valid Email';
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
            dispatch(login(data.user));
            navigate('/dashboard');
            setFormSubmitted(true);
        } catch (error) {
            console.log(
                error.response.data.error
            );
            setErrors({
                general: error.response.data.error
            });
        } finally {
            setIsLoading(false);
        }

    };

    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="w-full max-w-md p-6 sm:p-8 bg-white rounded-xl shadow-lg animate-[fadeIn_0.5s_ease-in-out] border-2 border-gray-200 ">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sing In Your Account</h2>

                {errors.general && (
                    <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 animate-pulse">
                        {errors.general}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5 ">

                    <div className="space-y-2">
                        <label htmlFor="Email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <input
                                id="Email"
                                name="Email"
                                type="Email"
                                value={Email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`block w-full pl-10 pr-3 py-2.5 border ${errors.Email ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
                                placeholder="you@example.com"
                            />
                        </div>
                        {errors.Email && (
                            <p className="mt-1 text-sm text-red-600 animate-[fadeIn_0.3s_ease-in-out]">{errors.Email}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="Password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <input
                                id="Password"
                                name="Password"
                                type={showPassword ? "text" : "Password"}
                                value={Password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`block w-full pl-10 pr-10 py-2.5 border ${errors.Password ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <svg className="h-5 w-5 text-gray-500 hover:text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                    </svg>
                                ) : (
                                    <svg className="h-5 w-5 text-gray-500 hover:text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        {errors.Password && (
                            <p className="mt-1 text-sm text-red-600 animate-[fadeIn_0.3s_ease-in-out]">{errors.Password}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                SignIng...
                            </>
                        ) : (
                            "Sign In"
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <span onClick={() => state(false)} className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-300 cursor-pointer select-none">
                            Sign Up
                        </span>
                    </p>
                </div>
            </div>
            {/* {formSubmitted && (
                navigate('/')
            )} */}
        </div>
    );
};

export default SigninForm;