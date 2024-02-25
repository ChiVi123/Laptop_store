import { Box, Typography } from '@mui/material';

interface IProps {
    id: string;
    required?: boolean;
    children: string;
}

function FormLabel({ id, required = false, children }: IProps) {
    return (
        <Typography variant='subtitle2' htmlFor={id} display='block' mb={1} component='label'>
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
