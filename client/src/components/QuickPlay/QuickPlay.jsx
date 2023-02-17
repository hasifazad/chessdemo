import React, { useContext, useRef, useState } from 'react'
import { Chessboard } from 'react-chessboard'
import { Chess } from 'chess.js'
import { ChessBoardDetailsContext } from '../../context/ChessBoardContext'
import { Howl, Howler } from 'howler'

import moveSound from '../../audios/movingsound.mp3'
import wrongMove from '../../audios/wrongmove.mp3'

import './QuickPlay.css'
import { Typography } from '@mui/material'
import { UserDetailsContext } from '../../context/UserContext'
import RegisterNames from './RegisterNames'
import GameWin from './GameWin'


function QuickPlay() {

    const moveStyle = { padding: '1px 3px', backgroundColor: 'green', borderRadius: '10px', color: 'white', width: 'fit-content', margin: '5px 0' }

    let game = useRef(new Chess())
    let [position, setPosition] = useState('start')
    let [movement, setMovement] = useState([])
    let [player, setPlayer] = useState(null)
    let [gameWin, setGameWin] = useState({ open: false, win: '' })
    let { boardColor } = useContext(ChessBoardDetailsContext)
    let { user } = useContext(UserDetailsContext)

    const playerFun = (name) => {
        setPlayer(name)
    }

    function makeAMove(move) {
        let gameCopy = game.current
        let aMove = gameCopy.move(move);
        let aFen = gameCopy.fen()

        setPosition(gameCopy.fen())
        if (aMove !== null) {
            let sound = new Howl({ src: [moveSound] })
            sound.play()
            setMovement([...movement, aMove])
        } else {
            let sound = new Howl({ src: [wrongMove] })
            sound.play()
        }
        if (gameCopy.isCheckmate()) {
            if (aMove.color == 'b') {
                console.log('black');
                setGameWin({ open: true, win: 'Black' })
            } else {
                console.log('white');
                setGameWin({ open: true, win: 'White' })

            }
        }
    }

    function onDrop(sourceSquare, targetSquare) {
        makeAMove({
            from: sourceSquare,
            to: targetSquare,
        });
    }
    return (
        <div className='qp-box'>
            <RegisterNames data={true} playerFun={playerFun} />
            <GameWin data={gameWin} />
            <div className='qp-box-1'>
                <Typography>{user.username} (White)</Typography>
                {
                    movement.map((obj, index) => {
                        if (obj.color === 'w') {

                            return (
                                <div key={index} style={moveStyle}>
                                    <Typography>{obj.piece.toUpperCase() + ' ' + obj.to}</Typography>
                                </div>
                            )
                        }
                    })
                }

            </div>
            <div className='qp-box-2'>
                <Chessboard position={position}
                    onPieceDrop={onDrop}
                    boardWidth={600}
                    customDarkSquareStyle={{ backgroundColor: boardColor.colorOne }}
                    customLightSquareStyle={{ backgroundColor: boardColor.colorTwo }}
                />
            </div>
            <div className='qp-box-3'>
                <Typography>{player ? player : 'Player 2'} (Black)</Typography>
                {
                    movement.map((obj, index) => {
                        if (obj.color === 'b') {

                            return (
                                <div key={index} style={moveStyle}>
                                    <Typography>{obj.piece.toUpperCase() + ' ' + obj.to}</Typography>
                                </div>
                            )
                        }
                    })
                }
            </div>
        </div>
    )
}

export default QuickPlay