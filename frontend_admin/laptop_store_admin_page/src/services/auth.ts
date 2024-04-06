'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { EKeys, EPath } from '~/common/enums';
import httpRequest, { stringifyError } from '~/libs/http.request';
import { loginFormData, registerFormData } from '~/types/form.data';
import { ILoginResponse, IResponse } from '~/types/response';
import { PathHandler } from '~/utils';
import { decodeJwt, jwtType } from '~/utils/token';

function setCookieJwt(name: EKeys, value: string) {
    const milliSecond = 1000;
    const jwt = decodeJwt<jwtType>(value);
    cookies().set({ name, value, httpOnly: true, secure: true, expires: jwt.exp * milliSecond });
}
const pathHandler = new PathHandler('auth');

export async function login(data: loginFormData) {
    const path = pathHandler.getPath('login');
    try {
        const response = await httpRequest.post<ILoginResponse>(path, data, { cache: 'no-cache' });
        setCookieJwt(EKeys.TOKEN, response.payload);
    } catch (error) {
        return stringifyError(error);
    }
    redirect(EPath.MANAGE_PRODUCT_LIST);
}
export async function verifyByToken(token: string) {
    const path = pathHandler.getPath('registration-confirm');
    try {
        const response = await httpRequest.get<IResponse>(path, { params: { token }, cache: 'no-cache' });
        setCookieJwt(EKeys.TOKEN, response.payload);
    } catch (error) {
        return stringifyError(error);
    }
    redirect(EPath.MANAGE_PRODUCT_LIST);
}
export async function register(data: registerFormData) {
    const path = pathHandler.getPath('register-admin');
    const params = { app_url: EPath.AUTH_REGISTRATION_CONFIRM };
    try {
        await httpRequest.post(path, data, { params, cache: 'no-cache' });
    } catch (error) {
        return stringifyError(error);
    }
    redirect(EPath.AUTH_NOTIFY_SEND_MAIL.concat('?variant=verify'));
}
export async function sendEmailVerify(email: string) {
    const path = pathHandler.getPath('send-verification-token');
    const data = { email, appURL: EPath.AUTH_REGISTRATION_CONFIRM };
    try {
        await httpRequest.put(path, data, { cache: 'no-cache' });
    } catch (error) {
        return stringifyError(error);
    }
    redirect(EPath.AUTH_NOTIFY_SEND_MAIL.concat('?variant=verify'));
}
export async function sendEmailResetPassword(email: string) {
    const path = pathHandler.getPath('reset-password');
    const data = { email, appURL: EPath.AUTH_REGISTRATION_CONFIRM };
    try {
        await httpRequest.put(path, data, { cache: 'no-cache' });
    } catch (error) {
        return stringifyError(error);
    }
    redirect(EPath.AUTH_NOTIFY_SEND_MAIL.concat('?variant=reset-password'));
}
