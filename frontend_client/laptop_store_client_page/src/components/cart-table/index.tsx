'use client';

import { ColumnDef, Header, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useMemo } from 'react';

import '~/libs/extension.number';

import { cartServerAction } from '~/actions';
import { IOrderItem, IProductInfo } from '~/types/models';

import InputQuantity from '../input-quantity';
import { Button } from '../ui/button';

import CellRemoveAllItem from './cell.remove.all.item';
import CellRemoveItem from './cell.remove.item';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table';

function CartTable({ data }: { data: IOrderItem[] }) {
    const columns = useMemo<ColumnDef<IOrderItem>[]>(
        () => [
            {
                id: 'thumbnail-name',
                accessorFn: (orderItem) => orderItem,
                header: ({ table }) => `Tất cả (${table.getRowModel().rows.length} sản phẩm)`,
                cell: ({ getValue }) => {
                    const {
                        id,
                        quantity,
                        subTotal,
                        product: { thumbnailUrl, name, price, quantityStock },
                    } = getValue<IOrderItem>();
                    return (
                        <div className='flex items-start gap-2'>
                            <Image
                                src={thumbnailUrl}
                                alt={name}
                                width={84}
                                height={84}
                                className='size-20 lg:size-16'
                            />
                            <div className='flex-1 space-y-2'>
                                <div className='flex items-center'>
                                    <span className='w-full text-base text-cv-gray-100 font-normal break-words line-clamp-2'>
                                        {name}
                                    </span>
                                    <CellRemoveItem id={id} className='flex lg:hidden w-fit lg:w-full' />
                                </div>
                                <div className='block lg:hidden font-semibold'>{price.toCurrency()}</div>
                                <div className='flex lg:hidden items-center justify-between'>
                                    <InputQuantity
                                        id={id}
                                        quantity={quantity}
                                        stock={quantityStock}
                                        onMinus={async () => void (await cartServerAction.minus(id))}
                                        onPlus={async () => void (await cartServerAction.plus(id))}
                                    />
                                    <div className='font-semibold text-red-600'>{subTotal.toCurrency()}</div>
                                </div>
                            </div>
                        </div>
                    );
                },
            },
            {
                accessorKey: 'product',
                header: 'Đơn giá',
                cell: ({ getValue }) => {
                    const { price } = getValue<IProductInfo>();
                    return <div className='font-semibold'>{price.toCurrency()}</div>;
                },
            },
            {
                id: 'quantity',
                accessorFn: (orderItem) => orderItem,
                header: 'Số lượng',
                cell: ({ getValue }) => {
                    const {
                        id,
                        quantity,
                        product: { quantityStock },
                    } = getValue<IOrderItem>();
                    return (
                        <InputQuantity
                            id={id}
                            quantity={quantity}
                            stock={quantityStock}
                            onMinus={async () => void (await cartServerAction.minus(id))}
                            onPlus={async () => void (await cartServerAction.plus(id))}
                        />
                    );
                },
            },
            {
                accessorKey: 'subTotal',
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
        (header: Header<IOrderItem, unknown>) =>
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
