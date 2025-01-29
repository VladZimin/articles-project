import { Profile } from '@/entities/Profile';
import { ValidateProfileError } from '../const/editableProfileConst';

export type ProfileSchema = {
    data?: Profile
    form?: Profile
    isLoading: boolean
    error?: string
    readonly: boolean
    validateErrors?: ValidateProfileError[]
}
