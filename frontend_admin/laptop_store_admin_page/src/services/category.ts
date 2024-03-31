'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { EKeys, EPath } from '~/common/enums';
import httpRequest, { stringifyError } from '~/libs/http.request';
import { categoryFormData } from '~/types/form.data';
import { ICategoryResponse, IResponse } from '~/types/response';
import { PathHandler } from '~/utils';
import getSessionToken from '~/utils/token';

const pathHandler = new PathHandler('admin/categories');

export async function create(data: categoryFormData) {
    const auth = getSessionToken();
    const path = pathHandler.getPath('create');
    let response: ICategoryResponse;
    try {
        response = await httpRequest.post<ICategoryResponse>(path, data, { auth });
        revalidateTag(EKeys.CATEGORY_TREE_VIEW);
    } catch (error) {
        return stringifyError(error);
    }
    redirect(`${EPath.MANAGE_CATEGORY_EDIT}${response.payload.id}`);
}
export async function edit(id: number, data: categoryFormData) {
    const auth = getSessionToken();
    const path = pathHandler.getPath(id, 'edit');
    let response: ICategoryResponse;
    try {
        response = await httpRequest.put<ICategoryResponse>(path, data, { auth });
        revalidateTag(EKeys.CATEGORY_TREE_VIEW);
    } catch (error) {
        return stringifyError(error);
    }
    redirect(`${EPath.MANAGE_CATEGORY_EDIT}${response.payload.id}`);
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
    let response: ICategoryResponse;
    try {
        response = await httpRequest.delete<ICategoryResponse>(path, { auth });
        revalidateTag(EKeys.CATEGORY_TREE_VIEW);
    } catch (error) {
        return stringifyError(error);
    }
    redirect(`${EPath.MANAGE_CATEGORY_EDIT}${response.payload.id}`);
}
