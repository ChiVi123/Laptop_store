'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { EKeys, EPath, EStatus } from '~/common/enums';
import { apiRequest, handleRefetch } from '~/libs';
import logger from '~/libs/logger';
import { categoryFormData } from '~/types/form.data';
import { ICategoryInfo, ICategoryNode } from '~/types/models';
import { ICategoryInfoResponse, ICategoryNodeResponse, ICategoryResponse, IResponse } from '~/types/response';

const rawCategoryInfo: ICategoryInfo = {
    id: 0,
    name: '',
    path: '',
    code: '',
    status: EStatus.ENABLED,
    createdDate: '',
    lastModifiedDate: '',
};
const rawCategoryNode: ICategoryNode = {
    id: 0,
    info: rawCategoryInfo,
    children: new Array(),
    createdDate: '',
    lastModifiedDate: '',
};

export async function root() {
    const { payload } = await apiRequest
        .get('public/categories/root', { next: { tags: [EKeys.ROOT_CATEGORY] } })
        .fetchError(() => ({ payload: rawCategoryNode } as ICategoryNodeResponse))
        .json<ICategoryNodeResponse>();
    return payload;
}
export async function getInfoById(id: number) {
    const { payload } = await apiRequest
        .get(`public/categories/${id}/info`, { cache: 'no-cache' })
        .fetchError(() => ({ payload: rawCategoryInfo } as ICategoryInfoResponse))
        .json<ICategoryInfoResponse>();
    return payload;
}
export async function getNodeByInfoId(id: number) {
    const { payload } = await apiRequest
        .get(`public/categories/info-id/${id}`, { cache: 'no-cache' })
        .fetchError(() => ({ payload: rawCategoryNode } as ICategoryNodeResponse))
        .json<ICategoryNodeResponse>();
    return payload;
}
export async function create(data: categoryFormData) {
    const token = cookies().get(EKeys.ACCESS_TOKEN)?.value;
    const { payload } = await apiRequest
        .auth(token)
        .body(data)
        .post('admin/categories/create')
        .unauthorized(async (error, request) => {
            logger.anger('create category::', error.status, error.json);
            const resultRefresh = await handleRefetch(request);
            return resultRefresh ?? ({ payload: rawCategoryNode } as ICategoryNodeResponse);
        })
        .fetchError((error) => {
            logger.anger('create category::', error.status, error.json);
            return { payload: rawCategoryNode } as ICategoryNodeResponse;
        })
        .json<ICategoryNodeResponse>();
    revalidateTag(EKeys.ROOT_CATEGORY);
    return payload;
}
export async function edit(id: number, data: categoryFormData) {
    const token = cookies().get(EKeys.ACCESS_TOKEN)?.value;
    const { payload } = await apiRequest
        .auth(token)
        .body(data)
        .put(`admin/categories/${id}/edit`)
        .unauthorized(async (error, request) => {
            logger.anger('edit category::', error.status, error.json);
            const resultRefresh = await handleRefetch(request);
            return resultRefresh ?? ({ payload: rawCategoryNode } as ICategoryNodeResponse);
        })
        .fetchError((error) => {
            logger.anger('edit category::', error.status, error.json);
            return { payload: rawCategoryNode } as ICategoryNodeResponse;
        })
        .json<ICategoryNodeResponse>();
    revalidateTag(EKeys.ROOT_CATEGORY);
    return payload;
}
export async function move(fromId: number, toId: number) {
    const token = cookies().get(EKeys.ACCESS_TOKEN)?.value;
    const { payload } = await apiRequest
        .auth(token)
        .put(`admin/categories/${fromId}/move/${toId}`)
        .unauthorized(async (error, request) => {
            logger.anger('move category::', error.status, error.json);
            const resultRefresh = await handleRefetch(request);
            return resultRefresh ?? ({ payload: '' } as IResponse);
        })
        .fetchError((error) => {
            logger.anger('category move::', error.json);
            return { payload: '' } as IResponse;
        })
        .json<IResponse>();

    revalidateTag(EKeys.ROOT_CATEGORY);
    return payload;
}
export async function destroy(id: number) {
    const token = cookies().get(EKeys.ACCESS_TOKEN)?.value;
    const { payload } = await apiRequest
        .auth(token)
        .delete(`admin/categories/${id}/delete`)
        .unauthorized(async (error, request) => {
            logger.anger('destroy category::', error.status, error.json);
            const resultRefresh = await handleRefetch(request);
            return resultRefresh ?? ({ payload: { id: 1 } } as ICategoryResponse);
        })
        .json<ICategoryResponse>();

    revalidateTag(EKeys.ROOT_CATEGORY);
    redirect(`${EPath.MANAGE_CATEGORY_EDIT}${payload.id}`);
}
