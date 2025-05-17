import { HTMLAttributeAnchorTarget } from 'react';
import { ArticleView } from '../../model/const/articleConst';
import {
    Article,
} from '../../model/types/article';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import {
    ArticleListItemDeprecated,
} from './ArticleListItemDeprecated/ArticleListItemDeprecated';
import {
    ArticleListItemRedesigned,
} from './ArticleListItemRedesigned/ArticleListItemRedesigned';

export interface ArticleListItemProps {
  className?: string
  article: Article
  view: ArticleView
  target?: HTMLAttributeAnchorTarget
}

export const ArticleListItem = (props: ArticleListItemProps) => {
    return (
        <ToggleFeaturesComponent
            name="isAppRedesigned"
            on={<ArticleListItemRedesigned {...props} />}
            off={<ArticleListItemDeprecated {...props} />}
        />
    );
};
