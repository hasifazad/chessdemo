import { Box, Button, FormControlLabel, Grid, Paper, Radio, RadioGroup, Slider, TextField, Typography } from '@mui/material'
import React from 'react'
import ToggleButtons from './SelectOptions'

function CreateGame() {
    return (
        <Grid sx={{}}>
            <Paper elevation={10} style={{ margin: '100px auto', width: '300px', padding: '50px' }}>
                <Box>
                    <ToggleButtons />
                </Box>
                <Box sx={{ margin: '20px 0' }}>
                    <Typography>Timer</Typography>
                    <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
                </Box>
                <Box sx={{ margin: '20px 0' }}>
                    <Typography>Would you like to add this ranking?</Typography>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="no" control={<Radio />} label="No" />
                    </RadioGroup>
                </Box>
                <Button variant="contained" fullWidth>CREATE LINK</Button>
                <TextField size="small" fullWidth disabled sx={{ margin: '20px 0 0 0' }} />
            </Paper>
        </Grid>
    )
}

export default CreateGame