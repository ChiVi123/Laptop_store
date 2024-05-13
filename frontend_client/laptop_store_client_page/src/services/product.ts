import { EntityStatus } from '~/common/enums';
import { apiRequest, logger } from '~/libs';
import { IPaginationBodyResponse, IProductDetailBodyResponse, ISectionBodyResponse } from '~/types/body.responses';
import { IProductDetail, IProductInfo } from '~/types/models';

const rawProductInfo: IProductInfo = {
    id: 0,
    name: '',
    slug: '',
    thumbnailUrl: '',
    description: '',
    price: 0,
    discount: 0,
    discountRate: 0,
    quantityStock: 0,
    quantitySold: 0,
    reviewCount: 0,
    ratingAverage: 0,
    status: EntityStatus.ENABLED,
    createdDate: '',
    lastModifiedDate: '',
};
const rawProductDetail: IProductDetail = {
    id: 0,
    info: rawProductInfo,
    categories: new Array(),
    images: new Array(),
    createdDate: '',
    lastModifiedDate: '',
};

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
export async function getAllProductByCategories(code: string) {}
export async function getProductBySlug(slug: string) {
    const { payload } = await apiRequest
        .get(`public/products/${slug}`)
        .fetchError((error) => {
            logger.anger('product slug::', error.status, error.json);
            return { message: error.json?.message, payload: rawProductDetail } as IProductDetailBodyResponse;
        })
        .json<IProductDetailBodyResponse>();
    return payload;
}
