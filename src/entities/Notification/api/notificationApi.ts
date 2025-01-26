import { rtkQueryApi } from 'shared/api/rtkQueryApi';
import { Notification } from '../model/types/notification';

const notificationsApi = rtkQueryApi.injectEndpoints({
    endpoints: (build) => ({
        getNotifications: build.query<Notification[], null>({
            query: () => ({
                url: '/notifications',
            }),
        }),
    }),
});

export const useGetNotifications = notificationsApi.useGetNotificationsQuery;
