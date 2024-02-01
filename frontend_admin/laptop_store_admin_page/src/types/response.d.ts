import { IAccount } from './models';

interface ISuccessResponse {
    message: string;
    success: true;
}

export interface ILoginResponse extends ISuccessResponse {
    data: string;
}

export interface IRegisterResponse extends ISuccessResponse {
    data: IAccount;
}
