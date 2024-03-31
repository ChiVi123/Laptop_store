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
import { ICategory } from '~/types/models';
import { logger, parseError } from '~/utils';

interface IProps {
    params: { parentId: string };
}

async function AddSubCategoryPage({ params: { parentId } }: IProps) {
    const resultRootCategory = await findOneService.rootCategory();
    const resultCategory = await findOneService.categoryById(Number(parentId));

    if ('error' in resultRootCategory) {
        const error = parseError(resultRootCategory);
        logger({ error });
        throw new Error(error.payload.message);
    }
    if ('error' in resultCategory) {
        const error = parseError(resultCategory);
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
                        Tạo danh mục
                    </Typography>
                </Breadcrumbs>
            </Box>

            <Box px={3} py={2}>
                <CategoryTreeView categoryTree={resultRootCategory.children} parentCategory={resultCategory} />
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
