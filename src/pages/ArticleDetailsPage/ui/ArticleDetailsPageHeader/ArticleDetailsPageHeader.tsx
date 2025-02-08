import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from '@/shared/ui';
import { classNames } from '@/shared/lib/classNames/classNames';
import { getArticleDetailsData } from '@/entities/Article';
import { getCanEditArticle } from '../../model/selectors/article/article';
import cls from './ArticleDetailsPageHeader.module.scss';
import { RoutePath } from '@/shared/const/router';

interface ArticleDetailsPageHeaderProps {
    className?: string
}

export const ArticleDetailsPageHeader = (props: ArticleDetailsPageHeaderProps) => {
    const { className } = props;
    const { t } = useTranslation('articles');
    const navigate = useNavigate();
    const canEdit = useSelector(getCanEditArticle);
    const article = useSelector(getArticleDetailsData);

    const onBackToList = useCallback(() => {
        navigate(RoutePath.article);
    }, [navigate]);
    const onEditArticle = useCallback(() => {
        navigate(`${RoutePath.articleDetails}${article?.id}/edit`);
    }, [article?.id, navigate]);

    return (
        <div className={classNames(cls.ArticleDetailsPageHeader, {}, [className])}>
            <Button onClick={onBackToList}>
                {t('Назад к списку')}
            </Button>
            {
                canEdit && (
                    <Button onClick={onEditArticle}>
                        {t('Редактировать')}
                    </Button>
                )
            }
        </div>
    );
};
