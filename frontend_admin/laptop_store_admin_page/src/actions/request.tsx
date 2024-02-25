import { cookies } from 'next/headers';
import { EKeys } from '~/common/enums';
import {
    IAllBrandResponse,
    IAllCategoryResponse,
    IAllProductResponse,
    IErrorResponse,
    IProductDetailResponse,
} from '~/types/response';
import { fetaos, logger } from '~/utils';

export const request = fetaos(process.env.REACT_API_V1);

export async function findAllProduct() {
    const authorization = `Bearer ${cookies().get(EKeys.TOKEN)?.value}`;
    try {
        const response = await request.get<IAllProductResponse, IErrorResponse>('admin/products/find-all', {
            headers: { Authorization: authorization },
            cache: 'no-cache',
        });
        return response;
    } catch (error) {
        logger(findAllProduct.name, error);
    }
}

export async function findProductBySlug(slug: string) {
    try {
        const response = await request.get<IProductDetailResponse, IErrorResponse>('public/products', {
            pathVariables: [slug],
            cache: 'no-cache',
        });
        return response;
    } catch (error) {
        logger(findProductBySlug.name, error);
    }
}

export async function findAllCategory() {
    try {
        const response = await request.get<IAllCategoryResponse, IErrorResponse>('public/categories/find-all');
        return response;
    } catch (error) {
        logger(findAllCategory.name, error);
    }
}

export async function findAllBrand() {
    try {
        const response = await request.get<IAllBrandResponse, IErrorResponse>('public/brands/find-all');
        return response;
    } catch (error) {
        logger(findAllBrand.name, error);
    }
}
