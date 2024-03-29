'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { EKeys, EPath } from '~/common/enums';
import httpRequest, { stringifyError } from '~/libs/http.request';
import { loginFormData, registerFormData } from '~/types/form.data';
import { ILoginResponse, IResponse } from '~/types/response';

export async function login(data: loginFormData) {
    try {
        const response = await httpRequest.post<ILoginResponse>('auth/login', data, { cache: 'no-cache' });
        cookies().set({
            name: EKeys.TOKEN,
            value: response.payload,
            httpOnly: true,
            secure: true,
        });
    } catch (error) {
        return stringifyError(error);
    }
    redirect(EPath.MANAGE_PRODUCT_LIST);
}
export async function verifyByToken(token: string) {
    let navigate = '';
    try {
        const response = await httpRequest.get<IResponse>('auth/registration-confirm', {
            params: { token },
            cache: 'no-cache',
        });
        cookies().set({
            name: EKeys.TOKEN,
            value: response.payload,
            httpOnly: true,
            secure: true,
        });
        navigate = EPath.MANAGE_PRODUCT_LIST;
    } catch (error) {
        navigate = EPath.AUTH_SEND_MAIL_VERIFY;
    }
    redirect(navigate);
}
export async function register(data: registerFormData) {
    const params = { app_url: EPath.AUTH_REGISTRATION_CONFIRM };
    try {
        await httpRequest.post('auth/register-admin', data, { params, cache: 'no-cache' });
    } catch (error) {
        return stringifyError(error);
    }
    redirect(EPath.AUTH_NOTIFY_SEND_MAIL.concat('?variant=verify'));
}
export async function sendEmailVerify(email: string) {
    const data = { email, appURL: EPath.AUTH_REGISTRATION_CONFIRM };
    try {
        await httpRequest.put('auth/send-verification-token', data, { cache: 'no-cache' });
    } catch (error) {
        return stringifyError(error);
    }
    redirect(EPath.AUTH_NOTIFY_SEND_MAIL.concat('?variant=verify'));
}
export async function sendEmailResetPassword(email: string) {
    const data = { email, appURL: EPath.AUTH_REGISTRATION_CONFIRM };
    try {
        await httpRequest.put('auth/reset-password', data, { cache: 'no-cache' });
    } catch (error) {
        return stringifyError(error);
    }
    redirect(EPath.AUTH_NOTIFY_SEND_MAIL.concat('?variant=reset-password'));
}
