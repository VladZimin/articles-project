import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Flex.module.scss';

export type FlexJustify = 'start' | 'between' | 'end' | 'center'
export type FlexAlign = 'start' | 'center' | 'end'
export type FlexDirection = 'row' | 'column'
export type FlexGap = '4' | '8' | '16' | '24' | '32'

const justifyClasses: Record<FlexJustify, string> = {
    end: cls.justifyEnd,
    center: cls.justifyCenter,
    between: cls.justifyBetween,
    start: cls.justifyStart,
};
const alignClasses: Record<FlexAlign, string> = {
    end: cls.alignEnd,
    center: cls.alignCenter,
    start: cls.alignStart,
};
const directionClasses: Record<FlexDirection, string> = {
    row: cls.directionRow,
    column: cls.directionColumn,
};
const gapClasses: Record<FlexGap, string> = {
    4: cls.gap4,
    8: cls.gap8,
    16: cls.gap16,
    24: cls.gap24,
    32: cls.gap32,
};
type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
export interface FlexProps extends DivProps {
    className?: string
    justify?: FlexJustify
    align?: FlexAlign
    direction?: FlexDirection
    gap?: FlexGap
    children?: ReactNode
    max?: boolean
}

export const Flex = (props: FlexProps) => {
    const {
        className,
        justify = 'start',
        align = 'center',
        direction = 'row',
        gap,
        children,
        max = false,
        ...restProps
    } = props;

    const classes = [
        className,
        justifyClasses[justify],
        alignClasses[align],
        directionClasses[direction],
        gap && gapClasses[gap],
    ];
    const mods: Mods = {
        [cls.max]: max,
    };
    return (
        <div className={classNames(cls.Flex, mods, classes)} {...restProps}>
            {children}
        </div>
    );
};
