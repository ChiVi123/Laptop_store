'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { Key } from '~/common/enums';
import { IBodyResponse } from '~/types/body.responses';

import { apiRequest } from '..';
import { FetchainError, HttpStatus, IFetchain } from '../fetchain';

export const handleRefetch = async (request: IFetchain) => {
    const refreshToken = cookies().get(Key.REFRESH_TOKEN)?.value;
    if (!refreshToken) {
        redirect('/logout');
    }
    const { payload } = await apiRequest.body({ refreshToken }).post('api/v1/auth/refresh-token').json<IBodyResponse>();
    return request
        .auth(payload)
        .recall()
        .unauthorized(() => null)
        .json();
};
export const handleReturnError = (reason: unknown) => {
    return reason instanceof FetchainError
        ? { status: reason.status, payload: reason.json }
        : { status: HttpStatus.INTERNAL_ERROR, payload: 'Something went wrong!!!' };
};
