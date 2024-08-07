import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import LinkMUI from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Metadata } from 'next';
import Link from 'next/link';
import { Fragment } from 'react';
import { categoryServerAction } from '~/actions';
import { EPath } from '~/common/enums';
import ProductForm from '~/components/manage/product/product.form';

async function AddProductPage() {
    const result = await categoryServerAction.root();

    return (
        <Fragment>
            <Box p='18px 24px 12px' bgcolor='white'>
                <Breadcrumbs separator='/'>
                    <LinkMUI href={EPath.MANAGE_HOME} underline='hover' color='grey.400' component={Link}>
                        Trang chủ
                    </LinkMUI>
                    <Typography color='text.primary' component='span'>
                        Tạo sản phẩm
                    </Typography>
                </Breadcrumbs>

                <Typography variant='h2' mt={2}>
                    Tạo sản phẩm
                </Typography>
            </Box>

            <ProductForm categories={result.children} />
        </Fragment>
    );
}

export const metadata: Metadata = {
    title: 'Create product | Laptop store',
    description: 'Management page',
};

export default AddProductPage;
