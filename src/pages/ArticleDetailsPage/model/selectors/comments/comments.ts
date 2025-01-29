import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleCommentsIsLoading = (state: StateSchema) => {
    return state.articleDetailsPage?.articleDetailsComments?.isLoading;
};
export const getArticleCommentsError = (state: StateSchema) => {
    return state.articleDetailsPage?.articleDetailsComments.error;
};
