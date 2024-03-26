'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { EKeys } from '~/common/enums';
import { productFormData } from '~/types/form.data';
import { logger, request } from '~/utils';

function getToken(): string {
    return `Bearer ${cookies().get(EKeys.TOKEN)?.value}`;
}

export async function addProductAction(data: productFormData) {
    const auth = getToken();
    try {
        const response = await request.post('admin/products/create', { auth, data });
        return await response.json();
    } catch (error) {
        logger({ [addProductAction.name]: error });
    }
}
export async function editProductAction(id: number, data: productFormData) {
    const auth = getToken();
    try {
        const response = await request.put(`admin/products/${id}/edit`, { auth, data });
        return await response.json();
    } catch (error) {
        logger({ [addProductAction.name]: error });
    }
}
export async function removeImageProductAction(productId: number, imageId: number) {
    const auth = getToken();
    try {
        const response = await request.delete(`admin/products/${productId}/remove-image/${imageId}`, { auth });
        return await response.json();
    } catch (error) {
        logger({ [removeImageProductAction.name]: error });
    }
}
export async function deleteProductAction(id: number) {
    const auth = getToken();
    try {
        const response = await request.delete(`admin/products/${id}/delete`, { auth });
        revalidateTag(EKeys.PRODUCT_LIST);
        return await response.json();
    } catch (error) {
        logger({ [deleteProductAction.name]: error });
    }
}
