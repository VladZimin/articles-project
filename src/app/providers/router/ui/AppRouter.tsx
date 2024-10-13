import { Route, Routes } from 'react-router-dom';
import { Suspense, useCallback } from 'react';
import { AppRouteProps, routeConfig } from 'shared/config/routeConfig/routeConfig';
import { PageLoader } from 'widgets/PageLoader';
import { RequireAuth } from 'app/providers/router';

export const AppRouter = () => {
    const renderWithWrapper = useCallback(({ path, element, authOnly }: AppRouteProps) => {
        const el = (
            <Suspense fallback={<PageLoader />}>
                {element}
            </Suspense>
        );
        return (
            <Route
                key={path}
                path={path}
                element={authOnly ? <RequireAuth>{el}</RequireAuth> : el}
            />
        );
    }, []);

    return (
        <Routes>
            {routeConfig.map(renderWithWrapper)}
        </Routes>
    );
};
