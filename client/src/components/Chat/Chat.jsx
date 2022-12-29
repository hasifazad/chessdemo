import React, { useContext, useEffect, useRef, useState } from 'react'

import './Chat.css'
import { Container } from '@mui/material'

import io from 'socket.io-client'
import axios from 'axios'

import Conversations from '../Conversations/Conversations'
import Message from '../Message/Message'
import ChatProfile from '../ChatProfile/ChatProfile'


// ===================   CONTEXTS   =========================
import { ChatDetailsContext } from '../../context/ChatContext'
import { UserDetailsContext } from '../../context/UserContext'



function Chat() {
    let { user } = useContext(UserDetailsContext)
    let { chat, setChat, reciever } = useContext(ChatDetailsContext)
    
    const socket = useRef()
    const [conversations, setConversations] = useState([])
    const [text, setText] = useState('')
    const [arrivalMsg, setArrivalMsg] = useState(null)

    useEffect(() => {
        socket.current = io('ws://localhost:8900')
    }, [])

    useEffect(() => {
        socket.current.emit('adduser', user._id)
        socket.current.on('getuser', (us) => {
            console.log(us);
        })
    }, [user])
    
    useEffect(() => {
        socket.current.on('getmessage', (msg) => {
            
            setArrivalMsg({
                sender: msg.senderId,
                reciever: user._id,
                message: msg.text,
                createdAt: Date.now()
            })
        })
    }, [])

    useEffect(() => {
        arrivalMsg && reciever.includes(arrivalMsg.sender) && setChat([...chat, arrivalMsg])
    }, [arrivalMsg])

    useEffect(() => {
        axios.get('http://localhost:3001/api/user/all-users').then((response) => {
            setConversations(response.data)
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    const sendText = () => {
        let textMsg = {
            first_person: user._id,
            second_person: reciever,
            sender: user._id,
            reciever: reciever,
            message: text
        }
        
        socket.current.emit('sendmessage', {
            senderId: user._id,
            recieverId: reciever,
            text: text
        })

        axios.post('http://localhost:3001/api/message', textMsg).then((response) => {

        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <Container maxWidth='xl'>
            <div className='messenger'>
                <div className='chat-profile-box'>
                    <ChatProfile />
                </div>
                <div className='chat-box'>
                    <div className='chat-box-top'>
                        {
                            chat.map((msg, index) => {
                                return <Message key={index} data={msg.message} time={msg.createdAt} own={user._id === msg.sender ? true : false} />
                            })
                        }
                    </div>

                    <div className='chat-box-bottom'>
                        <textarea className='chat-input' placeholder='Type something...'
                            onChange={(e) => { setText(e.target.value) }}
                        />
                        <button className='chat-send-button' type='button' onClick={sendText}>send</button>
                    </div>

                </div>
                <div className='chat-online'>
                    <input className='chat-search' type='search' placeholder='Search...' />
                    <>
                        {conversations.map((obj, index) => {
                            return obj._id !== user._id ? <Conversations key={index} data={obj} /> : null
                        })
                        }
                    </>
                </div>
            </div>
        </Container>
    )
}

export default Chat