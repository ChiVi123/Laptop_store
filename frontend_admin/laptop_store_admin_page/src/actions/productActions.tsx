'use server';

import { cookies } from 'next/headers';
import { EKeys } from '~/common/enums';
import { addProductFormData } from '~/types/form.data';
import { IErrorResponse, IProductDetailResponse } from '~/types/response';
import { logger } from '~/utils';
import { request } from './request';

export async function addProductAction(data: addProductFormData) {
    const authorization = `Bearer ${cookies().get(EKeys.TOKEN)?.value}`;

    try {
        const response = await request.post<IProductDetailResponse, IErrorResponse>('admin/products/create', {
            data,
            json: true,
            headers: { Authorization: authorization },
        });
        return response;
    } catch (error) {
        logger(addProductAction.name, error);
    }
}
