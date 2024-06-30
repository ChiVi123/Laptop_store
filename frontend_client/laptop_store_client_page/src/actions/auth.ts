'use server';

import { cookies } from 'next/headers';

import { Key } from '~/common/enums';
import { apiRequest, logger } from '~/libs';
import { createResponseCookie, decodeJwt } from '~/libs/helper';
import { JwtType } from '~/libs/utilities';
import { ILoginBodyResponse } from '~/types/body.responses';
import { loginTypeSchema } from '~/types/schemas';

function buildRawLoginRes(message: string): ILoginBodyResponse {
    return { message, payload: { accessToken: '', expiration: 0, refreshToken: '' } };
}

export async function login(data: loginTypeSchema) {
    const cookieStore = cookies();
    const { payload } = await apiRequest
        .body(data)
        .post('auth/login')
        .fetchError((error): ILoginBodyResponse => {
            logger.error('login::', error.status, error.json);
            return buildRawLoginRes(error.json?.message ?? '');
        })
        .json<ILoginBodyResponse>();
    const { accessToken, refreshToken, expiration } = payload;
    const jwt = decodeJwt<JwtType>(accessToken);
    const cookieAccessToken = createResponseCookie(Key.ACCESS_TOKEN, accessToken, jwt.exp);
    const cookieRefreshToken = createResponseCookie(Key.REFRESH_TOKEN, refreshToken, expiration);

    cookieStore.set(cookieAccessToken);
    cookieStore.set(cookieRefreshToken);
    return payload;
}
