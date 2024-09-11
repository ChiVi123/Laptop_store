import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import LinkMUI from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Metadata } from 'next';
import Link from 'next/link';
import { Fragment } from 'react';
import { productServerAction } from '~/actions';
import { EPath } from '~/common/enums';
import { ProductList } from '~/components/manage/product/list';

export const metadata: Metadata = {
    title: 'List product | Laptop store',
    description: 'List product page',
};

async function ProductListPage() {
    const result = await productServerAction.all();

    return (
        <Fragment>
            <Box p='18px 24px 12px' mb={3} bgcolor='white'>
                <Breadcrumbs separator='/'>
                    <LinkMUI href={EPath.MANAGE_HOME} underline='hover' color='grey.400' component={Link}>
                        Trang chủ
                    </LinkMUI>
                    <Typography color='text.primary' component='span'>
                        Danh sách sản phẩm
                    </Typography>
                </Breadcrumbs>

                <Typography variant='h2' mt={2}>
                    Danh sách sản phẩm
                </Typography>
            </Box>

            {/* <Box bgcolor='white'>
                <TabsWrap />
            </Box> */}

            {/* <Box
                display='flex'
                alignItems='center'
                justifyContent='space-between'
                p='16px 24px 18px'
                mb={3}
                bgcolor='white'
            >
                <TextField
                    id='input-search-product'
                    variant='outlined'
                    size='small'
                    placeholder='Tìm kiếm theo tên...'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <SearchRoundedIcon fontSize='small' />
                            </InputAdornment>
                        ),
                    }}
                />
                <Button variant='outlined' endIcon={<AddIcon />}>
                    Bộ lọc
                </Button>
            </Box> */}

            <ProductList rows={Array.isArray(result) ? result : []} />
        </Fragment>
    );
}

export default ProductListPage;
