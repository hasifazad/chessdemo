import { Grid } from '@mui/material'
import React from 'react'
import Header from '../components/Header'
import QuickPlay from '../components/QuickPlay/QuickPlay'
import BoardColor from '../components/BoardColor'
import ChessBoardContext from '../context/ChessBoardContext'

function QuickPlayPage() {
    return (
        <div>
            <Header />
            <ChessBoardContext>
                <QuickPlay />
                {/* <Grid container direction='row' spacing={2}>
                    <Grid item>
                        <BoardColor colorOne='#B58863' colorTwo='#F0D9B5' />
                    </Grid>
                    <Grid item>
                        <BoardColor colorOne='#769656' colorTwo='#eeeed2' />
                    </Grid>
                    <Grid item>
                        <BoardColor colorOne='#709ba3' colorTwo='#b1e4b9' />
                    </Grid>
                    <Grid item>
                        <BoardColor colorOne='#706677' colorTwo='#ccb7ae' />
                    </Grid>
                </Grid> */}
            </ChessBoardContext>
        </div>
    )
}

export default QuickPlayPage