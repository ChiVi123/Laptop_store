import { cookies } from 'next/headers';
import { EKeys } from '~/common/enums';
import { logger, request } from '~/utils';

export async function findAllProduct() {
    const auth = `Bearer ${cookies().get(EKeys.TOKEN)?.value}`;
    try {
        const response = await request.get('admin/products/find-all', { auth, cache: 'no-cache' });
        return await response.json();
    } catch (error) {
        logger({ [findAllProduct.name]: error });
    }
}
export async function findAllCategory() {
    try {
        const response = await request.get('public/categories/find-all');
        return await response.json();
    } catch (error) {
        logger({ [findAllCategory.name]: error });
    }
}
export async function findAllBrand() {
    try {
        const response = await request.get('public/brands/find-all');
        return await response.json();
    } catch (error) {
        logger({ [findAllBrand.name]: error });
    }
}
