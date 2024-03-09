'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { EKeys } from '~/common/enums';
import { addCategoryFormData } from '~/types/form.data';
import { logger, request } from '~/utils';

export async function createCategoryChildActions(data: addCategoryFormData) {
    const auth = `Bearer ${cookies().get(EKeys.TOKEN)?.value}`;
    try {
        const response = await request.post('admin/categories/create', { auth, data });
        revalidateTag(EKeys.CATEGORY_TREE_VIEW);
        return await response.json();
    } catch (error) {
        logger({ [createCategoryChildActions.name]: error });
    }
}
export async function movePositionCategoryAction(parentId: number, childId: number, newParentId: number) {
    const auth = `Bearer ${cookies().get(EKeys.TOKEN)?.value}`;
    try {
        const response = await request.put(`admin/categories/${childId}/move/${parentId}/${newParentId}`, { auth });
        revalidateTag(EKeys.CATEGORY_TREE_VIEW);
        return await response.json();
    } catch (error) {
        logger({ [movePositionCategoryAction.name]: error });
    }
}
