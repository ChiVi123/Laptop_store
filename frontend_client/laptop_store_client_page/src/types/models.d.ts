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
