'use server';

import { cookies } from 'next/headers';
import { EKeys, EPath } from '~/common/enums';
import { loginFormData, registerFormData } from '~/types/form.data';
import { IErrorResponse, ILoginResponse, IRegisterResponse, IVoidResponse } from '~/types/response';
import { request } from './request';

export async function verifyTokenAction(token: string) {
    try {
        const response = await request.get<ILoginResponse, IErrorResponse>('auth/registration-confirm', {
            params: { token },
            cache: 'no-cache',
        });
        if (response.success) {
            cookies().set({
                name: EKeys.TOKEN,
                value: response.data,
                httpOnly: true,
                secure: true,
            });
        }
        return response;
    } catch (error) {
        console.log(error);
    }
}

export async function loginAction(data: loginFormData) {
    try {
        const response = await request.post<ILoginResponse, IErrorResponse>('auth/login', {
            data,
            json: true,
            cache: 'no-cache',
        });

        if (response.success) {
            cookies().set({
                name: EKeys.TOKEN,
                value: response.data,
                httpOnly: true,
                secure: true,
            });
        }

        return response;
    } catch (error) {
        console.log(error);
    }
}

export async function registerAction(data: registerFormData) {
    try {
        const response = await request.post<IRegisterResponse, IErrorResponse>('auth/register-admin', {
            params: { app_url: EPath.AUTH_REGISTRATION_CONFIRM },
            data,
            json: true,
            cache: 'no-cache',
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}

export async function sendEmailVerifyAction(email: string) {
    try {
        const response = await request.put<IVoidResponse, IErrorResponse>('auth/send-verification-token', {
            data: { email, appURL: EPath.AUTH_REGISTRATION_CONFIRM },
            json: true,
            cache: 'no-cache',
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}

export async function sendEmailResetPasswordAction(email: string) {
    try {
        const response = await request.put<IVoidResponse, IErrorResponse>('auth/reset-password', {
            data: { email, appURL: EPath.AUTH_REGISTRATION_CONFIRM },
            json: true,
            cache: 'no-cache',
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}
