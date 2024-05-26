import { classNames } from 'shared/lib/classNames/classNames';
import { Navbar } from 'widgets/Navbar';
import { useTheme } from 'app/providers/ThemeProvider';
import { Sidebar } from 'widgets/Sidebar';
import { Suspense, useEffect } from 'react';
import { AppRouter } from 'app/providers/router';
import { useDispatch } from 'react-redux';
import { userActions } from 'entities/User';

export const App = () => {
    const { theme } = useTheme();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);
    useEffect(() => {
        document.body.className = theme;
    }, [theme]);
    return (
        <Suspense fallback="">
            <div className={classNames('app', {}, [])}>
                <Navbar />
                <div className="content-page">
                    <Sidebar />
                    <AppRouter />
                </div>
            </div>
        </Suspense>
    );
};
