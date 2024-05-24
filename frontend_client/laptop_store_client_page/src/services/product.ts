import { RAW_PRODUCT_DETAIL } from '~/common/values';
import { apiRequest, logger } from '~/libs';
import { IProductDetailBodyResponse, ISectionBodyResponse } from '~/types/body.responses';
import { IProductInfo } from '~/types/models';

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
export async function getProductBySlug(slug: string) {
    const { payload } = await apiRequest
        .get(`public/products/${slug}`)
        .fetchError((error) => {
            logger.anger('product slug::', error.status, error.json);
            return { message: error.json?.message, payload: RAW_PRODUCT_DETAIL } as IProductDetailBodyResponse;
        })
        .json<IProductDetailBodyResponse>();
    return payload;
}
