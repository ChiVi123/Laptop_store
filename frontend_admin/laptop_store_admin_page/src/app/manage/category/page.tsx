import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import LinkMUI from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { Fragment } from 'react';
import { EPath } from '~/common/enums';
import CategoryTreeView from '~/components/manage/category/category.tree.view';
import { findAllCategoryRoot } from '~/services/find.all';

async function CategoryPage() {
    const result = await findAllCategoryRoot();

    return (
        <Fragment>
            <Box p='18px 24px 12px' bgcolor='white'>
                <Breadcrumbs separator='/'>
                    <LinkMUI href={EPath.MANAGE_HOME} underline='hover' color='grey.400' component={Link}>
                        Trang chủ
                    </LinkMUI>
                    <Typography color='text.primary' component='span'>
                        Danh muc
                    </Typography>
                </Breadcrumbs>

                <Typography variant='h2' mt={2}>
                    Danh muc
                </Typography>
            </Box>

            <Box px={3} py={2}>
                <CategoryTreeView categoryTree={result.data} category={result.data[0]} />
            </Box>
        </Fragment>
    );
}

export default CategoryPage;
