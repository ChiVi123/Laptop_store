'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { authServerAction, cartServerAction } from '~/actions';
import { Key } from '~/common/enums';
import { useAppDispatch } from '~/hooks/redux';
import { accountActions, cartActions } from '~/libs/redux/features';
import { storage } from '~/libs/utilities';
import { loginSchema } from '~/schemas';
import { loginTypeSchema } from '~/types/schemas';

import { Button } from '../ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';

function ButtonLogin() {
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const form = useForm<loginTypeSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: '', password: '' },
    });
    const dispatch = useAppDispatch();

    const handleOnSubmit: SubmitHandler<loginTypeSchema> = async (data) => {
        const result = await authServerAction.login(data);
        const { account, items } = await cartServerAction.getCart();

        if (result.accessToken) {
            toast.success('Đăng nhập thành công');
            dispatch(accountActions.update(account));
            dispatch(cartActions.update(items.length));
            storage.set(Key.ACCOUNT, account);
            storage.set(Key.CART, items.length);
            setOpenDialog(false);
        } else {
            toast.error('Email hoặc mật khẩu đúng không');
        }
    };

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
                <Button variant='ghost'>Tài khoản</Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Đăng nhập bằng email</DialogTitle>
                    <DialogDescription>Nhập email và mật khẩu tài khoản.</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form id='dialog-log-in' className='grid gap-4 py-4' onSubmit={form.handleSubmit(handleOnSubmit)}>
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem className='grid grid-cols-4 items-center gap-4 space-y-0'>
                                    <FormLabel htmlFor='dialog-email-input' className='text-right'>
                                        Email:
                                    </FormLabel>

                                    <FormControl>
                                        <div className='col-span-3'>
                                            <Input
                                                id='dialog-email-input'
                                                type='email'
                                                placeholder='Email'
                                                autoComplete='on'
                                                {...field}
                                            />
                                            <FormMessage className='px-3 mt-1' />
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem className='grid grid-cols-4 items-center gap-4 space-y-0'>
                                    <FormLabel htmlFor='dialog-password-input' className='text-right'>
                                        Mật khẩu:
                                    </FormLabel>

                                    <FormControl>
                                        <div className='col-span-3'>
                                            <Input
                                                id='dialog-password-input'
                                                type='password'
                                                placeholder='Mật khẩu'
                                                autoComplete='off'
                                                {...field}
                                            />
                                            <FormMessage className='px-3 mt-1' />
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>

                <DialogFooter>
                    <Button type='submit' form='dialog-log-in'>
                        Đăng nhập
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default ButtonLogin;
