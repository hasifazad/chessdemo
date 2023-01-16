import React, { useContext } from 'react'
import { ChessBoardDetailsContext } from '../context/ChessBoardContext'

function BoardColor(props) {
    const boxOneStyle = { backgroundColor: props.colorOne, width: '30px', height: '30px', marginRight: '10px' }
    const boxTwoStyle = { backgroundColor: props.colorTwo, width: '30px', height: '30px', marginRight: '10px' }
    const boxStyle = { cursor: 'pointer' }

    let { setBoardColor } = useContext(ChessBoardDetailsContext)


    const onHandleClick = () => {
        setBoardColor({ colorOne: props.colorOne, colorTwo: props.colorTwo })
    }

    return (
        <div style={boxStyle} onClick={onHandleClick}>
            <div style={boxOneStyle}>

            </div>
            <div style={boxTwoStyle}>

            </div>
        </div>
    )
}

export default BoardColor