import { rtkQueryApi } from '@/shared/api/rtkQueryApi';
import { Rating } from '@/entities/Rating';

interface GetArticleRatingArg {
  userId: string,
  articleId: string
}
interface RateArticleArg {
  userId: string,
  articleId: string,
  rate: number,
  feedback?: string
}

const articleRatingApi = rtkQueryApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRating: build.query<Rating[], GetArticleRatingArg>({
            query: ({ userId, articleId }) => ({
                url: '/article-ratings',
                params: { userId, articleId },
            }),
        }),
        rateArticle: build.mutation<void, RateArticleArg>({
            query: (arg) => ({
                url: '/article-ratings',
                method: 'POST',
                body: arg,
            }),
        }),
    }),
});

export const useGetArticleRating = articleRatingApi.useGetArticleRatingQuery;
export const useRateArticle = articleRatingApi.useRateArticleMutation;
