import React from 'react'
import Chat from '../components/Chat/Chat'
import Header from '../components/Header'
import ChatContext from '../context/ChatContext'

function ChatPage() {
  return (
    <div>
      <Header />
        <Chat />
  
    </div>
  )
}

export default ChatPage