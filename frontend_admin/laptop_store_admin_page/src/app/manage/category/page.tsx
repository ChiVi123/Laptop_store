import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import LinkMUI from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Metadata } from 'next';
import Link from 'next/link';
import { Fragment } from 'react';
import { EPath } from '~/common/enums';
import CategoryTreeView from '~/components/manage/category/category.tree.view';
import { findAllCategoryRoot } from '~/services/find.all';
import { ICategory } from '~/types/models';

export async function generateMetadata(): Promise<Metadata> {
    const result = await findAllCategoryRoot();
    const categoryRoot: ICategory = result.data[0];

    return { title: `${categoryRoot.name} (ID: ${categoryRoot.id}) | Laptop Store` };
}

async function CategoryPage() {
    const result = await findAllCategoryRoot();
    const categoryRoot: ICategory = result.data[0];

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

                <Typography variant='h2' mt={2}>
                    {categoryRoot && categoryRoot.name}
                </Typography>
            </Box>

            <Box px={3} py={2}>
                <CategoryTreeView categoryTree={result.data} category={categoryRoot} />
            </Box>
        </Fragment>
    );
}

export default CategoryPage;
