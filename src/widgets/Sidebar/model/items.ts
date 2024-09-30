import React from 'react';
import MainIcon from 'shared/assets/icons/main-icon.svg';
import AboutIcon from 'shared/assets/icons/about-icon.svg';
import ProfileIcon from 'shared/assets/icons/profile-icon.svg';
import ArticleIcon from 'shared/assets/icons/article-icon.svg';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

export type SidebarItemType = {
    path: string
    text: string
    Icon: React.VFC<React.SVGProps<SVGSVGElement>>
    authOnly?: boolean
}

export const SidebarItemList: SidebarItemType[] = [
    {
        text: 'Главная',
        path: RoutePath.main,
        Icon: MainIcon,
    },
    {
        text: 'О сайте',
        path: RoutePath.about,
        Icon: AboutIcon,
    },
    {
        text: 'Профиль',
        path: RoutePath.profile,
        Icon: ProfileIcon,
        authOnly: true,
    },
    {
        text: 'Статьи',
        path: RoutePath.article,
        Icon: ArticleIcon,
        authOnly: true,
    },
];
