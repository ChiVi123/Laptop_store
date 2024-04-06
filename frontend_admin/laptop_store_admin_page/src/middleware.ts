import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { EKeys, EPath } from './common/enums';

export function middleware(request: NextRequest) {
    const isStoreToken = Boolean(cookies().get(EKeys.TOKEN));
    const { pathname } = request.nextUrl;

    if (pathname.startsWith('/auth') && isStoreToken) {
        return NextResponse.redirect(new URL(EPath.MANAGE_PRODUCT_LIST, request.url));
    }
    if (pathname.startsWith('/manage') && !isStoreToken) {
        return NextResponse.redirect(new URL(EPath.AUTH_LOGIN, request.url));
    }
    if (pathname === '/') {
        const url = isStoreToken ? EPath.MANAGE_PRODUCT_LIST : EPath.AUTH_LOGIN;
        return NextResponse.redirect(new URL(url, request.url));
    }
    return NextResponse.next();
}
export const config = {
    matcher: ['/', '/auth/:path*', '/manage/:path*'],
};
