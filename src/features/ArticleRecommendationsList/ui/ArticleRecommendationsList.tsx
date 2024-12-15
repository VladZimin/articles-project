import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui';
import { TextSize } from 'shared/ui/Text/Text';
import { ArticleList } from 'entities/Article';
import { useTranslation } from 'react-i18next';
import { VStack } from 'shared/ui/Stack/VStack/VStack';
import { rtkQueryApi } from 'shared/api/rtkQueryApi';

interface ArticleRecommendationsListProps {
    className?: string
}

const recommendationsApi = rtkQueryApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRecommendationsList: build.query({
            query: (limit: number) => ({
                url: '/articles',
                params: { _limit: limit },
            }),
        }),
    }),
});

const useArticleRecommendationsList = recommendationsApi.useGetArticleRecommendationsListQuery;

export const ArticleRecommendationsList = ({ className }:ArticleRecommendationsListProps) => {
    const { t } = useTranslation('articles');
    const { data: articles, isLoading } = useArticleRecommendationsList(7);

    return (
        <VStack gap="8" className={classNames('', {}, [className])}>
            <Text size={TextSize.L} text={t('Рекомендации')} />
            <ArticleList
                target="_blank"
                articles={articles}
                isLoading={isLoading}
            />
        </VStack>
    );
};
