import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { Card } from '@/shared/ui/redesigned';
import { ArticleAdditionalInfo } from '@/widgets/ArticleAdditionalInfo';
import { getArticleDetailsData } from '@/entities/Article';
import cls from './AdditionalInfoContainer.module.scss';
import { getRouteArticleEdit } from '@/shared/const/router';

export const AdditionalInfoContainer = () => {
    const article = useSelector(getArticleDetailsData);
    const navigate = useNavigate();

    const onEditArticle = useCallback(() => {
        navigate(getRouteArticleEdit(article?.id ?? ''));
    }, [article?.id, navigate]);

    if (!article) {
        return null;
    }
    return (
        <Card padding="24" border="round" className={cls.card}>
            <ArticleAdditionalInfo
                author={article.user}
                createdAt={article.createdAt}
                views={article.views}
                onEdit={onEditArticle}
            />
        </Card>
    );
};
