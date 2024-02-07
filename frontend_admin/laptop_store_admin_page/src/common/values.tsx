import { loginFormData, registerFormData } from '~/types/form.data';

export const loginDefaultValues: loginFormData = {
    email: process.env.REACT_INPUT_EMAIL || '',
    password: '123456789',
};
export const registerDefaultValues: registerFormData = {
    fullName: 'Chi Vi',
    email: process.env.REACT_INPUT_EMAIL || '',
    password: '123456789',
    passwordConfirm: '123456789',
};
