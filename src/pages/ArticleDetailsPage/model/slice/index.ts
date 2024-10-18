import { combineReducers } from '@reduxjs/toolkit';
import { articleDetailsCommentsReducer } from './articleDetailsCommentsSlice';
import { articleDetailsRecommendationsReducer } from './articleDetailsPageRecommendationsSlice';

export const articleDetailsPageReducer = combineReducers({
    articleDetailsComments: articleDetailsCommentsReducer,
    articleDetailsRecommendations: articleDetailsRecommendationsReducer,
});
