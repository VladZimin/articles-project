import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui';
import { Icon } from 'shared/ui/Icon/Icon';
import NotificationSvg from 'shared/assets/icons/notification-20-20.svg';
import { NotificationsList } from 'entities/Notification';
import { Popover } from 'shared/ui/Popups';
import cls from './NotificationButton.module.scss';

interface NotificationButtonProps {
    className?: string
}

export const NotificationButton = ({ className }:NotificationButtonProps) => {
    return (
        <Popover
            className={classNames('', {}, [className])}
            trigger={(
                <Button theme={ButtonTheme.CLEAR}>
                    <Icon Svg={NotificationSvg} inverted />
                </Button>
            )}
            direction="bottom left"
        >
            <NotificationsList className={cls.notifications} />
        </Popover>
    );
};
