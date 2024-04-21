'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { EKeys, EPath, EStatus } from '~/common/enums';
import { apiRequest } from '~/libs';
import { handleRefresh } from '~/libs/helper.request';
import { logAnger, logInfo } from '~/libs/logger';
import { categoryFormData } from '~/types/form.data';
import { ICategoryResponse, IResponse } from '~/types/response';

export async function root() {
    const { payload } = await apiRequest
        .get('public/categories/root', { next: { tags: [EKeys.ROOT_CATEGORY] } })
        .fetchError((error) => {
            logAnger('root category::', error, { status: error.status }, { json: error.json });
            return {
                payload: {
                    id: 0,
                    name: '',
                    path: '',
                    level: 0,
                    director: '',
                    children: new Array(),
                    status: EStatus.ENABLED,
                },
            } as ICategoryResponse;
        })
        .json<ICategoryResponse>();
    return payload;
}
export async function byId(id: number) {
    const { payload } = await apiRequest
        .get(`public/categories/${id}`, { cache: 'no-store' })
        .fetchError((error) => {
            logAnger('category id::', error, { status: error.status }, { json: error.json });
            return {
                payload: {
                    id: 0,
                    name: '',
                    path: '',
                    level: 0,
                    director: '',
                    children: new Array(),
                    status: EStatus.ENABLED,
                },
            } as ICategoryResponse;
        })
        .json<ICategoryResponse>();
    return payload;
}
export async function create(data: categoryFormData) {
    const token = cookies().get(EKeys.ACCESS_TOKEN)?.value;
    logInfo('create category token::', token?.split('.').pop());

    const { payload } = await apiRequest
        .auth(token)
        .body(data)
        .post('admin/categories/create')
        .unauthorized(async (_error, request) => {
            const resultRefresh = await handleRefresh(request);
            return resultRefresh ?? ({ payload: { name: '', path: '', status: EStatus.ENABLED } } as ICategoryResponse);
        })
        .json<ICategoryResponse>();
    revalidateTag(EKeys.ROOT_CATEGORY);
    return payload;
}
export async function edit(id: number, data: categoryFormData) {
    const token = cookies().get(EKeys.ACCESS_TOKEN)?.value;
    logInfo('edit category token::', token?.split('.').pop());

    const { payload } = await apiRequest
        .auth(token)
        .body(data)
        .put(`admin/categories/${id}/edit`)
        .unauthorized(async (_error, request) => {
            const resultRefresh = await handleRefresh(request);
            return resultRefresh ?? ({ payload: { name: '', path: '', status: EStatus.ENABLED } } as ICategoryResponse);
        })
        .json<ICategoryResponse>();
    revalidateTag(EKeys.ROOT_CATEGORY);
    return payload;
}
export async function move(fromId: number, toId: number) {
    const token = cookies().get(EKeys.ACCESS_TOKEN)?.value;
    logInfo('move category token::', token?.split('.').pop());

    const { payload } = await apiRequest
        .auth(token)
        .put(`admin/categories/${fromId}/move/${toId}`)
        .unauthorized(async (_error, request) => {
            const resultRefresh = await handleRefresh(request);
            return resultRefresh ?? ({ payload: '' } as IResponse);
        })
        .json<IResponse>();

    revalidateTag(EKeys.ROOT_CATEGORY);

    return payload;
}
export async function destroy(id: number) {
    const token = cookies().get(EKeys.ACCESS_TOKEN)?.value;
    logInfo('destroy category token::', token?.split('.').pop());

    const { payload } = await apiRequest
        .auth(token)
        .delete(`admin/categories/${id}/delete`)
        .unauthorized(async (_error, request) => {
            const resultRefresh = await handleRefresh(request);
            return resultRefresh ?? ({ payload: { id: 1 } } as ICategoryResponse);
        })
        .json<ICategoryResponse>();

    revalidateTag(EKeys.ROOT_CATEGORY);
    redirect(`${EPath.MANAGE_CATEGORY_EDIT}${payload.id}`);
}