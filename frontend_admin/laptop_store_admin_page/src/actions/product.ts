'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { EKeys, EPath, EStatus } from '~/common/enums';
import { apiRequest } from '~/libs';
import { handleRefresh } from '~/libs/helper.request';
import logger from '~/libs/logger';
import { productFormData } from '~/types/form.data';
import { IListImageResponse, IListProductResponse, IProductResponse, IResponse } from '~/types/response';

export async function all() {
    const token = cookies().get(EKeys.ACCESS_TOKEN)?.value;
    const response = await apiRequest
        .auth(token)
        .get('admin/products/all', { next: { tags: [EKeys.PRODUCT_LIST] } })
        .unauthorized(async (error, request) => {
            logger.anger('all product::', error.status, error.json);

            const resultRefresh = await handleRefresh(request);
            return resultRefresh ?? ({ payload: new Array() } as IListProductResponse);
        })
        .json<IListProductResponse>();
    return response.payload;
}
export async function bySlug(slug: string) {
    const { payload } = await apiRequest
        .get(`public/products/${slug}`, { cache: 'no-store' })
        .fetchError((error) => {
            logger.anger('product by slug::', error.status, error.json);
            return {
                payload: {
                    id: 0,
                    name: '',
                    slug: '',
                    categories: new Array(),
                    description: '',
                    price: 0,
                    quantityStock: 0,
                    images: new Array(),
                    status: EStatus.ENABLED,
                },
            } as IProductResponse;
        })
        .json<IProductResponse>();
    return payload;
}
export async function create(data: productFormData) {
    const token = cookies().get(EKeys.ACCESS_TOKEN)?.value;
    const { payload } = await apiRequest
        .auth(token)
        .body(data)
        .post('admin/products/create')
        .unauthorized(async (error, request) => {
            logger.anger('create product::', error.status, error.json);

            const resultRefresh = await handleRefresh(request);
            return resultRefresh ?? ({ payload: { slug: '' } } as IProductResponse);
        })
        .json<IProductResponse>();

    revalidateTag(EKeys.PRODUCT_LIST);
    redirect(EPath.MANAGE_PRODUCT_EDIT.concat(payload.slug));
}
export async function edit(id: number, data: productFormData) {
    const token = cookies().get(EKeys.ACCESS_TOKEN)?.value;

    const { payload } = await apiRequest
        .auth(token)
        .body(data)
        .put(`admin/products/${id}/edit`)
        .unauthorized(async (error, request) => {
            logger.anger('edit product::', error.status, error.json);

            const resultRefresh = await handleRefresh(request);
            return resultRefresh ?? ({ payload: { slug: '' } } as IProductResponse);
        })
        .json<IProductResponse>();

    revalidateTag(EKeys.PRODUCT_LIST);
    redirect(EPath.MANAGE_PRODUCT_EDIT.concat(payload.slug));
}
export async function removeImage(productId: number, imageId: number) {
    const token = cookies().get(EKeys.ACCESS_TOKEN)?.value;

    apiRequest
        .auth(token)
        .delete(`admin/products/${productId}/remove-image/${imageId}`)
        .unauthorized(async (error, request) => {
            logger.anger('remove image product::', error.status, error.json);

            await handleRefresh(request);
        })
        .json<IListImageResponse>();
}
export async function destroy(id: number) {
    const token = cookies().get(EKeys.ACCESS_TOKEN)?.value;

    await apiRequest
        .auth(token)
        .delete(`admin/products/${id}/delete`)
        .unauthorized(async (error, request) => {
            logger.anger('destroy product::', error.status, error.json);

            await handleRefresh(request);
        })
        .json<IResponse>();

    revalidateTag(EKeys.PRODUCT_LIST);
}
