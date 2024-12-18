import { Profile } from 'entities/Profile';

import { ValidateProfileError } from '../../const/editableProfileConst';

export const validateProfileData = (profile?: Profile) => {
    if (!profile) {
        return [ValidateProfileError.NO_DATA];
    }
    const {
        first, lastname, age, country,
    } = profile;
    const errors: ValidateProfileError[] = [];
    if (!lastname || !first) {
        errors.push(ValidateProfileError.INVALID_USER_DATA);
    }
    if (!age || !Number.isInteger(age)) {
        errors.push(ValidateProfileError.INVALID_AGE_DATA);
    }
    if (!country) {
        errors.push(ValidateProfileError.INVALID_COUNTRY_DATA);
    }
    return errors;
};
