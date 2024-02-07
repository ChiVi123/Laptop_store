'use client';

import * as yup from 'yup';
import { EInvalid } from '~/common/enums';

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
