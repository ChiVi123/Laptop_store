import { Fragment, PropsWithChildren } from 'react';
import { BottomNavigation, Header } from '~/components';

function DefaultLayout({ children }: PropsWithChildren) {
    return (
        <Fragment>
            <Header />
            {children}
            <BottomNavigation />
            {/* <footer className='hidden lg:block'>Footer</footer> */}
        </Fragment>
    );
}

export default DefaultLayout;
