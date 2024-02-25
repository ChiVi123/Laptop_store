'use client';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useState } from 'react';

function TabsWrap() {
    const [tab, setTab] = useState(0);

    function handleChangeTab(_: React.SyntheticEvent, newValue: number) {
        setTab(newValue);
    }

    return (
        <Tabs value={tab} onChange={handleChangeTab} sx={{ px: 3, borderBottom: 1, borderColor: 'divider' }}>
            <Tab label='Tat ca (16)' />
            <Tab label='Dang ban (4)' />
            <Tab label='Nhap (0)' />
            <Tab label='An (12)' />
        </Tabs>
    );
}

export default TabsWrap;
