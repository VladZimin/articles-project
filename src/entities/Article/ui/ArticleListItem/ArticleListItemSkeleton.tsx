import { classNames } from '@/shared/lib/classNames/classNames';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { Card as CardRedesigned } from '@/shared/ui/redesigned/Card';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { ArticleView } from '../../model/const/articleConst';
import cls from './ArticleListItem.module.scss';
import { toggleFeatures } from '@/shared/lib/features';

interface ArticleListItemSkeletonProps {
    className?: string
    view: ArticleView
}

export const ArticleListItemSkeleton = (props: ArticleListItemSkeletonProps) => {
    const {
        className,
        view,
    } = props;

    const Skeleton = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => SkeletonRedesigned,
        off: () => SkeletonDeprecated,
    });
    const Card = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => CardRedesigned,
        off: () => CardDeprecated,
    });

    if (view === ArticleView.BIG) {
        return (
            <div className={classNames(cls.BIG, {}, [className])}>
                <Card>
                    <div className={cls.header}>
                        <Skeleton height={30} width={30} border="50%" />
                        <Skeleton height={16} width={150} className={cls.user} />
                        <Skeleton height={16} width={150} className={cls.date} />
                    </div>
                    <Skeleton height={24} width={270} className={cls.title} />
                    <Skeleton height={220} className={cls.img} />
                    <div className={cls.footer}>
                        <Skeleton height={40} width={180} />
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className={classNames(cls.SMALL, {}, [className])}>
            <Card>
                <div className={cls.imageWrapper}>
                    <Skeleton width={200} height={200} />
                </div>
                <div className={cls.infoWrapper}>
                    <Skeleton width={130} height={16} />
                </div>
                <Skeleton width={160} height={16} className={cls.title} />
            </Card>
        </div>
    );
};
