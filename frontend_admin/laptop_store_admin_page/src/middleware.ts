import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { EKeys, EPath } from './common/enums';
import { apiRequest } from './libs';
import { logAnger, logCoffee, logInfo } from './libs/logger';
import { IResponse } from './types/response';
import { decodeJwt, jwtType, setCookieJwtHeader } from './utils/token';

function redirectProductList(url: string, headers: Headers): NextResponse<unknown> {
    return NextResponse.redirect(new URL(EPath.MANAGE_PRODUCT_LIST, url), { headers });
}
function redirectLogin(url: string): NextResponse<unknown> {
    return NextResponse.redirect(new URL(EPath.AUTH_LOGIN, url));
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const responseNext = NextResponse.next();
    const cookieStore = cookies();
    const refreshToken = cookieStore.get(EKeys.REFRESH_TOKEN)?.value;
    let accessToken = cookieStore.get(EKeys.ACCESS_TOKEN)?.value;

    logCoffee('middleware request::', request.method, pathname);

    if (!accessToken && refreshToken) {
        try {
            const MILLISECOND = 1000;
            const { payload } = await apiRequest.body({ refreshToken }).post('auth/refresh-token').json<IResponse>();

            request.headers.set('set-cookie', setCookieJwtHeader(EKeys.ACCESS_TOKEN, payload));
            accessToken = payload;

            const jwt = decodeJwt<jwtType>(payload);
            responseNext.cookies.set({
                name: EKeys.ACCESS_TOKEN,
                value: accessToken,
                expires: jwt.exp * MILLISECOND,
                httpOnly: true,
                secure: true,
            });
            logInfo('middleware call refresh::', accessToken.split('.').pop());
        } catch (error) {
            logAnger('middleware error::', error);
        }
    }
    if (pathname.startsWith('/auth') && accessToken) {
        return redirectProductList(request.url, request.headers);
    }
    if (pathname.startsWith('/manage') && !accessToken) {
        return redirectLogin(request.url);
    }
    if (pathname === '/') {
        return accessToken ? redirectProductList(request.url, request.headers) : redirectLogin(request.url);
    }

    return responseNext;
}
export const config = {
    matcher: ['/', '/auth/:path*', '/manage/:path*'],
};
