import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Input } from '@/shared/ui/deprecated/Input';
import { Button } from '@/shared/ui';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { HStack } from '@/shared/ui/deprecated/Stack';
import { addCommentFormActions, addCommentFormReducer } from '../model/slice/addCommentFormSlice';
import { getAddCommentFormText } from '../model/selectors/getAddCommentForm';
import cls from './AddCommentForm.module.scss';

export interface AddCommentFormProps {
    className?: string
    onSendComment: (text: string) => void
}
const reducers: ReducersList = {
    addCommentForm: addCommentFormReducer,
};

const AddCommentForm = ({ className, onSendComment }:AddCommentFormProps) => {
    const text = useSelector(getAddCommentFormText);
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const onCommentChange = useCallback((value: string) => {
        dispatch(addCommentFormActions.setText(value));
    }, [dispatch]);

    const onSend = useCallback(() => {
        onSendComment(text || '');
        dispatch(addCommentFormActions.setText(''));
    }, [dispatch, onSendComment, text]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <HStack justify="between" className={classNames(cls.AddCommentForm, {}, [className])} max>
                <Input
                    className={cls.input}
                    placeholder={t('Введите текст')}
                    value={text}
                    onChange={onCommentChange}
                />
                <Button onClick={onSend}>{t('Отправить')}</Button>
            </HStack>
        </DynamicModuleLoader>
    );
};

export default AddCommentForm;
