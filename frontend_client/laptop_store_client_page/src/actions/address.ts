'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { Key } from '~/common/enums';
import { RAW_ADDRESS } from '~/common/values';
import { apiRequest } from '~/libs';
import { handleRefetch } from '~/libs/helper';
import { IListBodyResponse, IPayloadBodyResponse } from '~/types/body.responses';
import { IAddress } from '~/types/models';

export async function getAll() {
    const accessToken = cookies().get(Key.ACCESS_TOKEN)?.value;
    const { payload } = await apiRequest
        .auth(accessToken)
        .get('/api/v1/private/address', { next: { tags: ['all-address-tag'] } })
        .unauthorized(async (error, original) => {
            console.log('get all address::', error.status, error.json);
            const resultRefresh = await handleRefetch(original);
            return resultRefresh ?? { message: error.json?.message ?? '', payload: [] };
        })
        .fetchError((error): IListBodyResponse<IAddress> => {
            console.log('get all address::', error.status, error.json);
            return { message: error.json?.message ?? '', payload: [] };
        })
        .json<IListBodyResponse<IAddress>>();
    return payload;
}
export async function getDefault() {
    const accessToken = cookies().get(Key.ACCESS_TOKEN)?.value;
    const { payload } = await apiRequest
        .auth(accessToken)
        .get('/api/v1/private/address/default')
        .unauthorized(async (error, original) => {
            console.log('get address by id::', error.status, error.json);
            const resultRefresh = await handleRefetch(original);
            return resultRefresh ?? { message: error.json?.message ?? '', payload: RAW_ADDRESS };
        })
        .fetchError((error): IPayloadBodyResponse<IAddress> => {
            console.log('get address by id::', error.status, error.json);
            return { message: error.json?.message ?? '', payload: RAW_ADDRESS };
        })
        .json<IPayloadBodyResponse<IAddress>>();
    return payload;
}
export async function getById(id: number) {
    const accessToken = cookies().get(Key.ACCESS_TOKEN)?.value;
    const { payload } = await apiRequest
        .auth(accessToken)
        .get(`/api/v1/private/address/${id}`)
        .unauthorized(async (error, original) => {
            console.log('get address by id::', error.status, error.json);
            const resultRefresh = await handleRefetch(original);
            return resultRefresh ?? { message: error.json?.message ?? '', payload: RAW_ADDRESS };
        })
        .fetchError((error): IPayloadBodyResponse<IAddress> => {
            console.log('get address by id::', error.status, error.json);
            return { message: error.json?.message ?? '', payload: RAW_ADDRESS };
        })
        .json<IPayloadBodyResponse<IAddress>>();
    return payload;
}

export type AddressRequest = {
    accountId: number;
} & Omit<IAddress, 'isChoose' | 'createdDate' | 'lastModifiedDate' | 'location'>;

export async function create(data: AddressRequest) {
    const accessToken = cookies().get(Key.ACCESS_TOKEN)?.value;
    const result = await apiRequest
        .auth(accessToken)
        .body(data)
        .post('/api/v1/private/address')
        .unauthorized(async (error, original) => {
            console.log('create address::', error.status, error.json);
            const resultRefresh = (await handleRefetch(original)) as IPayloadBodyResponse<boolean>;
            return resultRefresh
                ? { message: resultRefresh.message, payload: true }
                : { message: error.json?.message ?? '', payload: false };
        })
        .fetchError((error): IPayloadBodyResponse<boolean> => {
            console.log('create address::', error.status, error.json);
            return { message: error.json?.message ?? '', payload: false };
        })
        .json((data): IPayloadBodyResponse<boolean> => ({ message: data.message, payload: true }));

    revalidateTag('all-address-tag');
    return result;
}
export async function update(data: AddressRequest) {
    const accessToken = cookies().get(Key.ACCESS_TOKEN)?.value;
    const response = await apiRequest
        .auth(accessToken)
        .body(data)
        .put('/api/v1/private/address')
        .unauthorized(async (error, original) => {
            console.log('update address::', error.status, error.json);
            const resultRefresh = (await handleRefetch(original)) as IPayloadBodyResponse<boolean>;
            return resultRefresh
                ? { message: resultRefresh.message, payload: true }
                : { message: error.json?.message ?? '', payload: false };
        })
        .fetchError((error): IPayloadBodyResponse<boolean> => {
            console.log('update address::', error.status, error.json);
            return { message: error.json?.message ?? '', payload: false };
        })
        .json<IPayloadBodyResponse<unknown>>();

    revalidateTag('all-address-tag');

    return { message: response.message, payload: true };
}
export async function destroy(id: number) {
    const accessToken = cookies().get(Key.ACCESS_TOKEN)?.value;
    await apiRequest
        .auth(accessToken)
        .delete(`/api/v1/private/address/${id}`)
        .unauthorized(async (error, original) => {
            console.log('create address::', error.status, error.json);
            await handleRefetch(original);
        })
        .fetchError((error) => {
            console.log('create address::', error.status, error.json);
        })
        .json();

    revalidateTag('all-address-tag');
}
