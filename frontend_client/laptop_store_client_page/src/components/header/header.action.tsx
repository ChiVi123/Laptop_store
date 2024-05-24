'use client';

import Link from 'next/link';
import { Fragment, useContext } from 'react';

import { DataContext } from '~/context';

import { CartIcon } from '../icons';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

import ButtonLogin from './button.login';
import DropdownAccount from './dropdown.account';

function HeaderAction() {
    const { account } = useContext(DataContext);

    return (
        <Fragment>
            {account ? (
                <div className='flex gap-1'>
                    <DropdownAccount />
                    <Separator orientation='vertical' />
                    <Button variant='ghost' size='icon' asChild>
                        <Link href='/cart' title='giỏ hàng'>
                            <CartIcon />
                        </Link>
                    </Button>
                </div>
            ) : (
                <ButtonLogin />
            )}
        </Fragment>
    );
}

export default HeaderAction;
