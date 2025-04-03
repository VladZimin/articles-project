import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RatingCard } from '@/entities/Rating';
import { useGetArticleRating, useRateArticle } from '../../api/articleRatingApi';
import { getUserAuthData } from '@/entities/User';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';

export interface ArticleRatingProps {
    className?: string
    articleId: string
}

const ArticleRating = ({
    className,
    articleId,
}:ArticleRatingProps) => {
    const { t } = useTranslation();
    const authData = useSelector(getUserAuthData);
    const { data, isLoading } = useGetArticleRating({ articleId, userId: authData?.id ?? '' });
    const [rateArticle] = useRateArticle();

    const handleRateArticle = (starsCount: number, feedback?: string) => {
        try {
            rateArticle({
                userId: authData?.id ?? '',
                rate: starsCount,
                articleId,
                feedback,
            });
        } catch (e) {
            console.log(e);
        }
    };

    const onAccept = (starsCount: number, feedback?: string) => {
        handleRateArticle(starsCount, feedback);
    };
    const onCancel = (starsCount: number) => {
        handleRateArticle(starsCount);
    };

    if (isLoading) {
        return (
            <Skeleton width="100%" height={120} />
        );
    }
    const rating = data?.[0];

    return (
        <RatingCard
            className={className}
            rate={rating?.rate}
            title={t('Оцените статью')}
            feedbackTitle={t('Пожалуйста, оставьте свой отзыв. Это поможет нам в развитии нашего проекта')}
            onAccept={onAccept}
            onCancel={onCancel}
            hasFeedback
        />
    );
};

export default ArticleRating;
