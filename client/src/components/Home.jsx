
import { Button, Grid, Paper } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

function Home() {
    const paperStyle = { padding: '30px 20px', width: '350px', margin: '150px auto' }
    const boxStyle = {display:'flex',flexDirection:'column'}
    const buttonStyle = {margin:'5px 0'}
  return (
    <div>
        <Grid>
            <Paper style={paperStyle}>
                <Box style={boxStyle}>
                    <Button style={buttonStyle}>QUICK PLAY</Button>
                    <Button style={buttonStyle}>MAKE A GAME</Button>
                    <Button style={buttonStyle}>pLAY WITH LINK</Button>
                    <Button style={buttonStyle}>RANKING</Button>
                    <Button style={buttonStyle}>COMMUNITY</Button>
                    <Button style={buttonStyle}>CURRENT MATCHES</Button>
                    <Button style={buttonStyle}>SETTINGS</Button>
                </Box>
            </Paper>
        </Grid>
    </div>
  )
}

export default Home