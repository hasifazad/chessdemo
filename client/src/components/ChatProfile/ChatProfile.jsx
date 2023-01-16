import React, { useContext } from 'react'
import './ChatProfile.css'
import im from '../../images/im.jpg'
import { UserDetailsContext } from '../../context/UserContext'
import { ChatDetailsContext } from '../../context/ChatContext'

function ChatProfile() {
    let blankPic = require('../../images/blankprofilepic.png')
    let a = 'https://chess-user-images.s3.ap-south-1.amazonaws.com'

    let { user } = useContext(UserDetailsContext)
    let { reciever } = useContext(ChatDetailsContext)

    return (
        <div>
            {
                reciever ? <div className='chat-profile'>
                    <img className='pro-image' src={user.image ? `${a}/${reciever._id + reciever.image}` : blankPic} alt='image' ></img>
                    <p className='pro-name'>{reciever.username}</p>
                    <p className='pro-name'>Rank : 456</p>
                </div> : null
            }
        </div>
    )
}

export default ChatProfile