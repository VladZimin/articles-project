import { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { AppRouter } from './providers/router';
import { getUserInited, initAuthData } from '@/entities/User';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { PageLoader } from '@/widgets/PageLoader';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { MainLayout } from '@/shared/layouts/MainLayout';

export const App = () => {
    const { theme } = useTheme();
    const dispatch = useAppDispatch();
    const isInit = useSelector(getUserInited);

    useEffect(() => {
        dispatch(initAuthData());
    }, [dispatch]);

    if (!isInit) {
        return <PageLoader />;
    }

    return (
        <ToggleFeaturesComponent
            name="isAppRedesigned"
            on={(
                <Suspense fallback="">
                    <div className={classNames('app-redesigned', {}, [theme])}>
                        <MainLayout
                            content={<AppRouter />}
                            header={<Navbar />}
                            sidebar={<Sidebar />}
                            toolbar={<div>123123</div>}
                        />
                    </div>
                </Suspense>
            )}
            off={(
                <Suspense fallback="">
                    <div className={classNames('app', {}, [theme])}>
                        <Navbar />
                        <div className="content-page">
                            <Sidebar />
                            <AppRouter />
                        </div>
                    </div>
                </Suspense>
            )}
        />
    );
};
