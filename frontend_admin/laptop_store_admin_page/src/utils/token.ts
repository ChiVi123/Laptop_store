import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { EKeys } from '~/common/enums';

const MILLISECOND = 1000;

export type jwtType = {
    sub: string;
    iat: number;
    iss: string;
    exp: number;
};
export function decodeJwt<payload = jwt.JwtPayload>(token: string) {
    return jwt.decode(token) as payload;
}
export function setCookieJwtHeader(name: EKeys, value: string) {
    const jwt = decodeJwt<jwtType>(value);
    const expires = new Date(jwt.exp * MILLISECOND).toUTCString();
    return `${name}=${value}; expires=${expires}; path=/; httpOnly; secure;`;
}
export function setCookieJwt(name: EKeys, value: string) {
    const jwt = decodeJwt<jwtType>(value);
    cookies().set({ name, value, httpOnly: true, secure: true, expires: jwt.exp * MILLISECOND });
}
export function setCookieRefreshToken(name: EKeys, value: string, expires: number) {
    cookies().set({ name, value, expires, httpOnly: true, secure: true });
}
export function getSessionToken() {
    const accessToken = cookies().get(EKeys.ACCESS_TOKEN)?.value;
    return accessToken ? `Bearer ${accessToken}` : '';
}
