import { IAccount, ICategory } from './models';

export type DataContextType = {
    categories: ICategory[];
    account: IAccount | undefined;
};
