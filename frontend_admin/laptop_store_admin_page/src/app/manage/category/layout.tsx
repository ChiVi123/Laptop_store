import { Metadata } from 'next';
import { Fragment } from 'react';
import { IOnlyChildren } from '~/types/props';

export const metadata: Metadata = {
    title: 'Category | Laptop store',
    description: 'Management page',
};

function CategoryLayout({ children }: IOnlyChildren) {
    return <Fragment>{children}</Fragment>;
}

export default CategoryLayout;
