'use server';

import { redirect } from 'next/navigation';
import { EKeys, EPath } from '~/common/enums';
import { apiRequest } from '~/libs';
import { handleReturnError } from '~/libs/helper.request';
import { setCookieToken } from '~/libs/helper.token';
import { loginFormData } from '~/types/form.data';
import { ILoginResponse } from '~/types/response';
import { setCookieJwt } from '~/utils/token';

export async function login(data: loginFormData) {
    try {
        const result = await apiRequest.body(data).post('auth/login', { cache: 'no-store' }).json<ILoginResponse>();
        const { accessToken, refreshToken, expiration } = result.payload;
        setCookieJwt(EKeys.ACCESS_TOKEN, accessToken);
        setCookieToken(EKeys.REFRESH_TOKEN, refreshToken, expiration);
    } catch (error) {
        return handleReturnError(error);
    }
    redirect(EPath.MANAGE_PRODUCT_LIST);
}
