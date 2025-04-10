import { Menu } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DirectionType } from '@/shared/types/ui';
import { AppLink } from '../../../AppLink';
import popupsCls from '../../styles/popups.module.scss';
import cls from './Dropdown.module.scss';
import { directionClasses } from '../../styles/const';

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

export function Dropdown(props: DropdownProps) {
    const {
        className, trigger, items, direction = 'bottom right',
    } = props;

    return (
        <Menu as="div" className={classNames(popupsCls.popup, {}, [className])}>
            <Menu.Button className={popupsCls.trigger}>
                {trigger}
            </Menu.Button>
            <Menu.Items className={classNames(cls.content, {}, [popupsCls.content, directionClasses[direction]])}>
                {items.map((item, index) => {
                    const content = ({ active }: {active: boolean}) => (
                        <button
                            type="button"
                            onClick={item.onClick}
                            disabled={item.disabled}
                            className={classNames(cls.item, { [popupsCls.active]: active })}
                        >
                            {item.content}
                        </button>
                    );
                    if (item.href) {
                        return (
                            <Menu.Item
                                key={`dropdown-key-${index}`}
                                as={AppLink}
                                to={item.href}
                                disabled={item.disabled}
                            >
                                {content}
                            </Menu.Item>
                        );
                    }
                    return (
                        <Menu.Item key={`dropdown-key-${index}`} as={Fragment} disabled={item.disabled}>
                            {content}
                        </Menu.Item>
                    );
                })}
            </Menu.Items>
        </Menu>
    );
}
