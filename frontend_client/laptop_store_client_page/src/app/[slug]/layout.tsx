import { Fragment, PropsWithChildren } from 'react';
import { Container } from '~/components';

function DetailLayout({ children }: PropsWithChildren) {
    return (
        <Fragment>
            <Container component='main' className='px-0 md:px-4 pt-[3.875rem] pb-8 md:py-[4.625rem]'>
                {children}
            </Container>
        </Fragment>
    );
}

export default DetailLayout;
