'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { EKeys, EPath, EStatus } from '~/common/enums';
import { apiRequest, handleRefetch } from '~/libs';
import logger from '~/libs/logger';
import {
    IBodyResponse,
    IListImageResponse,
    IListProductResponse,
    IProductDetailBodyResponse,
} from '~/types/body.response';
import { productFormData } from '~/types/form.data';
import { IProductDetail, IProductInfo } from '~/types/models';

const rawProductInfo: IProductInfo = {
    id: 0,
    name: '',
    slug: '',
    thumbnailUrl: '',
    description: '',
    price: 0,
    discount: 0,
    discountRate: 0,
    quantityStock: 0,
    quantitySold: 0,
    ratingAverage: 0,
    reviewCount: 0,
    status: EStatus.ENABLED,
    createdDate: '',
    lastModifiedDate: '',
};
const rawProductDetail: IProductDetail = {
    id: 0,
    info: rawProductInfo,
    categories: new Array(),
    images: new Array(),
    attributes: new Array(),
    createdDate: '',
    lastModifiedDate: '',
};

export async function all() {
    const token = cookies().get(EKeys.ACCESS_TOKEN)?.value;
    const response = await apiRequest
        .auth(token)
        .get('admin/products/all', { next: { tags: [EKeys.PRODUCT_LIST] } })
        .unauthorized(async (error, request) => {
            logger.error('all product::', error.status, error.json);
            const resultRefresh = await handleRefetch(request);
            return resultRefresh ?? ({ payload: new Array() } as IListProductResponse);
        })
        .json<IListProductResponse>();
    return response.payload;
}
export async function bySlug(slug: string) {
    const { payload } = await apiRequest
        .get(`public/products/${slug}`, { cache: 'no-store' })
        .fetchError((error) => {
            logger.error('product by slug::', error.status, error.json);
            return { payload: rawProductDetail } as IProductDetailBodyResponse;
        })
        .json<IProductDetailBodyResponse>();
    return payload;
}
export async function create(data: productFormData) {
    const token = cookies().get(EKeys.ACCESS_TOKEN)?.value;
    const { payload } = await apiRequest
        .auth(token)
        .body(data)
        .post('admin/products/create')
        .unauthorized(async (error, request) => {
            logger.error('create product::', error.status, error.json);
            const resultRefresh = await handleRefetch(request);
            return resultRefresh ?? ({ payload: rawProductDetail } as IProductDetailBodyResponse);
        })
        .json<IProductDetailBodyResponse>();

    revalidateTag(EKeys.PRODUCT_LIST);
    redirect(EPath.MANAGE_PRODUCT_EDIT.concat(payload.info.slug));
}
export async function edit(id: number, data: productFormData) {
    const token = cookies().get(EKeys.ACCESS_TOKEN)?.value;
    const { payload } = await apiRequest
        .auth(token)
        .body(data)
        .put(`admin/products/${id}/edit`)
        .unauthorized(async (error, request) => {
            logger.error('edit product::', error.status, error.json);
            const resultRefresh = await handleRefetch(request);
            return resultRefresh ?? ({ payload: rawProductDetail } as IProductDetailBodyResponse);
        })
        .fetchError((error) => {
            logger.error('edit product::', error.status, error.json);
            return { payload: rawProductDetail } as IProductDetailBodyResponse;
        })
        .json<IProductDetailBodyResponse>();

    revalidateTag(EKeys.PRODUCT_LIST);
    redirect(EPath.MANAGE_PRODUCT_EDIT.concat(payload.info.slug));
}
export async function removeImage(productId: number, imageId: number) {
    const token = cookies().get(EKeys.ACCESS_TOKEN)?.value;
    await apiRequest
        .auth(token)
        .delete(`admin/products/${productId}/remove-image/${imageId}`)
        .unauthorized(async (error, request) => {
            logger.error('remove image product::', error.status, error.json);
            await handleRefetch(request);
        })
        .json<IListImageResponse>();
}
export async function removeAttribute(productId: number, attributeId: number) {
    const token = cookies().get(EKeys.ACCESS_TOKEN)?.value;
    await apiRequest
        .auth(token)
        .delete(`admin/products/${productId}/remove-attribute/${attributeId}`)
        .fetchError((error) => {
            logger.error('remove attribute::', error.status, error.json);
            return { payload: rawProductDetail } as IProductDetailBodyResponse;
        })
        .json();
}
export async function destroy(id: number) {
    const token = cookies().get(EKeys.ACCESS_TOKEN)?.value;
    await apiRequest
        .auth(token)
        .delete(`admin/products/${id}/delete`)
        .unauthorized(async (error, request) => {
            logger.error('destroy product::', error.status, error.json);
            await handleRefetch(request);
        })
        .json<IBodyResponse>();
    revalidateTag(EKeys.PRODUCT_LIST);
}
