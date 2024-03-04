'use server';

import { cookies } from 'next/headers';
import { EKeys, EPath } from '~/common/enums';
import { loginFormData, registerFormData } from '~/types/form.data';
import { logger, request } from '~/utils';

export async function verifyTokenAction(token: string) {
    try {
        const response = await request.get('auth/registration-confirm', { params: { token }, cache: 'no-cache' });
        const result = await response.json();
        if (result.success) {
            cookies().set({
                name: EKeys.TOKEN,
                value: result.data,
                httpOnly: true,
                secure: true,
            });
        }
        return result;
    } catch (error) {
        logger({ [verifyTokenAction.name]: error });
    }
}

export async function loginAction(data: loginFormData) {
    try {
        const response = await request.post('auth/login', { data, cache: 'no-cache' });
        const result = await response.json();
        if (result.success) {
            cookies().set({
                name: EKeys.TOKEN,
                value: result.data,
                httpOnly: true,
                secure: true,
            });
        }
        return result;
    } catch (error) {
        logger({ [loginAction.name]: error });
    }
}

export async function registerAction(data: registerFormData) {
    try {
        const response = await request.post('auth/register-admin', {
            params: { app_url: EPath.AUTH_REGISTRATION_CONFIRM },
            data,
            cache: 'no-cache',
        });
        return await response.json();
    } catch (error) {
        logger({ [registerAction.name]: error });
    }
}

export async function sendEmailVerifyAction(email: string) {
    try {
        const response = await request.put('auth/send-verification-token', {
            data: { email, appURL: EPath.AUTH_REGISTRATION_CONFIRM },
            cache: 'no-cache',
        });
        return await response.json();
    } catch (error) {
        logger({ [sendEmailVerifyAction.name]: error });
    }
}

export async function sendEmailResetPasswordAction(email: string) {
    try {
        const response = await request.put('auth/reset-password', {
            data: { email, appURL: EPath.AUTH_REGISTRATION_CONFIRM },
            cache: 'no-cache',
        });
        return await response.json();
    } catch (error) {
        logger({ [sendEmailResetPasswordAction.name]: error });
    }
}
