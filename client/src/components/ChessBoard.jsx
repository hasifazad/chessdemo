import React, { useContext, useEffect, useRef, useState } from 'react'
import { Chessboard } from 'react-chessboard'
import { Chess } from 'chess.js'
import io from 'socket.io-client'
import axios from 'axios'
import moveSound from '../audios/movingsound.mp3'
import wrongMove from '../audios/wrongmove.mp3'
import gamewin from '../audios/gamewin.mp3'
import { Howl, Howler } from 'howler'
import { UserDetailsContext } from '../context/UserContext'
import { ChatDetailsContext } from '../context/ChatContext'
import { MatchDetailsContext } from '../context/MatchContext'
import GameOver from '../components/GameOver'


const socket = io()

function ChessBoard() {
    const BASE_URL = process.env.REACT_APP_BASE_URL
    const CHESS_URL = process.env.REACT_APP_CHESS_URL

    const socket = useRef()
    let game = useRef(new Chess())
    let [position, setPosition] = useState('start')
    let [isMyMove, setIsMyMove] = useState(false)

    let { user } = useContext(UserDetailsContext)
    let { matchLink, moved, setMoved, setOpen, match } = useContext(MatchDetailsContext)
    let { reciever } = useContext(ChatDetailsContext)


    console.log('match', match);

    useEffect(() => {
        socket.current = io(`${CHESS_URL}`)
    }, [])

    useEffect(() => {
        socket.current.emit('addUser', user._id, matchLink)
    }, [])



    useEffect(() => {

        socket.current.on('getmove', ({ id, aMove, aFen }) => {
            let gameCopy = game.current
            gameCopy.move(aMove);
            gameCopy.fen()
            setPosition(aFen)
            setIsMyMove(!isMyMove)
        })
    }, [position])

    useEffect(() => {
        if (match.color == 'w') {
            setIsMyMove(true)
        } else {
            setIsMyMove(false)
        }
    }, [])



    function makeAMove(move) {
        if (!isMyMove) {
            let sound = new Howl({ src: [wrongMove] })
            sound.play()
            return aMove = null
        }
        let gameCopy = game.current
        let aMove = gameCopy.move(move);
        let aFen = gameCopy.fen()

        setPosition(gameCopy.fen())
        if (gameCopy.isCheckmate()) {
            let sound = new Howl({ src: [gamewin] })
            sound.play()
            setOpen(true)
        } else {

        }

        return { aMove, aFen };
    }



    function onDrop(sourceSquare, targetSquare) {
        const result = makeAMove({
            from: sourceSquare,
            to: targetSquare,
        });
        let { aMove, aFen } = result
        console.log('aMove', aMove);
        console.log('aFen', aFen);

        if (aMove === null) {
            let sound = new Howl({ src: [wrongMove] })
            sound.play()
            return false
        } else {
            let sound = new Howl({ src: [moveSound] })
            sound.play()

            setMoved(!moved)
            setIsMyMove(!isMyMove)
            console.log('moved', moved);
            socket.current.emit('setmove', { sender: user._id, aMove, aFen, matchLink })


            axios.put(`${BASE_URL}/api/game/set-move`, { aMove, aFen, matchLink }).then((response) => {
                console.log(response);
            }).catch(() => {

            })


            return true
        }
    }




    return (
        <div>
            <GameOver />
            <Chessboard position={position}
                onPieceDrop={onDrop}
                boardWidth={600}
            />
        </div>
    )
}

export default ChessBoard






// useEffect(() => {
    //     // socket.current.emit('move', { senderId: user._id, recieverId: reciever, position, mov })
    //     socket.current.on('make', ({ id, pos, mo }) => {
    //         setPosition(pos)
    //         setMov(mo)
    //         game.current.move(mo)

    //     })
    // }, [position])

        // useEffect(() => {
    //     socket.current.on('make', (ma) => {
    //         setPosition(ma)
    //     })
    // }, [socket,position])
    // console.log(game.move());
    // console.log(game.moves());

    // socket.current.emit('move', { senderId: user._id, recieverId: reciever, position, mov })