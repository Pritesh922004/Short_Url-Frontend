import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/slice/Auth.Slice';
import { VerifyUser } from '../API/User.api';
import { FetchUrls } from '../API/CreateShortUrl.api';
import { fetchUrls } from '../store/slice/Url.slice';

const ProtectedRoutes = () => {
    const { isAuthenticated } = useSelector((state) => state.Auth);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                setLoading(true);

                const response = await VerifyUser();

                if (response && response.user) {
                    dispatch(login(response.user));
                }

                const { data } = await FetchUrls();
                dispatch(fetchUrls(data));

            } catch (error) {
                console.error("Authentication error:", error);
            } finally {
                setLoading(false);
            }
        };
        verifyAuth();
    }, [dispatch]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
                <div className="w-10 h-10 border-3 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                <p className="mt-4 text-xs font-medium text-slate-500">Authenticating session...</p>
            </div>
        );
    }

    return isAuthenticated ?
        <Outlet /> :
        <Navigate to="/auth" state={{ from: location }} replace />;
};

export default ProtectedRoutes;