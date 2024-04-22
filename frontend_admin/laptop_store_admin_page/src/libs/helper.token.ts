import jwt from 'jsonwebtoken';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { EKeys } from '~/common/enums';

export function decodeJwt<Payload = jwt.JwtPayload>(token: string) {
    return jwt.decode(token) as Payload;
}
export function createResponseCookie(name: EKeys, value: string, expires: number, path: string = '/') {
    return { name, value, expires, path, httpOnly: true, secure: true } as ResponseCookie;
}
