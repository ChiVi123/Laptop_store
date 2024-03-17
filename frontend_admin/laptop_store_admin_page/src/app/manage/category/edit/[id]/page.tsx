import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import LinkMUI from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Metadata } from 'next';
import Link from 'next/link';
import { Fragment } from 'react';
import { EPath, EText } from '~/common/enums';
import CategoryBar from '~/components/manage/category/category.bar';
import CategoryTreeView from '~/components/manage/category/category.tree.view';
import { findAllCategoryRoot } from '~/services/find.all';
import { findCategoryById } from '~/services/find.one';
import { ICategory } from '~/types/models';

interface IProps {
    params: { id: string };
}

export async function generateMetadata({ params: { id } }: IProps): Promise<Metadata> {
    const result = await findCategoryById(Number(id));
    const category: ICategory = result.data;

    return { title: `${category.name} (ID: ${category.id}) | Laptop Store` };
}

async function EditCategoryPage({ params: { id } }: IProps) {
    const resultTreeView = await findAllCategoryRoot();
    const resultCategory = await findCategoryById(Number(id));

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
                <Typography variant='h1' mt={1}>
                    {EText.EDIT}
                </Typography>
            </Box>
            <CategoryBar category={resultCategory.data} />

            <Box px={3} py={2}>
                <CategoryTreeView categoryTree={resultTreeView.data} category={resultCategory.data} />
            </Box>
        </Fragment>
    );
}

export default EditCategoryPage;
