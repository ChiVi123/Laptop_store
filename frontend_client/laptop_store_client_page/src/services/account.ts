import { cookies } from 'next/headers';
import { Key } from '~/common/enums';
import { apiRequest, logger } from '~/libs';
import { IAccountBodyResponse } from '~/types/body.responses';

export async function getProfile() {
    if (typeof window !== 'undefined') {
        throw new Error('Cannot call this api in client component');
    }
    const accessToken = cookies().get(Key.ACCESS_TOKEN)?.value;

    if (accessToken) {
        return (
            await apiRequest
                .auth(accessToken)
                .get('private/accounts/profile')
                .fetchError((error) => {
                    logger.error('profile::', error.status, error.json);
                    return { payload: undefined };
                })
                .json<IAccountBodyResponse>()
        ).payload;
    } else {
        return undefined;
    }
}
