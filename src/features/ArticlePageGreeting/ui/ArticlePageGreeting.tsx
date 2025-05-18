import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Text } from '@/shared/ui';
import { getJsonSettings, saveJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Modal } from '@/shared/ui/redesigned/Modal';

export const ArticlePageGreeting = () => {
    const { t } = useTranslation('articles');
    const [isOpen, setIsOpen] = useState(false);
    const { isArticlePageWasOpened } = useSelector(getJsonSettings);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isArticlePageWasOpened) {
            setIsOpen(true);
            dispatch(saveJsonSettings({ isArticlePageWasOpened: true }));
        }
    }, [dispatch, isArticlePageWasOpened]);

    const onClose = () => setIsOpen(false);

    return (
        <Modal lazy onClose={onClose} isOpen={isOpen}>
            <Text title="Добро пожаловать на страницу статей!" text={t('Привеееееееет!')} />
        </Modal>
    );
};
