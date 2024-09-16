import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { Loader, Text } from 'shared/ui';
import { useTranslation } from 'react-i18next';
import { Input } from 'shared/ui/Input/Input';
import { TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Countries, CountrySelect } from '../../../../entities/Country';
import { Currency, CurrencySelect } from '../../../../entities/Currency';
import cls from './ProfileCard.module.scss';
import { Profile } from '../../model/types/profileSchema';

interface ProfileCardProps {
    className?: string
    data?: Profile
    error?: string
    isLoading?: boolean
    readonly?: boolean
    updateLastName: (value?: string) => void
    updateFirstName: (value?: string) => void
    updateCity: (value?: string) => void
    updateAge: (value?: string) => void
    updateUsername: (value?: string) => void
    updateAvatar: (value?: string) => void
    updateCurrency: (currency: Currency) => void
    updateCountry: (country: Countries) => void
}

export const ProfileCard = (props:ProfileCardProps) => {
    const {
        className,
        data,
        isLoading,
        error,
        readonly,
        updateLastName,
        updateFirstName,
        updateAge,
        updateCity,
        updateAvatar,
        updateUsername,
        updateCurrency,
        updateCountry,
    } = props;

    const { t } = useTranslation('profile');

    const mods: Mods = {
        [cls.editMode]: !readonly,
    };

    if (isLoading) {
        return (
            <div className={classNames(cls.ProfileCard, {}, [className, cls.loading])}>
                <Loader />
            </div>
        );
    }
    if (error) {
        return (
            <div className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
                <Text
                    theme={TextTheme.ERROR}
                    title={t('Произошла непредвиденная ошибка')}
                    text={t('Попробуйте обновить страницу')}
                    align={TextAlign.CENTER}
                />
            </div>
        );
    }

    return (
        <div className={classNames(cls.ProfileCard, mods, [className])}>
            <div className={cls.avatarContainer}>
                <Avatar src={data?.avatar} alt="Select" size={150} />
            </div>
            <div>
                <Input
                    placeholder={t('Имя')}
                    value={data?.first}
                    className={cls.input}
                    readonly={readonly}
                    onChange={updateFirstName}
                />
                <Input
                    placeholder={t('Фамилия')}
                    value={data?.lastname}
                    className={cls.input}
                    readonly={readonly}
                    onChange={updateLastName}
                />
                <Input
                    placeholder={t('Возраст')}
                    value={data?.age}
                    className={cls.input}
                    readonly={readonly}
                    onChange={updateAge}
                />
                <Input
                    placeholder={t('Город')}
                    value={data?.city}
                    className={cls.input}
                    readonly={readonly}
                    onChange={updateCity}
                />
                <Input
                    placeholder={t('Юзернейм')}
                    value={data?.username}
                    className={cls.input}
                    readonly={readonly}
                    onChange={updateUsername}
                />
                <Input
                    placeholder={t('Ссылка на аватар')}
                    value={data?.avatar}
                    className={cls.input}
                    readonly={readonly}
                    onChange={updateAvatar}
                />
                <CurrencySelect
                    className={cls.input}
                    value={data?.currency}
                    updateCurrency={updateCurrency}
                    readonly={readonly}
                />
                <CountrySelect
                    className={cls.input}
                    value={data?.country}
                    updateCountry={updateCountry}
                    readonly={readonly}
                />
            </div>
        </div>
    );
};
