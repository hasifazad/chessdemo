import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius:'20px',
    boxShadow: 24,
    p: 2,
};

export default function GameWin(props) {
    const [open, setOpen] = React.useState(props.data.open);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    React.useEffect(() => {
        setOpen(props.data.open)
    }, [props.data.open])

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Game Over!
                    </Typography>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                {props.data.win} the game✌️
                            </Typography>
                            {props.data.open ? <img src={require(`../../images/${props.data.win}win.gif`)} width='150px' height='150px'></img> : null}
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}