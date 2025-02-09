import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui';
import { TextSize } from '@/shared/ui/Text';
import { ArticleList } from '@/entities/Article';
import { VStack } from '@/shared/ui/Stack';
import { useArticleRecommendationsList } from '../api/articleRecommendationsApi';

interface ArticleRecommendationsListProps {
    className?: string
}

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
