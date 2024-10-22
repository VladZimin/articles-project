import { FC, lazy } from 'react';
import { ArticlesPageProps } from './ArticleDetailsPage';

export const ArticleDetailsPageAsync = lazy<FC<ArticlesPageProps>>(() => import('./ArticleDetailsPage'));
