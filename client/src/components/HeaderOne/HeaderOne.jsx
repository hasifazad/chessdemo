import { Button, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import './HeaderOne.css'

function HeaderOne() {

    let navigate = useNavigate()

    const signup = () => {
        navigate('/signup')
    }
    const login = () => {
        navigate('/login')
    }
    return (
        <div>
            <div className='lp-header'>
                <div>
                    <Typography variant='h4' color='white'>CHESS</Typography>
                </div>
                <div>
                    <Button variant='contained' onClick={signup} disableElevation disableRipple
                        sx={{ borderRadius: '0', margin: '0 20px', color: 'white' }}>SIGNUP</Button>

                    <Button variant='contained' onClick={login} disableElevation disableRipple
                        sx={{ borderRadius: '0', margin: '0 20px', color: 'white' }}>LOGIN</Button>
                </div>
            </div>
        </div>
    )
}

export default HeaderOne