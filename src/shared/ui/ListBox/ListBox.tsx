import { Fragment, ReactNode, useState } from 'react';
import { Listbox as HListBox } from '@headlessui/react';
import { classNames } from 'shared/lib/classNames/classNames';
import { HStack } from 'shared/ui/Stack/HStack/HStack';
import { Button } from '../Button/Button';
import cls from './ListBox.module.scss';

interface ListBoxItem {
  value: string
  content: ReactNode
  disabled?: boolean
}
type DirectionType = 'top' | 'bottom'
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

const directionClasses: Record<DirectionType, string> = {
    top: cls.contentTop,
    bottom: cls.contentBottom,
};
export function ListBox(props: ListBoxProps) {
    const {
        defaultValue, value, onChange, items, className, readonly = false, direction = 'bottom', label,
    } = props;

    return (
        <HStack gap="4">
            {label && <span>{`${label}>`}</span>}
            <HListBox
                as="div"
                value={value}
                onChange={onChange}
                className={classNames(cls.ListBox, {}, [className])}
                disabled={readonly}
            >
                <HListBox.Button className={cls.trigger}>
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
                                        [cls.active]: active,
                                        [cls.disabled]: item.disabled,
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