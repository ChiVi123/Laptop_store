import { loginFormData, productFormData, registerFormData } from '~/types/form.data';

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
export const productDefaultValues: Omit<productFormData, 'categoryId' | 'brandId'> = {
    name: '',
    description: '',
    price: 10000,
    quantityStock: 10,
};
