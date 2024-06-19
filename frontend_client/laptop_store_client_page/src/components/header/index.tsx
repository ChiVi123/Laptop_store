import Image from 'next/image';
import Link from 'next/link';

import { LOGO_URL } from '~/common/values';

import Container from '../container';

import HeaderAction from './header.action';
import HeaderCategoryMenu from './header.category.menu';
import HeaderSearchBar from './header.search.bar';

function Header() {
    return (
        <header className='fixed top-0 right-0 left-0 z-10 h-[3.875rem] lg:border bg-white shadow-sm'>
            <Container className='flex items-center justify-between h-[3.875rem]'>
                <div className='hidden sm:flex items-center gap-4'>
                    <Link href='/' title='home' className='p-1.5 -ml-1'>
                        <Image
                            src={LOGO_URL}
                            alt='logo'
                            width={60}
                            height={60}
                            priority
                            className='h-6 sm:h-8 w-auto'
                        />
                    </Link>

                    <HeaderCategoryMenu />
                </div>

                <div className='flex gap-2 items-center px-[0.625rem] py-2 w-full sm:w-56 lg:w-96 h-[2.125rem] rounded-md border border-input bg-white shadow-sm'>
                    <HeaderSearchBar />
                </div>

                <div className='hidden sm:flex justify-end'>
                    <HeaderAction />
                </div>
            </Container>
        </header>
    );
}

export default Header;
