import { apiRequest, logger } from '~/libs';
import { IPaginationBodyResponse, ISectionBodyResponse } from '~/types/body.responses';
import { IProductInfo } from '~/types/models';

export async function getAllProduct() {
    const { payload } = await apiRequest
        .get('public/products/sort-latest')
        .fetchError((error) => {
            logger.anger('get all product::', error.status, error.json);
            return {
                message: error.json?.message,
                payload: { pageNumber: 0, totalPage: 0, list: new Array() },
            } as IPaginationBodyResponse<IProductInfo>;
        })
        .json<IPaginationBodyResponse<IProductInfo>>();
    return payload;
}
export async function getDataHomePage(ids: number[]) {
    const { payload } = await apiRequest
        .params({ category_ids: ids })
        .get('public/products/list-data-home-page')
        .fetchError((error) => {
            logger.anger('data home page::', error.status, error.json);
            return { message: error.json?.message, payload: new Array() } as ISectionBodyResponse<IProductInfo>;
        })
        .json<ISectionBodyResponse<IProductInfo>>();
    return payload;
}
