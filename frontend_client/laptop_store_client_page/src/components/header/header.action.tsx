'use client';

import Link from 'next/link';
import { Fragment } from 'react';

import { useAppSelector } from '~/hooks/redux';
import { accountSelectors, cartSelectors } from '~/libs/redux/features';

import { CartIcon } from '../icons';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

import ButtonLogin from './button.login';
import DropdownAccount from './dropdown.account';

function HeaderAction() {
    const account = useAppSelector(accountSelectors.selectAccount);
    const cartSize = useAppSelector(cartSelectors.selectSize);

    return (
        <Fragment>
            {account ? (
                <div className='flex gap-1'>
                    <DropdownAccount />
                    <Separator orientation='vertical' />
                    <Button variant='ghost' size='icon' asChild>
                        <Link href='/cart' title='giỏ hàng' className='relative mr-1.5'>
                            <CartIcon />
                            <Badge variant='destructive' className='absolute -top-2 -right-3 px-1.5 rounded-full'>
                                {cartSize}
                            </Badge>
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
