'use client';

import { Box, useTheme } from '@mui/material';

function HomePage() {
    const { palette } = useTheme();

    console.log(Object.entries(palette.grey));

    return (
        <div>
            HomePage
            <Box>
                {Object.values(palette.grey).map((color, index) => (
                    <Box key={index} width={60} height={20} sx={{ backgroundColor: color }} />
                ))}
            </Box>
        </div>
    );
}

export default HomePage;
