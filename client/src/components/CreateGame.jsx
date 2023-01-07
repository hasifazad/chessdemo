import { Box, Button, FormControlLabel, Grid, Paper, Radio, RadioGroup, Slider, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import axios from 'axios';
import { UserDetailsContext } from '../context/UserContext';
import PlayWithLink from './PlayWithLink';

function CreateGame() {
    const BASE_URL = process.env.REACT_APP_BASE_URL

    const [color, setColor] = useState('w');
    const [time, setTime] = useState(50);
    const [addRanking, setAddRanking] = useState('yes');
    const [link, setLink] = useState(null);

    let { user } = useContext(UserDetailsContext)

    const handleColor = (event, newColor) => {
        console.log(newColor);
        setColor(newColor);
    };
    const valuetext = (value) => {
        console.log(value);
        setTime(value)
    }
    const onHandle = (event) => {
        console.log(event.target.value);
        setAddRanking(event.target.value)
    }

    const onSubmit = () => {
        let obj = {
            first_player: user._id,
            color,
            time,
            add_ranking: addRanking
        }
        console.log(obj);
        axios.post(`${BASE_URL}/api/game/create-game`, obj).then((response) => {
            console.log(response.data);
            setLink(response.data)
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <Grid sx={{}}>
            <Paper elevation={10} style={{ margin: '50px auto', width: '300px', padding: '50px' }}>
                <Box>
                    <ToggleButtonGroup
                        color='success'
                        value={color}
                        exclusive
                        onChange={handleColor}
                        fullWidth
                        sx={{ margin: '20px 0' }}
                    >
                        <ToggleButton value="w">
                            <Typography>WHITE</Typography>
                        </ToggleButton>
                        <ToggleButton value="r">
                            <Typography>RANDOM</Typography>
                        </ToggleButton>
                        <ToggleButton value="b">
                            <Typography>BLACK</Typography>
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>
                <Box sx={{ margin: '20px 0' }}>
                    <Typography>Timer &nbsp;&nbsp;&nbsp;{time}</Typography>
                    <Slider defaultValue={10} getAriaValueText={valuetext} aria-label="Default" valueLabelDisplay="auto" />
                </Box>
                <Box sx={{ margin: '20px 0' }}>
                    <Typography>Would you like to add this ranking?</Typography>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue={addRanking}
                        name="radio-buttons-group"
                        onChange={onHandle}
                    >
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="no" control={<Radio />} label="No" />
                    </RadioGroup>
                </Box>
                <Button variant="contained" onClick={onSubmit} fullWidth>CREATE LINK</Button>
                <TextField size="small" fullWidth disabled sx={{ margin: '20px 0 15px 0' }} value={link} />
                <PlayWithLink label='start game' vari='text' />
            </Paper>
        </Grid>
    )
}

export default CreateGame