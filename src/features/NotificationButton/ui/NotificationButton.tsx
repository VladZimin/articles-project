import { useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui';
import { Icon } from '@/shared/ui/Icon/Icon';
import NotificationSvg from '@/shared/assets/icons/notification-20-20.svg';
import { NotificationsList } from '@/entities/Notification';
import { Popover } from '@/shared/ui/Popups';
import { Drawer } from '@/shared/ui/Drawer/Drawer';
import { AnimationProvider } from '@/shared/lib/components/AnimationProvider/AnimationProvider';
import cls from './NotificationButton.module.scss';

interface NotificationButtonProps {
    className?: string
}

export const NotificationButton = ({ className }:NotificationButtonProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const onOpenDrawer = useCallback(() => {
        setIsOpen(true);
    }, []);

    const onCloseDrawer = useCallback(() => {
        setIsOpen(false);
    }, []);

    const trigger = (
        <Button onClick={onOpenDrawer} theme={ButtonTheme.CLEAR}>
            <Icon Svg={NotificationSvg} inverted />
        </Button>
    );
    return (
        <>
            <BrowserView>
                <Popover
                    className={classNames('', {}, [className])}
                    trigger={trigger}
                    direction="bottom left"
                >
                    <NotificationsList className={cls.notifications} />
                </Popover>
            </BrowserView>
            <MobileView>
                {trigger}
                <AnimationProvider>
                    <Drawer onClose={onCloseDrawer} isOpen={isOpen}>
                        <NotificationsList />
                    </Drawer>
                </AnimationProvider>
            </MobileView>
        </>
    );
};
