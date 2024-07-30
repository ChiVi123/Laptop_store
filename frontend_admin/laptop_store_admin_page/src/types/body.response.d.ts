import { IAccount, ICategory, ICategoryNode, IImage, IProductDetail, IProductInfo } from './models';

export interface IBodyResponse {
    message: string;
    payload: string;
}
export interface IErrorBodyResponse {
    message: string;
    errors?: Record<string, unknown>[];
    path: string;
    timestamp: string;
}
export interface ILoginResponse extends IBodyResponse {
    payload: {
        accessToken: string;
        refreshToken: string;
        expiration: number;
    };
}
// Account
export interface IAccountBodyResponse extends IBodyResponse {
    payload: IAccount;
}

// Product
export interface IProductInfoBodyResponse extends IBodyResponse {
    payload: IProductInfo;
}
export interface IProductDetailBodyResponse extends IBodyResponse {
    payload: IProductDetail;
}

// Category
export interface ICategoryInfoBodyResponse extends IBodyResponse {
    payload: ICategoryInfo;
}
export interface ICategoryNodeBodyResponse extends IBodyResponse {
    payload: ICategoryNode;
}
export interface ICategoryResponse extends IBodyResponse {
    payload: ICategory;
}

// List
export interface IListImageResponse extends IBodyResponse {
    payload: IImage[];
}
export interface IListProductResponse extends IBodyResponse {
    payload: IProductInfo[];
}
