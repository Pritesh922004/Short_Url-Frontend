import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import { useSelector } from 'react-redux';

const ProtectedRoutes = () => {
    const { isAuthenticated } = useSelector((state) => state.Auth);
    const location = useLocation();

    return isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to="/auth" state={{ from: location }} replace />
    );
};

export default ProtectedRoutes;