'use server';

import { cookies } from 'next/headers';
import { EKeys } from '~/common/enums';
import { addProductFormData } from '~/types/form.data';
import { logger, request } from '~/utils';

export async function addProductAction(data: addProductFormData) {
    const auth = `Bearer ${cookies().get(EKeys.TOKEN)?.value}`;

    try {
        const response = await request.post('admin/products/create', { auth, data });
        return await response.json();
    } catch (error) {
        logger({ [addProductAction.name]: error });
    }
}
