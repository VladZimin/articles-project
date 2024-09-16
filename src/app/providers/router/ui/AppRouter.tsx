import { Route, Routes } from 'react-router-dom';
import { Suspense, useMemo } from 'react';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';
import { PageLoader } from 'widgets/PageLoader';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '../../../../entities/User';

export const AppRouter = () => {
    const isAuth = useSelector(getUserAuthData);
    const routes = useMemo(() => routeConfig.filter((r) => {
        if (r.authOnly && !isAuth) {
            return false;
        }
        return true;
    }), [isAuth]);
    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                {routes.map(({ path, element }) => (
                    <Route
                        key={path}
                        path={path}
                        element={(
                            <div className="page-wrapper">
                                {element}
                            </div>
                        )}
                    />
                ))}
            </Routes>
        </Suspense>
    );
};
