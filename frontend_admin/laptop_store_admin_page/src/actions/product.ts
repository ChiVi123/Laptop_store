'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { EKeys, EPath, EStatus } from '~/common/enums';
import { apiRequest } from '~/libs';
import { handleRefresh } from '~/libs/helper.request';
import { logAnger, logInfo } from '~/libs/logger';
import { productFormData } from '~/types/form.data';
import { IListImageResponse, IListProductResponse, IProductResponse, IResponse } from '~/types/response';

export async function all() {
    const token = cookies().get(EKeys.ACCESS_TOKEN)?.value;
    logInfo('product list token::', token?.split('.').pop());

    const response = await apiRequest
        .auth(token)
        .get('admin/products/all', { next: { tags: [EKeys.PRODUCT_LIST] } })
        .unauthorized(async (_error, request) => {
            const resultRefresh = await handleRefresh(request);
            return resultRefresh ?? ({ payload: new Array() } as IListProductResponse);
        })
        .json<IListProductResponse>();
    logInfo('product list::', response.payload.length);
    return response.payload;
}
export async function bySlug(slug: string) {
    const { payload } = await apiRequest
        .get(`public/products/${slug}`, { cache: 'no-store' })
        .fetchError((error) => {
            logAnger('product by slug::', { status: error.status }, { json: error.json });
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
    logInfo('create product token::', token?.split('.').pop());

    const { payload } = await apiRequest
        .auth(token)
        .body(data)
        .post('admin/products/create')
        .unauthorized(async (_error, request) => {
            const resultRefresh = await handleRefresh(request);
            return resultRefresh ?? ({ payload: { slug: '' } } as IProductResponse);
        })
        .json<IProductResponse>();

    revalidateTag(EKeys.PRODUCT_LIST);
    redirect(EPath.MANAGE_PRODUCT_EDIT.concat(payload.slug));
}
export async function edit(id: number, data: productFormData) {
    const token = cookies().get(EKeys.ACCESS_TOKEN)?.value;
    logInfo('edit product token::', token?.split('.').pop());

    const { payload } = await apiRequest
        .auth(token)
        .body(data)
        .put(`admin/products/${id}/edit`)
        .unauthorized(async (_error, request) => {
            const resultRefresh = await handleRefresh(request);
            return resultRefresh ?? ({ payload: { slug: '' } } as IProductResponse);
        })
        .json<IProductResponse>();

    revalidateTag(EKeys.PRODUCT_LIST);
    redirect(EPath.MANAGE_PRODUCT_EDIT.concat(payload.slug));
}
export async function removeImage(productId: number, imageId: number) {
    const token = cookies().get(EKeys.ACCESS_TOKEN)?.value;
    logInfo('remove product image token::', token?.split('.').pop());

    apiRequest
        .auth(token)
        .delete(`admin/products/${productId}/remove-image/${imageId}`)
        .unauthorized(async (_error, request) => {
            await handleRefresh(request);
        })
        .json<IListImageResponse>();
}
export async function destroy(id: number) {
    const token = cookies().get(EKeys.ACCESS_TOKEN)?.value;
    logInfo('destroy product token::', token?.split('.').pop());

    await apiRequest
        .auth(token)
        .delete(`admin/products/${id}/delete`)
        .unauthorized(async (_error, request) => {
            await handleRefresh(request);
        })
        .json<IResponse>();

    revalidateTag(EKeys.PRODUCT_LIST);
}
