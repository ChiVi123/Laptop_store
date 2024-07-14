'use server';

import { cookies, headers } from 'next/headers';
import { Key } from '~/common/enums';
import { apiRequest } from '~/libs';
import { handleRefetch } from '~/libs/helper';
import { IBodyResponse } from '~/types/body.responses';

export async function makePayment(paymentMethod: string = 'cod') {
    const origin = headers().get(Key.X_ORIGIN);

    if (!origin) {
        return '';
    }

    const cancelUrl = origin + '/notify-order/cancel';
    const successUrl = origin + '/notify-order/success';
    const accessToken = cookies().get(Key.ACCESS_TOKEN)?.value;

    const { payload } = await apiRequest
        .auth(accessToken)
        .body({ paymentMethod, cancelUrl, successUrl })
        .post('api/v1/private/orders/make-payment')
        .unauthorized(async (error, original) => {
            const result = await handleRefetch(original);
            return result ?? { message: error.json?.message ?? '', payload: '' };
        })
        .fetchError((error): IBodyResponse => {
            console.error('make payment::', error.status, error.json);
            return { message: error.json?.message ?? '', payload: '' };
        })
        .json<IBodyResponse>();

    return payload;
}

type ExecutePaymentParams = {
    paymentId: string;
    PayerID: string;
};
export async function executePayment(params: Partial<ExecutePaymentParams>) {
    const accessToken = cookies().get(Key.ACCESS_TOKEN)?.value;

    return apiRequest
        .params(params)
        .auth(accessToken)
        .get('api/v1/private/orders/execute-payment')
        .unauthorized(async (error, original) => {
            const result = (await handleRefetch(original)) as { message: string; isSuccess: boolean };
            return result
                ? { message: result.message, isSuccess: true }
                : { message: error.json?.message ?? '', isSuccess: false };
        })
        .fetchError((error) => {
            console.error('make payment::', error.status, error.json);
            return { message: error.json?.message ?? '', isSuccess: false };
        })
        .json((data) => ({ message: data.message, isSuccess: true }));
}
