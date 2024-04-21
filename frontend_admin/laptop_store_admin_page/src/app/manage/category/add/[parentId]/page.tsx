import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import LinkMUI from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Metadata } from 'next';
import Link from 'next/link';
import { Fragment } from 'react';
import { categoryServerAction } from '~/actions';
import { EPath } from '~/common/enums';
import CategoryTreeView from '~/components/manage/category/category.tree.view';

interface IProps {
    params: { parentId: string };
}

async function AddSubCategoryPage({ params: { parentId } }: IProps) {
    const [rootCategoryResult, categoryResult] = await Promise.all([
        categoryServerAction.root(),
        categoryServerAction.byId(Number(parentId)),
    ]);

    return (
        <Fragment>
            <Box p='18px 24px 12px' bgcolor='white'>
                <Breadcrumbs separator='/'>
                    <LinkMUI href={EPath.MANAGE_HOME} underline='hover' color='grey.400' component={Link}>
                        Trang chủ
                    </LinkMUI>
                    <Typography color='text.primary' component='span'>
                        Tạo danh mục
                    </Typography>
                </Breadcrumbs>
            </Box>

            <Box px={3} py={2}>
                <CategoryTreeView categoryTree={rootCategoryResult.children} parentCategory={categoryResult} />
            </Box>
        </Fragment>
    );
}

export async function generateMetadata({ params: { parentId } }: IProps): Promise<Metadata> {
    const result = await categoryServerAction.byId(Number(parentId));
    return { title: `${result.name} (ID: ${result.id}) | Laptop Store` };
}
export default AddSubCategoryPage;
