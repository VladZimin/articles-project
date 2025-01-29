import {
    AnyAction, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { UserSchema } from '@/entities/User';
import { LoginSchema } from '@/features/AuthByUsername';
import { ArticleDetailsSchema } from '@/entities/Article';
import { AddCommentFormSchema } from '@/features/AddCommentForm';
import { ArticlesPageSchema } from '@/pages/ArticlesPage';
import { ScrollRestorationSchema } from '@/features/ScrollRestoration';
import { ArticleDetailsPageSchema } from '@/pages/ArticleDetailsPage/model/types';
import { rtkQueryApi } from '@/shared/api/rtkQueryApi';
import { ProfileSchema } from '@/features/EditableProfileCard';

export interface StateSchema {
    user: UserSchema;
    scroll: ScrollRestorationSchema
    [rtkQueryApi.reducerPath]: ReturnType<typeof rtkQueryApi.reducer>;
    // Асинхронные редюсеры
    articleDetails?: ArticleDetailsSchema
    loginForm?: LoginSchema;
    profile?: ProfileSchema;
    articleDetailsPage?: ArticleDetailsPageSchema;
    addCommentForm?: AddCommentFormSchema;
    articles?: ArticlesPageSchema
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => StateSchema;
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
