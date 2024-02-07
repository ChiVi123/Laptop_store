import { EAccountRole } from '~/common/enums';

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
export interface ICategory {
    id: number;
    name: string;
    url: string;
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
    price: number;
    discount: number | null;
    discountRate: number;
    description: string;
    quantityStock: number;
    quantitySold: number;
    ratingAverage: number;
    reviewCount: number;
    category: ICategory;
    brand: IBrand;
    createdDate: string;
    lastModifiedDate: string;
}
