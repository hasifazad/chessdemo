
import { Button, Grid, Paper } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PlayWithLink from './PlayWithLink'

function Home() {
    const paperStyle = { padding: '30px 20px', width: '350px', margin: '100px auto', borderRadius: 0 }
    const boxStyle = { display: 'flex', flexDirection: 'column' }
    const buttonStyle = { margin: '8px 0' }

    const navigate = useNavigate()

    const quickPlay = () => {
        navigate('/play')
    }
    const makeAGame = () => {
        navigate('/creategame')
    }
    const ranking = () => {
        navigate('/ranking')
    }
    const community = () => {
        navigate('/chat')
    }
    const settings = () => {
        navigate('/profile')
    }
    return (
        <div>
            <Grid>
                <Paper style={paperStyle} elevation={10}>
                    <Box style={boxStyle}>
                        <Button style={buttonStyle} onClick={quickPlay}>QUICK PLAY</Button>
                        <Button style={buttonStyle} onClick={makeAGame}>MAKE A GAME</Button>
                        {/* <Button style={buttonStyle}>PLAY WITH LINK</Button> */}
                        <PlayWithLink label='play with link' vari='text' />
                        <Button style={buttonStyle} onClick={ranking}>RANKING</Button>
                        <Button style={buttonStyle} onClick={community}>COMMUNITY</Button>
                        <Button style={buttonStyle}>CURRENT MATCHES</Button>
                        <Button style={buttonStyle} onClick={settings}>SETTINGS</Button>
                    </Box>
                </Paper>
            </Grid>
        </div>
    )
}

export default Home