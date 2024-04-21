import { loginFormData, productFormData, registerFormData } from '~/types/form.data';

export const prefixFormatError = ['\x1b[31m%s\x1b[0m', ' X'];
export const loginDefaultValues: loginFormData = {
    email: '',
    password: '123456789',
};
export const registerDefaultValues: registerFormData = {
    fullName: 'Chi Vi',
    email: '',
    password: '123456789',
    passwordConfirm: '123456789',
};
export const productDefaultValues: productFormData = {
    name: '',
    categories: [],
    description: '',
    price: 10000,
    quantityStock: 10,
};
