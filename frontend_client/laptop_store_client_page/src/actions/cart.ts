'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

import { Key } from '~/common/enums';
import { apiRequest, logger } from '~/libs';
import { handleRefetch } from '~/libs/helper';
import { IListBodyResponse } from '~/types/body.responses';
import { ICartItem } from '~/types/models';

export async function getCart() {
    const accessToken = cookies().get(Key.ACCESS_TOKEN)?.value;
    const { payload } = await apiRequest
        .auth(accessToken)
        .get('api/v1/private/cart-item', { next: { tags: [Key.CART] } })
        .unauthorized(async (error, original) => {
            logger.error('get cart::', error.status, error.json);
            const resultRefresh = await handleRefetch(original);
            return resultRefresh ?? { message: error.json?.message ?? '', payload: [] };
        })
        .fetchError((error): IListBodyResponse<ICartItem> => {
            logger.error('get cart::', error.status, error.json);
            return { message: error.json?.message ?? '', payload: [] };
        })
        .json<IListBodyResponse<ICartItem>>();
    return payload;
}
export async function add(data: { productId: number; quantity: number }) {
    const accessToken = cookies().get(Key.ACCESS_TOKEN)?.value;
    const response = await apiRequest
        .auth(accessToken)
        .body(data)
        .post('api/v1/private/cart-item')
        .unauthorized(async (error, original) => {
            logger.error('add cart::', error.status, error.json);
            const resultRefresh = await handleRefetch(original);
            return resultRefresh ?? { message: error.json?.message ?? '', payload: [] };
        })
        .fetchError((error): IListBodyResponse<ICartItem> => {
            logger.error('add cart::', error.status, error.json);
            return { message: error.json?.message ?? '', payload: [] };
        })
        .json<IListBodyResponse<ICartItem>>();
    revalidateTag(Key.CART);
    return response.payload;
}
export async function plus(orderItemId: number) {
    const accessToken = cookies().get(Key.ACCESS_TOKEN)?.value;
    await apiRequest
        .auth(accessToken)
        .patch(`api/v1/private/cart-item/${orderItemId}/plus`)
        .unauthorized(async (error, original) => {
            logger.error('cart plus::', error.status, error.json);
            await handleRefetch(original);
        })
        .fetchError((error) => {
            logger.error('cart plus::', error.status, error.json);
        })
        .json();
    revalidateTag(Key.CART);
}
export async function minus(orderItemId: number) {
    const accessToken = cookies().get(Key.ACCESS_TOKEN)?.value;
    await apiRequest
        .auth(accessToken)
        .patch(`api/v1/private/cart-item/${orderItemId}/minus`)
        .unauthorized(async (error, original) => {
            logger.error('cart minus::', error.status, error.json);
            await handleRefetch(original);
        })
        .fetchError((error) => {
            logger.error('cart minus::', error.status, error.json);
        })
        .json();
    revalidateTag(Key.CART);
}
export async function removeItem(orderItemId: number) {
    const accessToken = cookies().get(Key.ACCESS_TOKEN)?.value;
    const response = await apiRequest
        .auth(accessToken)
        .delete(`api/v1/private/cart-item/${orderItemId}`)
        .unauthorized(async (error, original): Promise<IListBodyResponse<ICartItem>> => {
            logger.error('cart remove item::', error.status, error.json);
            const resultRefresh = (await handleRefetch(original)) as IListBodyResponse<ICartItem>;
            return resultRefresh ?? { message: error.json?.message ?? '', payload: [] };
        })
        .fetchError((error): IListBodyResponse<ICartItem> => {
            logger.error('cart remove item::', error.status, error.json);
            return { message: error.json?.message ?? '', payload: [] };
        })
        .json<IListBodyResponse<ICartItem>>();
    revalidateTag(Key.CART);
    return response.payload;
}
export async function removeAllItem() {
    const accessToken = cookies().get(Key.ACCESS_TOKEN)?.value;
    await apiRequest
        .auth(accessToken)
        .delete('api/v1/private/cart-item')
        .unauthorized(async (error, original) => {
            logger.error('cart remove all::', error.status, error.json);
            await handleRefetch(original);
        })
        .fetchError((error) => {
            logger.error('cart remove all::', error.status, error.json);
        })
        .json();
    revalidateTag(Key.CART);
}
