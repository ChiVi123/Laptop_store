import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { EKeys } from '~/common/enums';

export type jwtType = {
    sub: string;
    iat: number;
    // "iss": "laptopstore",
    iss: string;
    exp: number;
};

export default function getSessionToken() {
    return `Bearer ${cookies().get(EKeys.TOKEN)?.value}`;
}
export function decodeJwt<payload = jwt.JwtPayload>(token: string) {
    return jwt.decode(token) as payload;
}
