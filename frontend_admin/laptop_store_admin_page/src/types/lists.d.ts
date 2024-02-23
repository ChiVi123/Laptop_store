import { ReactNode } from 'react';
import { EPath } from '~/common/enums';

export interface INavigateItem {
    content: string;
    icon: ReactNode;
    url?: EPath;
    children: Omit<INavigateItem, 'icon'>[];
}
