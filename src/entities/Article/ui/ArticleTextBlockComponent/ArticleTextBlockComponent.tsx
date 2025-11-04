import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text as TextDeprecated } from '@/shared/ui';
import { Text } from '@/shared/ui/redesigned';
import { ArticleTextBlock } from '../../model/types/article';
import cls from './ArticleTextBlockComponent.module.scss';
import { ToggleFeaturesComponent } from '@/shared/lib/features';

interface ArticleTextBlockComponentProps {
  className?: string
  block: ArticleTextBlock
}

export const ArticleTextBlockComponent = memo((props:ArticleTextBlockComponentProps) => {
    const { className, block } = props;
    return (
        <div className={classNames('', {}, [className])}>
            {block.title && (
                <ToggleFeaturesComponent
                    name="isAppRedesigned"
                    on={<Text className={cls.title} title={block.title} />}
                    off={<TextDeprecated className={cls.title} title={block.title} />}
                />
            )}
            {block.paragraphs.map((paragraph) => (
                <ToggleFeaturesComponent
                    name="isAppRedesigned"
                    on={<Text className={cls.paragraph} text={paragraph} />}
                    off={<TextDeprecated className={cls.paragraph} text={paragraph} />}
                />
            ))}
        </div>
    );
});
