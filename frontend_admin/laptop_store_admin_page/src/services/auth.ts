'use server';

import { redirect } from 'next/navigation';
import { EKeys, EPath } from '~/common/enums';
import httpRequest, { handleError } from '~/libs/http.request';
import { loginFormData, registerFormData } from '~/types/form.data';
import { ILoginResponse } from '~/types/response';
import { PathHandler } from '~/utils';
import { setCookieJwt, setCookieRefreshToken } from '~/utils/token';

const pathHandler = new PathHandler('auth');

export async function login(data: loginFormData) {
    const path = pathHandler.getPath('login');
    try {
        const { payload } = await httpRequest.post<ILoginResponse>(path, data, { cache: 'no-cache' });
        setCookieJwt(EKeys.ACCESS_TOKEN, payload.accessToken);
        setCookieRefreshToken(EKeys.REFRESH_TOKEN, payload.refreshToken, payload.expiration);
    } catch (error) {
        return handleError(error);
    }
    redirect(EPath.MANAGE_PRODUCT_LIST);
}
export async function verifyByToken(token: string) {
    const path = pathHandler.getPath('registration-confirm');
    try {
        const { payload } = await httpRequest.get<ILoginResponse>(path, { params: { token }, cache: 'no-cache' });
        setCookieJwt(EKeys.ACCESS_TOKEN, payload.accessToken);
        setCookieRefreshToken(EKeys.REFRESH_TOKEN, payload.refreshToken, payload.expiration);
    } catch (error) {
        return handleError(error);
    }
    redirect(EPath.MANAGE_PRODUCT_LIST);
}
export async function register(data: registerFormData) {
    const path = pathHandler.getPath('register-admin');
    const params = { app_url: EPath.AUTH_REGISTRATION_CONFIRM };
    try {
        await httpRequest.post(path, data, { params, cache: 'no-cache' });
    } catch (error) {
        return handleError(error);
    }
    redirect(EPath.AUTH_NOTIFY_SEND_MAIL.concat('?variant=verify'));
}
export async function sendEmailVerify(email: string) {
    const path = pathHandler.getPath('send-verification-token');
    const data = { email, appURL: EPath.AUTH_REGISTRATION_CONFIRM };
    try {
        await httpRequest.put(path, data, { cache: 'no-cache' });
    } catch (error) {
        return handleError(error);
    }
    redirect(EPath.AUTH_NOTIFY_SEND_MAIL.concat('?variant=verify'));
}
export async function sendEmailResetPassword(email: string) {
    const path = pathHandler.getPath('reset-password');
    const data = { email, appURL: EPath.AUTH_REGISTRATION_CONFIRM };
    try {
        await httpRequest.put(path, data, { cache: 'no-cache' });
    } catch (error) {
        return handleError(error);
    }
    redirect(EPath.AUTH_NOTIFY_SEND_MAIL.concat('?variant=reset-password'));
}
