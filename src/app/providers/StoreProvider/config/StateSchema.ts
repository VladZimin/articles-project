import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features/AuthByUsername';
import {
    AnyAction, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { CombinedState } from 'redux';
import { ProfileSchema } from 'entities/Profile';
import { AxiosInstance } from 'axios';
import { ArticleDetailsSchema } from 'entities/Article';
import { ArticleDetailsCommentsSchema } from 'pages/ArticleDetailsPage';
import { AddCommentFormSchema } from 'features/AddCommentForm';
import { ArticlesPageSchema } from 'pages/ArticlesPage';
import { ScrollRestorationSchema } from 'features/ScrollRestoration';

export interface StateSchema {
    user: UserSchema;
    scroll: ScrollRestorationSchema

    // Асинхронные редюсеры
    articleDetails?: ArticleDetailsSchema
    loginForm?: LoginSchema;
    profile?: ProfileSchema;
    articleDetailsComments?: ArticleDetailsCommentsSchema;
    addCommentForm?: AddCommentFormSchema;
    articles?: ArticlesPageSchema
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
