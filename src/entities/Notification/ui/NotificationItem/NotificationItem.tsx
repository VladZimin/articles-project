import { classNames } from '@/shared/lib/classNames/classNames';
import { Card as CardDeprecated, CardTheme } from '@/shared/ui/deprecated/Card';
import { Text, Card } from '@/shared/ui/redesigned';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Notification } from '../../model/types/notification';
import cls from './NotificationItem.module.scss';
import { ToggleFeaturesComponent } from '@/shared/lib/features';

interface NotificationItemProps {
    className?: string
    item: Notification
}

export const NotificationItem = ({ className, item }:NotificationItemProps) => {
    const content = (
        <ToggleFeaturesComponent
            name="isAppRedesigned"
            on={(
                <Card variant="outline" className={classNames(cls.NotificationItem, {}, [className])}>
                    <Text text={item.description} title={item.title} />
                </Card>
            )}
            off={(
                <CardDeprecated theme={CardTheme.OUTLINE} className={classNames(cls.NotificationItem, {}, [className])}>
                    <TextDeprecated text={item.description} title={item.title} />
                </CardDeprecated>
            )}
        />
    );

    if (item.href) {
        return (
            <ToggleFeaturesComponent
                name="isAppRedesigned"
                on={(
                    <a target="_blank" href={item.href} className={cls.link} rel="noreferrer">
                        <Card
                            variant="outline"
                            className={classNames(cls.NotificationItem, {}, [className])}
                        >
                            <Text text={item.description} title={item.title} />
                        </Card>
                    </a>
                )}
                off={(
                    <a target="_blank" href={item.href} className={cls.link} rel="noreferrer">
                        <CardDeprecated
                            theme={CardTheme.OUTLINE}
                            className={classNames(cls.NotificationItem, {}, [className])}
                        >
                            <TextDeprecated text={item.description} title={item.title} />
                        </CardDeprecated>
                    </a>
                )}
            />

        );
    }

    return content;
};
