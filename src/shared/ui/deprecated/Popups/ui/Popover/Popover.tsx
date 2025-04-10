import { Popover as HPopover } from '@headlessui/react';
import { ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DirectionType } from '@/shared/types/ui';
import popupsCls from '../../styles/popups.module.scss';
import cls from './Popover.module.scss';
import { directionClasses } from '../../styles/const';

interface PopoverProps {
  className?: string;
  trigger: ReactNode
  direction?: DirectionType
  children: ReactNode
}

export function Popover(props: PopoverProps) {
    const {
        className, trigger, direction = 'bottom right', children,
    } = props;

    return (
        <HPopover className={classNames(popupsCls.popup, {}, [className])}>
            <HPopover.Button as="div" className={popupsCls.trigger}>
                {trigger}
            </HPopover.Button>
            <HPopover.Panel className={classNames(cls.content, {}, [directionClasses[direction]])}>
                {children}
            </HPopover.Panel>
        </HPopover>
    );
}
