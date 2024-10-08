import { createSelector } from '@reduxjs/toolkit';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import MainIcon from 'shared/assets/icons/main-icon.svg';
import AboutIcon from 'shared/assets/icons/about-icon.svg';
import ProfileIcon from 'shared/assets/icons/profile-icon.svg';
import ArticleIcon from 'shared/assets/icons/article-icon.svg';
import { SidebarItemType } from 'widgets/Sidebar/model/types/sidebarItem';
import { getUserAuthData } from '../../../../entities/User';

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
    const sidebarItems: SidebarItemType[] = [
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
    ];
    if (userData) {
        sidebarItems.push(
            {
                text: 'Профиль',
                path: RoutePath.profile + userData.id,
                Icon: ProfileIcon,
                authOnly: true,
            },
            {
                text: 'Статьи',
                path: RoutePath.article,
                Icon: ArticleIcon,
                authOnly: true,
            },
        );
    }
    return sidebarItems;
});
