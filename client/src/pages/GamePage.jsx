import { Box, Button, Chip, Grid, Stack, Typography } from '@mui/material'
import { Container } from '@mui/system'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import BoardColor from '../components/BoardColor'
import Chat from '../components/Chat/Chat'

import ChessBoard from '../components/ChessBoard'
import Header from '../components/Header'
import MiniChat from '../components/MiniChat/MiniChat'
import PlayersNames from '../components/PlayersNames'
import MyTimer from '../components/Timer'
import ChatContext from '../context/ChatContext'
import ChessBoardContext from '../context/ChessBoardContext'
import { MatchDetailsContext } from '../context/MatchContext'

import './GamePage.css'


function GamePage() {

    let [state, setState] = useState(false)

    const time = new Date();
    time.setSeconds(time.getSeconds() + 600);
    let { moved, startGame, movesArray } = useContext(MatchDetailsContext)

    // let [t, SetT] = useState(time)
    // let { moved } = useContext(MatchDetailsContext)
    return (
        <>
            <Header />
            <ChessBoardContext>
                <div className='ch-box'>
                    <div className='ch-box1'>
                        <ChessBoard />
                    </div>
                    <div className='ch-box2'>
                        <div className='ch-btn'>
                            <Button variant="contained" disableElevation disableTouchRipple sx={{ marginRight: '10px' }}>DRAW</Button>
                            <Button variant="contained" disableElevation disableTouchRipple>QUIT</Button>
                        </div>
                        <div className='ch-playername'>
                            <PlayersNames />
                        </div>
                        <div className='ch-timer'>
                            <MyTimer expiryTimestamp={time} moved={startGame ? true : moved} />
                            <MyTimer expiryTimestamp={time} moved={startGame ? true : !moved} />
                        </div>
                        <div className='ch-moves'>
                            {
                                movesArray.map((obj, index) => {
                                    return (<p style={{
                                        backgroundColor: 'green', borderRadius: '8px',
                                        color: 'white',
                                        width: 'fit-content', height: 'fit-content', padding: '0 5px'
                                    }}>
                                        {obj?.piece.toUpperCase()} {obj?.to}</p>)
                                })
                            }
                        </div>
                    </div>
                    <div className='ch-box3'>
                        <div className='ch-color'>
                            <div>
                                <BoardColor colorOne='#B58863' colorTwo='#F0D9B5' />
                            </div>
                            <div>
                                <BoardColor colorOne='#769656' colorTwo='#eeeed2' />
                            </div>
                            <div>
                                <BoardColor colorOne='#709ba3' colorTwo='#b1e4b9' />
                            </div>
                            <div>
                                <BoardColor colorOne='#706677' colorTwo='#ccb7ae' />
                            </div>
                        </div>
                        <div className='ch-btn2'>
                            <Button variant="outlined" onClick={() => { setState(!state) }}
                                disableElevation disableTouchRipple sx={{ marginRight: '10px' }}>CHAT</Button>
                            <Button variant="outlined" disableElevation disableTouchRipple>VIDEO</Button>
                        </div>
                        <div className='ch-chat'>
                            {
                                state ? <MiniChat /> : null
                            }
                        </div>

                    </div>
                </div>
            </ChessBoardContext>

        </>
    )
}

export default GamePage