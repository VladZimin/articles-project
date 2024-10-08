import { classNames } from 'shared/lib/classNames/classNames';
import { CSSProperties } from 'react';
import cls from './Avatar.module.scss';

interface AvatarProps {
    className?: string
    src?: string
    alt?: string
    size?: number
}

export const Avatar = (props:AvatarProps) => {
    const {
        className,
        src,
        alt = 'Avatar',
        size,
    } = props;

    const style: CSSProperties = {
        width: size ?? 100,
        height: size ?? 100,
    };
    return (
        <img
            className={classNames(cls.Avatar, {}, [className])}
            style={style}
            src={src}
            alt={alt}
        />
    );
};
