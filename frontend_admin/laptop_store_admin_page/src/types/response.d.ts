import { IAccount, IProduct } from './models';

interface ISuccessResponse {
    message: string;
    success: true;
}

export interface IErrorResponse {
    code: number;
    error: Record<string, String>;
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
