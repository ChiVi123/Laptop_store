import { BarChart as BarChartIconMUI, Inbox as InboxIconMUI } from '@mui/icons-material';
import { INavigateItem } from '~/types/lists';
import { EPath } from './enums';

const navigateItems: INavigateItem[] = [
    {
        content: 'Trang chu',
        icon: <BarChartIconMUI fontSize='small' />,
        url: EPath.MANAGE_HOME,
        children: [],
    },
    {
        content: 'Đơn hàng',
        icon: <InboxIconMUI fontSize='small' />,
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
        icon: <BarChartIconMUI fontSize='small' />,
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
];

export const lists = { navigateItems };
