'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

import { EntityStatus, Key } from '~/common/enums';
import { RAW_CART, RAW_ORDER_ITEM } from '~/common/values';
import { apiRequest, logger } from '~/libs';
import { handleRefetch } from '~/libs/helper';
import { ICartBodyResponse, IOrderItemBodyResponse } from '~/types/body.responses';
import { ICart, IOrderItem } from '~/types/models';

const getRawCartBodyResponse = (message: string): ICartBodyResponse => ({ message, payload: RAW_CART });
const getRawOrderItemBodyResponse = (message: string): IOrderItemBodyResponse => ({ message, payload: RAW_ORDER_ITEM });

export async function getCart() {
    const accessToken = cookies().get(Key.ACCESS_TOKEN)?.value;
    if (accessToken) {
        const { payload } = await apiRequest
            .auth(accessToken)
            .get('private/cart', { next: { tags: [Key.CART] } })
            .fetchError((error) => {
                logger.error('get cart::', error.status, error.json);
                return getRawCartBodyResponse(error.json?.message ?? '');
            })
            .json<ICartBodyResponse>();
        return payload;
    } else {
        return RAW_CART;
    }
}
export async function add(data: { productId: number; quantity: number }) {
    const accessToken = cookies().get(Key.ACCESS_TOKEN)?.value;
    const response = await apiRequest
        .auth(accessToken)
        .body(data)
        .post('private/cart/add-item')
        .unauthorized(async (error, original) => {
            logger.error('add cart::', error.status, error.json);
            const resultRefresh = await handleRefetch(original);
            return resultRefresh ?? getRawCartBodyResponse(error.json?.message ?? '');
        })
        .fetchError((error) => {
            logger.error('add cart::', error.status, error.json);
            return getRawCartBodyResponse(error.json?.message ?? '');
        })
        .json<ICartBodyResponse>();
    revalidateTag(Key.CART);
    return response.payload;
}
export async function plus(orderItemId: number) {
    const accessToken = cookies().get(Key.ACCESS_TOKEN)?.value;
    const response = await apiRequest
        .auth(accessToken)
        .patch(`private/cart/${orderItemId}/plus`)
        .unauthorized(async (error, original) => {
            logger.error('cart plus::', error.status, error.json);
            const resultRefresh = await handleRefetch(original);
            return resultRefresh ?? getRawCartBodyResponse(error.json?.message ?? '');
        })
        .fetchError((error) => {
            logger.error('cart plus::', error.status, error.json);
            return { id: 0, quantity: 0, subTotal: 0 } as Omit<IOrderItem, 'product'>;
        })
        .json<IOrderItemBodyResponse>();
    revalidateTag(Key.CART);
    return response.payload;
}
export async function minus(orderItemId: number) {
    const accessToken = cookies().get(Key.ACCESS_TOKEN)?.value;
    const response = await apiRequest
        .auth(accessToken)
        .patch(`private/cart/${orderItemId}/minus`)
        .unauthorized(async (error, original) => {
            logger.error('cart minus::', error.status, error.json);
            const resultRefresh = await handleRefetch(original);
            return resultRefresh ?? getRawOrderItemBodyResponse(error.json?.message ?? '');
        })
        .fetchError((error) => {
            logger.error('cart minus::', error.status, error.json);
            return getRawOrderItemBodyResponse(error.json?.message ?? '');
        })
        .json<IOrderItemBodyResponse>();
    revalidateTag(Key.CART);
    return response.payload;
}
export async function removeItem(orderItemId: number) {
    const accessToken = cookies().get(Key.ACCESS_TOKEN)?.value;
    const response = await apiRequest
        .auth(accessToken)
        .delete(`private/cart/${orderItemId}/remove-item`)
        .unauthorized(async (error, original) => {
            logger.error('cart remove item::', error.status, error.json);
            const resultRefresh = await handleRefetch(original);
            return resultRefresh ?? getRawCartBodyResponse(error.json?.message ?? '');
        })
        .fetchError((error) => {
            logger.error('cart remove item::', error.status, error.json);
            return { items: new Array(), status: EntityStatus.ENABLED } as ICart;
        })
        .json<ICartBodyResponse>();
    revalidateTag(Key.CART);
    return response.payload;
}
export async function removeAllItem() {
    const accessToken = cookies().get(Key.ACCESS_TOKEN)?.value;
    const response = await apiRequest
        .auth(accessToken)
        .delete(`private/cart/remove-all`)
        .unauthorized(async (error, original) => {
            logger.error('cart remove all::', error.status, error.json);
            const resultRefresh = await handleRefetch(original);
            return resultRefresh ?? getRawCartBodyResponse(error.json?.message ?? '');
        })
        .fetchError((error) => {
            logger.error('cart remove all::', error.status, error.json);
            return { items: new Array(), status: EntityStatus.ENABLED } as ICart;
        })
        .json<ICartBodyResponse>();
    revalidateTag(Key.CART);
    return response.payload;
}
