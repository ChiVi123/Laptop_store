'use client';

import { Cross2Icon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { ChangeEventHandler, Fragment, useState } from 'react';

function HeaderSearchBar() {
    const [inputSearch, setInputSearch] = useState<string>('');

    const handleSearchChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
        setInputSearch(target.value);
    };
    const handleClearInputSearch = () => {
        setInputSearch('');
    };

    return (
        <Fragment>
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
        </Fragment>
    );
}

export default HeaderSearchBar;
