'use server';

import { IErrorResponse, IProductDetailResponse } from '~/types/response';
import { logger } from '~/utils';
import { request } from './request';

export async function productBySlugAction(slug: string) {
    try {
        const response = await request.get<IProductDetailResponse, IErrorResponse>(
            'public/products',
            {
                pathVariables: [slug],
                cache: 'no-cache',
            },
        );
        return response;
    } catch (error) {
        logger(productBySlugAction.name, error);
    }
}
