import { useTranslation } from 'react-i18next';
import { TextSize } from '@/shared/ui/deprecated/Text';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui';
import { ArticleList } from '@/entities/Article';
import { VStack } from '@/shared/ui/redesigned';
import { useArticleRecommendationsList } from '../api/articleRecommendationsApi';

interface ArticleRecommendationsListProps {
    className?: string
}

export const ArticleRecommendationsList = ({ className }:ArticleRecommendationsListProps) => {
    const { t } = useTranslation('articles');
    const { data: articles, isLoading } = useArticleRecommendationsList(4);

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
