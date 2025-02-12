import { MainPage } from '@/pages/MainPage';
import { AboutPage } from '@/pages/AboutPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { ArticlesPage } from '@/pages/ArticlesPage';
import { AdminPanelPage } from '@/pages/AdminPanelPage';
import { UserRole } from '@/entities/User';
import { ArticleDetailsPage } from '@/pages/ArticleDetailsPage';
import { ArticleEditPage } from '@/pages/ArticleEditPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import {
    getRouteAbout, getRouteMain, getRouteProfile, getRouteArticles, getRouteArticleDetails,
    getRouteArticleCreate, getRouteForbidden, getRouteArticleEdit, getRouteAdmin,
} from '@/shared/const/router';
import { AppRouteProps } from '@/shared/types/router';

export const routeConfig: AppRouteProps[] = [
    {
        path: getRouteMain(),
        element: <MainPage />,
    },
    {
        path: getRouteAbout(),
        element: <AboutPage />,
    },
    {
        path: getRouteProfile(':id'),
        element: <ProfilePage />,
        authOnly: true,
    },
    {
        path: getRouteArticles(),
        element: <ArticlesPage />,
        authOnly: true,
    },
    {
        path: getRouteAdmin(),
        element: <AdminPanelPage />,
        authOnly: true,
        roles: [UserRole.ADMIN, UserRole.MANAGER],
    },
    {
        path: getRouteArticleDetails(':id'),
        element: <ArticleDetailsPage />,
        authOnly: true,
    },
    {
        path: getRouteArticleEdit(':id'),
        element: <ArticleEditPage />,
        authOnly: true,
    },
    {
        path: getRouteArticleCreate(),
        element: <ArticleEditPage />,
        authOnly: true,
    },
    {
        path: getRouteForbidden(),
        element: <ForbiddenPage />,
        authOnly: true,
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
];
