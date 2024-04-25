import { EntityStatus } from '~/common/enums';
import { apiRequest, logger } from '~/libs';
import { ICategoryBodyResponse } from '~/types/body.responses';
import { ICategory } from '~/types/models';

const rawCategory: ICategory = {
    id: 0,
    name: '',
    path: '',
    level: 0,
    director: '',
    children: [
        {
            id: 0,
            name: '',
            path: '',
            level: 0,
            director: '',
            children: new Array(),
            status: EntityStatus.ENABLED,
            createdDate: '',
            lastModifiedDate: '',
        },
    ],
    status: EntityStatus.ENABLED,
    createdDate: '',
    lastModifiedDate: '',
};

export async function getRootCategory() {
    const { payload } = await apiRequest
        .get('public/categories/root')
        .fetchError((error) => {
            logger.anger('get root category::', error.status, error.json);

            return { message: error.json?.message, payload: rawCategory } as ICategoryBodyResponse;
        })
        .json<ICategoryBodyResponse>();
    return payload;
}
