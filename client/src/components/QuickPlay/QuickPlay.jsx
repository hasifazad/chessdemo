import React, { useContext, useRef, useState } from 'react'
import { Chessboard } from 'react-chessboard'
import { Chess } from 'chess.js'
import { ChessBoardDetailsContext } from '../../context/ChessBoardContext'
import { Howl, Howler } from 'howler'

import moveSound from '../../audios/movingsound.mp3'
import wrongMove from '../../audios/wrongmove.mp3'

import './QuickPlay.css'

function QuickPlay() {

    let game = useRef(new Chess())
    let [position, setPosition] = useState('start')
    let { boardColor } = useContext(ChessBoardDetailsContext)

    function makeAMove(move) {
        let gameCopy = game.current
        let aMove = gameCopy.move(move);
        let aFen = gameCopy.fen()

        setPosition(gameCopy.fen())
        if (aMove !== null) {
            let sound = new Howl({ src: [moveSound] })
            sound.play()
        } else {
            let sound = new Howl({ src: [wrongMove] })
            sound.play()
        }
    }

    function onDrop(sourceSquare, targetSquare) {
        const result = makeAMove({
            from: sourceSquare,
            to: targetSquare,
        });
    }
    return (
        <div className='qp-box'>
            <Chessboard position={position}
                onPieceDrop={onDrop}
                boardWidth={600}
                customDarkSquareStyle={{ backgroundColor: boardColor.colorOne }}
                customLightSquareStyle={{ backgroundColor: boardColor.colorTwo }}
            />
        </div>
    )
}

export default QuickPlay