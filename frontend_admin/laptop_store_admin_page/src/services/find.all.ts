'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { EKeys, EPath, HttpStatus } from '~/common/enums';
import { handleRefetch, handleRefreshToken } from '~/libs/handle.error';
import httpRequest, { FetchError, handleError } from '~/libs/http.request';
import { IListCategoryResponse, IListProductResponse } from '~/types/response';
import { getSessionToken } from '~/utils/token';

export async function product() {
    const auth = getSessionToken();
    const path = 'admin/products/all';

    return httpRequest
        .get<IListProductResponse>(path, { auth, next: { tags: [EKeys.PRODUCT_LIST] } })
        .then(({ payload }) => payload)
        .catch(async (error) => {
            if (error instanceof FetchError) {
                if (error.httpCode === HttpStatus.UNAUTHORIZED) {
                    const refreshToken = cookies().get(EKeys.REFRESH_TOKEN)?.value;
                    if (refreshToken) {
                        const accessToken = await handleRefreshToken(refreshToken);
                        return (await handleRefetch<IListProductResponse>(error, accessToken)).payload;
                    } else {
                        redirect(EPath.AUTH_LOGIN);
                    }
                } else {
                    return { error: error.body.message };
                }
            } else {
                return { error: 'Something went wrong!!!' };
            }
        });
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
