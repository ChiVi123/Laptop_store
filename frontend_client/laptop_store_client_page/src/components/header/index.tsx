import Image from 'next/image';
import Link from 'next/link';

import { LOGO_TEXT_URL, LOGO_URL } from '~/common/values';

import Container from '../container';

import HeaderAction from './header.action';
import HeaderCategoryMenu from './header.category.menu';
import HeaderSearchBar from './header.search.bar';

function Header() {
    return (
        <header className='fixed top-0 right-0 left-0 z-10 h-[3.875rem] lg:border bg-white shadow-sm'>
            <Container className='flex items-center sm:justify-between gap-4 sm:gap-0 h-[3.875rem]'>
                <div className='flex items-center gap-4'>
                    <Link href='/' title='home' className='md:hidden p-1.5 -ml-1'>
                        <Image src={LOGO_URL} alt='logo' width={50} height={50} priority className='h-7 w-auto' />
                    </Link>

                    <Link href='/' title='home' className='hidden md:block p-1.5 -ml-1'>
                        <Image
                            src={LOGO_TEXT_URL}
                            alt='logo'
                            width={126}
                            height={30}
                            priority
                            className='h-6 sm:h-8 w-auto'
                        />
                    </Link>

                    <HeaderCategoryMenu className='hidden sm:inline-flex' />
                </div>

                {/* Search bar */}
                <div className='flex-1 sm:flex-none flex gap-2 items-center px-2.5 py-2 sm:w-72 lg:w-96 h-[2.125rem] rounded-full border border-input bg-white shadow-sm'>
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
