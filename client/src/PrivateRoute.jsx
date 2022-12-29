import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import LoginPage from './pages/Login'
import jwtDecode from 'jwt-decode'
import axios from 'axios'

function PrivateRoute() {
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const token = localStorage.getItem('chesstoken')
    
    
    useEffect(() => {
        axios.get(`${BASE_URL}/api/user/verify/${token}`).then((response) => {
            console.log(response);
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    return (
        <div>
            <Outlet />
        </div>
    )
}

export default PrivateRoute