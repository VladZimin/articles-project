import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Text as TextDeprecated } from '@/shared/ui';
import { Text, AppImage, Skeleton } from '@/shared/ui/redesigned';
import { TextAlign, TextSize } from '@/shared/ui/deprecated/Text';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import EyeIcon from '@/shared/assets/icons/eye-icon.svg';
import CalendarIcon from '@/shared/assets/icons/calendar-icon.svg';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading,
} from '../../model/selectors/getArticleDetails';
import { fetchArticleById } from '../../model/service/fetchArticleById/fetchArticleById';
import cls from './ArticleDetails.module.scss';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { renderArticleBlock } from './renderArticleBlock';
import { ToggleFeaturesComponent } from '@/shared/lib/features';

interface ArticleDetailsProps {
    className?: string
    id: string
}

const reducers: ReducersList = {
    articleDetails: articleDetailsReducer,
};

const Deprecated = () => {
    const article = useSelector(getArticleDetailsData);
    return (
        <>
            <div className={cls.avatarWrapper}>
                <Avatar size={200} src={article?.img} className={cls.avatar} alt="article image" />
            </div>
            <TextDeprecated title={article?.title} text={article?.subtitle} size={TextSize.L} />
            <div className={cls.avatarInfo}>
                <Icon Svg={EyeIcon} />
                <TextDeprecated text={String(article?.views)} />
            </div>
            <div className={cls.avatarInfo}>
                <Icon Svg={CalendarIcon} />
                <TextDeprecated text={article?.createdAt} />
            </div>
            {article?.blocks.map(renderArticleBlock)}
        </>
    );
};

const Redesigned = () => {
    const article = useSelector(getArticleDetailsData);
    return (
        <>
            <Text title={article?.title} size="l" bold />
            <Text title={article?.subtitle} />
            <AppImage
                className={cls.img}
                src={article?.img}
                fallback={<Skeleton width="100%" height={420} border="16px" />}
            />
            {article?.blocks.map(renderArticleBlock)}
        </>
    );
};

export const ArticleDetails = ({ className, id }:ArticleDetailsProps) => {
    const { t } = useTranslation('articles');
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getArticleDetailsIsLoading);
    const error = useSelector(getArticleDetailsError);
    let content;

    useInitialEffect(() => {
        dispatch(fetchArticleById(id));
    });

    if (isLoading) {
        content = (
            <>
                <SkeletonDeprecated className={cls.avatar} height={200} width={200} border="50%" />
                <SkeletonDeprecated className={cls.title} height={32} width={300} />
                <SkeletonDeprecated className={cls.skeleton} height={24} width={600} />
                <SkeletonDeprecated className={cls.skeleton} height={200} width="100%" />
                <SkeletonDeprecated className={cls.skeleton} height={200} width="100%" />
            </>
        );
    } else if (error) {
        content = <Text align={TextAlign.CENTER} title={t('Произошла ошибка при загрузке статьи')} />;
    } else {
        content = (
            <ToggleFeaturesComponent name="isAppRedesigned" on={<Redesigned />} off={<Deprecated />} />
        );
    }
    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={classNames(cls.ArticleDetails, {}, [className])}>
                {content}
            </div>
        </DynamicModuleLoader>
    );
};
