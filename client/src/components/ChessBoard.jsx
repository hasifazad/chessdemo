import React, { useContext, useEffect, useRef, useState } from 'react'
import { Chessboard } from 'react-chessboard'
import { Chess } from 'chess.js'
import io from 'socket.io-client'
import axios from 'axios'
import moveSound from '../audios/movingsound.mp3'
import wrongMove from '../audios/wrongmove.mp3'
import { Howl, Howler } from 'howler'
import { UserDetailsContext } from '../context/UserContext'
import { ChatDetailsContext } from '../context/ChatContext'
import { MatchDetailsContext } from '../context/MatchContext'


const socket = io()

function ChessBoard() {

    const BASE_URL = process.env.REACT_APP_BASE_URL
    const CHESS_URL = process.env.REACT_APP_CHESS_URL

    let { user } = useContext(UserDetailsContext)
    let { matchLink, setMoved } = useContext(MatchDetailsContext)
    let { reciever } = useContext(ChatDetailsContext)
    let game = useRef(new Chess())
    let [position, setPosition] = useState('start')
    // let [mov, setMov] = useState(null)
    console.log(matchLink);
    const socket = useRef()

    useEffect(() => {
        socket.current = io(`${CHESS_URL}`)
    }, [])

    useEffect(() => {
        socket.current.emit('addUser', user._id, matchLink)
    }, [])


    // useEffect(() => {
    //     // socket.current.emit('move', { senderId: user._id, recieverId: reciever, position, mov })
    //     socket.current.on('make', ({ id, pos, mo }) => {
    //         setPosition(pos)
    //         setMov(mo)
    //         game.current.move(mo)

    //     })
    // }, [position])
    useEffect(() => {
        // socket.current.emit('move', { senderId: user._id, recieverId: reciever, position, mov })
        socket.current.on('getmove', ({ id, aMove, aFen }) => {
            let gameCopy = game.current
            gameCopy.move(aMove);
            gameCopy.fen()
            setPosition(aFen)
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
        let aMove = gameCopy.move(move);
        let aFen = gameCopy.fen()
        // console.log(result);
        // console.log(fen);
        // setMov(move)
        setPosition(gameCopy.fen())
        // if (gameCopy.isCheckmate()) {
        //     // let sound = new Howl({ src: [wrongMove] })
        //     // sound.play()
        // } else {

        // }
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
            // let sound = new Howl({ src: [wrongMove] })
            // sound.play()
            return false
        } else {
            let sound = new Howl({ src: [moveSound] })
            sound.play()
            setMoved(true)
            socket.current.emit('setmove', { sender: user._id, aMove, aFen, matchLink })
            // console.log({ sender: user._id, reciever: reciever._id, aMove, aFen });

            axios.put(`${BASE_URL}/api/game/set-move`, { aMove, aFen }).then((response) => {
                console.log(response);
            }).catch(() => {

            })


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