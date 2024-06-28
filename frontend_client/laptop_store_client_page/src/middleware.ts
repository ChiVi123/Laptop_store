import { NextRequest, NextResponse } from 'next/server';
import { Key } from './common/enums';

export function middleware(request: NextRequest) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set(Key.X_URL, request.nextUrl.pathname);
    return NextResponse.next({ request: { headers: requestHeaders } });
}
