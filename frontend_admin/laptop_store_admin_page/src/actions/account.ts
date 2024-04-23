'use server';

import { cookies } from 'next/headers';
import { EAccountRole, EKeys } from '~/common/enums';
import { apiRequest, handleRefetch } from '~/libs';
import logger from '~/libs/logger';
import { IAccount } from '~/types/models';
import { IAccountResponse } from '~/types/response';

const accountPayload: IAccount = {
    id: 0,
    createdDate: '',
    lastModifiedDate: '',
    username: '',
    fullName: '',
    email: '',
    phone: '',
    reviewCount: 0,
    likeCount: 0,
    role: EAccountRole.ADMIN,
};

export async function profile() {
    const accessToken = cookies().get(EKeys.ACCESS_TOKEN)?.value;
    return apiRequest
        .auth(accessToken)
        .get('private/accounts/profile')
        .unauthorized(async (error, request) => {
            logger.anger('profile::', error.status, error.json);

            const resultRefresh = await handleRefetch(request);
            return resultRefresh ?? ({ message: error.json?.message, payload: accountPayload } as IAccountResponse);
        })
        .fetchError((error) => {
            logger.error('profile::', error.status, error.json);
            return { message: error.json?.message, payload: accountPayload } as IAccountResponse;
        })
        .json<IAccountResponse>();
}
