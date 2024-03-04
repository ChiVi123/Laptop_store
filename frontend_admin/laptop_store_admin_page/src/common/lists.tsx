import { BarChart as BarChartIcon, Category as CategoryIcon, Inbox as InboxIcon } from '@mui/icons-material';
import { INavigateItem } from '~/types/lists';
import { EPath } from './enums';

const navigateItems: INavigateItem[] = [
    {
        content: 'Trang chu',
        icon: <BarChartIcon fontSize='small' />,
        url: EPath.MANAGE_HOME,
        children: [],
    },
    {
        content: 'Đơn hàng',
        icon: <InboxIcon fontSize='small' />,
        children: [
            {
                content: 'Danh sách đơn hàng',
                url: EPath.MANAGE_ORDER_LIST,
                children: [],
            },
        ],
    },
    {
        content: 'San pham',
        icon: <BarChartIcon fontSize='small' />,
        children: [
            {
                content: 'Danh sách san pham',
                url: EPath.MANAGE_PRODUCT_LIST,
                children: [],
            },
            {
                content: 'Tao san pham',
                url: EPath.MANAGE_PRODUCT_ADD,
                children: [],
            },
        ],
    },
    {
        content: 'Danh muc',
        icon: <CategoryIcon />,
        url: EPath.MANAGE_CATEGORY,
        children: [],
    },
];

export const lists = { navigateItems };
