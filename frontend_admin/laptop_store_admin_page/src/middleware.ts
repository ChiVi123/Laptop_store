import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { EKeys, EPath } from './common/enums';
import { MILLISECOND } from './common/values';
import { JwtType, apiRequest } from './libs';
import { createResponseCookie, decodeJwt } from './libs/helper.token';
import logger from './libs/logger';
import { IBodyResponse } from './types/body.response';

export async function middleware(request: NextRequest) {
    const { method, url, nextUrl } = request;
    const { pathname } = nextUrl;

    const responseNext = NextResponse.next();
    const responseRedirectLogin = NextResponse.redirect(new URL(EPath.AUTH_LOGIN, url));
    const responseRedirectProductList = NextResponse.redirect(new URL(EPath.MANAGE_PRODUCT_LIST, url));

    const cookieStore = cookies();
    const refreshToken = cookieStore.get(EKeys.REFRESH_TOKEN)?.value;
    let accessToken = cookieStore.get(EKeys.ACCESS_TOKEN)?.value;

    logger.coffee('middleware request::', method, pathname);

    if (!accessToken && refreshToken) {
        try {
            const { payload } = await apiRequest
                .body({ refreshToken })
                .post('auth/refresh-token')
                .json<IBodyResponse>();
            const jwt = decodeJwt<JwtType>(payload);
            const cookieAccessToken = createResponseCookie(EKeys.ACCESS_TOKEN, payload, jwt.exp * MILLISECOND);

            responseNext.cookies.set(cookieAccessToken);
            responseRedirectProductList.cookies.set(cookieAccessToken);
            accessToken = payload;
        } catch (error) {
            logger.anger('middleware error::', error);
        }
    }
    if (pathname.startsWith('/auth') && accessToken) {
        return responseRedirectProductList;
    }
    if (pathname.startsWith('/manage') && !accessToken) {
        return responseRedirectLogin;
    }
    if (pathname === '/') {
        return accessToken ? responseRedirectProductList : responseRedirectLogin;
    }

    return responseNext;
}
export const config = {
    matcher: ['/', '/auth/:path*', '/manage/:path*'],
};
