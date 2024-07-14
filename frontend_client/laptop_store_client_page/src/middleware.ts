import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { Key } from './common/enums';
import { createResponseCookie, decodeJwt } from './libs/helper';
import { JwtPayload } from './libs/utilities';
import { createAccessTokenByRefreshToken } from './services/auth';

export async function middleware(request: NextRequest) {
    const { headers, nextUrl } = request;
    const { pathname, origin } = nextUrl;
    const nextResponse = NextResponse.next({ request: { headers: new Headers(headers) } });
    const cookieStore = cookies();
    const refreshToken = cookieStore.get(Key.REFRESH_TOKEN)?.value;
    let accessToken = cookieStore.get(Key.ACCESS_TOKEN)?.value;

    if (refreshToken && !accessToken) {
        accessToken = (await createAccessTokenByRefreshToken()).payload;
        if (accessToken) {
            const jwt = decodeJwt<JwtPayload>(accessToken);
            const cookieAccessToken = createResponseCookie(Key.ACCESS_TOKEN, accessToken, jwt.exp);
            nextResponse.cookies.set(cookieAccessToken);
        }
    }

    nextResponse.headers.set(Key.X_URL, pathname);
    nextResponse.headers.set(Key.X_ORIGIN, origin);
    return nextResponse;
}
export const config = {
    matcher: ['/:path?', '/cart', '/account/:path*', '/make-payment', '/shipping'],
};
