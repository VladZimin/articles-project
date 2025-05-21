import { useTranslation } from 'react-i18next';
import cls from './ArticleAdditionalInfo.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { User } from '@/entities/User';
import {
    Avatar, Button, HStack, Text, VStack,
} from '@/shared/ui/redesigned';

interface ArticleAdditionalInfoProps {
    className?: string
    author: User
    createdAt: string
    views: number
    onEdit: () => void
}

export const ArticleAdditionalInfo = (props: ArticleAdditionalInfoProps) => {
    const {
        className, author, createdAt, views, onEdit,
    } = props;

    const { t } = useTranslation('articles');

    return (
        <VStack
            className={classNames(cls.ArticleAdditionalInfo, {}, [className])}
            gap="32"
        >
            <HStack gap="8">
                <Avatar src={author.avatar} size={32} />
                <Text text={author.username} bold />
                <Text text={createdAt} />
            </HStack>
            <Button onClick={onEdit}>{t('Редактировать')}</Button>
            <Text text={`${views} ${t('просмотров')}`} />
        </VStack>
    );
};
