import { classNames } from 'shared/lib/classNames/classNames';
import React, {
    InputHTMLAttributes, memo, useEffect, useRef, useState,
} from 'react';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>

interface InputProps extends HTMLInputProps{
    className?: string
    value?: string | number
    onChange?: (value: string) => void
    placeholder?: string
    autoFocus?: boolean
    readonly?: boolean
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
        ...otherProps
    } = props;
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocus, setIsFocus] = useState(false);
    const [caretPosition, setCaretPosition] = useState(0);

    const isCaretVisible = isFocus && !readonly;

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
    const onSelect = (e: any) => {
        setCaretPosition(e?.target?.selectionStart || 0);
    };

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
        setCaretPosition(e.target.value.length);
    };
    return (
        <div className={classNames(cls.InputWrapper, {}, [className])}>
            {placeholder && (
                <div className={cls.placeholder}>
                    {`${placeholder}>`}
                </div>
            )}
            <div className={cls.caretWrapper}>
                <input
                    ref={inputRef}
                    type={type}
                    onChange={onChangeHandler}
                    value={value}
                    className={cls.input}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onSelect={onSelect}
                    readOnly={readonly}
                    {...otherProps}
                />
                {isCaretVisible && <span style={{ left: `${caretPosition * 9}px` }} className={cls.caret} />}
            </div>
        </div>
    );
});
