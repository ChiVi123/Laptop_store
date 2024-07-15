import { Fragment, PropsWithChildren } from 'react';
import { TopBar } from './_components';

function HeaderOnlyLayout({ children }: PropsWithChildren) {
    return (
        <Fragment>
            <header className='bg-white'>
                <TopBar />
            </header>
            {children}
        </Fragment>
    );
}

export default HeaderOnlyLayout;
