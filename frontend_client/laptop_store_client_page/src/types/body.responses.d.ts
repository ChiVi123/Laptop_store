import { IAccount, ICategory, IImage, IProduct } from './models';

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
export interface IProductBodyResponse extends IBodyResponse {
    payload: IProduct;
}
export interface ICategoryBodyResponse extends IBodyResponse {
    payload: ICategory;
}
export interface IListImageBodyResponse extends IBodyResponse {
    payload: IImage[];
}
export interface IListProductBodyResponse extends IBodyResponse {
    payload: IProduct[];
}
export interface IListCategoryBodyResponse extends IBodyResponse {
    payload: ICategory[];
}
