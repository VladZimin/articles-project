import { classNames } from 'shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import { Input } from 'shared/ui/Input/Input';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { addCommentFormActions, addCommentFormReducer } from 'features/AddCommentForm/model/slice/addCommentFormSlice';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { useCallback } from 'react';
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
        <DynamicModuleLoader reducers={reducers}>
            <div className={classNames(cls.AddCommentForm, {}, [className])}>
                <Input
                    className={cls.input}
                    placeholder={t('Введите текст')}
                    value={text}
                    onChange={onCommentChange}
                />
                <Button onClick={onSend}>{t('Отправить')}</Button>
            </div>
        </DynamicModuleLoader>
    );
};

export default AddCommentForm;
