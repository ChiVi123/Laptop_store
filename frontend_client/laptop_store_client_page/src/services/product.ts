import { RAW_PRODUCT_DETAIL } from '~/common/values';
import { apiRequest, logger } from '~/libs';
import { IPaginationBodyResponse, IProductDetailBodyResponse, ISectionBodyResponse } from '~/types/body.responses';
import { IProductInfo } from '~/types/models';

export async function getDataHomePage(ids: number[]) {
    const { payload } = await apiRequest
        .params({ category_ids: ids })
        .get('public/products/list-data-home-page')
        .fetchError((error) => {
            logger.error('data home page::', error.status, error.json);
            return { message: error.json?.message, payload: new Array() } as ISectionBodyResponse<IProductInfo>;
        })
        .json<ISectionBodyResponse<IProductInfo>>();
    return payload;
}
export async function getProductBySlug(slug: string) {
    const { payload } = await apiRequest
        .get(`public/products/${slug}`)
        .fetchError((error) => {
            logger.error('product slug::', error.status, error.json);
            return { message: error.json?.message, payload: RAW_PRODUCT_DETAIL } as IProductDetailBodyResponse;
        })
        .json<IProductDetailBodyResponse>();
    return payload;
}
interface ISearchParams {
    query?: string;
    sort_by?: string;
    sort_dir?: 'asc' | 'desc';
    page_number: number | string | undefined;
    page_size: number | string | undefined;
}
export async function searchProduct({
    query = '',
    sort_by = 'created_at',
    sort_dir = 'desc',
    ...params
}: ISearchParams & Record<string, unknown>) {
    const { payload } = await apiRequest
        .params({ query, sort_by, sort_dir, ...params })
        .get('public/products/search')
        .fetchError((error): IPaginationBodyResponse<IProductInfo> => {
            logger.error('product search::', error.status, error.json);
            return { message: error.json?.message ?? '', payload: { list: [], pageNumber: 1, totalPage: 0 } };
        })
        .json<IPaginationBodyResponse<IProductInfo>>();
    return payload;
}
