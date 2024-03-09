import { EAccountRole, EProductStatus } from '~/common/enums';

export interface IAccount {
    id: number;
    username: string;
    fullName: string;
    email: string;
    phone: string;
    reviewCount: number;
    likeCount: number;
    role: EAccountRole;
    createdDate: string;
    lastModifiedDate: string;
}
export interface IImage {
    id: number;
    public_id: string;
    width: number;
    height: number;
    bytes: number;
    secure_url: string;
    folder: string;
}
export interface ICategory {
    id: number;
    level: number;
    director: string;
    name: string;
    path: string;
    children: ICategory[];
    createdDate: string;
    lastModifiedDate: string;
}
export interface IBrand {
    id: number;
    name: string;
    slug: string;
    createdDate: string;
    lastModifiedDate: string;
}
export interface IProduct {
    id: number;
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
    status: EProductStatus;
    createdDate: string;
    lastModifiedDate: string;
}
