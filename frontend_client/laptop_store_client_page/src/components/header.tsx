'use client';

import { Cross2Icon, HamburgerMenuIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';
import { ChangeEventHandler, useContext, useState } from 'react';
import { logoURL } from '~/common/values';
import { DataContext } from '~/context';
import CategoryMenuItem from './category.menu.item';
import Container from './container';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from './ui/dropdown-menu';

function Header() {
    const [inputSearch, setInputSearch] = useState<string>('');
    const { account, categories } = useContext(DataContext);
    const [defaultCategory] = categories;

    const handleSearchChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
        setInputSearch(target.value);
    };
    const handleClearInputSearch = () => {
        setInputSearch('');
    };

    return (
        <header className='fixed top-0 right-0 left-0 z-10 h-[3.875rem] border border-border bg-white shadow-sm'>
            <Container component='nav' className='flex items-center h-[3.875rem]'>
                <div className='hidden lg:flex items-center mr-32'>
                    <Link href='/' title='home' className='p-1.5 mr-6 -ml-1'>
                        <Image src={logoURL} alt='logo' width={60} height={60} priority className='h-8 w-auto' />
                    </Link>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant='outline' className='gap-2'>
                                <HamburgerMenuIcon width='1.125rem' height='1.125rem' className='text-cv-gray-80' />
                                <span className='mb-0.5 text-center font-medium text-cv-gray-70'>Danh mục</span>
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align='start' className='w-56'>
                            {defaultCategory.children.map((item) => (
                                <CategoryMenuItem key={'category-' + item.id} category={item} />
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className='flex gap-2 items-center px-[0.625rem] py-2 lg:w-[31.25rem] h-[2.125rem] rounded-md border border-input shadow-sm'>
                    <MagnifyingGlassIcon width='1.25rem' height='1.25rem' />
                    <input
                        id='input-search'
                        type='text'
                        placeholder='Nhập từ khóa cần tìm...'
                        className='w-full bg-transparent text-base transition-colors placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50'
                        value={inputSearch}
                        onChange={handleSearchChange}
                    />
                    {Boolean(inputSearch) && (
                        <Cross2Icon
                            width='1.25rem'
                            height='1.25rem'
                            className='cursor-pointer'
                            onClick={handleClearInputSearch}
                        />
                    )}
                </div>

                <div className='flex flex-1 justify-end'>
                    <span className='text-sm font-semibold leading-6 text-gray-900'>Tài khoản</span>
                </div>
            </Container>
        </header>
    );
}

export default Header;
