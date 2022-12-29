import React, { createContext, useState } from 'react'



export let ChatDetailsContext = createContext(null)


function ChatContext({ children }) {
  let [chat, setChat] = useState([])
  let [currentChat, setCurrentChat] = useState({})
  let [reciever, setReciever] = useState('')
  return (
    <ChatDetailsContext.Provider value={{ chat, setChat, reciever, setReciever, currentChat, setCurrentChat }}>
      {children}
    </ChatDetailsContext.Provider>
  )
}

export default ChatContext
