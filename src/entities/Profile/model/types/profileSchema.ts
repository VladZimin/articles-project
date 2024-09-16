import { Currency } from 'entities/Currency';
import { Countries } from 'entities/Country';

export type Profile = {
    first?: string,
    lastname?: string,
    age?: number,
    currency?: Currency,
    country?: Countries,
    city?: string,
    username?: string,
    avatar?: string
}

export type ProfileSchema = {
    data?: Profile
    form?: Profile
    isLoading: boolean
    error?: string
    readonly: boolean
}
