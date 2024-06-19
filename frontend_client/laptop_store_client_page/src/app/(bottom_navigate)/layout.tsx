import { Fragment, PropsWithChildren } from 'react';
import { BottomNavigation, Container } from '~/components';

function BottomNavigateLayout({ children }: PropsWithChildren) {
    return (
        <Fragment>
            <Container component='main' className='px-0 md:px-4 pt-[3.875rem] pb-8 md:py-[4.625rem]'>
                {children}
            </Container>
            <BottomNavigation />
        </Fragment>
    );
}

export default BottomNavigateLayout;
