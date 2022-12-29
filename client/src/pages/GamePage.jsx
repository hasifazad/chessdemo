import { Box, Button, Chip, Grid, Stack, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'

import ChessBoard from '../components/ChessBoard'
import Header from '../components/Header'
import MyTimer from '../components/Timer'


function GamePage() {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 600)
    console.log(time);
    return (
        <div>
            <Header />


            <Box style={{ padding: '40px' }}>
                <Grid container spacing={5}>
                    <Grid item>
                        <ChessBoard />
                    </Grid>
                    <Grid item>
                        <Stack direction='row' spacing={3} style={{ width: '100%', justifyContent: 'space-between' }}>
                            <Stack direction='row' spacing={2}>
                                <Typography>hasif azad</Typography>
                                <Typography>V/S</Typography>
                                <Typography>Carlsen</Typography>
                            </Stack>
                            <Stack direction='row' spacing={2}>
                                <Button variant="contained">DRAW</Button>
                                <Button variant="contained">QUIT</Button>
                            </Stack>
                        </Stack>
                        <Stack direction='row' style={{ justifyContent: 'space-around' }}>
                            <MyTimer expiryTimestamp={time} />
                            <MyTimer expiryTimestamp={time} />
                        </Stack>
                        <Box style={{ width: '100%', height: "250px", backgroundColor: '#80d8ff', borderRadius: '10px', marginBottom: '20px' }} >
                        </Box>
                        <Box style={{ width: '100%', height: "270px", backgroundColor: '#80d8ff', borderRadius: '10px', margin: '20px 0' }} >

                        </Box>
                    </Grid>
                    <Grid item style={{ width: '400px' }}>
                        <Box style={{ width: '100%', height: "100%", backgroundColor: '#80d8ff', borderRadius: '10px', margin: '20px 0' }}>

                        </Box>
                    </Grid>
                </Grid>
            </Box>


        </div>
    )
}

export default GamePage