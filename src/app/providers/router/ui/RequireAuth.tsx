import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { getUserAuthData, getUserRoles, UserRole } from '@/entities/User';

import { getRouteForbidden, getRouteMain } from '@/shared/const/router';

interface RequireAuthProps {
    children: JSX.Element
    roles?: UserRole[]
}
export function RequireAuth({ children, roles }:RequireAuthProps) {
    const location = useLocation();
    const auth = useSelector(getUserAuthData);
    const userRoles = useSelector(getUserRoles);

    const hasAccessToAdminPanel = useMemo(() => {
        if (!roles) return true;

        return roles?.some((role) => {
            return userRoles?.includes(role);
        });
    }, [roles, userRoles]);

    if (!auth) {
        return <Navigate to={getRouteMain()} state={{ from: location }} replace />;
    }
    if (!hasAccessToAdminPanel) {
        return <Navigate to={getRouteForbidden()} state={{ from: location }} replace />;
    }

    return children;
}
