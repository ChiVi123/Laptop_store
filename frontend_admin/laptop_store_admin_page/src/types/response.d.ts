import { IAccount, IBrand, ICategory, IProduct } from './models';

interface ISuccessResponse {
    message: string;
    success: true;
}

export interface IErrorResponse {
    code: number;
    error: Record<string, string>;
    success: false;
}
export interface IVoidResponse extends ISuccessResponse {
    data: '';
}
export interface ILoginResponse extends ISuccessResponse {
    data: string;
}
export interface IRegisterResponse extends ISuccessResponse {
    data: IAccount;
}
export interface IProductDetailResponse extends ISuccessResponse {
    data: IProduct;
}
export interface IAllProductResponse extends ISuccessResponse {
    data: IProduct[];
}
export interface IAllCategoryResponse extends ISuccessResponse {
    data: ICategory[];
}
export interface IAllBrandResponse extends ISuccessResponse {
    data: IBrand[];
}
