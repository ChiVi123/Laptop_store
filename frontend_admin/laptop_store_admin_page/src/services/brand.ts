'use server';

import { revalidateTag } from 'next/cache';
import { EKeys } from '~/common/enums';
import httpRequest, { stringifyError } from '~/libs/http.request';
import { brandFormData } from '~/types/form.data';
import { IBrandResponse, IResponse } from '~/types/response';
import { PathHandler } from '~/utils';
import getSessionToken from '~/utils/token';

const pathHandler = new PathHandler('admin/brands');

export async function create(data: brandFormData) {
    const auth = getSessionToken();
    const path = pathHandler.getPath('create');
    try {
        const response = await httpRequest.post<IBrandResponse>(path, data, { auth });
        return response.payload;
    } catch (error) {
        return stringifyError(error);
    }
}
export async function edit(id: number, data: brandFormData) {
    const auth = getSessionToken();
    const path = pathHandler.getPath(id, 'edit');
    try {
        const response = await httpRequest.put<IBrandResponse>(path, data, { auth });
        return response.payload;
    } catch (error) {
        return stringifyError(error);
    }
}
export async function removeLogo(id: number) {
    const auth = getSessionToken();
    const path = pathHandler.getPath(id, 'remove-logo');
    try {
        const response = await httpRequest.delete<IResponse>(path, { auth });
        revalidateTag(EKeys.BRAND_LIST);
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
        revalidateTag(EKeys.BRAND_LIST);
        return response.payload;
    } catch (error) {
        return stringifyError(error);
    }
}
