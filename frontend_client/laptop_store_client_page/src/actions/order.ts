'use server';

import { cookies, headers } from 'next/headers';
import { Key } from '~/common/enums';
import { apiRequest } from '~/libs';
import { handleRefetch } from '~/libs/helper';
import { IBodyResponse } from '~/types/body.responses';

type MakePaymentProps = {
    addressId: number;
    paymentMethod: string;
};

export async function makePayment({ addressId, paymentMethod = 'COD' }: MakePaymentProps) {
    const origin = headers().get(Key.X_ORIGIN);

    if (!origin) {
        return '';
    }

    const cancelUrl = `${origin}/notify-order/${paymentMethod}/cancel`;
    const successUrl = `${origin}/notify-order/${paymentMethod}/success`;
    const accessToken = cookies().get(Key.ACCESS_TOKEN)?.value;

    const { payload } = await apiRequest
        .auth(accessToken)
        .body({ addressId, paymentMethod, cancelUrl, successUrl })
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
    token: string;
    paymentId: string;
    PayerID: string;
};
export async function executePayment(paymentMethod: string, params: Partial<ExecutePaymentParams>) {
    const accessToken = cookies().get(Key.ACCESS_TOKEN)?.value;
    const data = {
        token: params.token,
        paymentMethod,
        paymentId: params.paymentId,
        payerId: params.PayerID,
    };

    return apiRequest
        .body(data)
        .auth(accessToken)
        .patch('api/v1/private/orders/execute-payment')
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
