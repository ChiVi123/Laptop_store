export interface JwtPayload {
    sub: string;
    fullName: string;
    iat: number;
    iss: string;
    exp: number;
}
