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
import { findCategoryById } from '~/services/find.one';
import { ICategory } from '~/types/models';

interface IProps {
    params: { parentId: string };
}

export async function generateMetadata({ params: { parentId } }: IProps): Promise<Metadata> {
    const result = await findCategoryById(Number(parentId));
    const category: ICategory = result.data;

    return { title: `${category?.name || ''} (ID: ${category?.id || ''}) | Laptop Store` };
}

async function AddSubCategoryPage({ params: { parentId } }: IProps) {
    const resultTreeView = await findAllCategoryRoot();
    const resultCategory = await findCategoryById(Number(parentId));

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
                <CategoryTreeView categoryTree={resultTreeView.data} categoryParent={resultCategory.data} />
            </Box>
        </Fragment>
    );
}

export default AddSubCategoryPage;
