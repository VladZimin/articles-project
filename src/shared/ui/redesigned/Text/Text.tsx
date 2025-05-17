import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Text.module.scss';

export type TextVariant = 'primary' | 'error' | 'accent'

export type TextAlign = 'left' | 'center' | 'right'

export type TextSize = 'm' | 'l' | 's'

interface TextProps {
  className?: string
  title?: string
  text?: string
  bold?: boolean
  variant?: TextVariant
  align?: TextAlign
  size?: TextSize
}

type HeaderTagType = 'h1' | 'h2' | 'h3'
const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
    s: 'h3',
    m: 'h2',
    l: 'h1',
};
export const Text = memo((props: TextProps) => {
    const {
        className,
        title,
        text,
        bold,
        variant = 'primary',
        align = 'left',
        size = 'm',
    } = props;
    const HeaderTag = mapSizeToHeaderTag[size];
    return (
        <div className={classNames(cls.Text, { [cls.bold]: bold }, [className, cls[variant], cls[align], cls[size]])}>
            {title && <HeaderTag className={cls.title}>{title}</HeaderTag>}
            {text && <p className={cls.text}>{text}</p>}
        </div>
    );
});
