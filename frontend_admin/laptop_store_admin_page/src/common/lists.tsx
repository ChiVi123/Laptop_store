import BarChartIcon from '@mui/icons-material/BarChart';
import CategoryIcon from '@mui/icons-material/Category';
import InboxIcon from '@mui/icons-material/Inbox';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { INavigateItem } from '~/types/lists';
import { EPath } from './enums';

const navigateItems: INavigateItem[] = [
    {
        content: 'Trang chủ',
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
        content: 'Sản phẩm',
        icon: <LaptopMacIcon fontSize='small' />,
        children: [
            {
                content: 'Danh sách',
                url: EPath.MANAGE_PRODUCT_LIST,
                children: [],
            },
            {
                content: 'Tạo mới',
                url: EPath.MANAGE_PRODUCT_ADD,
                children: [],
            },
        ],
    },
    {
        content: 'Danh mục',
        icon: <CategoryIcon />,
        url: EPath.MANAGE_CATEGORY,
        children: [],
    },
    {
        content: 'Thương hiệu',
        icon: <WorkspacePremiumIcon />,
        children: [
            {
                content: 'Danh sách',
                url: EPath.MANAGE_BRAND_LIST,
                children: [],
            },
            {
                content: 'Tạo mới',
                url: EPath.MANAGE_BRAND_ADD,
                children: [],
            },
        ],
    },
];

export const lists = { navigateItems };
