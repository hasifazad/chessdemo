import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, Chip, Grid, Stack, Typography } from '@mui/material'
import axios from 'axios'
import { MatchDetailsContext } from '../context/MatchContext'

function PlayersNames() {
    let { matchLink } = useContext(MatchDetailsContext)
    let [players, setPlayers] = useState('')
    const BASE_URL = process.env.REACT_APP_BASE_URL

    useEffect(() => {
        axios.get(`${BASE_URL}/api/game/get-time-player/${matchLink}`).then((response) => {
            console.log('players', response.data);
            setPlayers(response.data)

        }).catch(() => {

        })

    }, [])
    return (
        <>
            <Stack direction='row' spacing={2}>
                <Typography>{players !== '' ? players.user1 : 'player 1'}</Typography>
                <Typography>V/S</Typography>
                <Typography>{players !== '' ? players.user2 : 'player 2'}</Typography>
            </Stack>
        </>
    )
}

export default PlayersNames