import { Fragment, ReactNode, useMemo } from 'react';
import { Listbox as HListBox } from '@headlessui/react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DirectionType } from '@/shared/types/ui';
import { HStack, Icon } from '../../../../redesigned';
import { Button } from '../../../Button';
import popupsCls from '../../styles/popups.module.scss';
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';
import cls from './ListBox.module.scss';
import { directionClasses } from '../../styles/const';

interface ListBoxItem<T extends string> {
  value: T
  content: ReactNode
  disabled?: boolean
}
interface ListBoxProps<T extends string> {
  className?: string;
  items: ListBoxItem<T>[]
  value?: T
  onChange: (value: T) => void
  defaultValue?: string
  readonly?: boolean
  direction?: DirectionType
  label?: string
}

export function ListBox<T extends string>(props: ListBoxProps<T>) {
    const {
        defaultValue, value, onChange, items, className, readonly = false, direction = 'bottom right', label,
    } = props;

    const selectedItem = useMemo(() => {
        return items.find((item) => item.value === value);
    }, [items, value]);

    return (
        <HStack gap="4">
            {label && <span>{`${label}>`}</span>}
            <HListBox
                as="div"
                value={value}
                onChange={onChange}
                className={classNames(popupsCls.popup, {}, [className])}
                disabled={readonly}
            >
                <HListBox.Button className={popupsCls.trigger}>
                    <Button disabled={readonly} variant="filled" addonRight={<Icon Svg={ArrowIcon} />}>
                        {selectedItem?.content ?? defaultValue}
                    </Button>
                </HListBox.Button>
                <HListBox.Options
                    className={classNames(cls.content, {}, [popupsCls.content, directionClasses[direction]])}
                >
                    {items.map((item) => (
                        <HListBox.Option
                            key={item.value}
                            value={item.value}
                            disabled={item.disabled}
                            as={Fragment}
                        >
                            {({ active, selected }) => (
                                <li
                                    className={classNames(cls.option, {
                                        [popupsCls.active]: active,
                                        [popupsCls.disabled]: item.disabled,
                                        [popupsCls.selected]: selected,
                                    })}
                                >
                                    {item.content}
                                </li>
                            )}
                        </HListBox.Option>
                    ))}
                </HListBox.Options>
            </HListBox>
        </HStack>
    );
}
