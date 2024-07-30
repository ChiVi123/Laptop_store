'use client';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Chip, Typography } from '@mui/material';
import {
    DataGrid,
    GridActionsCellItem,
    GridColDef,
    GridRenderCellParams,
    GridRowSelectionModel,
} from '@mui/x-data-grid';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Fragment, useMemo, useState } from 'react';
import { productServerAction } from '~/actions';
import { EPath, EStatus, EText } from '~/common/enums';
import { mapStatus } from '~/common/maps';
import { IProductInfo } from '~/types/models';
import DeleteActionCell from './delete.action.cell';

import '~/libs/string.extensions';

interface IProps {
    rows: IProductInfo[];
}

function ProductList({ rows }: IProps) {
    const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);
    const router = useRouter();

    const handleDeleteItem = async (id: number) => {
        await productServerAction.destroy(id);
    };

    const columns = useMemo<GridColDef<(typeof rows)[number]>[]>(
        () => [
            { field: 'id', headerName: 'ID', type: 'number', width: 40 },
            {
                field: 'thumbnailUrl',
                headerName: '',
                width: 120,
                sortable: false,
                filterable: false,
                renderCell: (params: GridRenderCellParams<any, string>) => (
                    <Fragment>
                        {Boolean(params.value) ? (
                            <Image
                                src={params.value ?? ''}
                                alt=''
                                width={100}
                                height={100}
                                priority
                                style={{ objectFit: 'contain' }}
                            />
                        ) : (
                            <Box width={100} height={100}></Box>
                        )}
                    </Fragment>
                ),
            },
            { field: 'name', headerName: 'Tên sản phẩm', minWidth: 420 },
            { field: 'quantityStock', headerName: 'Tồn kho', type: 'number', minWidth: 100 },
            { field: 'price', headerName: 'Giá bán', type: 'number', minWidth: 134 },
            {
                field: 'createdDate',
                headerName: 'Ngày tạo',
                minWidth: 140,
                valueGetter: ({ value }) =>
                    typeof value === 'string' ? value.formatLocalDate() : new Date().toISOString().formatLocalDate(),
            },
            {
                field: 'status',
                headerName: 'Trạng thái',
                minWidth: 60,
                renderCell: (params: GridRenderCellParams<any, EStatus>) => (
                    <Chip
                        label={params.value ? mapStatus[params.value].content : undefined}
                        color={params.value ? mapStatus[params.value].color : undefined}
                        variant='outlined'
                    />
                ),
            },
            {
                field: 'actions',
                type: 'actions',
                getActions: (params) => [
                    <GridActionsCellItem
                        key={1}
                        icon={<EditIcon />}
                        label={EText.EDIT}
                        showInMenu
                        onClick={() => router.push(EPath.MANAGE_PRODUCT_EDIT.concat(params.row.slug))}
                    />,
                    <DeleteActionCell
                        key={2}
                        icon={<DeleteIcon />}
                        label={EText.DELETE}
                        showInMenu
                        closeMenuOnClick={false}
                        onDelete={() => handleDeleteItem(Number(params.id))}
                    />,
                ],
            },
        ],
        [router],
    );

    return (
        <Box px={1} py={2} mx={3} bgcolor='white'>
            <Typography variant='h3' mb={2}>
                {rows.length} Sản phẩm
            </Typography>
            <DataGrid
                rows={rows}
                columns={columns}
                getRowHeight={() => 'auto'}
                initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                rowSelectionModel={rowSelectionModel}
                onRowSelectionModelChange={(newRowSelection) => setRowSelectionModel(newRowSelection)}
            />
        </Box>
    );
}

export default ProductList;
