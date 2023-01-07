import { Box, Button, Chip, Grid, Stack, Typography } from '@mui/material'
import { Container } from '@mui/system'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'

import ChessBoard from '../components/ChessBoard'
import Header from '../components/Header'
import PlayersNames from '../components/PlayersNames'
import MyTimer from '../components/Timer'
import ChatContext from '../context/ChatContext'
import { MatchDetailsContext } from '../context/MatchContext'


function GamePage() {


    const time = new Date();
    time.setSeconds(time.getSeconds() + 600);
    let { moved } = useContext(MatchDetailsContext)

    // let [t, SetT] = useState(time)
    // let { moved } = useContext(MatchDetailsContext)
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
                            {/* <Stack direction='row' spacing={2}>
                                <Typography>{players !== '' ? players.user1 : 'player 1'}</Typography>
                                <Typography>V/S</Typography>
                                <Typography>{players !== '' ? players.user2 : 'player 2'}</Typography>
                            </Stack> */}
                            <PlayersNames />
                            <Stack direction='row' spacing={2}>
                                <Button variant="contained" disableElevation disableTouchRipple>DRAW</Button>
                                <Button variant="contained" disableElevation disableTouchRipple>QUIT</Button>
                            </Stack>
                        </Stack>
                        <Stack direction='row' style={{ justifyContent: 'space-around' }}>
                            <MyTimer expiryTimestamp={time} moved={moved} />
                            <MyTimer expiryTimestamp={time} moved={!moved} />
                        </Stack>
                        <Box style={{ width: '100%', height: "250px", backgroundColor: '#80d8ff', borderRadius: '10px', marginBottom: '20px' }} >
                        </Box>
                        <Box style={{ width: '100%', height: "270px", backgroundColor: '#80d8ff', borderRadius: '10px', margin: '20px 0' }} >

                        </Box>
                    </Grid>
                    <Grid item style={{ width: '400px' }}>
                        <Box style={{ width: '100%', height: "500px", backgroundColor: '#80d8ff', borderRadius: '10px', margin: '20px 0' }}>

                        </Box>
                    </Grid>
                </Grid>
            </Box>

        </div>
    )
}

export default GamePage