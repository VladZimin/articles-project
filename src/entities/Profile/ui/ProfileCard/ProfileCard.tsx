import { Countries } from '../../../../entities/Country';
import { Currency } from '../../../../entities/Currency';
import { Profile } from '../../model/types/profileSchema';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import {
    ProfileCardRedesigned, ProfileCardRedesignedError,
    ProfileCardRedesignedLoader,
} from '../ProfileCardRedesigned/ProfileCardRedesigned';
import {
    ProfileCardDeprecated, ProfileCardDeprecatedError,
    ProfileCardDeprecatedLoader,
} from '../ProfileCardDeprecated/ProfileCardDeprecated';

export interface ProfileCardProps {
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
    const { isLoading, error } = props;

    if (isLoading) {
        return (
            <ToggleFeaturesComponent
                name="isAppRedesigned"
                on={<ProfileCardRedesignedLoader />}
                off={<ProfileCardDeprecatedLoader />}
            />
        );
    }
    if (error) {
        return (
            <ToggleFeaturesComponent
                name="isAppRedesigned"
                on={<ProfileCardRedesignedError />}
                off={<ProfileCardDeprecatedError />}
            />
        );
    }

    return (
        <ToggleFeaturesComponent
            name="isAppRedesigned"
            on={<ProfileCardRedesigned {...props} />}
            off={<ProfileCardDeprecated {...props} />}
        />
    );
};
