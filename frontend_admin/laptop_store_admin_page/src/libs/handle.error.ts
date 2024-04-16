import httpRequest, { FetchError } from '~/libs/http.request';
import { IResponse } from '~/types/response';

export async function handleRefreshToken(refreshToken: string) {
    return (await httpRequest.post<IResponse>('auth/refresh-token', { refreshToken })).payload;
}
export async function handleRefetch<BodyResponse>({ url, options }: FetchError, accessToken: string) {
    options.headers ??= {};
    Object.assign(options.headers, { Authorization: `Bearer ${accessToken}` });
    const response = await fetch(url, options);
    return (await response.json()) as BodyResponse;
}
