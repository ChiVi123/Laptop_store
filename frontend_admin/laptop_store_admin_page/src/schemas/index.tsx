'use client';

import { UploadApiResponse } from 'cloudinary';
import * as yup from 'yup';
import { EInvalid, EStatus } from '~/common/enums';

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
export const addProductSchema = yup.object({
    name: yupString().required(),
    categoryId: yup.number().integer().positive().required(),
    brandId: yup.number().integer().positive().required(),
    description: yupString().required(),
    price: yup.number().positive().required(),
    quantityStock: yup.number().min(0).required(),
    images: yup.array().min(1),
    status: yupString(),
});
export const addCategorySchema = yup.object({
    parentId: yup.number().integer().positive(),
    name: yupString().required(),
    path: yupString(),
    status: yupString(),
});
export const addBrandSchema = yup.object({
    name: yupString().required(),
    logo: yup
        .mixed<File | FormData | UploadApiResponse>()
        .test('required', 'Them logo cho thuong hieu nay', (value) => Boolean(value))
        .test('fileSize', 'File too large', (value) => {
            if (value instanceof File) return value.size <= 1048576;
            else return true;
        }),
    status: yup.string<EStatus>(),
});
