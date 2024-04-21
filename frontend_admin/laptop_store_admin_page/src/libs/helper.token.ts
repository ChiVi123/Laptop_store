import jwt from 'jsonwebtoken';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';
import { EKeys } from '~/common/enums';

const MILLISECOND = 1000;

type JwtType = {
    sub: string;
    iat: number;
    iss: string;
    exp: number;
};

function decodeJwt<Payload = jwt.JwtPayload>(token: string) {
    return jwt.decode(token) as Payload;
}
function createCookieExpires(value: number) {
    return new Date(value * MILLISECOND).toUTCString();
}

export function createResponseCookie(name: EKeys, value: string, expires: number, path: string = '/') {
    return { name, value, expires, path, httpOnly: true, secure: true } as ResponseCookie;
}
export function setCookieJwt(name: EKeys, value: string) {
    const jwt = decodeJwt<JwtType>(value);
    const responseCookie = createResponseCookie(name, value, jwt.exp * MILLISECOND);
    cookies().set(responseCookie);
}
export function setCookieToken(name: EKeys, value: string, expires: number) {
    const responseCookie = createResponseCookie(name, value, expires);
    cookies().set(responseCookie);
}
