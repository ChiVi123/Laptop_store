'use client';

import EditIconMUI from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { Fragment, useMemo } from 'react';
import { IProduct } from '~/types/models';
import { formatLocalDate } from '~/utils';

interface IProps {
    rows: IProduct[];
}

function ProductList({ rows }: IProps) {
    const columns = useMemo<GridColDef[]>(
        () => [
            { field: 'id', headerName: 'ID', type: 'number', width: 40 },
            { field: 'name', headerName: 'Tên sản phẩm', width: 420 },
            { field: 'quantityStock', headerName: 'Tồn kho', type: 'number', width: 100 },
            {
                field: 'price',
                headerName: 'Giá bán',
                type: 'number',
                width: 134,
            },
            {
                field: 'createdDate',
                headerName: 'Ngày tạo',
                width: 140,
                valueGetter: (params) => formatLocalDate(params.value),
            },
            {
                field: 'actions',
                type: 'actions',
                getActions: (params: { id: any }) => [
                    <GridActionsCellItem
                        key={1}
                        icon={<EditIconMUI />}
                        label='Edit'
                        onClick={() => console.log(params.id)}
                    />,
                ],
            },
        ],
        [],
    );
    return (
        <Fragment>
            <Typography variant='h3' mb={2}>
                {rows.length} Sản phẩm
            </Typography>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </Fragment>
    );
}

export default ProductList;
