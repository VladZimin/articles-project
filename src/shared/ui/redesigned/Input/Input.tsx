import React, {
    InputHTMLAttributes, memo, ReactNode, useEffect, useRef, useState,
} from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Input.module.scss';
import { Text } from '../Text';
import { HStack } from '../Stack';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly' | 'size'>
type InputSize = 's' | 'm' | 'l'

interface InputProps extends HTMLInputProps{
    className?: string
    value?: string | number
    onChange?: (value: string) => void
    placeholder?: string
    label?: string
    autoFocus?: boolean
    readonly?: boolean
    addonLeft?: ReactNode
    addonRight?: ReactNode
    size?: InputSize
}

export const Input = memo((props: InputProps) => {
    const {
        className,
        onChange,
        value,
        type = 'text',
        placeholder,
        autoFocus,
        readonly,
        addonLeft,
        addonRight,
        size = 'm',
        label,
        ...otherProps
    } = props;
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocus, setIsFocus] = useState(false);

    useEffect(() => {
        if (autoFocus) {
            setIsFocus(true);
            inputRef.current?.focus();
        }
    }, [autoFocus]);

    const onFocus = () => {
        setIsFocus(true);
    };
    const onBlur = () => {
        setIsFocus(false);
    };

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    const mods: Mods = {
        [cls.readOnly]: readonly,
        [cls.focused]: isFocus,
        [cls.withAddonLeft]: Boolean(addonLeft),
        [cls.withAddonRight]: Boolean(addonRight),
    };

    const input = (
        <div className={classNames(cls.InputWrapper, mods, [cls[size], className])}>
            {addonLeft}
            <input
                ref={inputRef}
                type={type}
                onChange={onChangeHandler}
                value={value}
                className={cls.input}
                onBlur={onBlur}
                onFocus={onFocus}
                readOnly={readonly}
                placeholder={placeholder}
                {...otherProps}
            />
            {addonRight}
        </div>
    );

    if (label) {
        return (
            <HStack gap="8" max>
                <Text text={label} />
                {input}
            </HStack>

        );
    }
    return input;
});
