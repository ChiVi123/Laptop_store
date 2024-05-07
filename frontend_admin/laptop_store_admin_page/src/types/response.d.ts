import { IAccount, ICategory, ICategoryNode, IImage, IProduct, IProductDetail, IProductInfo } from './models';

export interface IResponse {
    message: string;
    payload: string;
}
export interface IErrorResponse {
    message: string;
    errors?: Record<string, unknown>[];
    path: string;
    timestamp: string;
}
export interface ILoginResponse extends IResponse {
    payload: {
        accessToken: string;
        refreshToken: string;
        expiration: number;
    };
}
// Account
export interface IAccountResponse extends IResponse {
    payload: IAccount;
}

// Product
export interface IProductResponse extends IResponse {
    payload: IProduct;
}
export interface IProductInfoResponse extends IResponse {
    payload: IProductInfo;
}
export interface IProductDetailResponse extends IResponse {
    payload: IProductDetail;
}

// Category
export interface ICategoryInfoResponse extends IResponse {
    payload: ICategoryInfo;
}
export interface ICategoryNodeResponse extends IResponse {
    payload: ICategoryNode;
}
export interface ICategoryResponse extends IResponse {
    payload: ICategory;
}

// List
export interface IListImageResponse extends IResponse {
    payload: IImage[];
}
export interface IListProductResponse extends IResponse {
    payload: IProductInfo[];
}
export interface IListCategoryResponse extends IResponse {
    payload: ICategory[];
}
