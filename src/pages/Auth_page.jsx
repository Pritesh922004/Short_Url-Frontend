import React, { useState } from 'react';
import SigninForm from '../components/SigninForm';
import SignupForm from '../components/SignupForm';

const Auth_page = () => {
    const [login, setLogin] = useState(true);

    return (
        <main className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-slate-50 via-indigo-50/20 to-slate-100/60 relative overflow-hidden">
            {/* Subtle background glow effect */}
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none"></div>

            <div className="w-full relative z-10">
                {login ? <SigninForm state={setLogin} /> : <SignupForm state={setLogin} />}
            </div>
        </main>
    );
};

export default Auth_page;