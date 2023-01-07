import React, { createContext, useState } from 'react'



export let MatchDetailsContext = createContext(null)

function MatchContext({ children }) {
    let [match, setMatch] = useState(null)
    let [matchLink, setMatchLink] = useState('')
    let [moved, setMoved] = useState(false)
    
    return (
        <MatchDetailsContext.Provider value={{ match, setMatch, matchLink, setMatchLink,moved, setMoved }}>
            {children}
        </MatchDetailsContext.Provider>
    )
}

export default MatchContext