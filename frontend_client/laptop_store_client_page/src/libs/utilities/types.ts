export interface JwtPayload {
    sub: string;
    accountId: number;
    fullName: string;
    iat: number;
    iss: string;
    exp: number;
}
