'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { EKeys, EPath } from '~/common/enums';
import { MILLISECOND } from '~/common/values';
import { JwtType, apiRequest } from '~/libs';
import { handleReturnError } from '~/libs/helper.request';
import { createResponseCookie, decodeJwt } from '~/libs/helper.token';
import { loginFormData } from '~/types/form.data';
import { ILoginResponse } from '~/types/response';

export async function login(data: loginFormData) {
    const cookieStore = cookies();

    try {
        const result = await apiRequest.body(data).post('auth/login', { cache: 'no-store' }).json<ILoginResponse>();
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
