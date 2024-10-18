import { ArticleDetailsCommentsSchema } from './ArticleDetailsCommentsSchema';
import { ArticleDetailsPageRecommendationsSchema } from './ArticleDetailsPageRecommendationsSchema';

export interface ArticleDetailsPageSchema {
  articleDetailsComments: ArticleDetailsCommentsSchema,
  articleDetailsRecommendations: ArticleDetailsPageRecommendationsSchema,
}
