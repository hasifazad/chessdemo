import React, { useContext, useEffect, useRef, useState } from 'react'

import './Chat.css'
import { Container, Typography } from '@mui/material'

import io from 'socket.io-client'
import axios from 'axios'

import Conversations from '../Conversations/Conversations'
import Message from '../Message/Message'
import ChatProfile from '../ChatProfile/ChatProfile'
import NotificationBar from '../NotificationBar'


// ===================   CONTEXTS   =========================
import { ChatDetailsContext } from '../../context/ChatContext'
import { UserDetailsContext } from '../../context/UserContext'
import { Link } from 'react-router-dom'



function Chat() {
    let { user } = useContext(UserDetailsContext)
    let { chat, setChat, reciever, setNotification } = useContext(ChatDetailsContext)
    const socket = useRef()
    const scrollRef = useRef()
    const conversationScrollRef = useRef()
    const [conversations, setConversations] = useState([])
    const [text, setText] = useState('')
    const [arrivalMsg, setArrivalMsg] = useState(null)
    const [departMsg, setDepartMsg] = useState(null)

    const BASE_URL = process.env.REACT_APP_BASE_URL
    const CHAT_URL = process.env.REACT_APP_CHAT_URL


    useEffect(() => {
        socket.current = io(`${CHAT_URL}`)
    }, [])

    useEffect(() => {
        socket.current.emit('adduser', user._id)
        socket.current.on('getuser', (users) => {
            // console.log(users);
        })
    }, [])

    useEffect(() => {
        axios.get(`${BASE_URL}/api/user/all-users`).then((response) => {
            setConversations(response.data)
        }).catch((err) => {
            console.log(err);
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
            setNotification({ msg: msg.text, open: true })
        })
    }, [])

    useEffect(() => {
        arrivalMsg && reciever._id.includes(arrivalMsg.sender) && setChat([...chat, arrivalMsg])
    }, [arrivalMsg])

    useEffect(() => {
        departMsg && reciever._id.includes(departMsg.reciever) && setChat([...chat, departMsg])
        setText('')
    }, [departMsg])



    const sendText = () => {
        let msgObj = {
            first_person: user._id,
            second_person: reciever._id,
            sender: user._id,
            reciever: reciever._id,
            message: text
        }

        socket.current.emit('setmessage', {
            sender: user._id,
            reciever: reciever._id,
            text: text
        })

        setDepartMsg({
            sender: user._id,
            reciever: reciever._id,
            message: text,
            createdAt: Date.now()
        })


        axios.post(`${BASE_URL}/api/chat`, msgObj).then((response) => {

        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [chat])

    const onHandleChange = (e) => {
        conversationScrollRef.current?.scrollTo(0, 0)
        let a = []
        let c = conversations.filter((obj) => {
            if (obj.username.includes(e.target.value)) {
                return obj
            } else {
                a.push(obj)
            }

        })
        setConversations([...c, ...a])
    }

    return (
        <Container maxWidth='lg'>
            <NotificationBar />
            <div className='messenger'>
                <div className='chat-profile-box'>
                    <ChatProfile />
                </div>
                <div className='chat-box'>
                    {!reciever ? <Typography variant='h2' sx={{ color: 'lightgrey', marginTop: '250px' }}>Start conversation</Typography> : null}
                    <div className={reciever ? 'chat-box-top' : ''}>
                        {
                            chat.map((msg, index) => {
                                return (<div key={index} ref={scrollRef}><Message data={msg.message} time={msg.createdAt} own={user._id === msg.sender ? true : false} /></div>)
                            })
                        }
                    </div>

                    {reciever ? <div className='chat-box-bottom'>
                        <textarea value={text} className='chat-input' placeholder='Type something...'
                            onChange={(e) => { setText(e.target.value) }}
                        />
                        <button className='chat-send-button' type='button' onClick={sendText}>send</button>
                    </div> : null}

                </div>
                <div className='chat-online'>
                    <input className='chat-search' type='search' placeholder='Search...' onChange={onHandleChange} />
                    <div className='chat-converstions' ref={conversationScrollRef}>
                        {conversations.map((obj, index) => {
                            return obj._id !== user._id ? <Conversations key={index} data={obj} /> : null
                        })
                        }
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Chat