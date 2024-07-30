import { Box, SxProps, Theme, Typography } from '@mui/material';

interface IProps {
    id?: string;
    required?: boolean;
    children: string;
    sx?: SxProps<Theme>;
}

function FormLabel({ id, required = false, children, sx }: IProps) {
    return (
        <Typography variant='subtitle2' htmlFor={id} mb={1} component='label' sx={sx}>
            {required && (
                <Box mr={1} component='span' sx={{ color: 'error.main' }}>
                    *
                </Box>
            )}
            {children}
        </Typography>
    );
}

export default FormLabel;
