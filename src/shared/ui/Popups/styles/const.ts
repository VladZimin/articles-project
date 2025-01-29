import { DirectionType } from '@/shared/types/ui';
import cls from './popups.module.scss';

export const directionClasses: Record<DirectionType, string> = {
    'top left': cls.contentTopLeft,
    'top right': cls.contentTopRight,
    'bottom left': cls.contentBottomLeft,
    'bottom right': cls.contentBottomRight,
};
