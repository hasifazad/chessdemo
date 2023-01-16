import React from 'react'

import './Message.css'


import reciever from '../../images/re.jpg'
import { format } from 'timeago.js'





function Message({ data, own, time }) {
    return (
        <div className={own ? 'message own' : 'message'}>
            <div className='message-top'>
                {/* <img className='message-img' src={reciever} alt='' /> */}
                <p className='message-text'>{data}</p>
            </div>
            <div className='message-bottom'>
                {format(time)}
            </div>
        </div>
    )
}

export default Message