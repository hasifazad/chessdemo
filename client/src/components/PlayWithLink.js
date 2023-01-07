import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { UserDetailsContext } from '../context/UserContext'
import { MatchDetailsContext } from '../context/MatchContext';
import { useNavigate } from 'react-router-dom';


export default function PlayWithLink(props) {
    const invalidErr = { color: 'red' }
    const BASE_URL = process.env.REACT_APP_BASE_URL

    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');
    let [gameLink, setGameLink] = React.useState('')
    let [invalid, setInvalid] = React.useState(null)

    let { user } = React.useContext(UserDetailsContext)
    let { setMatchLink } = React.useContext(MatchDetailsContext)

    let navigate = useNavigate()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setInvalid('')
        setOpen(false);
    };

    const onHandleChange = (e) => {
        setGameLink(e.target.value)
    }

    const onhandleSubmit = () => {
        axios.get(`${BASE_URL}/api/game/get-game/${gameLink}/${user._id}`).then((response) => {
            console.log(response);
            if (response.data == 'invalid link') {
                setInvalid(response.data)
            } else {
                // setMatch(response.data)
                setMatchLink(gameLink)
                navigate('/game')
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    const handleMaxWidthChange = (event) => {
        setMaxWidth(
            // @ts-expect-error autofill of arbitrary value is not handled.
            event.target.value,
        );
    };

    const handleFullWidthChange = (event) => {
        setFullWidth(event.target.checked);
    };

    return (
        <React.Fragment>
            <Button onClick={handleClickOpen} fullWidth variant={props.vari}>
                {props.label}
            </Button>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={open}
                onClose={handleClose}
            >
                {/* <DialogTitle>Optional sizes</DialogTitle> */}
                <DialogContent>
                    <DialogContentText>
                        Paste your link here
                    </DialogContentText>
                    <Box
                        noValidate
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            m: 'auto',
                            width: 'fit-content',
                        }}
                    >
                        <FormControl sx={{ mt: 2, minWidth: 120 }}>
                            {/* <InputLabel htmlFor="max-width">maxWidth</InputLabel>
                            <Select
                                autoFocus
                                value={maxWidth}
                                onChange={handleMaxWidthChange}
                                label="maxWidth"
                                inputProps={{
                                    name: 'max-width',
                                    id: 'max-width',
                                }}
                            >
                                <MenuItem value={false}>false</MenuItem>
                                <MenuItem value="xs">xs</MenuItem>
                                <MenuItem value="sm">sm</MenuItem>
                                <MenuItem value="md">md</MenuItem>
                                <MenuItem value="lg">lg</MenuItem>
                                <MenuItem value="xl">xl</MenuItem>
                            </Select> */}
                            {invalid ? <span style={invalidErr}>{invalid}</span> : null}
                            <TextField id="outlined-basic" size='small' variant="outlined" value={gameLink} onChange={onHandleChange} />
                        </FormControl>
                        {/* <FormControlLabel
                            sx={{ mt: 1 }}
                            control={
                                <Switch checked={fullWidth} onChange={handleFullWidthChange} />
                            }
                            label="Full width"
                        /> */}
                        <Button variant="contained" style={{ marginTop: '20px' }} onClick={() => { onhandleSubmit() }}>START GAME</Button>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}