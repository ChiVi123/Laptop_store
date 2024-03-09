'use client';

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
import { useMemo, useState } from 'react';
import { EProductStatus } from '~/common/enums';
import { mapStatus } from '~/common/maps';
import { IImage, IProduct } from '~/types/models';
import '~/utils/extends';

interface IProps {
    rows: IProduct[];
}

function ProductList({ rows }: IProps) {
    const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);
    const columns = useMemo<GridColDef[]>(
        () => [
            { field: 'id', headerName: 'ID', type: 'number', width: 40 },
            {
                field: 'images',
                headerName: '',
                width: 120,
                sortable: false,
                filterable: false,
                renderCell: (params: GridRenderCellParams<any, IImage[]>) => (
                    <Image
                        src={params.value ? params.value[0].secure_url : ''}
                        alt={params.value ? params.value[0].folder : ''}
                        width={100}
                        height={100}
                    />
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
                renderCell: (params: GridRenderCellParams<any, EProductStatus>) => (
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
                        label='Edit'
                        onClick={() => console.log(params.id)}
                    />,
                ],
            },
        ],
        [],
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
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                rowSelectionModel={rowSelectionModel}
                onRowSelectionModelChange={(newRowSelection) => setRowSelectionModel(newRowSelection)}
            />
        </Box>
    );
}

export default ProductList;
