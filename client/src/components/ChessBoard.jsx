import React, { useEffect, useRef, useState } from 'react'
import { Chessboard } from 'react-chessboard'
import { Chess } from 'chess.js'
import io from 'socket.io-client'
import axios from 'axios'
import moveSound from '../audios/movingsound.mp3'
import wrongMove from '../audios/wrongmove.mp3'
import { Howl, Howler } from 'howler'

const socket = io()

function ChessBoard() {

    let game = useRef(new Chess())
    let [position, setPosition] = useState('start')
    let [mov, setMov] = useState(null)

    const socket = useRef()

    useEffect(() => {
        socket.current = io('ws://localhost:8901')
    }, [])

    useEffect(() => {
        socket.current.emit('move', position, mov)
        socket.current.on('make', (ma, k) => {
            console.log('game', ma, k);
            setPosition(ma)
            setMov(k)
            game.current.move(k)
        })
    }, [position])

    // useEffect(() => {
    //     socket.current.on('make', (ma) => {
    //         setPosition(ma)
    //     })
    // }, [socket,position])
    // console.log(game.move());
    // console.log(game.moves());

    function makeAMove(move) {
        let gameCopy = game.current
        let result = gameCopy.move(move);
        setMov(move)
        console.log('sdfadf', gameCopy.fen());
        setPosition(gameCopy.fen())
        return result;

    }



    function onDrop(sourceSquare, targetSquare) {
        const move = makeAMove({
            from: sourceSquare,
            to: targetSquare,
        });
        if (move === null) {
            // let sound = new Howl({ src: [wrongMove] })
            // sound.play()
            return false
        } else {
            let sound = new Howl({ src: [moveSound] })
            sound.play()
            return true
        }
    }

    return (
        <div>
            <Chessboard position={position}
                onPieceDrop={onDrop}
                boardWidth={600}
            />
        </div>
    )
}

export default ChessBoard