import httpRequest, { stringifyError } from '~/libs/http.request';
import { IBrandResponse, ICategoryResponse, IProductResponse } from '~/types/response';

export async function productBySlug(slug: string) {
    try {
        const response = await httpRequest.get<IProductResponse>(`public/products/${slug}`, { cache: 'no-cache' });
        return response.payload;
    } catch (error) {
        return stringifyError(error);
    }
}
export async function rootCategory() {
    try {
        const response = await httpRequest.get<ICategoryResponse>('public/categories/root', { cache: 'no-cache' });
        return response.payload;
    } catch (error) {
        return stringifyError(error);
    }
}
export async function categoryById(id: number) {
    try {
        const response = await httpRequest.get<ICategoryResponse>(`public/categories/${id}`, { cache: 'no-cache' });
        return response.payload;
    } catch (error) {
        return stringifyError(error);
    }
}
export async function brandById(id: number) {
    try {
        const response = await httpRequest.get<IBrandResponse>(`public/brands/${id}`, { cache: 'no-cache' });
        return response.payload;
    } catch (error) {
        return stringifyError(error);
    }
}
