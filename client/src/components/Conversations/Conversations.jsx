import React, { useContext } from 'react'


import './Conversations.css'

import axios from 'axios'

import im from '../../images/im.jpg'
import { ChatDetailsContext } from '../../context/ChatContext'
import { UserDetailsContext } from '../../context/UserContext'




function Conversations(props) {
    const { setChat, setReciever } = useContext(ChatDetailsContext)
    const { user } = useContext(UserDetailsContext)

    const onClickHandle = (id) => {
        setReciever(id)
        axios.get(`http://localhost:3001/api/message/${user._id}/${id}`).then((response) => {
            console.log(response);
            if (response.data.message === false) {
                setChat([])
            } else {
                setChat(response.data[0].chat)
            }

        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <div className='conversation' onClick={() => { onClickHandle(props.data._id) }}>
            <img className='conversation-img' src={im} alt='image' />
            <span className='conversation-name'>{props.data.username}</span>
        </div>
    )
}

export default Conversations