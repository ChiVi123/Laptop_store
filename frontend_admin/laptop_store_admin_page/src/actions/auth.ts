'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { EKeys, EPath } from '~/common/enums';
import { MILLISECOND } from '~/common/values';
import { JwtType, apiRequest, createResponseCookie, decodeJwt, handleReturnError } from '~/libs';
import { loginFormData, registerFormData } from '~/types/form.data';
import { ILoginResponse } from '~/types/response';

export async function login(data: loginFormData) {
    const cookieStore = cookies();

    try {
        const result = await apiRequest.body(data).post('auth/login').json<ILoginResponse>();
        const { accessToken, refreshToken, expiration } = result.payload;

        const jwt = decodeJwt<JwtType>(accessToken);
        const cookieAccessToken = createResponseCookie(EKeys.ACCESS_TOKEN, accessToken, jwt.exp * MILLISECOND);
        const cookieRefreshToken = createResponseCookie(EKeys.REFRESH_TOKEN, refreshToken, expiration);

        cookieStore.set(cookieAccessToken);
        cookieStore.set(cookieRefreshToken);
    } catch (error) {
        return handleReturnError(error);
    }
    redirect(EPath.MANAGE_PRODUCT_LIST);
}
export async function verifyByToken(token: string) {
    const cookieStore = cookies();

    try {
        const result = await apiRequest.params({ token }).get('auth/registration-confirm').json<ILoginResponse>();
        const { accessToken, refreshToken, expiration } = result.payload;

        const jwt = decodeJwt<JwtType>(accessToken);
        const cookieAccessToken = createResponseCookie(EKeys.ACCESS_TOKEN, accessToken, jwt.exp * MILLISECOND);
        const cookieRefreshToken = createResponseCookie(EKeys.REFRESH_TOKEN, refreshToken, expiration);

        cookieStore.set(cookieAccessToken);
        cookieStore.set(cookieRefreshToken);
    } catch (error) {
        return handleReturnError(error);
    }
    redirect(EPath.MANAGE_PRODUCT_LIST);
}
export async function register(data: registerFormData) {
    try {
        await apiRequest
            .params({ app_url: EPath.AUTH_REGISTRATION_CONFIRM })
            .body(data)
            .post('auth/register-admin')
            .json();
    } catch (error) {
        return handleReturnError(error);
    }
    redirect(EPath.AUTH_NOTIFY_SEND_MAIL.concat('?variant=verify'));
}
export async function sendEmailVerify(email: string) {
    const data = { email, appURL: EPath.AUTH_REGISTRATION_CONFIRM };
    try {
        await apiRequest.body(data).put('auth/send-verification-token').json();
    } catch (error) {
        return handleReturnError(error);
    }
    redirect(EPath.AUTH_NOTIFY_SEND_MAIL.concat('?variant=verify'));
}
export async function sendEmailResetPassword(email: string) {
    const data = { email, appURL: EPath.AUTH_REGISTRATION_CONFIRM };
    try {
        await apiRequest.body(data).put('auth/reset-password').json();
    } catch (error) {
        return handleReturnError(error);
    }
    redirect(EPath.AUTH_NOTIFY_SEND_MAIL.concat('?variant=reset-password'));
}
