import { RAW_PRODUCT_DETAIL } from '~/common/values';
import { apiRequest, logger } from '~/libs';
import { IPaginationBodyResponse, IProductDetailBodyResponse, ISectionBodyResponse } from '~/types/body.responses';
import { IProductInfo } from '~/types/models';

export async function getDataHomePage(ids: number[]) {
    const { payload } = await apiRequest
        .params({ category_ids: ids.toString() })
        .get('api/v1/public/products/list-data-home-page')
        .fetchError((error) => {
            logger.error('data home page::', error.status, error.json);
            return { message: error.json?.message, payload: new Array() } as ISectionBodyResponse<IProductInfo>;
        })
        .json<ISectionBodyResponse<IProductInfo>>();
    return payload;
}
export async function getProductBySlug(slug: string) {
    const { payload } = await apiRequest
        .get(`api/v1/public/products/${slug}`)
        .fetchError((error) => {
            logger.error('product slug::', error.status, error.json);
            return { message: error.json?.message, payload: RAW_PRODUCT_DETAIL } as IProductDetailBodyResponse;
        })
        .json<IProductDetailBodyResponse>();
    return payload;
}
interface SearchParams {
    query: string;
    sort_by: string;
    sort_dir: 'asc' | 'desc';
    page_number: string | undefined;
    page_size: string | undefined;
}
export async function searchProduct(params: Partial<SearchParams> | URLSearchParams) {
    const { payload } = await apiRequest
        .params(params)
        .get('api/v1/public/products/search')
        .fetchError((error): IPaginationBodyResponse<IProductInfo> => {
            logger.error('product search::', error.status, error.json);
            return { message: error.json?.message ?? '', payload: { list: [], pageNumber: 1, totalPage: 0 } };
        })
        .json<IPaginationBodyResponse<IProductInfo>>();
    return payload;
}
type FindByCategoryIdProps = {
    category_id: string;
    sort_by: string;
    sort_dir: string;
    page_number: string;
    page_size: string;
};
export async function findAllProductByCategoryId(params: Partial<FindByCategoryIdProps>) {
    const { payload } = await apiRequest
        .params(params)
        .get('api/v1/public/products/by-category')
        .fetchError((error): IPaginationBodyResponse<IProductInfo> => {
            logger.error('product by category id::', error.status, error.json);
            return { message: error.json?.message ?? '', payload: { list: [], pageNumber: 1, totalPage: 0 } };
        })
        .json<IPaginationBodyResponse<IProductInfo>>();
    return payload;
}
