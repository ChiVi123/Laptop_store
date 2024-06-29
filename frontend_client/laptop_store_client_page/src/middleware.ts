import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { Key } from './common/enums';
import { MILLISECOND } from './common/values';
import { createResponseCookie, decodeJwt } from './libs/helper';
import { JwtType } from './libs/utilities';
import { createAccessTokenByRefreshToken } from './services/auth';

export async function middleware(request: NextRequest) {
    const { headers, nextUrl } = request;
    const { pathname } = nextUrl;
    const nextResponse = NextResponse.next({ request: { headers: new Headers(headers) } });
    const cookieStore = cookies();
    const refreshToken = cookieStore.get(Key.REFRESH_TOKEN)?.value;
    let accessToken = cookieStore.get(Key.ACCESS_TOKEN)?.value;

    if (refreshToken && !accessToken) {
        accessToken = (await createAccessTokenByRefreshToken()).payload;
        if (accessToken) {
            const jwt = decodeJwt<JwtType>(accessToken);
            const cookieAccessToken = createResponseCookie(Key.ACCESS_TOKEN, accessToken, jwt.exp * MILLISECOND);
            nextResponse.cookies.set(cookieAccessToken);
        }
    }

    nextResponse.headers.set(Key.X_URL, pathname);
    return nextResponse;
}
export const config = {
    matcher: ['/:path?', '/cart', '/account/:path*'],
};
