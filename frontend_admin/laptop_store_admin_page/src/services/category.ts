'use client';

import { revalidateTag } from 'next/cache';
import { EKeys } from '~/common/enums';
import httpRequest, { stringifyError } from '~/libs/http.request';
import { categoryFormData } from '~/types/form.data';
import { ICategoryResponse, IResponse } from '~/types/response';
import { PathHandler } from '~/utils';
import getSessionToken from '~/utils/token';

const pathHandler = new PathHandler('admin/categories');

export async function create(data: categoryFormData) {
    const auth = getSessionToken();
    const path = pathHandler.getPath('create-', data.parentId ? 'sub' : 'root');
    try {
        const response = await httpRequest.post<ICategoryResponse>(path, data, { auth });
        revalidateTag(EKeys.CATEGORY_TREE_VIEW);
        return response.payload;
    } catch (error) {
        return stringifyError(error);
    }
}
export async function edit(id: number, data: categoryFormData) {
    const auth = getSessionToken();
    const path = pathHandler.getPath(id, 'edit');
    try {
        const response = await httpRequest.put<ICategoryResponse>(path, data, { auth });
        revalidateTag(EKeys.CATEGORY_TREE_VIEW);
        return response.payload;
    } catch (error) {
        return stringifyError(error);
    }
}
export async function move(fromId: number, toId: number) {
    const auth = getSessionToken();
    const path = pathHandler.getPath(fromId, 'move', toId);
    try {
        const response = await httpRequest.put<IResponse>(path, null, { auth });
        revalidateTag(EKeys.CATEGORY_TREE_VIEW);
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
        revalidateTag(EKeys.CATEGORY_TREE_VIEW);
        return response.payload;
    } catch (error) {
        return stringifyError(error);
    }
}
