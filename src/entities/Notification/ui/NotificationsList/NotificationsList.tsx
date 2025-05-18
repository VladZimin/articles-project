import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack, Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { NotificationItem } from '../NotificationItem/NotificationItem';
import { useGetNotifications } from '../../api/notificationApi';
import { toggleFeatures } from '@/shared/lib/features';

interface NotificationsListProps {
    className?: string
}

export const NotificationsList = ({ className }:NotificationsListProps) => {
    const { data, isLoading } = useGetNotifications(null, {
        pollingInterval: 10000,
    });

    const Skeleton = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => SkeletonRedesigned,
        off: () => SkeletonDeprecated,
    });

    if (isLoading) {
        return (
            <VStack max gap="8" className={classNames('', {}, [className])}>
                <Skeleton border="8px" height={80} />
                <Skeleton border="8px" height={80} />
                <Skeleton border="8px" height={80} />
            </VStack>
        );
    }

    return (
        <VStack max gap="8" className={classNames('', {}, [className])}>
            {data?.map((item) => <NotificationItem key={item.id} item={item} />)}
        </VStack>
    );
};
