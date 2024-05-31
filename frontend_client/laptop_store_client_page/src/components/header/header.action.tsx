'use client';

import Link from 'next/link';
import { Fragment, useEffect } from 'react';

import { Key } from '~/common/enums';
import { useAppDispatch, useAppSelector } from '~/hooks/redux';
import { accountActions, accountSelectors, cartActions, cartSelectors } from '~/libs/redux/features';
import { storage } from '~/libs/utilities';
import { IAccount } from '~/types/models';

import { CartIcon } from '../icons';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

import ButtonLogin from './button.login';
import DropdownAccount from './dropdown.account';

function HeaderAction() {
    const account = useAppSelector(accountSelectors.selectAccount);
    const cartSize = useAppSelector(cartSelectors.selectSize);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const localAccount = storage.get<IAccount | null>(Key.ACCOUNT, 'null');
        const localCartSize = storage.get<number>(Key.CART, '0');
        dispatch(accountActions.update(localAccount));
        dispatch(cartActions.update(localCartSize));
    }, [dispatch]);

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
