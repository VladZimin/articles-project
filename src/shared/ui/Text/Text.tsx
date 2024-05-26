import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Text.module.scss';

interface TextProps {
    className?: string
    title?: string
    text?: string
    theme?: string
}
export enum TextTheme {
    PRIMARY = 'primary',
    ERROR = 'error'
}
export const Text = (props:TextProps) => {
    const {
        className,
        title,
        text,
        theme = TextTheme.PRIMARY,
    } = props;
    return (
        <div className={classNames(cls.Text, {}, [className, cls[theme]])}>
            {title && <p className={cls.title}>{title}</p>}
            {text && <p className={cls.text}>{text}</p>}
        </div>
    );
};
