'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { EKeys } from '~/common/enums';
import { addProductFormData } from '~/types/form.data';
import { logger, request } from '~/utils';

export async function addProductAction(data: addProductFormData) {
    const auth = `Bearer ${cookies().get(EKeys.TOKEN)?.value}`;

    try {
        const response = await request.post('admin/products/create', {
            auth,
            data,
            next: { tags: [EKeys.PRODUCT_LIST] },
        });
        return await response.json();
    } catch (error) {
        logger({ [addProductAction.name]: error });
    }
}
export async function deleteProductAction(id: number) {
    const auth = `Bearer ${cookies().get(EKeys.TOKEN)?.value}`;
    try {
        const response = await request.delete(`admin/products/${id}/delete`, { auth });
        revalidateTag(EKeys.PRODUCT_LIST);
        return await response.json();
    } catch (error) {
        logger({ [deleteProductAction.name]: error });
    }
}
