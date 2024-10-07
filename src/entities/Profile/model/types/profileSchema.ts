import { Currency } from 'entities/Currency';
import { Countries } from 'entities/Country';

export enum ValidateProfileError {
    INVALID_USER_DATA = 'INVALID_USER_DATA',
    INVALID_AGE_DATA = 'INVALID_AGE_DATA',
    INVALID_COUNTRY_DATA = 'INVALID_COUNTRY_DATA',
    NO_DATA = 'NO_DATA',
    SERVER_ERROR = 'SERVER_ERROR'
}

export type Profile = {
    id?: string
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
    validateErrors?: ValidateProfileError[]
}
