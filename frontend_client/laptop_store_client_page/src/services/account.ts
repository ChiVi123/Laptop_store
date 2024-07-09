import { cookies } from 'next/headers';
import { Key } from '~/common/enums';
import { RAW_ACCOUNT } from '~/common/values';
import { apiRequest, logger } from '~/libs';
import { IAccountBodyResponse } from '~/types/body.responses';

export async function getProfile() {
    const accessToken = cookies().get(Key.ACCESS_TOKEN)?.value;
    const { payload } = await apiRequest
        .auth(accessToken)
        .get('api/v1/private/accounts/profile')
        .fetchError((error) => {
            logger.error('profile::', error.status, error.json);
            return { message: error.json?.message, payload: RAW_ACCOUNT } as IAccountBodyResponse;
        })
        .json<IAccountBodyResponse>();
    return payload;
}
