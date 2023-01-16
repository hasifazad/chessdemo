import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { MatchDetailsContext } from '../context/MatchContext';
import { Alert } from '@mui/material';

export default function PositionedSnackbar() {
    let { snackOpen, setSnackOpen } = React.useContext(MatchDetailsContext)
    const [state, setState] = React.useState({
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal, open } = state;

    const handleClick = (newState) => () => {
        setState({ open: true, ...newState });
    };

    const handleClose = () => {
        setState({ ...state });
        setSnackOpen(false)
    };

    // const buttons = (
    //     <React.Fragment>
    //         <Button
    //             onClick={handleClick({
    //                 vertical: 'top',
    //                 horizontal: 'center',
    //             })}
    //         >
    //             Top-Center
    //         </Button>
    //         <Button
    //             onClick={handleClick({
    //                 vertical: 'top',
    //                 horizontal: 'right',
    //             })}
    //         >
    //             Top-Right
    //         </Button>
    //         <Button
    //             onClick={handleClick({
    //                 vertical: 'bottom',
    //                 horizontal: 'right',
    //             })}
    //         >
    //             Bottom-Right
    //         </Button>
    //         <Button
    //             onClick={handleClick({
    //                 vertical: 'bottom',
    //                 horizontal: 'center',
    //             })}
    //         >
    //             Bottom-Center
    //         </Button>
    //         <Button
    //             onClick={handleClick({
    //                 vertical: 'bottom',
    //                 horizontal: 'left',
    //             })}
    //         >
    //             Bottom-Left
    //         </Button>
    //         <Button
    //             onClick={handleClick({
    //                 vertical: 'top',
    //                 horizontal: 'left',
    //             })}
    //         >
    //             Top-Left
    //         </Button>
    //     </React.Fragment>
    // );

    return (
        <div>
            {/* {buttons} */}
            <Snackbar
                autoHideDuration={1500}
                anchorOrigin={{ vertical, horizontal }}
                open={snackOpen}
                onClose={handleClose}
                // message="Opponent Move"
                key={vertical + horizontal}
            >
                <Alert severity="error" variant="filled">Opponent move!</Alert>
            </Snackbar>
        </div>
    );
}