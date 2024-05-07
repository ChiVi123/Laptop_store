import { IAccount, ICategoryNode, IProductDetail, IProductInfo } from './models';

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
export interface ILoginBodyResponse extends IBodyResponse {
    payload: {
        accessToken: string;
        refreshToken: string;
        expiration: number;
    };
}
export interface IAccountBodyResponse extends IBodyResponse {
    payload: IAccount;
}

// Product
export interface IProductInfoBodyResponse extends IResponse {
    payload: IProductInfo;
}
export interface IProductDetailBodyResponse extends IResponse {
    payload: IProductDetail;
}

// Category
export interface ICategoryNodeBodyResponse extends IBodyResponse {
    payload: ICategoryNode;
}

// Pagination
export interface IPaginationBodyResponse<Type> extends IBodyResponse {
    payload: {
        pageNumber: number;
        totalPage: number;
        list: Type[];
    };
}
