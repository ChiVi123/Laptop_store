import { cookies } from 'next/headers';
import { EKeys } from '~/common/enums';
import { logger, request } from '~/utils';

export async function findAllProduct() {
    const auth = `Bearer ${cookies().get(EKeys.TOKEN)?.value}`;
    try {
        const response = await request.get('admin/products/all', { auth, cache: 'no-cache' });
        return await response.json();
    } catch (error) {
        logger({ [findAllProduct.name]: error });
    }
}
export async function findAllCategoryRoot() {
    try {
        const response = await request.get('public/categories/all-root', {
            cache: 'no-cache',
            next: { tags: [EKeys.CATEGORY_TREE_VIEW] },
        });
        return await response.json();
    } catch (error) {
        logger({ [findAllCategoryRoot.name]: error });
    }
}
export async function findAllBrand() {
    try {
        const response = await request.get('public/brands/all', {
            cache: 'no-cache',
            next: { tags: [EKeys.BRAND_LIST] },
        });
        return await response.json();
    } catch (error) {
        logger({ [findAllBrand.name]: error });
    }
}
