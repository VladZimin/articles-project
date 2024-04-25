import './styles/index.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Navbar } from 'widgets/Navbar';
import { useTheme } from 'app/providers/ThemeProvider';
import { Sidebar } from 'widgets/Sidebar';
import { Suspense, useEffect } from 'react';
import { AppRouter } from 'app/providers/router';

export const App = () => {
    const { theme } = useTheme();

    useEffect(() => {
        if (Math.random() < 0.5) {
            throw new Error('Some error');
        }
    }, []);
    return (
        <Suspense fallback="">
            <div className={classNames('app', { ok: true, neok: false, cool: true }, [theme])}>
                <Navbar />
                <div className="content-page">
                    <Sidebar />
                    <AppRouter />
                </div>
            </div>
        </Suspense>
    );
};
