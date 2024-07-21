'use client';

import { ColumnDef, Header, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useMemo } from 'react';

import '~/libs/extension.number';

import { cartServerAction } from '~/actions';
import { ICartItem } from '~/types/models';

import InputQuantity from '../input-quantity';
import { Button } from '../ui/button';

import CellRemoveAllItem from './cell.remove.all.item';
import CellRemoveItem from './cell.remove.item';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table';

function CartTable({ data }: { data: ICartItem[] }) {
    const columns = useMemo<ColumnDef<ICartItem>[]>(
        () => [
            {
                id: 'thumbnail-name',
                accessorFn: (orderItem) => orderItem,
                header: ({ table }) => `Tất cả (${table.getRowModel().rows.length} sản phẩm)`,
                cell: ({ getValue }) => {
                    const item = getValue<ICartItem>();
                    return (
                        <div className='flex items-start gap-2'>
                            <Image
                                src={item.productThumbnail}
                                alt={item.productName}
                                width={84}
                                height={84}
                                className='size-20 lg:size-16'
                            />
                            <div className='flex-1 space-y-2'>
                                <div className='flex items-center'>
                                    <Link
                                        href={'/' + item.productSlug}
                                        className='w-full text-base text-cv-gray-100 font-normal break-words line-clamp-2'
                                    >
                                        {item.productName}
                                    </Link>
                                    <CellRemoveItem id={item.id} className='flex lg:hidden w-fit lg:w-full' />
                                </div>
                                <div className='block lg:hidden font-semibold'>{item.productPrice.toCurrency()}</div>
                                <div className='flex lg:hidden items-center justify-between'>
                                    <InputQuantity
                                        id={item.id}
                                        quantity={item.quantity}
                                        stock={item.productQuantityStock}
                                        onMinus={async () => void (await cartServerAction.minus(item.id))}
                                        onPlus={async () => void (await cartServerAction.plus(item.id))}
                                    />
                                    <div className='font-semibold text-red-600'>{item.total.toCurrency()}</div>
                                </div>
                            </div>
                        </div>
                    );
                },
            },
            {
                accessorKey: 'productPrice',
                header: 'Đơn giá',
                cell: ({ getValue }) => {
                    return <div className='font-semibold'>{getValue<number>().toCurrency()}</div>;
                },
            },
            {
                id: 'quantity',
                accessorFn: (orderItem) => orderItem,
                header: 'Số lượng',
                cell: ({ getValue }) => {
                    const item = getValue<ICartItem>();
                    return (
                        <InputQuantity
                            id={item.id}
                            quantity={item.quantity}
                            stock={item.productQuantityStock}
                            onMinus={async () => void (await cartServerAction.minus(item.id))}
                            onPlus={async () => void (await cartServerAction.plus(item.id))}
                        />
                    );
                },
            },
            {
                accessorKey: 'total',
                header: 'Thành tiền',
                cell: ({ getValue }) => (
                    <div className='font-semibold text-red-600'>{getValue<number>().toCurrency()}</div>
                ),
            },
            {
                id: 'remove-cart-item',
                accessorKey: 'id',
                header: () => <CellRemoveAllItem />,
                cell: ({ getValue }) => <CellRemoveItem id={getValue<number>()} />,
            },
        ],
        [],
    );
    const gridItems = useMemo(
        () => ['', 'hidden lg:block', 'hidden lg:block', 'hidden lg:block', 'hidden lg:block'],
        [],
    );

    const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });
    const headerGroups = useMemo(() => table.getHeaderGroups(), [table]);
    const renderHeaderCell = useCallback(
        (header: Header<ICartItem, unknown>) =>
            header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext()),
        [],
    );

    return (
        <Table className='flex flex-col'>
            <TableHeader className='hidden lg:block bg-white border rounded-sm'>
                {headerGroups.map((headerGroup) => (
                    <TableRow key={headerGroup.id} className='h-10 px-4'>
                        {headerGroup.headers.map((header) => (
                            <TableHead key={header.id}>{renderHeaderCell(header)}</TableHead>
                        ))}
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody className='lg:mt-4 rounded-sm flex-1'>
                {table.getRowModel().rows.length ? (
                    table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id} className='p-4 bg-white'>
                            {row.getVisibleCells().map((cell, indexCell) => (
                                <TableCell key={cell.id} className={gridItems[indexCell]}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
                ) : (
                    <div className='flex flex-col items-center justify-center h-full pt-1 pb-5 px-5 space-y-4 bg-white'>
                        <Image src='/empty_cart.png' alt='empty cart' width={80} height={80} className='size-20' />
                        <span>Giỏ hàng chưa có sản phẩm nào.</span>
                        <Button asChild>
                            <Link href='/'>Mua sắm ngay</Link>
                        </Button>
                    </div>
                )}
            </TableBody>
        </Table>
    );
}

export default CartTable;
