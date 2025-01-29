import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui';
import cls from './ArticleImageBlockComponent.module.scss';
import { ArticleImageBlock } from '../../model/types/article';

interface ArticleImageBlockComponentProps {
  className?: string
  block: ArticleImageBlock
}

export const ArticleImageBlockComponent = memo((props:ArticleImageBlockComponentProps) => {
    const { className, block } = props;
    return (
        <>
            <img src={block.src} alt={block.title} className={classNames(cls.img, {}, [className])} />
            {block.title && (
                <Text text={block.title} />
            )}
        </>
    );
});
