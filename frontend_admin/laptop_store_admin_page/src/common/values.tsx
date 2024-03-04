import { addProductFormData, loginFormData, registerFormData } from '~/types/form.data';

export const loginDefaultValues: loginFormData = {
    email: '',
    password: 'CrdyIGlWL2Rr6wToErci',
};
export const registerDefaultValues: registerFormData = {
    fullName: 'Chi Vi',
    email: '',
    password: '123456789',
    passwordConfirm: '123456789',
};
export const productDefaultValues: Omit<addProductFormData, 'categoryId' | 'brandId'> = {
    name: 'Product 1',
    description: '<h4>Thay vì sử dụng thiết kế phẳng</h4>',
    price: 10000,
    quantityStock: 10,
};
