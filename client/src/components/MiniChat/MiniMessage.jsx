import React from 'react'
import './MiniMessage.css'

function MiniMessage(props) {
    return (
        <div className={props.own ? 'minimessage own' : 'minimessage'}>
            <div className='minimessage-top'>
                {/* <img className='message-img' src={reciever} alt='' /> */}
                <p className='minimessage-text'>{props.data}</p>
            </div>
            {/* <div className='minimessage-bottom'>
                {format(time)}
            </div> */}
        </div>
    )
}

export default MiniMessage