'use client';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Chip, Typography } from '@mui/material';
import {
    DataGrid,
    GridActionsCellItem,
    GridColDef,
    GridRenderCellParams,
    GridRowId,
    GridRowSelectionModel,
} from '@mui/x-data-grid';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Fragment, useMemo, useState } from 'react';
import { deleteBrandActon } from '~/actions/brandActions';
import { EPath, EStatus } from '~/common/enums';
import { mapStatus } from '~/common/maps';
import { IBrand, IImage } from '~/types/models';
import { logger } from '~/utils';
import '~/utils/extends';
import DeleteBrandAction from './delete.brand.action';

interface IProps {
    rows: IBrand[];
}

function BrandList({ rows }: IProps) {
    const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);
    const router = useRouter();

    async function handleDelete(id: GridRowId) {
        const resultDeleteBrand = await deleteBrandActon(Number(id));
        logger({ resultDeleteBrand });
    }

    const columns = useMemo<GridColDef[]>(
        () => [
            { field: 'id', headerName: 'ID', type: 'number', width: 40 },
            {
                field: 'logo',
                headerName: 'Logo',
                width: 120,
                sortable: false,
                filterable: false,
                renderCell: (params: GridRenderCellParams<any, IImage>) => (
                    <Fragment>
                        {params.value ? (
                            <Image
                                src={params.value ? params.value.secureUrl : ''}
                                alt={params.value ? params.value.publicId : ''}
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
            { field: 'name', headerName: 'Tên thương hiệu', minWidth: 280 },
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
                        key={0}
                        icon={<EditIcon />}
                        label='Chinh sua'
                        showInMenu
                        onClick={() => router.push(EPath.MANAGE_BRAND_EDIT.concat(params.id.toString()))}
                    />,
                    <DeleteBrandAction
                        key={1}
                        icon={<DeleteIcon />}
                        label='Xoa'
                        showInMenu
                        closeMenuOnClick={false}
                        onDelete={() => handleDelete(params.id)}
                    />,
                ],
            },
        ],
        [router],
    );

    return (
        <Box px={1} py={2} mx={3} bgcolor='white'>
            <Typography variant='h3' mb={2}>
                {rows.length} Loại thương hiệu
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

export default BrandList;
