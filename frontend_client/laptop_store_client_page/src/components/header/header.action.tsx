'use client';

import Link from 'next/link';
import { Fragment } from 'react';

import { useAuthenticated } from '~/hooks/auth';
import { useAppSelector } from '~/hooks/redux';
import { selectAccountToken, selectCartSize } from '~/libs/redux/features';

import DialogLogin from '../dialog.login';
import { CartIcon } from '../icons';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

import DropdownAccount from './dropdown.account';

function HeaderAction() {
    const accountToken = useAppSelector(selectAccountToken);
    const cartSize = useAppSelector(selectCartSize);
    const isExpired = useAuthenticated();

    return (
        <Fragment>
            {isExpired ? (
                <DialogLogin>
                    <Button variant='ghost'>Tài khoản</Button>
                </DialogLogin>
            ) : (
                <div className='flex gap-1'>
                    <DropdownAccount accountToken={accountToken} />
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
            )}
        </Fragment>
    );
}

export default HeaderAction;
