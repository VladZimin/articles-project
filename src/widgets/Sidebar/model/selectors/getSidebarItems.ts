import { createSelector } from '@reduxjs/toolkit';
import MainIcon from '@/shared/assets/icons/main-icon.svg';
import AboutIcon from '@/shared/assets/icons/about-icon.svg';
import ProfileIcon from '@/shared/assets/icons/profile-icon.svg';
import ArticleIcon from '@/shared/assets/icons/article-icon.svg';
import { SidebarItemType } from '../types/sidebarItem';
import { getUserAuthData } from '../../../../entities/User';
import {
    getRouteAbout, getRouteArticles, getRouteMain, getRouteProfile,
} from '@/shared/const/router';

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
    const sidebarItems: SidebarItemType[] = [
        {
            text: 'Главная',
            path: getRouteMain(),
            Icon: MainIcon,
        },
        {
            text: 'О сайте',
            path: getRouteAbout(),
            Icon: AboutIcon,
        },
    ];
    if (userData) {
        sidebarItems.push(
            {
                text: 'Профиль',
                path: getRouteProfile(userData.id),
                Icon: ProfileIcon,
                authOnly: true,
            },
            {
                text: 'Статьи',
                path: getRouteArticles(),
                Icon: ArticleIcon,
                authOnly: true,
            },
        );
    }
    return sidebarItems;
});
