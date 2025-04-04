import { createSelector } from '@reduxjs/toolkit';
import MainIcon from '@/shared/assets/icons/home.svg';
import AboutIcon from '@/shared/assets/icons/Info.svg';
import ProfileIcon from '@/shared/assets/icons/avatar.svg';
import ArticleIcon from '@/shared/assets/icons/article.svg';
import MainIconDeprecated from '@/shared/assets/icons/main-icon.svg';
import AboutIconDeprecated from '@/shared/assets/icons/about-icon.svg';
import ProfileIconDeprecated from '@/shared/assets/icons/profile-icon.svg';
import ArticleIconDeprecated from '@/shared/assets/icons/article-icon.svg';
import { SidebarItemType } from '../types/sidebarItem';
import { getUserAuthData } from '../../../../entities/User';
import {
    getRouteAbout, getRouteArticles, getRouteMain, getRouteProfile,
} from '@/shared/const/router';
import { toggleFeatures } from '@/shared/lib/features';

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
    const sidebarItems: SidebarItemType[] = [
        {
            text: 'Главная',
            path: getRouteMain(),
            Icon: toggleFeatures({
                name: 'isAppRedesigned',
                off: () => MainIconDeprecated,
                on: () => MainIcon,
            }),
        },
        {
            text: 'О сайте',
            path: getRouteAbout(),
            Icon: toggleFeatures({
                name: 'isAppRedesigned',
                off: () => AboutIconDeprecated,
                on: () => AboutIcon,
            }),
        },
    ];
    if (userData) {
        sidebarItems.push(
            {
                text: 'Профиль',
                path: getRouteProfile(userData.id),
                Icon: toggleFeatures({
                    name: 'isAppRedesigned',
                    off: () => ProfileIconDeprecated,
                    on: () => ProfileIcon,
                }),
                authOnly: true,
            },
            {
                text: 'Статьи',
                path: getRouteArticles(),
                Icon: toggleFeatures({
                    name: 'isAppRedesigned',
                    off: () => ArticleIconDeprecated,
                    on: () => ArticleIcon,
                }),
                authOnly: true,
            },
        );
    }
    return sidebarItems;
});
