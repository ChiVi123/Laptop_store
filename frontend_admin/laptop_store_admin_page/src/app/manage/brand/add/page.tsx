import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import LinkMUI from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Metadata } from 'next';
import Link from 'next/link';
import { Fragment } from 'react';
import { EPath } from '~/common/enums';
import BrandForm from '~/components/manage/brand/brand.form';

function AddBrandPage() {
    return (
        <Fragment>
            <Box p='18px 24px 12px' mb={2} bgcolor='white'>
                <Breadcrumbs separator='/'>
                    <LinkMUI href={EPath.MANAGE_HOME} underline='hover' color='grey.400' component={Link}>
                        Trang chủ
                    </LinkMUI>
                    <Typography color='text.primary' component='span'>
                        Tạo thương hiệu
                    </Typography>
                </Breadcrumbs>

                <Typography variant='h2' mt={2}>
                    Tạo thương hiệu
                </Typography>
            </Box>

            <BrandForm />
        </Fragment>
    );
}

export const metadata: Metadata = {
    title: 'create brand | Laptop store',
    description: 'Management page',
};

export default AddBrandPage;
