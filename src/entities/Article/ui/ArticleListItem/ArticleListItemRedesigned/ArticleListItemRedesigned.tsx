import { useTranslation } from 'react-i18next';
import cls from './ArticleListItemRedesigned.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import { ArticleListItemProps } from '../ArticleListItem';
import { ArticleBlockType, ArticleView } from '../../../model/const/articleConst';
import {
    Card, Icon, Text, Button, Avatar, AppLink, AppImage, Skeleton, HStack, VStack,
} from '@/shared/ui/redesigned';
import { getRouteArticleDetails } from '@/shared/const/router';
import { ArticleTextBlock } from '../../../model/types/article';

export const ArticleListItemRedesigned = (props: ArticleListItemProps) => {
    const {
        className,
        article,
        view,
        target,
    } = props;
    const { t } = useTranslation('articles');

    const userInfo = (
        <>
            <Avatar src={article.user.avatar} size={32} />
            <Text text={article.user.username} bold />
        </>
    );
    const articleViews = (
        <HStack gap="8">
            <Icon Svg={EyeIcon} />
            <Text text={String(article.views)} className={cls.views} />
        </HStack>
    );

    const textBlock = article.blocks.find((block) => block.type === ArticleBlockType.TEXT) as ArticleTextBlock;

    if (view === ArticleView.BIG) {
        return (
            <Card max padding="24" className={classNames(cls.BIG, {}, [className])}>
                <VStack max gap="16">
                    <HStack max gap="8">
                        {userInfo}
                        <Text text={article.createdAt} />
                    </HStack>
                    <Text title={article.title} bold />
                    <Text title={article.subtitle} size="s" />
                    <AppImage
                        fallback={<Skeleton height={420} width="100%" />}
                        src={article.img}
                        alt={article.title}
                        className={cls.imgRedesigned}
                    />
                    {textBlock?.paragraphs && (
                        <Text
                            text={textBlock.paragraphs.slice(0, 2).join(' ')}
                            className={cls.textBlockRedesigned}
                        />
                    )}
                    <HStack max justify="between">
                        <AppLink to={getRouteArticleDetails(article.id)}>
                            <Button variant="outline">
                                {t('Читать далее')}
                                ...
                            </Button>
                        </AppLink>
                        {articleViews}
                    </HStack>
                </VStack>
            </Card>
        );
    }
    return (
        <AppLink
            target={target}
            to={getRouteArticleDetails(article.id)}
            className={classNames(cls.SMALL, {}, [className])}
        >
            <Card className={cls.card}>
                <AppImage
                    fallback={<Skeleton height={200} width={200} />}
                    src={article.img}
                    alt={article.title}
                    className={cls.img}
                />
                <VStack gap="4" className={cls.info}>
                    <Text text={article.title} />
                    <VStack max gap="4" className={cls.footer}>
                        <HStack justify="between" max>
                            <Text text={article.createdAt} />
                            {articleViews}
                        </HStack>
                        <HStack gap="4">{userInfo}</HStack>
                    </VStack>
                </VStack>
            </Card>
        </AppLink>
    );
};
