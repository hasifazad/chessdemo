import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MatchContext, { MatchDetailsContext } from '../context/MatchContext';

export default function StartGame() {
    // const [open, setOpen] = React.useState(true);
    let { startGame, setStartGame } = React.useContext(MatchDetailsContext)

    // const handleClickOpen = () => {
    //     setStartGame();
    // };

    // const handleClose = () => {
    //     setOpen(false);
    // };

    return (
        <div>
            <Dialog
                open={startGame}
                // onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Opponent is connecting...Please wait⌛"}
                </DialogTitle>
                <DialogContent style={{ padding: '0px' }}>
                    {/* <DialogContentText id="alert-dialog-description">
                        Opponent is connecting pleae wait
                    </DialogContentText> */}
                    <div style={{ display: 'flex', justifyContent: 'center' }}>

                        <img src={require('../images/loading.gif')} height='100px' width='100px' style={{ margin: 'auto' }} />
                    </div>
                </DialogContent>
                <DialogActions>
                    {/* <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClose} autoFocus>
                        Agree
                    </Button> */}
                </DialogActions>
            </Dialog>
        </div>
    );
}