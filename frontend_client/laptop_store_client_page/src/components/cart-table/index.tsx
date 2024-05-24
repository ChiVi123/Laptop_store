'use client';

import { ColumnDef, Header, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import Image from 'next/image';
import { useCallback, useMemo } from 'react';

import '~/libs/extension.number';

import { cartServerAction } from '~/actions';
import { IOrderItem, IProductInfo } from '~/types/models';

import InputQuantity from '../input-quantity';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

import CellRemoveAllItem from './cell.remove.all.item';
import CellRemoveItem from './cell.remove.item';

function CartTable({ data }: { data: IOrderItem[] }) {
    const columns = useMemo<ColumnDef<IOrderItem>[]>(
        () => [
            {
                id: 'thumbnail-name',
                accessorKey: 'product',
                header: ({ table }) => (
                    <div className='text-left'>Tất cả ({table.getRowModel().rows.length} sản phẩm)</div>
                ),
                cell: ({ getValue }) => {
                    const { thumbnailUrl, name } = getValue() as IProductInfo;
                    return (
                        <div className='flex items-center gap-2'>
                            <Image src={thumbnailUrl} alt={name} width={60} height={60} />
                            <span className='text-base text-cv-gray-100 font-normal break-words line-clamp-2'>
                                {name}
                            </span>
                        </div>
                    );
                },
            },
            {
                accessorKey: 'product',
                header: () => <div className='text-right'>Đơn giá</div>,
                cell: ({ getValue }) => {
                    const { price } = getValue() as IProductInfo;
                    return <div className='text-right font-semibold'>{price.toCurrency()}</div>;
                },
            },
            {
                id: 'quantity',
                accessorFn: (orderItem) => orderItem,
                header: () => <div className='text-center'>Số lượng</div>,
                cell: ({ getValue }) => {
                    const {
                        id,
                        quantity,
                        product: { quantityStock },
                    } = getValue() as IOrderItem;

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
                header: () => <div className='text-right'>Thành tiền</div>,
                cell: ({ getValue }) => (
                    <div className='text-right font-semibold text-red-600'>{Number(getValue()).toCurrency()}</div>
                ),
            },
            {
                id: 'remove-cart-item',
                accessorKey: 'id',
                header: () => (
                    <div className='text-center'>
                        <CellRemoveAllItem />
                    </div>
                ),
                cell: ({ getValue }) => (
                    <div className='text-center'>
                        <CellRemoveItem id={Number(getValue())} />
                    </div>
                ),
            },
        ],
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
        <Table className='h-full'>
            <TableHeader className='bg-white border rounded-sm'>
                {headerGroups.map((headerGroup) => (
                    <TableRow key={headerGroup.id} className=''>
                        {headerGroup.headers.map((header) => (
                            <TableHead key={header.id}>{renderHeaderCell(header)}</TableHead>
                        ))}
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody className='rounded-sm before:content-[""] before:block before:w-full before:h-4'>
                {table.getRowModel().rows.length ? (
                    table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id} className='bg-white border'>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
                ) : (
                    <TableRow className='h-full bg-white'>
                        <TableCell colSpan={columns.length} className='text-center'>
                            <div className='flex flex-col items-center justify-center h-full'>
                                <Image
                                    src='/empty_cart.png'
                                    alt='empty cart'
                                    width={80}
                                    height={80}
                                    className='w-20 h-20'
                                />
                                <span>Giỏ hàng chưa có sản phẩm nào.</span>
                            </div>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}

export default CartTable;
