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
const initProductDetail: IProductDetail = {
    id: 5,
    createdDate: '2024-05-07T17:44:27.755442',
    lastModifiedDate: '2024-05-07T17:44:27.755442',
    info: {
        id: 5,
        createdDate: '2024-05-07T17:44:27.730252',
        lastModifiedDate: '2024-05-07T17:44:27.730252',
        name: 'MacBook Pro 14 inch 2023 M3',
        slug: 'macbook-pro-14-inch-2023-m3',
        thumbnailUrl:
            'https://res.cloudinary.com/dat2lyvva/image/upload/v1715078664/laptop_store/p30hs6h3e7tkwifwkdq4.webp',
        description:
            '<p>MacBook Pro M3 2023 14 inch (16GB/1TB SSD) chỉ nhỏ hơn một chút so với MacBook Pro 13 inch 2022. Nhờ đó, máy vẫn đảm bảo được không gian màn hình rộng rãi, thoải mái để làm việc, giải trí, nhưng vẫn nhỏ gọn, dễ dàng mang theo bên mình.</p>',
        price: 39000000,
        discount: null,
        quantityStock: 16,
        discountRate: 0,
        quantitySold: 0,
        ratingAverage: 0,
        reviewCount: 0,
        status: EntityStatus.ENABLED,
    },
    categories: [
        {
            id: 19,
            createdDate: '2024-05-07T17:11:14.511444',
            lastModifiedDate: '2024-05-07T17:11:14.511444',
            name: 'Apple (Macbook)',
            path: 'apple-macbook',
            code: '1-2-8-16',
            status: EntityStatus.ENABLED,
            isLeaf: true,
        },
        {
            id: 31,
            createdDate: '2024-05-07T17:18:21.27663',
            lastModifiedDate: '2024-05-07T17:18:21.27663',
            name: 'Macbook Pro',
            path: 'macbook-pro',
            code: '1-2-15-28',
            status: EntityStatus.ENABLED,
            isLeaf: true,
        },
    ],
    images: [
        {
            id: 8,
            publicId: 'laptop_store/p30hs6h3e7tkwifwkdq4',
            width: 512,
            height: 512,
            bytes: 61910,
            secureUrl:
                'https://res.cloudinary.com/dat2lyvva/image/upload/v1715078664/laptop_store/p30hs6h3e7tkwifwkdq4.webp',
            folder: 'laptop_store',
        },
        {
            id: 9,
            publicId: 'laptop_store/rmqxxgfc576p5wsigonb',
            width: 512,
            height: 512,
            bytes: 115110,
            secureUrl:
                'https://res.cloudinary.com/dat2lyvva/image/upload/v1715078665/laptop_store/rmqxxgfc576p5wsigonb.webp',
            folder: 'laptop_store',
        },
        {
            id: 10,
            publicId: 'laptop_store/fedtybaeeod93xw1lt0y',
            width: 512,
            height: 512,
            bytes: 109804,
            secureUrl:
                'https://res.cloudinary.com/dat2lyvva/image/upload/v1715078666/laptop_store/fedtybaeeod93xw1lt0y.webp',
            folder: 'laptop_store',
        },
        {
            id: 11,
            publicId: 'laptop_store/ell590196cwdhkdyfeie',
            width: 512,
            height: 512,
            bytes: 53564,
            secureUrl:
                'https://res.cloudinary.com/dat2lyvva/image/upload/v1715078667/laptop_store/ell590196cwdhkdyfeie.webp',
            folder: 'laptop_store',
        },
    ],
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
            return { message: error.json?.message, payload: initProductDetail } as IProductDetailBodyResponse;
        })
        .json<IProductDetailBodyResponse>();
    return payload;
}
