import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text as TextDeprecated } from '@/shared/ui';
import { Text } from '@/shared/ui/redesigned';
import cls from './ArticleImageBlockComponent.module.scss';
import { ArticleImageBlock } from '../../model/types/article';
import { ToggleFeaturesComponent } from '@/shared/lib/features';

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
                <ToggleFeaturesComponent
                    name="isAppRedesigned"
                    on={<Text text={block.title} align="center" />}
                    off={<TextDeprecated text={block.title} />}
                />
            )}
        </>
    );
});
