import { useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import NotificationSvgDeprecated from '@/shared/assets/icons/notification-20-20.svg';
import NotificationSvg from '@/shared/assets/icons/notification.svg';
import { NotificationsList } from '@/entities/Notification';
import { Popover as PopoverDeprecated } from '@/shared/ui/deprecated/Popups';
import { Drawer } from '@/shared/ui/deprecated/Drawer';
import cls from './NotificationButton.module.scss';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Icon } from '@/shared/ui/redesigned';
import { Popover } from '@/shared/ui/redesigned/Popups';

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
        <ToggleFeaturesComponent
            name="isAppRedesigned"
            on={(
                <Icon Svg={NotificationSvg} onClick={onOpenDrawer} clickable />
            )}
            off={(
                <ButtonDeprecated onClick={onOpenDrawer} theme={ButtonTheme.CLEAR}>
                    <IconDeprecated Svg={NotificationSvgDeprecated} inverted />
                </ButtonDeprecated>
            )}
        />

    );
    return (
        <>
            <BrowserView>
                <ToggleFeaturesComponent
                    name="isAppRedesigned"
                    on={(
                        <Popover
                            className={classNames('', {}, [className])}
                            trigger={trigger}
                            direction="bottom left"
                        >
                            <NotificationsList className={cls.notifications} />
                        </Popover>
                    )}
                    off={(
                        <PopoverDeprecated
                            className={classNames('', {}, [className])}
                            trigger={trigger}
                            direction="bottom left"
                        >
                            <NotificationsList className={cls.notifications} />
                        </PopoverDeprecated>
                    )}
                />
            </BrowserView>
            <MobileView>
                {trigger}
                <Drawer onClose={onCloseDrawer} isOpen={isOpen}>
                    <NotificationsList />
                </Drawer>
            </MobileView>
        </>
    );
};
