import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import LinkMUI from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Metadata } from 'next';
import Link from 'next/link';
import { Fragment } from 'react';
import { EPath } from '~/common/enums';
import CategoryTreeView from '~/components/manage/category/category.tree.view';
import { findOneService } from '~/services';
import { logger, parseError } from '~/utils';

async function CategoryPage() {
    const result = await findOneService.rootCategory();
    if ('error' in result) {
        const error = parseError(result);
        logger({ error });
        throw new Error(error.payload.message);
    }

    return (
        <Fragment>
            <Box p='18px 24px 12px' bgcolor='white'>
                <Breadcrumbs separator='/'>
                    <LinkMUI href={EPath.MANAGE_HOME} underline='hover' color='grey.400' component={Link}>
                        Trang chủ
                    </LinkMUI>
                    <Typography color='text.primary' component='span'>
                        Danh mục
                    </Typography>
                </Breadcrumbs>
            </Box>

            <Box px={3} py={2}>
                <CategoryTreeView categoryTree={result.children} parentCategory={result} />
            </Box>
        </Fragment>
    );
}

export async function generateMetadata(): Promise<Metadata> {
    const result = await findOneService.rootCategory();
    if ('error' in result) {
        const error = parseError(result);
        logger({ error });
        throw new Error(error.payload.message);
    }
    return { title: 'Category | Laptop Store' };
}
export default CategoryPage;
