import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import LinkMUI from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Metadata } from 'next';
import Link from 'next/link';
import { Fragment } from 'react';
import { categoryServerAction } from '~/actions';
import { EPath, EText } from '~/common/enums';
import CategoryBar from '~/components/manage/category/category.bar';
import CategoryTreeView from '~/components/manage/category/category.tree.view';

interface IProps {
    params: { id: string };
}

async function EditCategoryPage({ params: { id } }: IProps) {
    const [rootCategoryResult, categoryResult] = await Promise.all([
        categoryServerAction.root(),
        categoryServerAction.getNodeByInfoId(Number(id)),
    ]);

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
            {categoryResult.info.name && <CategoryBar category={categoryResult} />}

            <Box px={3} py={2}>
                <CategoryTreeView categoryTree={rootCategoryResult.children} categoryNode={categoryResult} />
            </Box>
        </Fragment>
    );
}

export async function generateMetadata({ params: { id } }: IProps): Promise<Metadata> {
    const result = await categoryServerAction.getInfoById(Number(id));
    return { title: `${result.name} (ID: ${result.id}) | Laptop Store` };
}
export default EditCategoryPage;
