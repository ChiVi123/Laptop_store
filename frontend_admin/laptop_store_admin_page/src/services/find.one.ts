import httpRequest, { FetchError } from '~/libs/http.request';
import { ICategoryResponse, IProductResponse } from '~/types/response';

export async function productBySlug(slug: string) {
    return httpRequest
        .get<IProductResponse>(`public/products/${slug}`, { cache: 'no-cache' })
        .then(({ payload }) => payload)
        .catch((error) => {
            if (error instanceof FetchError) {
                return { error: error.body.message };
            } else {
                return { error: 'Something went wrong!!!' };
            }
        });
}
export async function rootCategory() {
    return httpRequest
        .get<ICategoryResponse>('public/categories/root', { cache: 'no-cache' })
        .then(({ payload }) => payload)
        .catch((error) => {
            if (error instanceof FetchError) {
                return { error: error.body.message };
            } else {
                return { error: 'Something went wrong!!!' };
            }
        });
}
export async function categoryById(id: number) {
    return httpRequest
        .get<ICategoryResponse>(`public/categories/${id}`, { cache: 'no-cache' })
        .then(({ payload }) => payload)
        .catch((error) => {
            if (error instanceof FetchError) {
                return { error: error.body.message };
            } else {
                return { error: 'Something went wrong!!!' };
            }
        });
}
