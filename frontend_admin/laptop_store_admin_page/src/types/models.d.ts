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

export interface ICategoryInfo extends IEntity, IEntityStatus, IEntityDateTime {
    name: string;
    path: string;
    code: string;
}
export interface ICategoryNode extends IEntity, IEntityDateTime {
    info: ICategoryInfo;
    children: ICategoryNode[];
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
export interface ICategory extends IEntity, IEntityStatus, IEntityDateTime {
    level: number;
    director: string;
    name: string;
    path: string;
    children: ICategory[];
}
export interface IProduct extends IEntity, IEntityStatus, IEntityDateTime {
    name: string;
    slug: string;
    categories: ICategory[];
    description: string;
    discount: number | null;
    discountRate: number;
    images: IImage[];
    price: number;
    quantitySold: number;
    quantityStock: number;
    ratingAverage: number;
    reviewCount: number;
}
