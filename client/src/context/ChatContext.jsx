import React, { createContext, useState } from 'react'



export let ChatDetailsContext = createContext(null)


function ChatContext({ children }) {
  let [chat, setChat] = useState([])
  let [currentChat, setCurrentChat] = useState({})
  let [reciever, setReciever] = useState('')
  let [notification, setNotification] = useState({ msg: '', open: false })
  return (
    <ChatDetailsContext.Provider value={{ chat, setChat, reciever, setReciever, currentChat, setCurrentChat, notification, setNotification }}>
      {children}
    </ChatDetailsContext.Provider>
  )
}

export default ChatContext
