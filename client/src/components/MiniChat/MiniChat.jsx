import axios from 'axios'
import io from 'socket.io-client'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { MatchDetailsContext } from '../../context/MatchContext'
import { UserDetailsContext } from '../../context/UserContext'

import './MiniChat.css'
import MiniMessage from './MiniMessage'

function MiniChat() {
    const BASE_URL = process.env.REACT_APP_BASE_URL
    const CHAT_URL = process.env.REACT_APP_CHAT_URL

    let { user } = useContext(UserDetailsContext)
    let { players, setplayers } = useContext(MatchDetailsContext)
    let [chat, setChat] = useState([])
    const [text, setText] = useState('')
    const [arrivalMsg, setArrivalMsg] = useState(null)
    const [departMsg, setDepartMsg] = useState(null)
    let [recieverId, setRecieverId] = useState(null)

    const socket = useRef()
    const scrollRef = useRef()
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [chat])

    useEffect(() => {
        if (user._id === players.user1.user_id) {
            setRecieverId(players.user2.user_id)
        } else {
            setRecieverId(players.user1.user_id)
        }
    }, [])

    useEffect(() => {
        socket.current = io(`${CHAT_URL}`)
        return () => {
            socket.current.emit()
        }
    }, [])

    useEffect(() => {
        socket.current.emit('adduser', user._id)
        socket.current.on('getuser', (users) => {
        })
    }, [])

    useEffect(() => {
        axios.get(`${BASE_URL}/api/chat/${user._id}/${recieverId}`).then((response) => {
            if (response.data.message === false) {
                setChat([])
            } else {
                setChat(response.data[0].chat)
            }
        }).catch((error) => {
            console.log(error);
        })
    }, [])

    useEffect(() => {
        socket.current.on('getmessage', (msg) => {
            setArrivalMsg({
                sender: msg.sender,
                reciever: msg.reciever,  //reciever the user ie user._id
                message: msg.text,
                createdAt: Date.now()
            })
        })
    }, [])




    const sendText = () => {
        let msgObj = {
            first_person: user._id,
            second_person: recieverId,
            sender: user._id,
            reciever: recieverId,
            message: text
        }

        socket.current.emit('setmessage', {
            sender: user._id,
            reciever: recieverId,
            text: text
        })

        setDepartMsg({
            sender: user._id,
            reciever: recieverId,
            message: text,
            createdAt: Date.now()
        })


        axios.post(`${BASE_URL}/api/chat`, msgObj).then((response) => {

        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        arrivalMsg && recieverId.includes(arrivalMsg.sender) && setChat([...chat, arrivalMsg])
    }, [arrivalMsg])

    useEffect(() => {
        departMsg && recieverId.includes(departMsg.reciever) && setChat([...chat, departMsg])
        setText('')
    }, [departMsg])


    return (
        <div className='minichat'>
            <div className='minichat-box'>
                <div className='minichat-box1'>
                    {
                        chat.map((chat, index) => {
                            return <div key={index} ref={scrollRef}> <MiniMessage data={chat.message} own={chat.sender === user._id ? true : false} /></div>
                        })
                    }
                </div>
                <div className='minichat-box2'>
                    <textarea className='msgtextarea' placeholder='type message...'
                        value={text} onChange={(e) => { setText(e.target.value) }}
                    />
                    <button className='msgsendbtn' onClick={sendText}>Send</button>
                </div>
            </div>
        </div>
    )
}

export default MiniChat