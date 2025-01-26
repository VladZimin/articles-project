import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { ListBox } from 'shared/ui/Popups';
import { Currency } from '../../Currency/model/types/currency';

interface CurrencySelectProps {
    className?: string
    updateCurrency?: (currency: Currency) => void
    value?: Currency
    readonly?: boolean
}
const optionsCurrency = [
    { value: Currency.RUB, content: Currency.RUB },
    { value: Currency.USD, content: Currency.USD },
    { value: Currency.EUR, content: Currency.EUR },
];
export const CurrencySelect = memo((props: CurrencySelectProps) => {
    const {
        className,
        updateCurrency,
        value,
        readonly,
    } = props;
    const { t } = useTranslation();

    const onUpdateSelect = useCallback((value: string) => {
        updateCurrency?.(value as Currency);
    }, [updateCurrency]);

    return (
        <ListBox
            className={classNames('', {}, [className])}
            items={optionsCurrency}
            onChange={onUpdateSelect}
            value={value}
            readonly={readonly}
            defaultValue={t('Укажите валюту')}
            label={t('Валюта')}
            direction="top right"
        />
    );
});
