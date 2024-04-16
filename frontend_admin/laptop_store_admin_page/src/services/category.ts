'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { EKeys, EPath, HttpStatus } from '~/common/enums';
import { handleRefetch, handleRefreshToken } from '~/libs/handle.error';
import httpRequest, { FetchError } from '~/libs/http.request';
import { categoryFormData } from '~/types/form.data';
import { ICategoryResponse, IResponse } from '~/types/response';
import { PathHandler } from '~/utils';
import { getSessionToken, setCookieJwt } from '~/utils/token';

const pathHandler = new PathHandler('admin/categories');

export async function create(data: categoryFormData) {
    const auth = getSessionToken();
    const path = pathHandler.getPath('create');

    return httpRequest
        .post<ICategoryResponse>(path, data, { auth })
        .then(({ payload }) => {
            revalidateTag(EKeys.CATEGORY_TREE_VIEW);
            return payload;
        })
        .catch(async (error) => {
            if (error instanceof FetchError) {
                if (error.httpCode === HttpStatus.UNAUTHORIZED) {
                    const refreshToken = cookies().get(EKeys.REFRESH_TOKEN)?.value;
                    if (refreshToken) {
                        const accessToken = await handleRefreshToken(refreshToken);
                        setCookieJwt(EKeys.ACCESS_TOKEN, accessToken);
                        return (await handleRefetch<ICategoryResponse>(error, accessToken)).payload;
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
export async function edit(id: number, data: categoryFormData) {
    const auth = getSessionToken();
    const path = pathHandler.getPath(id, 'edit');

    return httpRequest
        .put<ICategoryResponse>(path, data, { auth })
        .then(({ payload }) => {
            revalidateTag(EKeys.CATEGORY_TREE_VIEW);
            return payload;
        })
        .catch(async (error) => {
            if (error instanceof FetchError) {
                if (error.httpCode === HttpStatus.UNAUTHORIZED) {
                    const refreshToken = cookies().get(EKeys.REFRESH_TOKEN)?.value;
                    if (refreshToken) {
                        const accessToken = await handleRefreshToken(refreshToken);
                        setCookieJwt(EKeys.ACCESS_TOKEN, accessToken);
                        return (await handleRefetch<ICategoryResponse>(error, accessToken)).payload;
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
export async function move(fromId: number, toId: number) {
    const auth = getSessionToken();
    const path = pathHandler.getPath(fromId, 'move', toId);
    return httpRequest
        .put<IResponse>(path, null, { auth })
        .then(({ payload }) => {
            revalidateTag(EKeys.CATEGORY_TREE_VIEW);
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
export async function destroy(id: number) {
    const auth = getSessionToken();
    const path = pathHandler.getPath(id, 'delete');
    let categoryId: number;
    return httpRequest
        .delete<ICategoryResponse>(path, { auth })
        .then(({ payload }) => {
            categoryId = payload.id;
            revalidateTag(EKeys.CATEGORY_TREE_VIEW);
        })
        .catch(async (error) => {
            if (error instanceof FetchError) {
                if (error.httpCode === HttpStatus.UNAUTHORIZED) {
                    const refreshToken = cookies().get(EKeys.REFRESH_TOKEN)?.value;
                    if (refreshToken) {
                        const accessToken = await handleRefreshToken(refreshToken);
                        setCookieJwt(EKeys.ACCESS_TOKEN, accessToken);
                        categoryId = (await handleRefetch<ICategoryResponse>(error, accessToken)).payload.id;
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
            redirect(`${EPath.MANAGE_CATEGORY_EDIT}${categoryId}`);
        });
}
