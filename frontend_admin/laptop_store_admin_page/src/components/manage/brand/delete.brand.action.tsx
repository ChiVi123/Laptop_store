'use client';

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { GridActionsCellItem, GridActionsCellItemProps } from '@mui/x-data-grid';
import { Fragment, useState } from 'react';

function DeleteBrandAction({ onDelete, ...props }: GridActionsCellItemProps & { onDelete: () => void }) {
    const [open, setOpen] = useState(false);

    function handleClick() {
        setOpen(false);
        onDelete();
    }

    return (
        <Fragment>
            <GridActionsCellItem {...props} onClick={() => setOpen(true)} />
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby='alert-brand-title'
                aria-describedby='alert-brand-description'
            >
                <DialogTitle id='alert-brand-title'>Xoa thuong hieu nay?</DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-brand-description'>Luu y khong the hoan tac.</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Huy</Button>
                    <Button onClick={handleClick} color='warning' autoFocus>
                        Xoa
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}

export default DeleteBrandAction;
