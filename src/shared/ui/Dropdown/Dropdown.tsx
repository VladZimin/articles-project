import { Menu } from '@headlessui/react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Fragment, ReactNode } from 'react';
import { DirectionType } from 'shared/types/ui';
import { Button, ButtonTheme } from '../Button/Button';
import { AppLink } from '../AppLink/AppLink';
import cls from './Dropdown.module.scss';

export interface DropdownItem {
  disabled?: boolean;
  onClick?: () => void;
  href?: string;
  content?: ReactNode
}

interface DropdownProps {
  className?: string;
  items: DropdownItem[]
  trigger: ReactNode
  direction?: DirectionType
}

const directionClasses: Record<DirectionType, string> = {
    'top left': cls.contentTopLeft,
    'top right': cls.contentTopRight,
    'bottom left': cls.contentBottomLeft,
    'bottom right': cls.contentBottomRight,
};

export function Dropdown(props: DropdownProps) {
    const {
        className, trigger, items, direction = 'bottom right',
    } = props;

    return (
        <Menu as="div" className={classNames(cls.Dropdown, {}, [className])}>
            <Menu.Button className={cls.trigger}>
                {trigger}
            </Menu.Button>
            <Menu.Items className={classNames(cls.content, {}, [directionClasses[direction]])}>
                {items.map((item, index) => {
                    const content = ({ active }: {active: boolean}) => (
                        <Button
                            theme={ButtonTheme.CLEAR}
                            onClick={item.onClick}
                            disabled={item.disabled}
                            className={classNames(cls.item, { [cls.active]: active })}
                        >
                            {item.content}
                        </Button>
                    );
                    if (item.href) {
                        return (
                            <Menu.Item key={item.href} as={AppLink} to={item.href} disabled={item.disabled}>
                                {content}
                            </Menu.Item>
                        );
                    }
                    return (
                        <Menu.Item key={index} as={Fragment} disabled={item.disabled}>
                            {content}
                        </Menu.Item>
                    );
                })}
            </Menu.Items>
        </Menu>
    );
}
