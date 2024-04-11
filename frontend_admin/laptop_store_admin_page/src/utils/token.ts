import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { EKeys, EPath } from '~/common/enums';
import httpRequest, { UnauthorizedError } from '~/libs/http.request';
import { IResponse } from '~/types/response';

type jwtType = {
    sub: string;
    iat: number;
    iss: string;
    exp: number;
};

export const MILLISECOND = 1000;
export function decodeJwt<payload = jwt.JwtPayload>(token: string) {
    return jwt.decode(token) as payload;
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
export async function handleRefreshToken(error: unknown) {
    if (error instanceof UnauthorizedError) {
        const refreshToken = cookies().get(EKeys.REFRESH_TOKEN)?.value;
        if (refreshToken) {
            const { url, options } = error;
            const { payload } = await httpRequest.post<IResponse>('auth/refresh-token', { token: refreshToken });
            const newOptions = { ...options, headers: { ...options.headers, Authorization: `Bearer ${payload}` } };
            const bodyJson = (await fetch(url, newOptions)).json();
            return { bodyJson, token: payload };
        } else {
            redirect(EPath.AUTH_LOGIN);
        }
    }
}
