import {
    ChangeEvent, useCallback, useMemo,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Select.module.scss';

export interface SelectOptions<T extends string> {
    value: T;
    content: string
}
interface SelectProps<T extends string> {
    className?: string
    label?: string
    options?: SelectOptions<T>[]
    value?: T
    updateSelect?: (value: T) => void
    readonly?: boolean
}

export const Select = <T extends string>(props:SelectProps<T>) => {
    const {
        className,
        label,
        updateSelect,
        options,
        value,
        readonly,
    } = props;

    const optionsList = useMemo(() => options?.map((opt) => (
        <option
            className={cls.option}
            value={opt.value}
            key={opt.value}
        >
            {opt.content}
        </option>
    )), [options]);

    const onChangeSelect = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
        updateSelect?.(e.target.value as T);
    }, [updateSelect]);

    return (
        <div className={classNames(cls.Wrapper, {}, [className])}>
            {
                label && (
                    <span className={cls.label}>{`${label}>`}</span>
                )
            }
            <select
                className={cls.select}
                value={value}
                onChange={onChangeSelect}
                disabled={readonly}
            >
                {optionsList}
            </select>
        </div>
    );
};
