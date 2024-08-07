import { AccountRole, AccountStatus, EntityStatus } from '~/common/enums';

interface IEntity {
    id: number;
}
interface IEntityStatus {
    status: EntityStatus;
}
interface IEntityDateTime {
    createdDate: string;
    lastModifiedDate: string;
}
interface IAttribute extends IEntity {
    key: string;
    value: string;
}

export interface ICategoryInfo extends IEntity, IEntityStatus, IEntityDateTime {
    name: string;
    path: string;
    code: string;
    isLeaf: boolean;
}
export interface ICategoryNode extends IEntity, IEntityDateTime {
    info: ICategoryInfo;
    children: ICategoryNode[];
}
export interface IProductInfo extends IEntity, IEntityStatus, IEntityDateTime {
    name: string;
    slug: string;
    thumbnailUrl: string;
    description: string;
    price: number;
    discount: number | null;
    quantityStock: number;
    discountRate: number;
    quantitySold: number;
    ratingAverage: number;
    reviewCount: number;
}
export interface IProductDetail extends IEntity, IEntityDateTime {
    info: IProductInfo;
    categories: ICategoryInfo[];
    images: IImage[];
    attributes: IAttribute[] | undefined;
}
export interface IAccount extends IEntity, IEntityDateTime {
    username: string;
    fullName: string;
    email: string;
    phone: string;
    reviewCount: number;
    likeCount: number;
    role: AccountRole;
    status: AccountStatus;
}
export interface IAccountToken {
    accessToken: string;
    refreshToken: string;
    expiration: number;
}
export interface IImage {
    id?: number;
    publicId: string;
    width: number;
    height: number;
    bytes: number;
    secureUrl: string;
    folder: string;
}
export interface IOrderItem {
    id: number;
    product: IProductInfo;
    quantity: number;
    subTotal: number;
}
export interface ICart extends IEntityStatus {
    id: number;
    account: IAccount;
    items: IOrderItem[];
    subTotal: number;
}
export interface ICartItem extends IEntity {
    productId: number;
    accountId: number;
    productName: string;
    productSlug: string;
    productThumbnail: string;
    productPrice: number;
    productDiscount: number | null;
    productQuantityStock: number;
    quantity: number;
    total: number;
}
export interface IOrder {
    items: IOrderItem[];
}
export interface IAddress extends IEntity, IEntityDateTime {
    fullName: string;
    phone: string;
    province: string;
    provinceId: number;
    district: string;
    districtId: number;
    ward: string;
    wardId: number;
    street: string;
    location: string;
    deliveryAddressType: 'HOME' | 'COMPANY';
    selectDefault: boolean;
    isChoose: boolean;
}
