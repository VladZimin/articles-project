import { ArticleBlockType } from '../../model/const/articleConst';
import { ArticleBlock } from '../../model/types/article';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';

import cls from './ArticleDetails.module.scss';

export const renderArticleBlock = (articleBlock: ArticleBlock) => {
    switch (articleBlock.type) {
    case ArticleBlockType.TEXT:
        return (
            <ArticleTextBlockComponent
                key={articleBlock.id}
                className={cls.block}
                block={articleBlock}
            />
        );
    case ArticleBlockType.CODE:
        return (
            <ArticleCodeBlockComponent
                key={articleBlock.id}
                block={articleBlock}
                className={cls.block}
            />
        );
    case ArticleBlockType.IMAGE:
        return (
            <ArticleImageBlockComponent
                key={articleBlock.id}
                block={articleBlock}
                className={cls.block}
            />
        );
    default:
        return null;
    }
};
