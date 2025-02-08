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
import { RoutePath } from '@/shared/const/router';
import { AppRouteProps } from '@/shared/types/router';

export const routeConfig: AppRouteProps[] = [
    {
        path: RoutePath.main,
        element: <MainPage />,
    },
    {
        path: RoutePath.about,
        element: <AboutPage />,
    },
    {
        path: `${RoutePath.profile}:id`,
        element: <ProfilePage />,
        authOnly: true,
    },
    {
        path: RoutePath.article,
        element: <ArticlesPage />,
        authOnly: true,
    },
    {
        path: RoutePath.adminPanel,
        element: <AdminPanelPage />,
        authOnly: true,
        roles: [UserRole.ADMIN, UserRole.MANAGER],
    },
    {
        path: `${RoutePath.articleDetails}:id`,
        element: <ArticleDetailsPage />,
        authOnly: true,
    },
    {
        path: RoutePath.articleCreate,
        element: <ArticleEditPage />,
        authOnly: true,
    },
    {
        path: RoutePath.articleEdit,
        element: <ArticleEditPage />,
        authOnly: true,
    },
    {
        path: RoutePath.forbidden,
        element: <ForbiddenPage />,
        authOnly: true,
    },
    {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
];
