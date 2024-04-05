'use server';

import { EKeys } from '~/common/enums';
import httpRequest, { stringifyError } from '~/libs/http.request';
import { IListCategoryResponse, IListProductResponse } from '~/types/response';
import getSessionToken from '~/utils/token';

export async function product() {
    const auth = getSessionToken();
    try {
        const response = await httpRequest.get<IListProductResponse>('admin/products/all', {
            auth,
            cache: 'no-cache',
            next: { tags: [EKeys.PRODUCT_LIST] },
        });
        return response.payload;
    } catch (error) {
        return stringifyError(error);
    }
}
export async function rootCategory() {
    try {
        const response = await httpRequest.get<IListCategoryResponse>('public/categories/all-root', {
            cache: 'no-cache',
            next: { tags: [EKeys.CATEGORY_TREE_VIEW] },
        });
        return response.payload;
    } catch (error) {
        return stringifyError(error);
    }
}
