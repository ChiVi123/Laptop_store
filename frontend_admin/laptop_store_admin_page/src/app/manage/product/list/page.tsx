import { Add as AddIconMUI, SearchRounded as SearchRoundedIconMUI } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import LinkMUI from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Fragment } from 'react';
import { findAllProduct } from '~/actions/request';
import { EPath } from '~/common/enums';
import { ProductList, TabsWrap } from '~/components/manage/product/list';

async function ProductListPage() {
    const result = (await findAllProduct()) || { data: [] };

    if ('code' in result && result.code === 401) {
        redirect(EPath.AUTH_LOGIN);
    }

    return (
        <Fragment>
            <Box p='18px 24px 12px' bgcolor='white'>
                <Breadcrumbs separator='>'>
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
            <Box bgcolor='white'>
                <TabsWrap />
            </Box>
            <Box
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
                                <SearchRoundedIconMUI fontSize='small' />
                            </InputAdornment>
                        ),
                    }}
                />
                <Button variant='outlined' endIcon={<AddIconMUI />}>
                    Bộ lọc
                </Button>
            </Box>
            <Box px={3}>
                <Box px={1} py={2} bgcolor='white'>
                    <ProductList rows={'data' in result ? result.data : []} />
                </Box>
            </Box>
        </Fragment>
    );
}

export default ProductListPage;
