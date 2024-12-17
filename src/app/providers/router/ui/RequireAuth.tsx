import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserAuthData, getUserRoles } from 'entities/User';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { UserRole } from 'entities/User/model/types/userSchema';
import { useMemo } from 'react';

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
        return <Navigate to={RoutePath.main} state={{ from: location }} replace />;
    }
    if (!hasAccessToAdminPanel) {
        return <Navigate to={RoutePath.forbidden} state={{ from: location }} replace />;
    }

    return children;
}
