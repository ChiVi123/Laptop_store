import AddIcon from '@mui/icons-material/Add';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import LinkMUI from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Fragment } from 'react';
import { EPath, HttpStatus } from '~/common/enums';
import { ProductList, TabsWrap } from '~/components/manage/product/list';
import { findAllService } from '~/services';
import { logger, parseError } from '~/utils';

export const metadata: Metadata = {
    title: 'List product | Laptop store',
    description: 'Management page',
};

async function ProductListPage() {
    const result = await findAllService.product();
    if ('error' in result) {
        const error = parseError(result);
        if (error.httpCode === HttpStatus.UNAUTHORIZED) {
            redirect(EPath.AUTH_LOGIN);
        }
        logger({ result });
    }

    return (
        <Fragment>
            <Box p='18px 24px 12px' bgcolor='white'>
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
                                <SearchRoundedIcon fontSize='small' />
                            </InputAdornment>
                        ),
                    }}
                />
                <Button variant='outlined' endIcon={<AddIcon />}>
                    Bộ lọc
                </Button>
            </Box>

            <ProductList rows={Array.isArray(result) ? result : []} />
        </Fragment>
    );
}

export default ProductListPage;
