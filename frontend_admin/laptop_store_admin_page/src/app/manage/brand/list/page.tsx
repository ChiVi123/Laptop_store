import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import LinkMUI from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Metadata } from 'next';
import Link from 'next/link';
import { Fragment } from 'react';
import { EPath } from '~/common/enums';
import BrandList from '~/components/manage/brand/brand.list';
import { findAllService } from '~/services';
import { logger, parseError } from '~/utils';

async function BrandListPage() {
    const result = await findAllService.brand();
    if ('error' in result) {
        logger({ error: parseError(result) });
    }

    return (
        <Fragment>
            <Box p='18px 24px 12px' mb={2} bgcolor='white'>
                <Breadcrumbs separator='/'>
                    <LinkMUI href={EPath.MANAGE_HOME} underline='hover' color='grey.400' component={Link}>
                        Trang chủ
                    </LinkMUI>
                    <Typography color='text.primary' component='span'>
                        Danh sách thương hiệu
                    </Typography>
                </Breadcrumbs>

                <Typography variant='h2' mt={2}>
                    Danh sách thương hiệu
                </Typography>
            </Box>

            <BrandList rows={Array.isArray(result) ? result : []} />
        </Fragment>
    );
}

export const metadata: Metadata = {
    title: 'List brand | Laptop store',
    description: 'Management page',
};

export default BrandListPage;
