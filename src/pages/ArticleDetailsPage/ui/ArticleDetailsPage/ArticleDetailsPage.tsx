import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from '@/widgets/Page';
import { ArticleRecommendationsList } from '@/features/ArticleRecommendationsList';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { articleDetailsPageReducer } from '../../model/slice';
import cls from './ArticleDetailsPage.module.scss';
import { ArticleRating } from '@/features/ArticleRating';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { ArticleDetails } from '@/entities/Article';
import { Card } from '@/shared/ui/deprecated/Card';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { VStack } from '@/shared/ui/redesigned';
import { DetailsContainer } from '../DetailsContainer/DetailsContainer';
import { AdditionalInfoContainer } from '../AdditionalInfoContainer/AdditionalInfoContainer';

export interface ArticlesPageProps {
    className?: string
}

const reducers: ReducersList = {
    articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = ({ className }:ArticlesPageProps) => {
    const { t } = useTranslation('articles');
    const { id } = useParams<{id: string }>();

    if (!id) {
        return (
            <Page className={classNames(cls.ArticlesDetailsPage, {}, [className])}>
                {t('Статья не найдена')}
            </Page>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <ToggleFeaturesComponent
                name="isAppRedesigned"
                on={(
                    <StickyContentLayout
                        content={(
                            <Page className={classNames(cls.ArticlesDetailsPage, {}, [className])}>
                                <VStack gap="16" max>
                                    <DetailsContainer />
                                    <ArticleRating articleId={id} />
                                    <ArticleRecommendationsList />
                                    <ArticleDetailsComments id={id} className={cls.commentTitle} />
                                </VStack>
                            </Page>
                        )}
                        right={<AdditionalInfoContainer />}
                    />
                )}
                off={(
                    <Page className={classNames(cls.ArticlesDetailsPage, {}, [className])}>
                        <ArticleDetailsPageHeader />
                        <ArticleDetails id={id} />
                        <Card>{t('Оценка статей скоро появится')}</Card>
                        <ArticleRecommendationsList />
                        <ArticleDetailsComments id={id} className={cls.commentTitle} />
                    </Page>
                )}
            />
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);
