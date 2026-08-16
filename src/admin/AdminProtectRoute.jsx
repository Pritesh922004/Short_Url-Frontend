import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import { AdminVerifyApi } from './admin.api';

const AdminProtectRoute = () => {
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const verifyAdmin = async () => {
            try {
                setLoading(true);
                const res = await AdminVerifyApi();
                if (isMounted) {
                    if (res && res.success && res.admin?.role === 'admin') {
                        setIsAdminAuthenticated(true);
                    } else {
                        setIsAdminAuthenticated(false);
                        localStorage.removeItem('adminToken');
                    }
                }
            } catch (error) {
                console.error("Admin verification error:", error);
                if (isMounted) {
                    setIsAdminAuthenticated(false);
                    localStorage.removeItem('adminToken');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        verifyAdmin();
        return () => {
            isMounted = false;
        };
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white">
                <div className="w-10 h-10 border-3 border-indigo-400/30 border-t-indigo-500 rounded-full animate-spin"></div>
                <p className="mt-4 text-xs font-semibold text-slate-400 tracking-wider uppercase">Authenticating Admin Session...</p>
            </div>
        );
    }

    return isAdminAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to="/admin/login" state={{ from: location }} replace />
    );
};

export default AdminProtectRoute;
