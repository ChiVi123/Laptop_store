import { RAW_CATEGORY_INFO, RAW_CATEGORY_NODE } from '~/common/values';
import { apiRequest, logger } from '~/libs';
import { ICategoryInfoBodyResponse, ICategoryNodeBodyResponse } from '~/types/body.responses';

export async function getRootCategory() {
    const { payload } = await apiRequest
        .get('api/v1/public/categories/root')
        .fetchError((error): ICategoryNodeBodyResponse => {
            logger.error('get root category::', error.status, error.json);
            return { message: error.json?.message ?? '', payload: RAW_CATEGORY_NODE };
        })
        .json<ICategoryNodeBodyResponse>();
    return payload;
}
export async function findCategoryById(id: number) {
    const { payload } = await apiRequest
        .get(`api/v1/public/categories/${id}/info`)
        .fetchError((error): ICategoryInfoBodyResponse => {
            logger.error('get category by id::', error.status, error.json);
            return { message: error.json?.message ?? '', payload: RAW_CATEGORY_INFO };
        })
        .json<ICategoryInfoBodyResponse>();
    return payload;
}
