import { EntityStatus } from '~/common/enums';
import { apiRequest, logger } from '~/libs';
import { ICategoryNodeBodyResponse } from '~/types/body.responses';
import { ICategoryInfo, ICategoryNode } from '~/types/models';

const rawCategoryInfo: ICategoryInfo = {
    id: 0,
    name: '',
    path: '',
    code: '',
    status: EntityStatus.ENABLED,
    createdDate: '',
    lastModifiedDate: '',
};
const rawCategoryNode: ICategoryNode = {
    id: 0,
    info: rawCategoryInfo,
    children: [
        {
            id: 0,
            info: rawCategoryInfo,
            children: new Array(),
            createdDate: '',
            lastModifiedDate: '',
        },
    ],
    createdDate: '',
    lastModifiedDate: '',
};

export async function getRootCategory() {
    const { payload } = await apiRequest
        .get('public/categories/root')
        .fetchError((error) => {
            logger.anger('get root category::', error.status, error.json);
            return { message: error.json?.message, payload: rawCategoryNode } as ICategoryNodeBodyResponse;
        })
        .json<ICategoryNodeBodyResponse>();
    return payload;
}
