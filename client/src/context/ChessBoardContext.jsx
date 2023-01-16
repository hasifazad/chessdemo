import React, { createContext, useState } from 'react'



export let ChessBoardDetailsContext = createContext(null)


function ChessBoardContext({ children }) {

    let [boardColor, setBoardColor] = useState({ colorOne: '#B58863', colorTwo: '#F0D9B5' })
    return (
        <ChessBoardDetailsContext.Provider value={{ boardColor, setBoardColor }}>
            {children}
        </ChessBoardDetailsContext.Provider>
    )
}

export default ChessBoardContext