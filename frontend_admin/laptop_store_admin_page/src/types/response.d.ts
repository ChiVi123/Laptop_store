import { IAccount, ICategory, IImage, IProduct } from './models';

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
export interface IAccountResponse extends IResponse {
    payload: IAccount;
}
export interface IProductResponse extends IResponse {
    payload: IProduct;
}
export interface ICategoryResponse extends IResponse {
    payload: ICategory;
}
export interface IListImageResponse extends IResponse {
    payload: IImage[];
}
export interface IListProductResponse extends IResponse {
    payload: IProduct[];
}
export interface IListCategoryResponse extends IResponse {
    payload: ICategory[];
}
