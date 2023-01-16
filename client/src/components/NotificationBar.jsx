import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { ChatDetailsContext } from '../context/ChatContext';

export default function SimpleSnackbar() {
    // const [open, setOpen] = React.useState(false);
    let { notification, setNotification } = React.useContext(ChatDetailsContext)

    // const handleClick = () => {
    //     setOpen(notification.open);
    // };
    console.log(notification);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        // setOpen(false);
        setNotification({ msg: '', open: false })
    };

    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <div>
            {/* <Button onClick={handleClick}>{notification.msg}</Button> */}
            <Snackbar
                open={notification.open}
                autoHideDuration={5000}
                onClose={handleClose}
                message={notification.msg}
                action={action}
            >
            </Snackbar>
        </div>
    );
}