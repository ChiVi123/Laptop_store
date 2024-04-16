import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { EKeys, EPath } from './common/enums';
import { prefixFormatError, prefixFormatLog } from './common/values';
import httpRequest from './libs/http.request';
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
    const cookieStore = cookies();
    const refreshToken = cookieStore.get(EKeys.REFRESH_TOKEN)?.value;
    let accessToken = cookieStore.get(EKeys.ACCESS_TOKEN)?.value;
    const responseNext = NextResponse.next();

    console.log(...prefixFormatLog, 'middle pathname::', pathname);

    if (!accessToken && refreshToken) {
        try {
            const MILLISECOND = 1000;
            const { payload } = await httpRequest.post<IResponse>('auth/refresh-token', { refreshToken });
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
            console.info(...prefixFormatLog, 'middleware call refresh');
        } catch (error) {
            console.error(...prefixFormatError, 'middleware error::', error);
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
