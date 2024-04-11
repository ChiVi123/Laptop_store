import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { EKeys, EPath } from './common/enums';
import httpRequest from './libs/http.request';
import { IResponse } from './types/response';
import { decodeJwt } from './utils/token';

const MILLISECOND = 1000;
function setCookie(name: EKeys, value: string, expiration: number) {
    const expires = new Date(expiration * MILLISECOND).toUTCString();
    return `${name}=${value}; expires=${expires}; path=/; httpOnly=true; secure=true;`;
}

export async function middleware(request: NextRequest) {
    const refreshToken = cookies().get(EKeys.REFRESH_TOKEN)?.value;
    const { pathname } = request.nextUrl;
    let accessToken = cookies().get(EKeys.ACCESS_TOKEN)?.value;
    let headers;

    if (!accessToken && refreshToken) {
        try {
            const { payload } = await httpRequest.post<IResponse>('auth/refresh-token', { token: refreshToken });
            const { exp } = decodeJwt<{ exp: number }>(payload);

            headers = { 'set-cookie': setCookie(EKeys.ACCESS_TOKEN, payload, exp) };
            accessToken = payload;
        } catch (error) {
            console.log('middleware error::', error);
        }
    }
    if (pathname.startsWith('/auth') && accessToken) {
        return NextResponse.redirect(new URL(EPath.MANAGE_PRODUCT_LIST, request.url), { headers });
    }
    if (pathname.startsWith('/manage') && !accessToken) {
        return NextResponse.redirect(new URL(EPath.AUTH_LOGIN, request.url));
    }
    if (pathname === '/') {
        if (accessToken) {
            return NextResponse.redirect(new URL(EPath.MANAGE_PRODUCT_LIST, request.url), { headers });
        } else {
            return NextResponse.redirect(new URL(EPath.AUTH_LOGIN, request.url));
        }
    }
    return NextResponse.next();
}
export const config = {
    matcher: ['/', '/auth/:path*', '/manage/:path*'],
};
