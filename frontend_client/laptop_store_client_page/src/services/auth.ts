import { cookies } from 'next/headers';
import { Key } from '~/common/enums';
import { apiRequest, logger } from '~/libs';
import { IBodyResponse } from '~/types/body.responses';

export async function createAccessTokenByRefreshToken(): Promise<IBodyResponse> {
    const refreshToken = cookies().get(Key.REFRESH_TOKEN)?.value;
    if (!refreshToken) {
        return { message: 'something went wrong!!!', payload: '' };
    }
    return apiRequest
        .body({ refreshToken })
        .post('api/v1/auth/refresh-token')
        .fetchError((error): IBodyResponse => {
            logger.error('create access token by refresh token::', error.status, error.json);
            return { message: error.json?.message ?? '', payload: '' };
        })
        .json<IBodyResponse>();
}
