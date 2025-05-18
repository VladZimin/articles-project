import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserView, MobileView } from 'react-device-detect';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { Card } from '@/shared/ui/deprecated/Card';
import { StarRating } from '@/shared/ui/deprecated/StarRating';
import {
    Button, ButtonTheme, Text,
} from '@/shared/ui';
import { VStack, HStack } from '@/shared/ui/redesigned';
import { Input } from '@/shared/ui/deprecated/Input';
import { Modal } from '@/shared/ui/redesigned/Modal';

interface RatingCardProps {
  className?: string
  feedbackTitle?: string
  title?: string
  hasFeedback?: boolean
  onCancel?: (starsCount: number) => void
  onAccept?: (starsCount: number, feedback?: string) => void
  rate?: number
}

export const RatingCard = ({
    className,
    feedbackTitle,
    title = 'Ваша оценка:',
    hasFeedback,
    onCancel,
    onAccept,
    rate = 0,
}:RatingCardProps) => {
    const { t } = useTranslation();
    const [starsCount, setStarsCount] = useState(rate);
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
        onCancel?.(starsCount);
        setIsOpenModal(false);
    }, [onCancel, starsCount]);
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
        <Card className={className}>
            <VStack align="center" gap="8">
                <Text title={starsCount ? t('Спасибо за отзыв!') : title} />
                <StarRating selectedStars={starsCount} size={40} onSelect={onSelectStars} />
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
