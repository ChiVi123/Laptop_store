import { TLoginFormData, TRegisterFormData } from '~/types/form.data';

export const loginDefaultValues: TLoginFormData = { email: '', password: '' };
export const registerDefaultValues: TRegisterFormData = {
    fullName: '',
    email: '',
    otp: '',
    password: '',
    passwordConfirm: '',
};
