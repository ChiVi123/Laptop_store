import { EAccountRole } from '~/common/enums';

export interface IAccount {
    id: number;
    username: string;
    fullName: string;
    email: string;
    phone: string;
    reviewCount: number;
    likeCount: number;
    enumRole: EAccountRole;
    createdDate: string;
    lastModifiedDate: string;
}
