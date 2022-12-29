import React, { useContext } from 'react'
import './ChatProfile.css'
import im from '../../images/im.jpg'
import { UserDetailsContext } from '../../context/UserContext'

function ChatProfile() {
    let { user } = useContext(UserDetailsContext)

    return (
        <div className='chat-profile'>
            <img className='pro-image' src={im} alt='image' ></img>
            <p className='pro-name'>{user.username}</p>
            <p className='pro-name'>Rank : 456</p>
        </div>
    )
}

export default ChatProfile