import { IAccount, ICategoryNode } from './models';

export type DataContextType = {
    categories: ICategoryNode[];
    account: IAccount | undefined;
};
