'use client';

import { Cross2Icon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEventHandler, Fragment, KeyboardEventHandler, useCallback, useState } from 'react';
import { Button } from '../ui/button';

function HeaderSearchBar() {
    const [inputSearch, setInputSearch] = useState<string>('');
    const router = useRouter();
    const searchParams = useSearchParams();
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);
            return params.toString();
        },
        [searchParams],
    );

    const handleSearchChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
        setInputSearch(target.value);
    };
    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = ({ code }) => {
        if (code === 'Enter') {
            router.push(`/search?${createQueryString('query', inputSearch)}`);
        }
    };
    const handleClearInputSearch = () => {
        setInputSearch('');
    };

    return (
        <Fragment>
            <MagnifyingGlassIcon className='size-5' />
            <input
                id='input-search'
                type='text'
                placeholder='Nhập từ khóa cần tìm...'
                className='flex-1 bg-transparent text-base transition-colors placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50'
                value={inputSearch}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
            />
            {Boolean(inputSearch) && (
                <Button
                    type='button'
                    aria-label='clear input search'
                    variant='ghost'
                    size='icon'
                    className='size-5 rounded-full'
                    onClick={handleClearInputSearch}
                >
                    <Cross2Icon className='size-3' />
                </Button>
            )}
        </Fragment>
    );
}

export default HeaderSearchBar;
