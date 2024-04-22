import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { EKeys, EPath } from '~/common/enums';
import { IResponse } from '~/types/response';
import { apiRequest } from '.';
import { FetchainError, IFetchain } from './fetchain';
import { HttpStatus } from './fetchain/constants';

export const handleRefetch = async (request: IFetchain) => {
    const refreshToken = cookies().get(EKeys.REFRESH_TOKEN)?.value;
    if (refreshToken) {
        const { payload } = await apiRequest.body({ refreshToken }).post('auth/refresh-token').json<IResponse>();
        return request.auth(payload).recall().json();
    } else {
        redirect(EPath.AUTH_LOGIN);
    }
};
export const handleReturnError = (reason: unknown) => {
    return reason instanceof FetchainError
        ? { status: reason.status, payload: reason.json }
        : { status: HttpStatus.INTERNAL_ERROR, payload: 'Something went wrong!!!' };
};
