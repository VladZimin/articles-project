import { Fragment, ReactNode } from 'react';
import { Listbox as HListBox } from '@headlessui/react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DirectionType } from '@/shared/types/ui';
import { HStack } from '../../../Stack/HStack/HStack';
import { Button } from '../../../Button/Button';
import popupsCls from '../../styles/popups.module.scss';
import cls from './ListBox.module.scss';
import { directionClasses } from '../../styles/const';

interface ListBoxItem {
  value: string
  content: ReactNode
  disabled?: boolean
}
interface ListBoxProps {
  className?: string;
  items: ListBoxItem[]
  value?: string
  onChange: (value: string) => void
  defaultValue?: string
  readonly?: boolean
  direction?: DirectionType
  label?: string
}

export function ListBox(props: ListBoxProps) {
    const {
        defaultValue, value, onChange, items, className, readonly = false, direction = 'bottom right', label,
    } = props;
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
                    <Button disabled={readonly}>
                        {value ?? defaultValue}
                    </Button>
                </HListBox.Button>
                <HListBox.Options className={classNames(cls.content, {}, [directionClasses[direction]])}>
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
                                    })}
                                >
                                    {selected && '~'}
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
