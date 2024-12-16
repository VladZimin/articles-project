import { rtkQueryApi } from 'shared/api/rtkQueryApi';
import { Article } from 'entities/Article';

const recommendationsApi = rtkQueryApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRecommendationsList: build.query<Article[], number>({
            query: (limit) => ({
                url: '/articles',
                params: { _limit: limit },
            }),
        }),
    }),
});

export const useArticleRecommendationsList = recommendationsApi.useGetArticleRecommendationsListQuery;
