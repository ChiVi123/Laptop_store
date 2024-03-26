import { EAccountRole, EStatus } from '~/common/enums';

interface IEntity {
    id: number;
}
interface IEntityStatus {
    status: EStatus;
}
interface IEntityDateTime {
    createdDate: string;
    lastModifiedDate: string;
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
export interface IImage {
    id?: number;
    publicId: string;
    width: number;
    height: number;
    bytes: number;
    secureUrl: string;
    folder: string;
}
export interface ICategory extends IEntity, IEntityStatus, IEntityDateTime {
    level: number;
    director: string;
    name: string;
    path: string;
    children: ICategory[];
}
export interface IBrand extends IEntity, IEntityStatus, IEntityDateTime {
    name: string;
    slug: string;
    logo: IImage;
}
export interface IProduct extends IEntity, IEntityStatus, IEntityDateTime {
    name: string;
    slug: string;
    brand: IBrand;
    category: ICategory;
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
