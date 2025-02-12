import {
    ImgHTMLAttributes, ReactNode, useLayoutEffect, useState,
} from 'react';

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement>{
    className?: string
    fallback?: ReactNode
    errorFallback?: ReactNode
}

export const AppImage = (props: AppImageProps) => {
    const {
        className, alt = 'image', src, errorFallback, fallback, ...otherProps
    } = props;
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useLayoutEffect(() => {
        const img = new Image();
        img.src = src ?? '';
        img.onload = () => {
            setIsLoading(false);
        };
        img.onerror = () => {
            setIsLoading(false);
            setHasError(true);
        };
    }, [src]);

    if (fallback && isLoading) {
        return fallback;
    }

    if (hasError && errorFallback) {
        return errorFallback;
    }

    return (
        <img className={className} src={src} alt={alt} {...otherProps} />
    );
};
