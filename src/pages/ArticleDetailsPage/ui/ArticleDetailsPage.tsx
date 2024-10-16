import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Text } from 'shared/ui';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AddCommentForm } from 'features/AddCommentForm';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Page } from 'widgets/Page/Page';
import { articleDetailsPageReducer } from 'pages/ArticleDetailsPage/model/slice';
import { TextSize } from 'shared/ui/Text/Text';
import {
    getArticlesRecommendations,
} from 'pages/ArticleDetailsPage/model/slice/articleDetailsPageRecommendationsSlice';
import {
    fetchRecommendationsArticles,
} from 'pages/ArticleDetailsPage/model/services/fetchRecommendationsArticles/fetchRecommendationsArticles';
import {
    getArticleRecommendationsIsLoading,
} from 'pages/ArticleDetailsPage/model/selectors/recommendations/recommendations';
import { addCommentForArticle } from '../model/services/addCommentForArticle/addCommentForArticle';
import { fetchCommentsById } from '../model/services/fetchCommentsById/fetchCommentsById';
import { CommentList } from '../../../entities/Comment';
import { getArticleCommentsIsLoading } from '../model/selectors/comments/comments';
import { getArticleComments } from '../model/slice/articleDetailsCommentsSlice';
import { ArticleDetails, ArticleList } from '../../../entities/Article';
import cls from './ArticleDetailsPage.module.scss';

export interface ArticlesPageProps {
    className?: string
}

const reducers: ReducersList = {
    articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = ({ className }:ArticlesPageProps) => {
    const { t } = useTranslation('articles');
    const { id } = useParams<{id: string }>();
    const comments = useSelector(getArticleComments.selectAll);
    const recommendations = useSelector(getArticlesRecommendations.selectAll);
    const recommendationsIsLoading = useSelector(getArticleRecommendationsIsLoading);
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useInitialEffect(() => {
        dispatch(fetchCommentsById(id));
        dispatch(fetchRecommendationsArticles());
    });

    const onBackToList = useCallback(() => {
        navigate(RoutePath.article);
    }, [navigate]);
    const onSendComment = useCallback((text: string) => {
        dispatch(addCommentForArticle(text));
    }, [dispatch]);

    if (!id) {
        return (
            <div className={classNames(cls.ArticlesDetailsPage, {}, [className])}>
                {t('Статья не найдена')}
            </div>
        );
    }
    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Page className={classNames(cls.ArticlesDetailsPage, {}, [className])}>
                <Button onClick={onBackToList}>
                    {t('Назад к списку')}
                </Button>
                <ArticleDetails id={id} />
                <Text className={cls.commentTitle} size={TextSize.L} text={t('Рекомендации')} />
                <ArticleList
                    target="_blank"
                    articles={recommendations}
                    isLoading={recommendationsIsLoading}
                    className={cls.recommendations}
                />
                <Text className={cls.commentTitle} size={TextSize.L} text={t('Комментарии')} />
                <AddCommentForm onSendComment={onSendComment} />
                <CommentList
                    isLoading={commentsIsLoading}
                    comments={comments}
                />
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);
