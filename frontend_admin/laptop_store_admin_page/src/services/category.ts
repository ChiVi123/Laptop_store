'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { EKeys, EPath } from '~/common/enums';
import httpRequest, { handleError } from '~/libs/http.request';
import { categoryFormData } from '~/types/form.data';
import { ICategoryResponse, IResponse } from '~/types/response';
import { PathHandler } from '~/utils';
import { getSessionToken, handleRefreshToken, setCookieJwt } from '~/utils/token';

const pathHandler = new PathHandler('admin/categories');

export async function create(data: categoryFormData) {
    const auth = getSessionToken();
    const path = pathHandler.getPath('create');
    let categoryId: number;
    try {
        categoryId = (await httpRequest.post<ICategoryResponse>(path, data, { auth })).payload.id;
        revalidateTag(EKeys.CATEGORY_TREE_VIEW);
    } catch (error) {
        const refreshTokenData = await handleRefreshToken(error);
        if (refreshTokenData === undefined) {
            return handleError(error);
        } else {
            const { bodyJson, token } = refreshTokenData;
            setCookieJwt(EKeys.ACCESS_TOKEN, token);
            categoryId = ((await bodyJson) as ICategoryResponse).payload.id;
        }
    }
    redirect(`${EPath.MANAGE_CATEGORY_EDIT}${categoryId}`);
}
export async function edit(id: number, data: categoryFormData) {
    const auth = getSessionToken();
    const path = pathHandler.getPath(id, 'edit');
    let categoryId: number;
    try {
        categoryId = (await httpRequest.put<ICategoryResponse>(path, data, { auth })).payload.id;
        revalidateTag(EKeys.CATEGORY_TREE_VIEW);
    } catch (error) {
        const refreshTokenData = await handleRefreshToken(error);
        if (refreshTokenData === undefined) {
            return handleError(error);
        } else {
            const { bodyJson, token } = refreshTokenData;
            setCookieJwt(EKeys.ACCESS_TOKEN, token);
            categoryId = ((await bodyJson) as ICategoryResponse).payload.id;
        }
    }
    redirect(`${EPath.MANAGE_CATEGORY_EDIT}${categoryId}`);
}
export async function move(fromId: number, toId: number) {
    const auth = getSessionToken();
    const path = pathHandler.getPath(fromId, 'move', toId);
    try {
        const response = await httpRequest.put<IResponse>(path, null, { auth });
        revalidateTag(EKeys.CATEGORY_TREE_VIEW);
        return response.payload;
    } catch (error) {
        const refreshTokenData = await handleRefreshToken(error);
        if (refreshTokenData === undefined) {
            return handleError(error);
        } else {
            const { bodyJson, token } = refreshTokenData;
            setCookieJwt(EKeys.ACCESS_TOKEN, token);
            return ((await bodyJson) as IResponse).payload;
        }
    }
}
export async function destroy(id: number) {
    const auth = getSessionToken();
    const path = pathHandler.getPath(id, 'delete');
    let categoryId: number;
    try {
        categoryId = (await httpRequest.delete<ICategoryResponse>(path, { auth })).payload.id;
        revalidateTag(EKeys.CATEGORY_TREE_VIEW);
    } catch (error) {
        const refreshTokenData = await handleRefreshToken(error);
        if (refreshTokenData === undefined) {
            return handleError(error);
        } else {
            const { bodyJson, token } = refreshTokenData;
            setCookieJwt(EKeys.ACCESS_TOKEN, token);
            categoryId = ((await bodyJson) as ICategoryResponse).payload.id;
        }
    }
    redirect(`${EPath.MANAGE_CATEGORY_EDIT}${categoryId}`);
}
