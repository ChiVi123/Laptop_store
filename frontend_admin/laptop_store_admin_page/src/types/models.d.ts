import { EAccountRole, EStatus } from '~/common/enums';

interface IEntity {
    id: number;
}
export interface IEntityStatus {
    status: EStatus;
}
interface IEntityDateTime {
    createdDate: string;
    lastModifiedDate: string;
}

export interface IAttribute {
    key: string;
    value: string;
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
export interface ICategoryInfo extends IEntity, IEntityStatus, IEntityDateTime {
    name: string;
    path: string;
    code: string;
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
    attributes: IAttribute[];
}

export interface IAccount extends IEntity, IEntityDateTime {
    username: string;
    fullName: string;
    email: string;
    phone: string;
    reviewCount: number;
    likeCount: number;
    role: EAccountRole;
}
