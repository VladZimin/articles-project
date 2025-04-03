import { memo } from 'react';
import cls from './AppLogo.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import AppSvg from '@/shared/assets/icons/app-image.svg';
import { HStack } from '../Stack';

interface AppLogoProps {
    className?: string
}

export const AppLogo = memo(({ className }:AppLogoProps) => {
    return (
        <HStack
            className={classNames(cls.appLogoWrapper, {}, [className])}
            justify="center"
            max
        >
            <div className={cls.gradientBig} />
            <div className={cls.gradientSmall} />
            <AppSvg className={cls.appLogo} />
        </HStack>
    );
});
