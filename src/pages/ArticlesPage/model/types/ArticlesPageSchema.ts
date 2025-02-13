import { EntityState } from '@reduxjs/toolkit';
import { SortOrder } from '@/shared/types/sort';
import {
    Article, ArticleSortField, ArticleType, ArticleView,
} from '@/entities/Article';

export interface ArticlesPageSchema extends EntityState<Article, string>{
  isLoading: boolean;
  error?: string;
  view: ArticleView
  page: number
  limit: number
  hasMore: boolean
  _inited: boolean
  sort: ArticleSortField
  order: SortOrder
  search: string
  type: ArticleType;
}
