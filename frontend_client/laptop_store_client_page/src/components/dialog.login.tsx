'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
    HTMLInputAutoCompleteAttribute,
    HTMLInputTypeAttribute,
    PropsWithChildren,
    useCallback,
    useMemo,
    useState,
} from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { authServerAction, cartServerAction } from '~/actions';
import { loginSchema } from '~/schemas';
import { loginTypeSchema } from '~/types/schemas';

import { useAppDispatch } from '~/hooks/redux';
import { setAccountToken, setCartSize } from '~/libs/redux/features';
import { Button } from './ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';

type FieldType = {
    id: string;
    name: 'email' | 'password';
    label: string;
    inputType: HTMLInputTypeAttribute;
    placeholder: string;
    autoComplete: HTMLInputAutoCompleteAttribute;
};

function DialogLogin({ children }: PropsWithChildren) {
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const form = useForm<loginTypeSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: '', password: '' },
    });
    const fields = useMemo<FieldType[]>(
        () => [
            {
                id: 'dialog-email-input',
                name: 'email',
                label: 'Email:',
                inputType: 'email',
                placeholder: 'Email',
                autoComplete: 'on',
            },
            {
                id: 'dialog-password-input',
                name: 'password',
                label: 'Mật khẩu:',
                inputType: 'password',
                placeholder: 'Mật khẩu',
                autoComplete: 'off',
            },
        ],
        [],
    );
    const dispatch = useAppDispatch();

    const handleOnSubmit: SubmitHandler<loginTypeSchema> = async (data) => {
        const result = await authServerAction.login(data);

        if (result.accessToken) {
            const items = await cartServerAction.getCart();

            dispatch(setAccountToken(result));
            dispatch(setCartSize(items.length));

            toast.success('Đăng nhập thành công');
            setOpenDialog(false);
        } else {
            toast.error('Email hoặc mật khẩu đúng không');
        }
    };

    const field = useCallback(
        (fieldContent: FieldType) => (
            <FormField
                key={fieldContent.id}
                control={form.control}
                name={fieldContent.name}
                render={({ field }) => (
                    <FormItem className='grid grid-cols-[25%_75%] justify-end items-center gap-4 space-y-0'>
                        <FormLabel htmlFor={fieldContent.id} className='text-right'>
                            {fieldContent.label}
                        </FormLabel>

                        <FormControl>
                            <div>
                                <Input
                                    id={fieldContent.id}
                                    type={fieldContent.inputType}
                                    placeholder={fieldContent.placeholder}
                                    autoComplete={fieldContent.autoComplete}
                                    {...field}
                                />
                                <FormMessage className='px-3 mt-1'> </FormMessage>
                            </div>
                        </FormControl>
                    </FormItem>
                )}
            />
        ),
        [form.control],
    );

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>{children}</DialogTrigger>

            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Đăng nhập bằng email</DialogTitle>
                    <DialogDescription>Nhập email và mật khẩu tài khoản.</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form id='dialog-log-in' className='grid gap-4 py-4' onSubmit={form.handleSubmit(handleOnSubmit)}>
                        {fields.map((item) => field(item))}
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

export default DialogLogin;
