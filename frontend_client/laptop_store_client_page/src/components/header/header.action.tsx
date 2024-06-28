'use client';

import Link from 'next/link';
import { Fragment } from 'react';

import { useAuth } from '~/hooks/auth';

import DialogLogin from '../dialog.login';
import { CartIcon } from '../icons';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

import DropdownAccount from './dropdown.account';

function HeaderAction() {
    const { account, cartSize } = useAuth();

    return (
        <Fragment>
            {account ? (
                <div className='flex gap-1'>
                    <DropdownAccount account={account} />
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
                <DialogLogin>
                    <Button variant='ghost'>Tài khoản</Button>
                </DialogLogin>
            )}
        </Fragment>
    );
}

export default HeaderAction;
