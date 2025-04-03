import { CSSProperties } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';
import { AppImage } from '../AppImage';
import { Skeleton } from '../Skeleton';
import { Icon } from '../Icon';
import UserSvg from '../../../assets/icons/user-filled.svg';

interface AvatarProps {
    className?: string
    src?: string
    alt?: string
    size?: number
    fallbackInverted?: boolean
}

export const Avatar = (props:AvatarProps) => {
    const {
        className,
        src,
        alt = 'Avatar',
        size = 100,
        fallbackInverted,
    } = props;

    const style: CSSProperties = {
        width: size,
        height: size,
    };

    const fallback = <Skeleton height={size} width={size} border="50%" />;
    const errorFallback = <Icon Svg={UserSvg} height={size} width={size} inverted={fallbackInverted} />;
    return (
        <AppImage
            fallback={fallback}
            errorFallback={errorFallback}
            className={classNames(cls.Avatar, {}, [className])}
            style={style}
            src={src}
            alt={alt}
        />
    );
};
