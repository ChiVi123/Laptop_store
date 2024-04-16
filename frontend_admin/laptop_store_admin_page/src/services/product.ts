'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { EKeys, EPath, HttpStatus } from '~/common/enums';
import { handleRefetch, handleRefreshToken } from '~/libs/handle.error';
import httpRequest, { FetchError } from '~/libs/http.request';
import { productFormData } from '~/types/form.data';
import { IListImageResponse, IProductResponse, IResponse } from '~/types/response';
import { PathHandler } from '~/utils';
import { getSessionToken, setCookieJwt } from '~/utils/token';

const pathHandler = new PathHandler('admin/products');

export async function create(data: productFormData) {
    const auth = getSessionToken();
    const path = pathHandler.getPath('create');
    let slug = '';

    return httpRequest
        .post<IProductResponse>(path, data, { auth })
        .then(({ payload }) => {
            revalidateTag(EKeys.PRODUCT_LIST);
            slug = payload.slug;
        })
        .catch(async (error) => {
            if (error instanceof FetchError) {
                if (error.httpCode === HttpStatus.UNAUTHORIZED) {
                    const refreshToken = cookies().get(EKeys.REFRESH_TOKEN)?.value;
                    if (refreshToken) {
                        const accessToken = await handleRefreshToken(refreshToken);
                        setCookieJwt(EKeys.ACCESS_TOKEN, accessToken);
                        slug = (await handleRefetch<IProductResponse>(error, accessToken)).payload.slug;
                    } else {
                        redirect(EPath.AUTH_LOGIN);
                    }
                } else {
                    return { error: error.body.message };
                }
            } else {
                return { error: 'Something went wrong!!!' };
            }
        })
        .finally(() => {
            redirect(EPath.MANAGE_PRODUCT_EDIT.concat(slug));
        });
}
export async function edit(id: number, data: productFormData) {
    const auth = getSessionToken();
    const path = pathHandler.getPath(id, 'edit');
    let slug = '';

    return httpRequest
        .put<IProductResponse>(path, data, { auth })
        .then(({ payload }) => {
            revalidateTag(EKeys.PRODUCT_LIST);
            slug = payload.slug;
        })
        .catch(async (error) => {
            if (error instanceof FetchError) {
                if (error.httpCode === HttpStatus.UNAUTHORIZED) {
                    const refreshToken = cookies().get(EKeys.REFRESH_TOKEN)?.value;
                    if (refreshToken) {
                        const accessToken = await handleRefreshToken(refreshToken);
                        setCookieJwt(EKeys.ACCESS_TOKEN, accessToken);
                        slug = (await handleRefetch<IProductResponse>(error, accessToken)).payload.slug;
                    } else {
                        redirect(EPath.AUTH_LOGIN);
                    }
                } else {
                    return { error: error.body.message };
                }
            } else {
                return { error: 'Something went wrong!!!' };
            }
        })
        .finally(() => {
            redirect(EPath.MANAGE_PRODUCT_EDIT.concat(slug));
        });
}
export async function removeImage(productId: number, imageId: number) {
    const auth = getSessionToken();
    const path = pathHandler.getPath(productId, 'remove-image', imageId);

    return httpRequest
        .delete<IListImageResponse>(path, { auth })
        .then(({ payload }) => payload)
        .catch(async (error) => {
            if (error instanceof FetchError) {
                if (error.httpCode === HttpStatus.UNAUTHORIZED) {
                    const refreshToken = cookies().get(EKeys.REFRESH_TOKEN)?.value;
                    if (refreshToken) {
                        const accessToken = await handleRefreshToken(refreshToken);
                        setCookieJwt(EKeys.ACCESS_TOKEN, accessToken);
                        return (await handleRefetch<IListImageResponse>(error, accessToken)).payload;
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
export async function destroy(id: number) {
    const auth = getSessionToken();
    const path = pathHandler.getPath(id, 'delete');

    return httpRequest
        .delete<IResponse>(path, { auth })
        .then(({ payload }) => {
            revalidateTag(EKeys.PRODUCT_LIST);
            return payload;
        })
        .catch(async (error) => {
            if (error instanceof FetchError) {
                if (error.httpCode === HttpStatus.UNAUTHORIZED) {
                    const refreshToken = cookies().get(EKeys.REFRESH_TOKEN)?.value;
                    if (refreshToken) {
                        const accessToken = await handleRefreshToken(refreshToken);
                        setCookieJwt(EKeys.ACCESS_TOKEN, accessToken);
                        return (await handleRefetch<IResponse>(error, accessToken)).payload;
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
