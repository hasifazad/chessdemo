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
import MatchContext, { MatchDetailsContext } from '../context/MatchContext'
import GameOver from '../components/GameOver'
import PositionedSnackbar from './SnackBar'
import { ChessBoardDetailsContext } from '../context/ChessBoardContext'
import StartGame from './StartGame'



const socket = io()

function ChessBoard() {
    const BASE_URL = process.env.REACT_APP_BASE_URL
    const CHESS_URL = process.env.REACT_APP_CHESS_URL

    const socket = useRef()
    let game = useRef(new Chess())
    let [position, setPosition] = useState('start')
    let [isMyMove, setIsMyMove] = useState(false)
    let [gameOverMsg, setGameOverMsg] = useState('')

    let { user } = useContext(UserDetailsContext)
    let { matchLink, moved, setMoved, setOpen, match,
        snackOpen, setSnackOpen, setStartGame, movesArray, setMovesArray } = useContext(MatchDetailsContext)
    let { reciever } = useContext(ChatDetailsContext)
    let { boardColor } = useContext(ChessBoardDetailsContext)


    useEffect(() => {
        socket.current = io(`${CHESS_URL}`)
    }, [])

    useEffect(() => {
        socket.current.emit('addUser', user._id, matchLink)

    }, [])

    useEffect(() => {
        socket.current.on('startgame', (response) => {
            console.log('startgame', response);
            setStartGame(false)
        })
    })



    useEffect(() => {
        console.log('chessssssssssssssssssss');

        socket.current.on('getmove', ({ id, aMove, aFen }) => {
            let gameCopy = game.current
            gameCopy.move(aMove);
            gameCopy.fen()
            setMovesArray([...movesArray, aMove])
            setPosition(aFen)
            setIsMyMove(!isMyMove)
            setMoved(!moved)

            if (gameCopy.isCheckmate()) {
                // let sound = new Howl({ src: [gamewin] })
                // sound.play()

                setOpen(true)
                setGameOverMsg('Sorry!😔 You Lose the match👎')
                axios.patch(`${BASE_URL}/api/ranking/set-ranking`, {
                    userId: user._id,
                    lose: true
                }).then(() => { }).catch(() => { })
            } else {

            }
        })
    }, [position])

    useEffect(() => {
        if (match.color == 'w') {
            setIsMyMove(!isMyMove)
        } else {
            setIsMyMove(isMyMove)
        }
    }, [])



    function makeAMove(move) {
        if (!isMyMove) {
            let sound = new Howl({ src: [wrongMove] })
            sound.play()
            setSnackOpen(true)
            let aMove
            return aMove = null
        }
        let gameCopy = game.current
        let aMove = gameCopy.move(move);
        let aFen = gameCopy.fen()
        setMovesArray([...movesArray, aMove])

        setPosition(gameCopy.fen())

        if (gameCopy.isCheckmate()) {
            // let sound = new Howl({ src: [gamewin] })
            // sound.play()
            setOpen(true)
            setGameOverMsg('Congrats! You win the match✌️🏆')
            axios.patch(`${BASE_URL}/api/ranking/set-ranking`, {
                userId: user._id,
                win: true
            }).then(() => { }).catch(() => { })
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

        if (aMove === null) {
            let sound = new Howl({ src: [wrongMove] })
            sound.play()
            return false
        } else {
            let sound = new Howl({ src: [moveSound] })
            sound.play()

            setMoved(!moved)
            setIsMyMove(!isMyMove)

            socket.current.emit('setmove', { sender: user._id, aMove, aFen, matchLink })


            axios.put(`${BASE_URL}/api/game/set-move`, { aMove, aFen, matchLink }).then((response) => {

            }).catch(() => {

            })


            return true
        }
    }




    return (
        <div>
            <PositionedSnackbar />
            <GameOver data={gameOverMsg} />
            <StartGame />
            <Chessboard position={position}
                onPieceDrop={onDrop}
                boardWidth={600}
                customDarkSquareStyle={{ backgroundColor: boardColor.colorOne }}
                customLightSquareStyle={{ backgroundColor: boardColor.colorTwo }}
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