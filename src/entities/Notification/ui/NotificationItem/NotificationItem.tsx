import { classNames } from '@/shared/lib/classNames/classNames';
import { Card, CardTheme } from '@/shared/ui/deprecated/Card';
import { Text } from '@/shared/ui';
import { Notification } from '../../model/types/notification';
import cls from './NotificationItem.module.scss';

interface NotificationItemProps {
    className?: string
    item: Notification
}

export const NotificationItem = ({ className, item }:NotificationItemProps) => {
    const content = (
        <Card theme={CardTheme.OUTLINE} className={classNames(cls.NotificationItem, {}, [className])}>
            <Text text={item.description} title={item.title} />
        </Card>
    );

    if (item.href) {
        return (
            <a target="_blank" href={item.href} className={cls.link} rel="noreferrer">
                <Card theme={CardTheme.OUTLINE} className={classNames(cls.NotificationItem, {}, [className])}>
                    <Text text={item.description} title={item.title} />
                </Card>
            </a>
        );
    }

    return content;
};
