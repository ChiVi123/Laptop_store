'use server';

import { EKeys } from '~/common/enums';
import httpRequest, { handleError } from '~/libs/http.request';
import { IListCategoryResponse, IListProductResponse } from '~/types/response';
import { getSessionToken, handleRefreshToken, setCookieJwt } from '~/utils/token';

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
        const refreshTokenData = await handleRefreshToken(error);
        if (refreshTokenData === undefined) {
            return handleError(error);
        } else {
            const { bodyJson, token } = refreshTokenData;
            setCookieJwt(EKeys.ACCESS_TOKEN, token);
            return ((await bodyJson) as IListProductResponse).payload;
        }
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
        return handleError(error);
    }
}
