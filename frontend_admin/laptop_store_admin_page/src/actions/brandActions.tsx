'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { EKeys } from '~/common/enums';
import { addBrandFormData } from '~/types/form.data';
import { logger, request } from '~/utils';

export async function createBrandAction(data: addBrandFormData) {
    const auth = `Bearer ${cookies().get(EKeys.TOKEN)?.value}`;

    try {
        const response = await request.post('admin/brands/create', { auth, data });
        revalidateTag(EKeys.BRAND_LIST);
        return await response.json();
    } catch (error) {
        logger({ [createBrandAction.name]: error });
    }
}
