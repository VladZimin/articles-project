import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserView, MobileView } from 'react-device-detect';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/Card/Card';
import {
    Button, ButtonTheme, Modal, Text,
} from '@/shared/ui';
import { StarRating } from '@/shared/ui/StarRating/StarRating';
import { VStack } from '@/shared/ui/Stack/VStack/VStack';
import { Input } from '@/shared/ui/Input/Input';
import { HStack } from '@/shared/ui/Stack/HStack/HStack';
import { Drawer } from '@/shared/ui/Drawer/Drawer';

interface RatingCardProps {
  className?: string
  feedbackTitle?: string
  title?: string
  hasFeedback?: boolean
  onCansel?: (starsCount: number) => void
  onAccept?: (starsCount: number, feedback?: string) => void
}

export const RatingCard = ({
    className,
    feedbackTitle,
    title = 'Ваша оценка:',
    hasFeedback,
    onCansel,
    onAccept,
}:RatingCardProps) => {
    const { t } = useTranslation();
    const [starsCount, setStarsCount] = useState(0);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [feedback, setFeedback] = useState('');

    const onSelectStars = useCallback((starsCount: number) => {
        setStarsCount(starsCount);
        if (hasFeedback) {
            setIsOpenModal(true);
        } else {
            onAccept?.(starsCount);
        }
    }, [hasFeedback, onAccept]);
    const cancelHandle = useCallback(() => {
        onCansel?.(starsCount);
        setIsOpenModal(false);
    }, [onCansel, starsCount]);
    const acceptHandle = useCallback(() => {
        onAccept?.(starsCount, feedback);
        setIsOpenModal(false);
    }, [feedback, onAccept, starsCount]);

    const modalContent = (
        <>
            <Text title={feedbackTitle} />
            <Input onChange={setFeedback} placeholder={t('Ваш отзыв')} />
        </>
    );

    return (
        <Card className={classNames('', {}, [className])}>
            <VStack align="center" gap="8">
                <Text title={title} />
                <StarRating size={40} onSelect={onSelectStars} />
            </VStack>
            <BrowserView>
                <Modal isOpen={isOpenModal} onClose={cancelHandle} lazy>
                    <VStack max gap="32">
                        {modalContent}
                        <HStack align="center" gap="32" justify="end" max>
                            <Button onClick={cancelHandle} theme={ButtonTheme.OUTLINE_RED}>
                                {t('Отмена')}
                            </Button>
                            <Button onClick={acceptHandle}>
                                {t('Отправить')}
                            </Button>
                        </HStack>
                    </VStack>
                </Modal>
            </BrowserView>
            <MobileView>
                <Drawer isOpen={isOpenModal} onClose={cancelHandle}>
                    <VStack max gap="32">
                        {modalContent}
                        <Button onClick={acceptHandle} fullwidth>
                            {t('Отправить')}
                        </Button>
                    </VStack>
                </Drawer>
            </MobileView>
        </Card>
    );
};
