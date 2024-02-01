import { TLoginFormData, TRegisterFormData } from '~/types/form.data';

export const loginDefaultValues: TLoginFormData = {
    email: 'nhcv@gmail.com',
    password: '123456789',
};
export const registerDefaultValues: TRegisterFormData = {
    fullName: '',
    email: '',
    otp: '',
    password: '',
    passwordConfirm: '',
};
