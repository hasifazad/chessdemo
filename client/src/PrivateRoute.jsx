import React, { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import LoginPage from './pages/Login'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import Login from './components/Login'
import { UserDetailsContext } from './context/UserContext'

function PrivateRoute() {
    let { user, setUser } = useContext(UserDetailsContext)
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const token = localStorage.getItem('chesstoken')


    useEffect(() => {
        axios.get(`${BASE_URL}/api/user/verify/${token}`).then((response) => {
            console.log(response.data);
            setUser(response.data)
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    return (
        <div>
            {user ? <Outlet /> : <LoginPage />}
        </div>
    )
}

export default PrivateRoute