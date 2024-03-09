import { logger, request } from '~/utils';

export async function findProductBySlug(slug: string) {
    try {
        const response = await request.get(`public/products/${slug}`, { cache: 'no-cache' });
        return await response.json();
    } catch (error) {
        logger({ [findProductBySlug.name]: error });
    }
}
export async function findCategoryById(id: number) {
    try {
        const response = await request.get(`public/categories/${id}`, { cache: 'no-cache' });
        return await response.json();
    } catch (error) {
        logger({ [findCategoryById.name]: error });
    }
}
