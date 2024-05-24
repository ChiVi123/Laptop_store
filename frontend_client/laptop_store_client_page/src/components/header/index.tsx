import Image from 'next/image';
import Link from 'next/link';

import { LOGO_URL } from '~/common/values';

import Container from '../container';

import HeaderAction from './header.action';
import HeaderCategoryMenu from './header.category.menu';
import HeaderSearchBar from './header.search.bar';

function Header() {
    return (
        <header className='fixed top-0 right-0 left-0 z-10 h-[3.875rem] border bg-white shadow-sm'>
            <Container component='nav' className='flex items-center h-[3.875rem]'>
                <div className='hidden lg:flex items-center mr-32'>
                    <Link href='/' title='home' className='p-1.5 mr-6 -ml-1'>
                        <Image src={LOGO_URL} alt='logo' width={60} height={60} priority className='h-8 w-auto' />
                    </Link>

                    <HeaderCategoryMenu />
                </div>

                <div className='flex gap-2 items-center px-[0.625rem] py-2 lg:w-[31.25rem] h-[2.125rem] rounded-md border border-input shadow-sm'>
                    <HeaderSearchBar />
                </div>

                <div className='flex flex-1 justify-end'>
                    <HeaderAction />
                </div>
            </Container>
        </header>
    );
}

export default Header;
