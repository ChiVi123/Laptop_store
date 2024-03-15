'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { EKeys } from '~/common/enums';
import { addCategoryFormData } from '~/types/form.data';
import { logger, request } from '~/utils';

export async function createSubCategoryAction(data: addCategoryFormData) {
    const auth = `Bearer ${cookies().get(EKeys.TOKEN)?.value}`;
    try {
        const response = await request.post('admin/categories/create-sub', { auth, data });
        revalidateTag(EKeys.CATEGORY_TREE_VIEW);
        return await response.json();
    } catch (error) {
        logger({ [createSubCategoryAction.name]: error });
    }
}
export async function moveCategoryAction(fromId: number, toId: number) {
    const auth = `Bearer ${cookies().get(EKeys.TOKEN)?.value}`;
    try {
        const response = await request.put(`admin/categories/${fromId}/move/${toId}`, { auth });
        revalidateTag(EKeys.CATEGORY_TREE_VIEW);
        return await response.json();
    } catch (error) {
        logger({ [moveCategoryAction.name]: error });
    }
}
export async function deleteCategoryAction(id: number) {
    const auth = `Bearer ${cookies().get(EKeys.TOKEN)?.value}`;
    try {
        const response = await request.delete(`admin/categories/${id}/delete`, { auth });
        revalidateTag(EKeys.CATEGORY_TREE_VIEW);
        return await response.json();
    } catch (error) {
        logger({ [deleteCategoryAction.name]: error });
    }
}
