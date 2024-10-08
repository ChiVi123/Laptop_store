import {
    IAccount,
    IAddress,
    ICart,
    ICategoryInfo,
    ICategoryNode,
    IOrderItem,
    IProductDetail,
    IProductInfo,
} from '~/types/models';
import { AccountRole, AccountStatus, EntityStatus } from './enums';

// Common
export const LOGO_URL =
    'https://res.cloudinary.com/dat2lyvva/image/upload/v1719210389/laptop_store/logo/laptop-high-resolution-logo-icon-transparent_w9g3ha.png';
export const LOGO_TEXT_URL =
    'https://res.cloudinary.com/dat2lyvva/image/upload/v1719210237/laptop_store/logo/laptop-high-resolution-logo-transparent_f9iwgk.png';
export const MILLISECOND = 1000;

// Raw value
export const RAW_ACCOUNT: IAccount = {
    id: 0,
    createdDate: '',
    lastModifiedDate: '',
    username: '',
    fullName: '',
    email: '',
    phone: '',
    reviewCount: 0,
    likeCount: 0,
    role: AccountRole.CUSTOMER,
    status: AccountStatus.ACTIVE,
};
export const RAW_CATEGORY_INFO: ICategoryInfo = {
    id: 0,
    createdDate: '',
    lastModifiedDate: '',
    name: '',
    path: '',
    code: '',
    isLeaf: true,
    status: EntityStatus.ENABLED,
};
export const RAW_CATEGORY_NODE: ICategoryNode = {
    id: 0,
    createdDate: '',
    lastModifiedDate: '',
    info: RAW_CATEGORY_INFO,
    children: [
        {
            id: 0,
            createdDate: '',
            lastModifiedDate: '',
            info: RAW_CATEGORY_INFO,
            children: [],
        },
    ],
};
export const RAW_PRODUCT_INFO: IProductInfo = {
    id: 0,
    createdDate: '',
    lastModifiedDate: '',
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
};
export const RAW_PRODUCT_DETAIL: IProductDetail = {
    id: 0,
    createdDate: '',
    lastModifiedDate: '',
    info: RAW_PRODUCT_INFO,
    categories: new Array(),
    images: new Array(),
    attributes: new Array(),
};
export const RAW_ORDER_ITEM: IOrderItem = { id: 0, product: RAW_PRODUCT_INFO, quantity: 0, subTotal: 0 };
export const RAW_CART: ICart = {
    id: 0,
    account: RAW_ACCOUNT,
    items: new Array(),
    subTotal: 0,
    status: EntityStatus.ENABLED,
};
export const RAW_ADDRESS: IAddress = {
    id: 0,
    fullName: '',
    phone: '',
    province: '',
    provinceId: 0,
    district: '',
    districtId: 0,
    ward: '',
    wardId: 0,
    street: '',
    location: '',
    deliveryAddressType: 'HOME',
    selectDefault: false,
    isChoose: false,
    createdDate: '',
    lastModifiedDate: '',
};
