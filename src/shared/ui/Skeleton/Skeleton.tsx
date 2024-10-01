import { classNames } from 'shared/lib/classNames/classNames';
import { CSSProperties, memo } from 'react';
import cls from './Skeleton.module.scss';

interface SkeletonProps {
  className?: string
  height?: number | string
  width?: number | string
  border?: string
}

export const Skeleton = memo((props: SkeletonProps) => {
    const {
        className,
        border,
        height,
        width,
    } = props;

    const style: CSSProperties = {
        height,
        width,
        borderRadius: border,
    };
    return (
        <div className={classNames(cls.Skeleton, {}, [className])} style={style} />
    );
});
