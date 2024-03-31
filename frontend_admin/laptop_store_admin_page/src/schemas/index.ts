'use client';

import * as yup from 'yup';
import { EInvalid, EStatus } from '~/common/enums';
import { ICategory, IImage } from '~/types/models';

function yupString() {
    return yup.string().trim();
}

const email = yupString().required(EInvalid.EMAIL_REQUIRED).email(EInvalid.EMAIL_FORMAT);
const password = yupString().required(EInvalid.PASSWORD_REQUIRED);

export const loginSchema = yup.object({ email, password });
export const registerSchema = yup.object({
    fullName: yupString().required(EInvalid.FULL_NAME_REQUIRED),
    email,
    password,
    passwordConfirm: yupString()
        .required(EInvalid.PASSWORD_CONFIRM_REQUIRED)
        .oneOf([yup.ref('password')], EInvalid.PASSWORD_CONFIRM_MATCH),
});
export const sendMailSchema = yup.object({ email });
export const productSchema = yup.object({
    name: yupString().required(),
    categories: yup.array(yup.mixed<ICategory>().required()).required(),
    categoryIds: yup.array(yup.number().required()),
    description: yupString().required(),
    price: yup.number().positive().required(),
    quantityStock: yup.number().min(0).required(),
    images: yup.array().of(yup.mixed<File | IImage>()).min(1),
    status: yupString(),
});
export const categorySchema = yup.object({
    parentId: yup.number().integer().positive(),
    name: yupString().required(),
    path: yupString(),
    status: yupString(),
});
export const brandSchema = yup.object({
    name: yupString().required(),
    logo: yup
        .mixed<File | FormData | IImage>()
        .test('required', 'Them logo cho thuong hieu nay', (value) => Boolean(value))
        .test('fileSize', 'Kich thuoc file qua lon', (value) => {
            if (value instanceof File) return value.size <= 1048576;
            else return true;
        }),
    status: yup.string<EStatus>(),
});