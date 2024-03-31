'use server';

import { revalidateTag } from 'next/cache';
import { EKeys } from '~/common/enums';
import httpRequest, { stringifyError } from '~/libs/http.request';
import { productFormData } from '~/types/form.data';
import { IListImageResponse, IProductResponse, IResponse } from '~/types/response';
import { PathHandler } from '~/utils';
import getSessionToken from '~/utils/token';

const pathHandler = new PathHandler('admin/products');

export async function create(data: productFormData) {
    const auth = getSessionToken();
    const path = pathHandler.getPath('create');
    try {
        const response = await httpRequest.post<IProductResponse>(path, data, { auth });
        revalidateTag(EKeys.PRODUCT_LIST);
        return response.payload;
    } catch (error) {
        return stringifyError(error);
    }
}
export async function edit(id: number, data: productFormData) {
    const auth = getSessionToken();
    const path = pathHandler.getPath(id, 'edit');
    try {
        const response = await httpRequest.put<IProductResponse>(path, data, { auth });
        revalidateTag(EKeys.PRODUCT_LIST);
        return response.payload;
    } catch (error) {
        return stringifyError(error);
    }
}
export async function removeImage(productId: number, imageId: number) {
    const auth = getSessionToken();
    const path = pathHandler.getPath(productId, 'remove-image', imageId);
    try {
        const response = await httpRequest.delete<IListImageResponse>(path, { auth });
        return response.payload;
    } catch (error) {
        return stringifyError(error);
    }
}
export async function destroy(id: number) {
    const auth = getSessionToken();
    const path = pathHandler.getPath(id, 'delete');
    try {
        const response = await httpRequest.delete<IResponse>(path, { auth });
        revalidateTag(EKeys.PRODUCT_LIST);
        return response.payload;
    } catch (error) {
        return stringifyError(error);
    }
}
