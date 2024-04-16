'use server';

import { redirect } from 'next/navigation';
import { EKeys, EPath } from '~/common/enums';
import httpRequest, { FetchError } from '~/libs/http.request';
import { loginFormData, registerFormData } from '~/types/form.data';
import { ILoginResponse } from '~/types/response';
import { PathHandler } from '~/utils';
import { setCookieJwt, setCookieRefreshToken } from '~/utils/token';

const pathHandler = new PathHandler('auth');

export async function login(data: loginFormData) {
    const path = pathHandler.getPath('login');
    return httpRequest
        .post<ILoginResponse>(path, data, { cache: 'no-cache' })
        .then(({ payload }) => {
            setCookieJwt(EKeys.ACCESS_TOKEN, payload.accessToken);
            setCookieRefreshToken(EKeys.REFRESH_TOKEN, payload.refreshToken, payload.expiration);
            redirect(EPath.MANAGE_PRODUCT_LIST);
        })
        .catch((error) => {
            if (error instanceof FetchError) {
                return { error: error.body.message };
            } else {
                return { error: 'Something went wrong!!!' };
            }
        });
}
export async function verifyByToken(token: string) {
    const path = pathHandler.getPath('registration-confirm');

    return httpRequest
        .get<ILoginResponse>(path, { params: { token }, cache: 'no-cache' })
        .then(({ payload }) => {
            setCookieJwt(EKeys.ACCESS_TOKEN, payload.accessToken);
            setCookieRefreshToken(EKeys.REFRESH_TOKEN, payload.refreshToken, payload.expiration);
            redirect(EPath.MANAGE_PRODUCT_LIST);
        })
        .catch((error) => {
            if (error instanceof FetchError) {
                return { error: error.body.message };
            } else {
                return { error: 'Something went wrong!!!' };
            }
        });
}
export async function register(data: registerFormData) {
    const path = pathHandler.getPath('register-admin');
    const params = { app_url: EPath.AUTH_REGISTRATION_CONFIRM };

    return httpRequest
        .post(path, data, { params, cache: 'no-cache' })
        .then(() => {
            redirect(EPath.AUTH_NOTIFY_SEND_MAIL.concat('?variant=verify'));
        })
        .catch((error) => {
            if (error instanceof FetchError) {
                return { error: error.body.message };
            } else {
                return { error: 'Something went wrong!!!' };
            }
        });
}
export async function sendEmailVerify(email: string) {
    const path = pathHandler.getPath('send-verification-token');
    const data = { email, appURL: EPath.AUTH_REGISTRATION_CONFIRM };

    return httpRequest
        .put(path, data, { cache: 'no-cache' })
        .then(() => {
            redirect(EPath.AUTH_NOTIFY_SEND_MAIL.concat('?variant=verify'));
        })
        .catch((error) => {
            if (error instanceof FetchError) {
                return { error: error.body.message };
            } else {
                return { error: 'Something went wrong!!!' };
            }
        });
}
export async function sendEmailResetPassword(email: string) {
    const path = pathHandler.getPath('reset-password');
    const data = { email, appURL: EPath.AUTH_REGISTRATION_CONFIRM };

    return httpRequest
        .put(path, data, { cache: 'no-cache' })
        .then(() => {
            redirect(EPath.AUTH_NOTIFY_SEND_MAIL.concat('?variant=reset-password'));
        })
        .catch((error) => {
            if (error instanceof FetchError) {
                return { error: error.body.message };
            } else {
                return { error: 'Something went wrong!!!' };
            }
        });
}
