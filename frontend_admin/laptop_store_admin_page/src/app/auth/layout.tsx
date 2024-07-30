import { PropsWithChildren } from 'react';
import { StyleWrap } from '~/components/auth/styles';

function AuthLayout({ children }: PropsWithChildren) {
    return <StyleWrap>{children}</StyleWrap>;
}

export default AuthLayout;
