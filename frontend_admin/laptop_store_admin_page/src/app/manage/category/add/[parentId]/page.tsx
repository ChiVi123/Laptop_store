import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import LinkMUI from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Metadata } from 'next';
import Link from 'next/link';
import { Fragment } from 'react';
import { EPath } from '~/common/enums';
import CategoryTreeView from '~/components/manage/category/category.tree.view';
import { findAllService, findOneService } from '~/services';
import { ICategory } from '~/types/models';
import { logger, parseError } from '~/utils';

interface IProps {
    params: { parentId: string };
}

async function AddSubCategoryPage({ params: { parentId } }: IProps) {
    const resultTreeView = await findAllService.rootCategory();
    const resultCategory = await findOneService.categoryById(Number(parentId));

    if ('error' in resultTreeView) {
        logger({ error: parseError(resultTreeView) });
    }
    if ('error' in resultCategory) {
        logger({ error: parseError(resultCategory) });
    }

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
                <CategoryTreeView
                    categoryTree={Array.isArray(resultTreeView) ? resultTreeView : []}
                    categoryParent={'error' in resultCategory ? undefined : resultCategory}
                />
            </Box>
        </Fragment>
    );
}

export async function generateMetadata({ params: { parentId } }: IProps): Promise<Metadata> {
    const result = await findOneService.categoryById(Number(parentId));
    const category: ICategory | undefined = 'error' in result ? undefined : result;
    return { title: `${category?.name || ''} (ID: ${category?.id || ''}) | Laptop Store` };
}
export default AddSubCategoryPage;
