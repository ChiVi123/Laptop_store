import { IAccount, ICategoryNode } from './models';

interface IReduxStatus {
    status: 'pending' | 'fulfilled' | 'rejected';
}

export interface IAccountState extends IReduxStatus {
    account: IAccount | undefined;
}
export interface ICategoryState extends IReduxStatus {
    default: ICategoryNode;
}
