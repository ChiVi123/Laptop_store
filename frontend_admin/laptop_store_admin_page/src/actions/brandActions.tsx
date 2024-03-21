'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { EKeys } from '~/common/enums';
import { brandFormData } from '~/types/form.data';
import { logger, request } from '~/utils';

export async function createBrandAction(data: brandFormData) {
    const auth = `Bearer ${cookies().get(EKeys.TOKEN)?.value}`;
    try {
        const response = await request.post('admin/brands/create', { auth, data });
        revalidateTag(EKeys.BRAND_LIST);
        return await response.json();
    } catch (error) {
        logger({ [createBrandAction.name]: error });
    }
}
export async function editBrandAction(id: number, data: brandFormData) {
    const auth = `Bearer ${cookies().get(EKeys.TOKEN)?.value}`;
    try {
        const response = await request.put(`admin/brands/${id}/edit`, { auth, data });
        revalidateTag(EKeys.BRAND_LIST);
        return await response.json();
    } catch (error) {
        logger({ [createBrandAction.name]: error });
    }
}
export async function removeLogoBrandAction(id: number) {
    const auth = `Bearer ${cookies().get(EKeys.TOKEN)?.value}`;
    try {
        const response = await request.put(`admin/brands/${id}/remove-logo`, { auth });
        revalidateTag(EKeys.BRAND_LIST);
        return await response.json();
    } catch (error) {
        logger({ [createBrandAction.name]: error });
    }
}
export async function deleteBrandActon(id: number) {
    const auth = `Bearer ${cookies().get(EKeys.TOKEN)?.value}`;
    try {
        const response = await request.delete(`admin/brands/${id}/delete`, { auth });
        revalidateTag(EKeys.BRAND_LIST);
        return await response.json();
    } catch (error) {
        logger({ [deleteBrandActon.name]: error });
    }
}
