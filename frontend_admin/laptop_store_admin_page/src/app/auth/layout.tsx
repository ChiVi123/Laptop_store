import { StyleWrap } from '~/components/auth.styles';
import { IOnlyChildren } from '~/types/props';

function AuthLayout({ children }: IOnlyChildren) {
    return <StyleWrap>{children}</StyleWrap>;
}

export default AuthLayout;
