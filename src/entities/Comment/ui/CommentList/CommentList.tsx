import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui';
import { useTranslation } from 'react-i18next';
import { VStack } from 'shared/ui/Stack/VStack/VStack';
import { Comment } from '../../model/types/comment';
import { CommentCard } from '../CommentCard/CommentCard';

interface CommentListProps {
    className?: string
    comments?: Comment[]
    isLoading?: boolean
}

export const CommentList = (props: CommentListProps) => {
    const { className, comments, isLoading } = props;
    const { t } = useTranslation();
    return (
        <VStack max gap="8" className={classNames('', {}, [className])}>
            {
                comments?.length
                    ? comments.map((comment) => (
                        <CommentCard
                            isLoading={isLoading}
                            key={comment.id}
                            comment={comment}
                        />
                    ))
                    : <Text text={t('Комментарии отсутствуют')} />
            }
        </VStack>
    );
};
