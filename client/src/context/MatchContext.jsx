import React, { createContext, useState } from 'react'



export let MatchDetailsContext = createContext(null)

function MatchContext({ children }) {
    let [match, setMatch] = useState(null)
    let [matchLink, setMatchLink] = useState('')
    let [moved, setMoved] = useState(false)
    let [open, setOpen] = useState(false);
    let [snackOpen, setSnackOpen] = useState(false);
    let [startGame, setStartGame] = useState(true)
    let [movesArray, setMovesArray] = useState([])
    let [players, setPlayers] = useState('')

    return (
        <MatchDetailsContext.Provider
            value={{
                match, setMatch,
                matchLink, setMatchLink,
                moved, setMoved,
                open, setOpen,
                snackOpen, setSnackOpen,
                startGame, setStartGame,
                movesArray, setMovesArray,
                players, setPlayers
            }}>
            {children}
        </MatchDetailsContext.Provider>
    )
}

export default MatchContext