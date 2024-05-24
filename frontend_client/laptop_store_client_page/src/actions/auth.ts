'use server';

import { cookies } from 'next/headers';

import { Key } from '~/common/enums';
import { MILLISECOND } from '~/common/values';
import { apiRequest, logger } from '~/libs';
import { createResponseCookie, decodeJwt } from '~/libs/helper';
import { JwtType } from '~/libs/utilities';
import { ILoginBodyResponse } from '~/types/body.responses';
import { loginTypeSchema } from '~/types/schemas';

export async function login(data: loginTypeSchema) {
    const cookieStore = cookies();
    const { payload } = await apiRequest
        .body(data)
        .post('auth/login')
        .fetchError((error) => {
            logger.error('login::', error.status, error.json);
            return { payload: { accessToken: '', expiration: 0, refreshToken: '' } } as ILoginBodyResponse;
        })
        .json<ILoginBodyResponse>();
    const { accessToken, refreshToken, expiration } = payload;
    const jwt = decodeJwt<JwtType>(accessToken);
    const cookieAccessToken = createResponseCookie(Key.ACCESS_TOKEN, accessToken, jwt.exp * MILLISECOND);
    const cookieRefreshToken = createResponseCookie(Key.REFRESH_TOKEN, refreshToken, expiration);

    cookieStore.set(cookieAccessToken);
    cookieStore.set(cookieRefreshToken);
    return payload;
}
