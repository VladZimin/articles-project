import { classNames } from 'shared/lib/classNames/classNames';
import {
    ChangeEvent, memo, useCallback, useMemo,
} from 'react';
import cls from './Select.module.scss';

interface SelectOptions {
    value: string;
    content: string
}
interface AvatarProps {
    className?: string
    label?: string
    options?: SelectOptions[]
    value?: string
    updateSelect?: (value: string) => void
    readonly?: boolean
}

export const Select = memo((props:AvatarProps) => {
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
        updateSelect?.(e.target.value);
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
});
