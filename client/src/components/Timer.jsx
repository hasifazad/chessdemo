import React, { useContext, useEffect } from 'react';
import { useTimer } from 'react-timer-hook';
import { MatchDetailsContext } from '../context/MatchContext';


function MyTimer({ expiryTimestamp, moved }) {
    // let { moved } = useContext(MatchDetailsContext)
    let { startGame } = useContext(MatchDetailsContext)
    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,
    } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });

    useEffect(() => {
        if (moved) {
            pause()
        } else {
            resume()
        }
    }, [moved])


    return (
        <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '30px' }}>
                {/* <span>{days}</span>: */}
                <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
            </div>
            {/* <p>{isRunning ? 'Running' : 'Not running'}</p>
            <button onClick={start}>Start</button>
            <button onClick={pause}>Pause</button>
            <button onClick={resume}>Resume</button>
            <button onClick={() => {
                // Restarts to 5 minutes timer
                const time = new Date();
                time.setSeconds(time.getSeconds() + 300);
                restart(time)
            }}>Restart</button> */}
        </div>
    );
}


export default MyTimer