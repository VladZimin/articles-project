import { Route, Routes } from 'react-router-dom';
import { Suspense, useCallback } from 'react';
import { AppRouteProps, routeConfig } from 'shared/config/routeConfig/routeConfig';
import { PageLoader } from 'widgets/PageLoader';
import { RequireAuth } from './RequireAuth';

export const AppRouter = () => {
    const renderWithWrapper = useCallback(({
        path, element, authOnly, roles,
    }: AppRouteProps) => {
        const el = (
            <Suspense fallback={<PageLoader />}>
                {element}
            </Suspense>
        );
        return (
            <Route
                key={path}
                path={path}
                element={authOnly ? <RequireAuth roles={roles}>{el}</RequireAuth> : el}
            />
        );
    }, []);

    return (
        <Routes>
            {routeConfig.map(renderWithWrapper)}
        </Routes>
    );
};
