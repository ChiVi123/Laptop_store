import { IOnlyChildren } from '~/types/props';

function ManageLayout({ children }: IOnlyChildren) {
    return <div>{children}</div>;
}

export default ManageLayout;
