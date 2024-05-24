import { RAW_CATEGORY_NODE } from '~/common/values';
import { apiRequest, logger } from '~/libs';
import { ICategoryNodeBodyResponse } from '~/types/body.responses';

export async function getRootCategory() {
    const { payload } = await apiRequest
        .get('public/categories/root')
        .fetchError((error) => {
            logger.anger('get root category::', error.status, error.json);
            return { message: error.json?.message, payload: RAW_CATEGORY_NODE } as ICategoryNodeBodyResponse;
        })
        .json<ICategoryNodeBodyResponse>();
    return payload;
}
