import { memo } from 'react';
import cls from './AppLogo.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import AppSvg from '@/shared/assets/icons/app-image.svg';
import { HStack } from '../Stack';

interface AppLogoProps {
    className?: string
    size?: number
}

export const AppLogo = memo(({ className, size = 50 }:AppLogoProps) => {
    return (
        <HStack
            className={classNames(cls.appLogoWrapper, {}, [className])}
            justify="center"
            max
        >
            <AppSvg width={size} height={size} color="black" className={cls.appLogo} />
            <div className={cls.gradientBig} />
            <div className={cls.gradientSmall} />
        </HStack>
    );
});
