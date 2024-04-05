import { IAccount, ICategory, IImage, IProduct } from './models';

export interface IResponse {
    message: string;
    payload: '';
}
export interface IErrorResponse {
    message: string;
    errors?: Record<string, unknown>[];
}
export interface IErrorData {
    httpCode: number;
    payload: IErrorResponse;
}
export interface ILoginResponse extends IResponse {
    payload: string;
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
