import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Box, Stack, TextField } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function ProfileEdit() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen} fullWidth>
                EDIT
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Edit Profile
                </BootstrapDialogTitle>
                <DialogContent dividers sx={{width:'400px'}}>
                    <Stack direction='column'>
                        <TextField id="username"
                            label="Name"
                            value='asfdsfsd'
                            size='small'
                            style={{ marginBottom: '20px' }}
                        />
                        <TextField id="email"
                            label="Email"
                            value='asfdsfsd'
                            size='small'
                            style={{ marginBottom: '20px' }} />
                        <TextField id="mobile"
                            label="Mobile"
                            value='asfdsfsd'
                            size='small'
                            style={{ marginBottom: '20px' }} />
                        <TextField id="country"
                            label="Country"
                            value='asfdsfsd'
                            size='small'
                            style={{ marginBottom: '20px' }} />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Save
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}