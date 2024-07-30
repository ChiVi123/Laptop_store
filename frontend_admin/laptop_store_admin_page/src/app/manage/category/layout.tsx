import { Metadata } from 'next';
import { Fragment, PropsWithChildren } from 'react';

export const metadata: Metadata = {
    title: 'Category | Laptop store',
    description: 'Management page',
};

function CategoryLayout({ children }: PropsWithChildren) {
    return <Fragment>{children}</Fragment>;
}

export default CategoryLayout;
