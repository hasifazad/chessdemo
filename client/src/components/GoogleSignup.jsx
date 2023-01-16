
import React, { useEffect } from 'react'
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function GoogleSignup() {
    const BASE_URL = process.env.REACT_APP_BASE_URL

    const navigate = useNavigate()

    const handleCallbackResponse = (res) => {
        let user = jwtDecode(res.credential)
        console.log('fghjk', user);
        let obj = {
            username: user.name,
            email: user.email
        }
        // axios.post(`${BASE_URL}/api/user/signup`, obj).then((response) => {
        //     navigate('/home')
        // }).catch((err) => {
        //     console.log(err);
        // })

    }

    useEffect(() => {
        window.google.accounts.id.initialize({
            client_id: "272477328062-bjr4gqpbg7ddf1ivf6o4gfffb18arcp1.apps.googleusercontent.com",
            callback: handleCallbackResponse
        })
        window.google.accounts.id.renderButton(
            document.getElementById('signInDiv'),
            { theme: "outline", size: 'large', width: '350' }
        )
        window.google.accounts.id.prompt()
    }, [])



    return (
        <div>
            <div id='signInDiv'></div>
        </div>
    )
}

export default GoogleSignup