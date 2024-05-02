import { apiRequest, logger } from '~/libs';
import { IPaginationBodyResponse } from '~/types/body.responses';
import { IProduct } from '~/types/models';

export async function getAllProduct() {
    const { payload } = await apiRequest
        .get('public/products/sort-latest')
        .fetchError((error) => {
            logger.anger('get all product::', error.status, error.json);

            return {
                message: error.json?.message,
                payload: { pageNumber: 0, totalPage: 0, list: new Array() },
            } as IPaginationBodyResponse<IProduct>;
        })
        .json<IPaginationBodyResponse<IProduct>>();
    return payload;
}
