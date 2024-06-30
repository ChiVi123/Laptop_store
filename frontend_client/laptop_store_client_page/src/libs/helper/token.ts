import jwt from 'jsonwebtoken';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

import { Key } from '~/common/enums';
import { MILLISECOND } from '~/common/values';

export function decodeJwt<Payload = jwt.JwtPayload>(token: string) {
    const payload = jwt.decode(token);
    if (payload && typeof payload !== 'string' && payload.exp) {
        payload.exp = payload.exp * MILLISECOND;
    }
    return payload as Payload;
}
export function createResponseCookie(name: Key, value: string, expires: number, path: string = '/'): ResponseCookie {
    return { name, value, expires, path, httpOnly: true, secure: true };
}
